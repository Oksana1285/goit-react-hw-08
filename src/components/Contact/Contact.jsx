import { BsPerson } from 'react-icons/bs';
import { MdPhoneInTalk } from 'react-icons/md';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { LiaUserEditSolid } from 'react-icons/lia';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import { useDispatch } from 'react-redux';
import EditContactModal from '../EditContactModal/EditContactModal';
import DeleteContactModal from '../DeleteContactModal/DeleteContactModal';
import { useEffect, useRef, useState } from 'react';

import css from './Contact.module.css';

const Contact = ({ contact }) => {
  const bodyRef = useRef(document.body);
  const dispatch = useDispatch();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const body = bodyRef.current;
    editModalOpen || deleteModalOpen
      ? body.classList.add('disable-scroll')
      : body.classList.remove('disable-scroll');

    return () => {
      body.classList.remove('disable-scroll');
    };
  }, [editModalOpen, deleteModalOpen]);

  const handleDelete = () => {
    handleCloseDeleteModal();
    dispatch(deleteContact(contact.id));
  };

  const handleUpdateContact = modifiContact => {
    handleCloseEditModal();
    dispatch(updateContact(modifiContact));
  };

  const handleOpenEditModal = () => setEditModalOpen(true);

  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleOpenDeleteModal = () => setDeleteModalOpen(true);

  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  return (
    <>
      <li className={css.contactContainer}>
        <div className={css.contactWrap}>
          <div className={css.contactContext}>
            <BsPerson className={css.iconContact} size="22" />
            {contact.name}
          </div>
          <div className={css.contactNumber}>
            <MdPhoneInTalk />
            <a href={`tel: ` + contact.number}>{contact.number}</a>
          </div>
        </div>
        <div className={css.btnWrap}>
          <button
            onClick={handleOpenEditModal}
            type="button"
            aria-label="edit button"
          >
            <LiaUserEditSolid color="#5c9beb" />
          </button>
          <button
            onClick={handleOpenDeleteModal}
            type="button"
            aria-label="delete button"
          >
            <AiOutlineUserDelete color="tomato" />
          </button>
        </div>
      </li>

      {editModalOpen && (
        <EditContactModal
          handleCloseModal={handleCloseEditModal}
          handleUpdateContact={handleUpdateContact}
          id={contact.id}
        />
      )}
      {deleteModalOpen && (
        <DeleteContactModal
          contact={contact}
          handleDelete={handleDelete}
          handleCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};

export default Contact;
