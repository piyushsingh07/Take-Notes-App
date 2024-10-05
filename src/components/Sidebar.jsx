import { useState } from 'react';
import Modal from './Modal';
import '../styles/Sidebar.css';
import PropTypes from 'prop-types';

const Sidebar = ({ groups, selectedGroup, onAddGroup, onSelectGroup }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Define handleAddButtonClick to open the modal
    const handleAddButtonClick = () => {
        setIsModalOpen(true);
    };

    // Sort groups by lastUpdated timestamp
    const sortedGroups = [...groups].sort((a, b) => {
        const dateA = a.lastUpdated ? new Date(a.lastUpdated) : new Date(0);
        const dateB = b.lastUpdated ? new Date(b.lastUpdated) : new Date(0);
        return dateB - dateA;
    });
    
    console.log('Sorted Groups:', sortedGroups);
    
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>Pocket Notes</h1>
            </div>
            <div className="group-list">
                {sortedGroups.map(group => (
                    <div
                        key={group.id}
                        className={`group-item ${selectedGroup && selectedGroup.id === group.id ? 'selected' : ''}`}
                        onClick={() => onSelectGroup(group.id)}
                    >
                        <span className="initials" style={{ backgroundColor: group.color }}>{group.initials}</span>
                        <span className="group-name">{group.name}</span>
                    </div>
                ))}
            </div>
            <button className="add-button" onClick={handleAddButtonClick}>+</button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddGroup={onAddGroup}
            />
        </div>
    );
};

Sidebar.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        initials: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    })).isRequired,
    selectedGroup: PropTypes.object,
    onAddGroup: PropTypes.func.isRequired,
    onSelectGroup: PropTypes.func.isRequired
};

export default Sidebar;