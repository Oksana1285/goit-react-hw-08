import { useHotkeys } from 'react-hotkeys-hook';
import css from './DeleteContactModal.module.css';

const DeleteContactModal = ({ contact, handleDelete, handleCancel }) => {
  useHotkeys('esc', () => handleCancel());

  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        <p>
          Are you sure you want to delete contact: <b>{contact.name}</b> ?
        </p>
        <div className={css.btnWrap}>
          <button
            onClick={handleDelete}
            className={css.deleteBtn}
            type="button"
            aria-label="delete button"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className={css.cancelBtn}
            type="button"
            aria-label="cancel button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContactModal;
