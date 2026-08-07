import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data)
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

    axios
      .post("http://localhost:3001/persons", personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleNameFilterChange} value={nameFilter}/>

      <h3>Add a new</h3>
      <PersonForm onFormSubmit={addPerson} name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons nameFilter={nameFilter} filteredPersons={filteredPersons} persons={persons} />
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

const Persons = ({ nameFilter, filteredPersons, persons }) => {
  return (
    <ul>
      {
        nameFilter.length > 0 ?
        (
          filteredPersons.map(person => <li key={person.id}>{person.name}: {person.number}</li>)
        ):(
          persons.map(person => <li key={person.id}>{person.name}: {person.number}</li>)
        )
      }
    </ul>
  )
}

export default App
