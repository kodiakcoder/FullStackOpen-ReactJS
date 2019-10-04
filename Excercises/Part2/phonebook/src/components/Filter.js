import React, { useState } from 'react'


const Filter =({getFilter,getHandlerFilterChange}) =>{

  return <div>
    filter shown with <input value={getFilter} onChange={getHandlerFilterChange}/>
  </div>
}








export default Filter
