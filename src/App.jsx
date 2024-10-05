import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NoteGroupHeader from './components/NoteGroupHeader';
import NoteInput from './components/NoteInput';
import NoteDisplay from './components/NoteDisplay';
import MainContent from './components/MainContent';
import './styles/App.css';

function App() {
    
    const [groups, setGroups] = useState(() => {
        const savedGroups = localStorage.getItem('groups');
        return savedGroups ? JSON.parse(savedGroups) : [];
    });

    const [selectedGroup, setSelectedGroup] = useState(null);

    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    useEffect(() => {
        const migratedGroups = groups.map(group => {
            if (!group.lastUpdated) {
                return { ...group, lastUpdated: new Date().toISOString() };
            }
            return group;
        });
        if (JSON.stringify(migratedGroups) !== JSON.stringify(groups)) {
            setGroups(migratedGroups);
        }
    }, [groups]);
    
    useEffect(() => {
        localStorage.setItem('groups', JSON.stringify(groups));
    }, [groups]);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleAddGroup = (groupName, groupColor) => {
        const words = groupName.trim().split(/\s+/);
        let initials;
        if (words.length === 1) {
            initials = words[0].charAt(0).toUpperCase();
        } else {
            initials = (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
        }
        const newGroup = {
            id: Date.now(),
            name: groupName,
            initials: initials,
            color: groupColor,
            lastUpdated: new Date().toISOString()
        };
        setGroups(prevGroups => [...prevGroups, newGroup]);
    };

    const handleSelectGroup = (groupId) => {
        const group = groups.find(g => g.id === groupId);
        setSelectedGroup(group);
    };

    const handleAddNote = (noteText) => {
        const now = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options).replace(',', '');
        const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const newNote = { text: noteText, date: `${formattedDate} • ${formattedTime}`, groupId: selectedGroup.id };
        setNotes(prevNotes => [...prevNotes, newNote]);
    
        // Update the lastUpdated timestamp for the group
        setGroups(prevGroups => prevGroups.map(group => 
            group.id === selectedGroup.id 
                ? { ...group, lastUpdated: new Date().toISOString() } 
                : group
        ));
    };

    return (
        <div className="app">
            <Sidebar groups={groups} selectedGroup={selectedGroup} onAddGroup={handleAddGroup} onSelectGroup={handleSelectGroup} />
            <div className="main-content">
                {selectedGroup ? (
                    <>
                        <NoteGroupHeader group={selectedGroup} />
                        <NoteDisplay notes={notes} selectedGroup={selectedGroup} />
                        <NoteInput onAddNote={handleAddNote} />
                    </>
                ) : (
                    <MainContent />
                )}
            </div>
        </div>
    );
}

export default App;