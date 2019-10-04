import React from 'react';


const GetSingleCourse = ({courseArray}) =>{
  return courseArray.map(singleCourse=>
    <Course course={singleCourse} key={singleCourse.id}/>
  )
}



const Course=({course}) =>{
const courseName = course.name
const courseParts = course.parts
const courseTotal = 0

const Header = (props) =>{
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )

}


const getRows=()=>courseParts.map(course =>
  <p key={course.id}>
    {course.name} {course.exercises}
  </p>

)

const getTotal=()=>{
  const total = courseParts.reduce( (s, p) => {
     return s + p.exercises
  },0)
  return total
}


return (
  <div>
    <Header course={courseName}/>
     {getRows()}
     <p>Total of {getTotal()} exercises</p>
  </div>
)

}


export default GetSingleCourse
