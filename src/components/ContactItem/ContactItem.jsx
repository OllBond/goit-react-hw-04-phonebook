import PropTypes from 'prop-types';
import css from '../ContactItem/ContactItem.module.css';
const ContactItem = ({ id, name, number, removeContact }) => {
  return (
    <li className={css.listItems}>
      {name}: {number}
      <button
        className={css.btnDeleteContact}
        // анонімна функція де передаємо id контакту, щоб знати,
        // який контакт видаляти
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};
export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  removeContact: PropTypes.func.isRequired,
};
