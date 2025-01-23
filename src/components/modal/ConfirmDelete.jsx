import "./Modal.css";

export const ConfirmDelete = ({ isOpen, onClose, onConfirm, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};
