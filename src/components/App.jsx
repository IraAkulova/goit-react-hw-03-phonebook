import React, { Component } from 'react';
import { ContactForm } from './form/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './list/ContactList';
import { nanoid } from 'nanoid';
import css from '../components/App.module.css'

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const contExist = this.state.contacts.find(contact =>
      contact.name.toLowerCase() === data.name.toLocaleLowerCase());
    
    data.id = nanoid();
    const newContacts = this.state.contacts;
    newContacts.push(data);

    return contExist
      ? alert(`${data.name} is already in contacts list!`)
      : this.setState({ contacts: newContacts });
  };

  filterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState)=>({contacts: prevState.contacts.filter(contact => contact.id !== contactId)}));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterChange} />
        <ContactList
          contacts={visibleContacts}
          id={this.state.id}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
};
