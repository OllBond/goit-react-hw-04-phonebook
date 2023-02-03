import { Component } from 'react';
import PropTypes from 'prop-types';
import initialState from './initialState';
import css from './ContactForm.module.css';
export class ContactForm extends Component {
  state = {
    ...initialState,
  };
  // метод, який оновить state
  // функція збирає дані з кожного input
  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    // onSubmit кладе state в корзинку, віддає наверх
    const result = onSubmit({ ...this.state });
    if (result) {
      // обнуляє
      this.reset();
    }
  };
  reset() {
    // обнуляє name і number
    this.setState({
      ...initialState,
    });
  }
  render() {
    const { handleInputChange, handleSubmit } = this;
    const { name, number } = this.state;
    return (
      <div className={css.wrapper}>
        <div className={css.contactFormBlock}>
          <form className="" onSubmit={handleSubmit}>
            <div className={css.conactFormGroup}>
              <label className={css.label} htmlFor={this.nameInputId}>
                Name
              </label>
              <input
                className={css.input}
                // зв'язок інпуту і state
                value={name}
                onChange={handleInputChange}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                id={this.nameInputId}
              />
            </div>
            <div className={css.conactFormGroup}>
              <label className={css.label} htmlFor={this.numberInputId}>
                Number
              </label>
              <input
                className={css.input}
                // зв'язок інпуту і state
                value={number}
                onChange={handleInputChange}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                id={this.numberInputId}
              />
            </div>
            <button className={css.btnAddContact} type="submit">
              Add contact
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
