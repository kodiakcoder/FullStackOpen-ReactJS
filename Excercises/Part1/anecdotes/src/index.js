import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {

  const [selected, setSelected] = useState(0)
  const max = props.anecdotes.length-1
  const [vote, setVote] = useState(Array(max+1).fill(0))


  const logVotes=() =>{

      const arrayCopy = [...vote]
      arrayCopy[selected] +=1
      console.log(arrayCopy);
      setVote(arrayCopy)
  }


const generateAnecdote = () =>{
  const random = Math.floor( Math.random() * ( 1 + max ) )
  setSelected(random)
}


  const mostVoted = (vote.indexOf(Math.max(...vote)))


  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
    <br></br>
      <button onClick={logVotes}>Vote</button>
      <button onClick={generateAnecdote}>next anecdote</button>
      <p>{vote}</p>

    <h2>Array with most Votes</h2>
     <p>{props.anecdotes[mostVoted]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
