import React, { Component } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { Notify } from 'notiflix';
import css from './maim.module.css'
class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.elements.number.value;

    if (this.state.contacts.find(e => e.name === name)) {
      Notify.warning(`${name} is already in contacts`);
      return;
    }

    if (isNaN(number)) {
      Notify.failure('Please enter a valid number.');
      return;
    }

    if (/\d/.test(name)) {
      Notify.failure('Name should not contain numbers.');
      return;
    }

    const formData = {
      name,
      number: Number(number),
      id: nanoid()
    };

    this.handleAddProfile(formData);
    event.currentTarget.reset();
  };

  handleAddProfile = formData => {
    const hasDuplicates = this.state.contacts.some(
      profile => profile.name === formData.name
    );
    if (hasDuplicates) {
      alert(`Profile with name ${formData.name} already exists!`);
      return;
    }


    const finalProfile = {
      ...formData,
    };

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, finalProfile],
      };
    });
  };

  handleChangeFilter = event => {
    const value = event.target.value;
    this.setState({ filter: value });
  };

  handleContactDelete = id => {
    this.setState(({ contacts: prevContacts }) => ({
      contacts: prevContacts.filter(contact => contact.id !== id),
    }));
  };

  handleInputChange = (event) => {
  const { name, value } = event.target;

  this.setState({
      [name]: value,
  });
};

  render() {
    return (
      <section className={css.sectionItem}>
        <h2 style={{fontSize: '2em', fontWeight: 700,
    marginBottom: '10px',}}>Phone number</h2>
        <ContactForm
          handleSubmit={this.handleFormSubmit}
          formData={{ name: this.state.name, number: this.state.number }}
          handleInputChange={this.handleInputChange}
        />

        <h2 style={{fontSize: '2em', fontWeight: 700,
    marginBottom: '10px',}}>Contacts</h2>

        <Filter handleChangeFilter={this.handleChangeFilter}/>
        <ContactList state={this.state} handleContactDelete={this.handleContactDelete} />
      </section>
    );
  }
}

export default App;