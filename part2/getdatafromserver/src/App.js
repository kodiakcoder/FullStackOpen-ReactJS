
import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'
import './index.css'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle : 'italic',
    textAlign: 'center',
    fontSize : 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note App, Computer Science department, University of Helsinki</em>
      <br />
      <em> Made by M.Karim</em>
    </div>
  )
}


const Notification = ({message}) => {
  if(message === null)
  {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {

  const [notes,setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll,setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

const hook = () => {
      console.log('effect')
      noteService.getAll()
      .then(initialNotes =>{
      setNotes(initialNotes)
      })
    }
 useEffect(hook, [])
  //console.log('render',notes.length, 'notes')



  const notesToShow = showAll
    ? notes
    : notes.filter(note=> note.important === true)


    const toggleImportanceOf = id => {
      //console.log('importance of ' + id + ' needs to be toggled')
      const note = notes.find(n=> n.id === id)
      const changedNote = {...note, important: !note.important}

      noteService.update(id, changedNote)
      .then(returnedNote =>{
        setNotes(notes.map(note => note.id !== id ? note:returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}'was already removed from server`
        )
        setTimeout(() =>
      {
        setErrorMessage(null)
      },5000)
      setNotes(notes.filter (n => n.id !== id))
      })

    }

  const rows = () =>  notesToShow.map(note =>
    <Note
      key ={note.id}
      note = {note}
      toggleImportance = {()=>toggleImportanceOf(note.id)}
      />
  )


  const addNote = (event)=>{
    event.preventDefault()
    const noteObject = {
      content:newNote,
      date: new Date().toISOString(),
      important:Math.random() > 0.5,
      id:notes.length + 1,
    }
    noteService.create(noteObject)
    .then(returnedNote=>{
      //console.log(response)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })

  }


  const handleNoteChange = (event) =>{
    console.log(event.target.value)
    setNewNote(event.target.value)

  }

  return (
    <div>
        <h1> Part 2</h1>
        <h2>Notes</h2>
        <Notification message = {errorMessage}/>
        <div>
          <button onClick={()=>setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>

        </div>
        <ul>{rows()}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit">Save</button>


        </form>
        <Footer />
    </div>
  )
}




export default App
