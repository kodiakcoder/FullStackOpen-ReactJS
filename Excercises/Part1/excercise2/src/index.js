import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {useState} from 'react'

const Stat = (props) =>{
  const thisText = props.text
  const thisValue = props.value
  return (
    <tr>
      <td>{thisText}</td>
      <td>{thisValue}</td>
    </tr>
  )
}

const Statistics = (props) =>{
  const goodFeedback = props.goodfeedback
  const neutralFeedback = props.neutralfeedback
  const badFeedback = props.badfeedback
  const totalFeedback = goodFeedback + neutralFeedback + badFeedback
  const averageScore = (goodFeedback * 1  + badFeedback * -1)/totalFeedback
  const positiveScore = (goodFeedback/totalFeedback)*100

  if(goodFeedback == 0 & badFeedback == 0 & neutralFeedback == 0 ){
    return(<div>
      <p>No feedback given</p>

    </div>)
  }

  return(
    <div>
    <h2>statistics</h2>
    <table>
    <Stat text='Good' value={goodFeedback} />
    <Stat text='Neutral'  value={neutralFeedback} />
    <Stat text='bad'  value={badFeedback} />
    <Stat text='all'  value={totalFeedback} />
    <Stat text='average'  value={averageScore} />
    <Stat text='positive'  value={positiveScore} />
    </table>
  </div>
  )
}

const Button =(props) => {
  return <button onClick={props.handleClick}> {props.text}</button>
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return(
  <div>

    <h1>give feedback</h1>

    <div>

      <Button handleClick={()=>setGood(good+1)} text='Good' />
      <Button handleClick={()=>setNeutral(neutral+1)} text='Neutral'/>
      <Button handleClick={()=>setBad(bad+1)} text='bad' />
    </div>

    <Statistics goodfeedback={good} neutralfeedback={neutral} badfeedback={bad} />


  </div>)
}




ReactDOM.render(<App />, document.getElementById('root'));
