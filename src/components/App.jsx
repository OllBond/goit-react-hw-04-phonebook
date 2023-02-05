import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import css from './ContactForm/ContactForm.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    //   // якщо contacts null - повертаємо []
    //   // якщо contact пустий масив або повний - повертємо contacts
    return contacts ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    // ця ф-я спрацьовує вдруге, коли в масив додається щось або видаляється
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    // щоб знайти елемент в масиві
    // якщо знайщеться в contact буде об'єкт
    // якщо не здайде - undefind
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    // треба повернути або true або false
    // булеве значення об'єкта - true
    // булеве значення undefind - false
    return Boolean(result);
  };
  const addContact = ({ name, number }) => {
    if (isDublicate({ name, number })) {
      alert(`${name}: ${number} is already in contacts`);
      return false;
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
    return true;
  };
  const removeContact = id => {
    setContacts(prevContacts =>
      // фільтруємо попередні контакти, повертається новий масив з контактами
      // крім того, що треба виділити
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    // якщо фільтр пустий - повертати масив контактів не фільтрувати
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        // якщо у name є ці кілька літер - вертає true
        name.toLowerCase().includes(normalizedFilter) ||
        // або якщо у number є ці кілька цифр - вертає true
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return result;
  };
  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);
  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter handleInputChange={handleFilter} value={filter} />
      {isContacts && (
        <ContactList
          contacts={filteredContacts}
          removeContact={removeContact}
        />
      )}
      {!isContacts && <p>No contacts in list</p>}
    </div>
  );
};
