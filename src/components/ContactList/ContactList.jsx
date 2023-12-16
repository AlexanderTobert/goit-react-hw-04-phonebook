import React from 'react'
import { Contact } from '../Contact/Contact'
import css from './ContactList.module.css'

const ContactList = ({ state: { contacts, filter }, handleContactDelete}) => {

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    const contactsForRender = !filter ? contacts : filteredContacts;

    return (
    <ul className={css.item}>
        {contactsForRender.map(({ id, name, number }) => (
            <Contact
                key={id}
                id={id}
                name={name}
                number={number}
                handleContactDelete={ handleContactDelete}
            />
        ))}
    </ul>
    );
};

export {ContactList}