import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {useState} from 'react'


const History = (props) =>{
  if(props.allClicks.length == 0) {
    return(
      <div>
      the app is used by pressing the buttons</div>
    )
  }

  return(
    <div>
    button press history: {props.allClicks.join(' ')}</div>
  )
}


const Button =({onClick,text}) =>(
  <button onClick={onClick}>
  {text}
</button>
)


const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return(
  <div>

    <h1>Greetings</h1>

    <div>

      <button onClick={()=>setGood(good+1)}>Good</button>
      <button onClick={()=>setNeutral(neutral+1)}>Neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>



    </div>



  </div>)
}




ReactDOM.render(<App />, document.getElementById('root'));
