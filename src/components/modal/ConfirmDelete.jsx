import "./Modal.css";

export const ConfirmDelete = ({ isOpen, onClose, onConfirm, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-overlay">
                <div className="modal-content">
                    {children}
                    <div className="btn-container">
                        <button onClick={onConfirm}>Confirm</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
