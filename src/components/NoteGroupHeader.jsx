import PropTypes from 'prop-types';
import '../styles/NoteGroupHeader.css'; 
import backButton from '../assets/Vector3.png';

const NoteGroupHeader = ({ group, onBack }) => {
    return (
        <div className="note-group-header">
            <button className="back-button" onClick={onBack}>
                <img src={backButton} alt="Back" />
            </button>
            <span className="initials" style={{ backgroundColor: group.color }}>{group.initials}</span>
            <h1 className="group-name">{group.name}</h1>
        </div>
    );
};

NoteGroupHeader.propTypes = {
    group: PropTypes.shape({
        color: PropTypes.string.isRequired,
        initials: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onBack: PropTypes.func.isRequired,
};

export default NoteGroupHeader;