import PropTypes from 'prop-types';
import initialState from './initialState';
import useForm from 'components/shared/hooks/useForm';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  // кастомний хук
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });
  const { name, number } = state;
  return (
    <div className={css.wrapper}>
      <div className={css.contactFormBlock}>
        <form className="" onSubmit={handleSubmit}>
          <div className={css.conactFormGroup}>
            <label className={css.label}>Name</label>
            <input
              className={css.input}
              // зв'язок інпуту і state
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>
          <div className={css.conactFormGroup}>
            <label className={css.label}>Number</label>
            <input
              className={css.input}
              // зв'язок інпуту і state
              value={number}
              onChange={handleChange}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
          <button className={css.btnAddContact} type="submit">
            Add contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
