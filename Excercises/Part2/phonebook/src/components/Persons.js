import React, { useState } from 'react'
import personService from '../services/contacts'


const Persons = ({getFilterString, getPersons,removePerson}) =>{




  const showContacts = () =>{
    if(getFilterString === '')
    {
    return getPersons.map(thisContact =>
        <tr key={thisContact.name}><td> {thisContact.name}</td><td> {thisContact.number}
          <button onClick={()=>removePerson(thisContact.id)}>
        Remove</button></td>
      </tr>)
    }

    const result = getPersons.filter(person => {
    return person.name.toLowerCase().includes(getFilterString.toLowerCase())
    }
    )
    console.log(result)
    return result.map(thisContact =>
        <tr key={thisContact.name}><td>{thisContact.name}</td><td> {thisContact.number}
        </td>
      </tr>)
  }




  return <table>
    <tbody>
  {showContacts()}
    </tbody>
  </table>
}




export default Persons
