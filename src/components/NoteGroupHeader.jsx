import PropTypes from 'prop-types';
import '../styles/NoteGroupHeader.css'; 

const NoteGroupHeader = ({ group }) => {
    return (
        <div className="note-group-header">
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
};

export default NoteGroupHeader;