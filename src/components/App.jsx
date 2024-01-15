import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { Notify } from 'notiflix';
import css from './maim.module.css';

const App = () => {

  const [filter, setFilter] = useState('');

  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const storedContacts = JSON.parse(stringifiedContacts) || [];
    return storedContacts;
  });

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const handleAddProfile = formData => {
    const hasDuplicates = contacts.some(
      profile => profile.name === formData.name
    );

    if (hasDuplicates) {
      Notify.alert(`Profile with name ${formData.name} already exists!`);
      return;
    }

    const finalProfile = {
      ...formData,
      id: nanoid(),
    };

    setContacts(prevContacts => [...prevContacts, finalProfile]);
  };

  const handleChangeFilter = event => {
    const value = event.target.value;
    setFilter(value);
  };

  const handleContactDelete = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  return (
    <section className={css.sectionItem}>
      <h2 style={{ fontSize: '2em', fontWeight: 700, marginBottom: '10px' }}>Phone number</h2>
      <ContactForm
        handleAddProfile={handleAddProfile}
        contacts={contacts}
      />

      <h2 style={{ fontSize: '2em', fontWeight: 700, marginBottom: '10px' }}>Contacts</h2>

      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
      <ContactList state={{ contacts, filter }} handleContactDelete={handleContactDelete} />
    </section>
  );
};

export default App;