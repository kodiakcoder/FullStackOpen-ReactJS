import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) =>{
  console.log(props)
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )

}

const Part = (props) => {
  return (
    <div>
    <p>{props.part}</p>
    <p>{props.excercise}</p>
    </div>
)
}

const Content = (props)=>{
  return(
    <div>
      <Part part={props.part[0]} excercise={props.excercise[0]}/>
      <Part part={props.part[1]} excercise={props.excercise[1]}/>
      <Part part={props.part[2]} excercise={props.excercise[2]}/>
    </div>
  )
}

const Total = (props) =>{
  return (
    <div>
      <p>number of excercises {props.excercise1 + props.excercise2 + props.excercise3}</p>
    </div>
  )
}

const App = () =>{
  const course ={name :'Half Stack application development',
  parts : [{name: 'Fundemantels of react',
   excercises: 10
},
{name:'Using props to pass data',
  excercises : 7
},
{name : 'State of a component',
   excercises : 14}]}



  return(
    <div>
      <Header course={course.name}/>
      <Content part={[course.parts[0].name,course.parts[1].name,course.parts[2].name]}
        excercise={[course.parts[0].excercises,course.parts[1].excercises,course.parts[2].excercises]}/>

      <Total excercise1={course.parts[0].excercises} excercise2={course.parts[1].excercises}
         excercise3={course.parts[2].excercises}/>
    </div>

  )
}


ReactDOM.render(<App />, document.getElementById('root'));
