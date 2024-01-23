// Modal component
import "./Modal.css";
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog bg-white dark:bg-gray-800"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="">
          <div className="flex justify-between">
            <div className="text-l font-bold text-gray-700 dark:text-gray-300">
              {title}
            </div>
            <i
              className="material-icons dark:text-gray-300 cursor-pointer"
              onClick={onClose}
            >
              close
            </i>
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
