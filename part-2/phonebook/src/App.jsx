import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService
      .getAllContacts()
      .then(initialContacts => setPersons(initialContacts)
    )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (hasName(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .createContact(personObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
  }

  const hasName = (name) => {
    return persons.some (person => person.name.toLowerCase() === name.toLowerCase())
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const targetContact = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${targetContact.name}`)) {
      personService.deleteContact(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleNameFilterChange} value={nameFilter}/>

      <h3>Add a new</h3>
      <PersonForm onFormSubmit={addPerson} name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} onDelete={handleDelete}/>
    </div>
  )
}

const Filter = ({ onChange, value }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({
  onFormSubmit,
  name,
  number,
  onNameChange,
  onNumberChange
  }) => {
    return (
      <form onSubmit={onFormSubmit}>
        <div>
          name: <input value={name} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = ({filteredPersons, onDelete}) => {
  return (
    <ul>
      {
        filteredPersons.map(person => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            onDelete={() => onDelete(person.id)}
          />
        ))
      }
    </ul>
  )
}

const Person = ({ name, number, onDelete }) => {
  return (
    <li>
      {name}: {number} {" "}
      <button onClick={onDelete}>Delete</button>
    </li>
  )
}

export default App
