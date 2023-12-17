import React from 'react'
import css from './ContactForm.module.css'

const ContactForm = ({ handleSubmit, formData, handleInputChange }) => {
    return (
        <form className={css.form} onSubmit={handleSubmit}>
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
            <label className={css.formLabel} htmlFor="">
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


export { ContactForm }