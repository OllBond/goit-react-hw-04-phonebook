import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import css from './ContactList.module.css';

const ContactList = ({ contacts, removeContact }) => {
  return (
    <ul className={css.listContact}>
      {
        // mapаємо відфільтровані контакти
        contacts.map(({ id, name, number }) => {
          return (
            <ContactItem
              id={id}
              key={id}
              name={name}
              number={number}
              removeContact={removeContact}
            />
          );
        })
      }
    </ul>
  );
};

export default ContactList;

// якщо є пустий масив - писати завжди  defaultProps
ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
