import React, { Component } from 'react'
import { Notify } from 'notiflix';
import css from './ContactForm.module.css'

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { name, number } = this.state;
    const { handleAddProfile } = this.props;

    if (this.props.contacts.find(e => e.name === name)) {
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

    const formData = {
      name,
      number: Number(number),
    };

    handleAddProfile(formData);
    this.setState({ name: '', number: '' });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleFormSubmit}>
        <label className={css.formLabel} htmlFor="name">
          <span>Name:</span>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
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
            value={this.state.number}
            onChange={this.handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add Profile</button>
      </form>
    );
  }
}

export { ContactForm };