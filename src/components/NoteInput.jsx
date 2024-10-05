import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/NoteInput.css';
import saveIcon from '../assets/Vector1.png'; // Default save icon
import activeSaveIcon from '../assets/Vector2.png'; // Active save icon when input is not empty

const NoteInput = ({ onAddNote }) => {
    const [note, setNote] = useState('');

    const handleInputChange = (e) => {
        setNote(e.target.value);
    };

    const handleAddNote = () => {
        if (note.trim()) {
            onAddNote(note);
            setNote(''); // Clear input after adding
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleAddNote();
        }
    };

    return (
        <div className="note-input-container">
            <textarea
                value={note}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter your text here.........."
                className="note-input"
            />
            <img 
                src={note.trim() ? activeSaveIcon : saveIcon} 
                alt="Save" 
                className="enter-button" 
                onClick={handleAddNote} 
                style={{ cursor: 'pointer' }} 
            />
        </div>
    );
};

NoteInput.propTypes = {
    onAddNote: PropTypes.func.isRequired,
};

export default NoteInput;