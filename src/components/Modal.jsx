import { useState } from 'react';
import '../styles/Modal.css';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, onAddGroup }) => {
    const [groupName, setGroupName] = useState('');
    const [groupColor, setGroupColor] = useState('#B38BFA');

    const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

    const handleCreateGroup = () => {
        if (groupName.trim()) {
            onAddGroup(groupName, groupColor);
            onClose();
            setGroupName('');
            setGroupColor('#B38BFA');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h2>Create New group</h2>
                <div className="group-name-input">
                    <label htmlFor="groupName">Group Name</label>
                    <input
                        type="text"
                        id="groupName"
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                <div className="color-picker">
                    <span>Choose colour</span>
                    <div className="color-options">
                        {colors.map(color => (
                            <button
                                key={color}
                                style={{ backgroundColor: color }}
                                onClick={() => setGroupColor(color)}
                                className={groupColor === color ? 'selected' : ''}
                            />
                        ))}
                    </div>
                </div>
                <button className="create-button" onClick={handleCreateGroup}>Create</button>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddGroup: PropTypes.func.isRequired
};

export default Modal;