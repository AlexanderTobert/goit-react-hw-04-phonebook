import React, { useState } from 'react';
import { Notify } from 'notiflix';
import css from './ContactForm.module.css';

const ContactForm = ({ handleAddProfile, contacts }) => {
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleFormSubmit = event => {
    event.preventDefault();

    const { name, number } = formData;

    if (contacts.find(e => e.name === name)) {
      Notify.warning(`${name} уже есть в контактах`);
      return;
    }

    if (isNaN(number)) {
      Notify.failure('Пожалуйста, введите корректный номер.');
      return;
    }

    if (/\d/.test(name)) {
      Notify.failure('Имя не должно содержать цифры.');
      return;
    }

    const formattedData = {
      name,
      number: Number(number),
    };

    handleAddProfile(formattedData);
    setFormData({ name: '', number: '' });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      <label className={css.formLabel} htmlFor="name">
        <span>Name:</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.formLabel} htmlFor="number">
        <span>Number:</span>
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add Profile</button>
    </form>
  );
};

export { ContactForm };