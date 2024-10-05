import PropTypes from 'prop-types';
import '../styles/NoteDisplay.css';

const NoteDisplay = ({ notes, selectedGroup }) => {
    const filteredNotes = notes.filter(note => note.groupId === selectedGroup.id);
    return (
        <div className="note-display">
            {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                    <div key={index} className="note">
                        <p>{note.text}</p>
                        <span className="note-date">{note.date}</span>
                    </div>
                ))
            ) : (
                <div className="empty-notes">No notes available</div>
            )}
        </div>
    );
};

NoteDisplay.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            groupId: PropTypes.number.isRequired,
        })
    ).isRequired,
    selectedGroup: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired, // Add selectedGroup to prop types
};

export default NoteDisplay;