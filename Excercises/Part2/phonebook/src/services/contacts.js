import axios from 'axios'

const baseUrl= '/api/persons/'


const getAllPersons = () =>{
  const request = axios.get(baseUrl)
    console.log('Getting All persons request')
  return request.then(response => response.data)
}

const addPerson = personObject => {
    console.log('Adding person')
    const request = axios.post(baseUrl,personObject)
    console.log("persons request: ",request)
    return request.then(response => response.data)
}


const updatePerson = (id, personObject) =>
{
  const request = axios.put(`${baseUrl}/${id}`,personObject)
  return request.then(response =>response.data)
}


const deletePerson = (id)=>
{
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default{
  getAllPersons: getAllPersons,
  addPerson: addPerson,
  updatePerson: updatePerson,
  deletePerson:deletePerson
}
