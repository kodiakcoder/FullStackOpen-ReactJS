import React, { useState,useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/contacts'
import './index.css'

const Notification = ({message,elementStyle}) => {


  if(message === null)
  {
    return null
  }

  return (
    <div style={elementStyle} >
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')
  const [notificationMessage,setNotificationMessage] = useState(null)
  const [elementColor, setElementColor] = useState({})

  const removeContact = (id) =>{

    console.log('Remove contact function')
    console.log(id)
    const deleteMessageStyle = {
      color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
    }
    const successMessageStyle = {
      color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
    }

    const personDetails = persons.find(person => person.id === id)

    if (window.confirm(`Do you really want to delete ${id}?`)) {

        personService.deletePerson(id)
        .then(()=>{
          setElementColor(deleteMessageStyle)
          setNotificationMessage(`deleted ${personDetails.name}`)
          setTimeout(() =>
        {
          setNotificationMessage(null)
          setElementColor(null)
        },5000)

        personService.getAllPersons().then(initialPersons =>{
        setPersons(initialPersons)
        })
        })
        .catch(error =>{
          setElementColor(deleteMessageStyle)
          setNotificationMessage(`Contact '${personDetails.name}' was already removed from server'`)
          setTimeout(()=> {
            setNotificationMessage(null)
            setElementColor(null)
          })


        })

      }

}

  const hook = () => {
        console.log('effect')
        personService.getAllPersons()
        .then(initialPersons =>{
        setPersons(initialPersons)
        })


      }

  useEffect(hook, [])
  console.log('render',persons.length, 'perons')



  const addName = (event)=>{
    event.preventDefault()
    console.log("Clicking Submit")
    const successMessageStyle = {
      color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
    }
    const deleteMessageStyle = {
      color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
    }

    if(persons.find(person => person.name === newName))
    {
      window.confirm(`${newName} already exists in Phonebook, replace old number with new one?`)
      {
          const personDetails = (persons.find(person => person.name === newName))
          const changedPerson = {...personDetails,number:newNumber}

          personService.updatePerson(personDetails.id,changedPerson)
          .then(returnPerson =>{
            setPersons(persons.map(person => person.id !== personDetails.id ? person:returnPerson))
          })
          setElementColor(successMessageStyle)
          setNotificationMessage(`Updated ${newName}`)
          setTimeout(() =>
        {
          setNotificationMessage(null)
          setElementColor(null)
        },5000)
      }
      return
    }
    const contactObject = {
      name: newName,
      id:newName,
      number:newNumber
    }
    //setPersons(persons.concat(contactObject))

    personService.addPerson(contactObject)
    .then(returnedPerson=>{
      //console.log(response)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setElementColor(successMessageStyle)
    setNotificationMessage(`Added ${newName}`)
    setTimeout(() =>
  {
    setNotificationMessage(null)
    setElementColor(null)
  },5000)
    })
    .catch(error =>{
      setElementColor(deleteMessageStyle)
      console.log(error.response.data.error)
      //const $caughtError = error.response.data
      const $errorMessage = error.response.data.error
      setNotificationMessage($errorMessage)
      setTimeout(()=> 
      {
        setNotificationMessage(null)
        setElementColor(null)
      },5000)


    })
    
  }

  const handleFilterChange = (event)=>{
    setNewFilter(event.target.value)
  }
  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }


  const handlePhonebookChange=(event)=>{
    //console.log(event.target.value)
    setNewName(event.target.value)
  }





  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} elementStyle={elementColor}/>
      <Filter getFilter={newFilter} getHandlerFilterChange={handleFilterChange} />
      <h3>Add New Contact</h3>
      <PersonForm getSubmit={addName} getName={newName} getHandlerPhonebookChange={handlePhonebookChange}
         getNumber={newNumber} GethandlerNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <div>

        <Persons getFilterString={newFilter}  getPersons={persons} removePerson={removeContact}/>
      </div>
    </div>
  )
}

export default App
