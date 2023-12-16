import React from 'react'
import css from './Contact.module.css'

const Contact = ({ id, name, number, handleContactDelete }) => {

    return (
        <li className={css.item} key={id}>
            <p>{name}: {number}</p>
            <button type="button" onClick={() => handleContactDelete(id)}>
                Delete
            </button>
        </li>
    );
};

export {Contact}