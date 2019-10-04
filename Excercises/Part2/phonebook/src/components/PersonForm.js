import React, { useState } from 'react'



const PersonForm = ({getSubmit,getName,getHandlerPhonebookChange,getNumber,GethandlerNumberChange}) => {

  return <form onSubmit={getSubmit}>
    <div>
      name: <input value={getName} onChange={getHandlerPhonebookChange}/><br></br>
    number: <input  value={getNumber} onChange={GethandlerNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}









export default PersonForm
