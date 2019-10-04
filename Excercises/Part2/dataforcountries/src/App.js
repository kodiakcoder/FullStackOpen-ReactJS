import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const ShowCountryData = ({thisCountry}) => {
    const [weather,setWeather] = useState([])

    const thisCountryName = thisCountry[0].name
    const thisCountryCapital = thisCountry[0].capital
    const thisCountryPopulation = thisCountry[0].population
    const thisCountryLanguages = thisCountry[0].languages
    const thisCountryFlag = thisCountry[0].flag
    //console.log(thisCountryLanguages)

    const getLanguages = () => {
      return thisCountryLanguages.map(thisLanguage =>
          <li key={thisLanguage.name}>{thisLanguage.name}</li>
        )
    }

    const getWeather = () => {
          console.log('effect Weather')
          const api = 'http://api.apixu.com/v1/current.json?key=e90758a3ef8f42f4807212223191108&q='
          const apiLink = api.concat(thisCountryCapital)
          console.log(apiLink)
          axios.get(apiLink)
          .then(response =>{
            console.log('Weather promise fulfilled')
            //console.log(response.data)
            setWeather(response.data.current)
            //setNotes(response.data)
          })
        }

    useEffect(getWeather, [])
    console.log(weather)
    const currentTemperature = weather.feelslike_c
    const windDirection =weather.wind_dir
    const windSpeed = weather.wind_kph
    return <div>
    <h1>{thisCountryName}</h1>
    <p>Capital: {thisCountryCapital}</p>
    <p>Population: {thisCountryPopulation}</p>
    <h2>Languages</h2>
    <ul>
        {getLanguages()}
    </ul>
    <img src={thisCountryFlag} width='100'/>

    <h2>Weather in {thisCountryCapital}</h2>
    <h3>Temperature </h3>
    <p>{currentTemperature} Celsius</p>
    <h3>Wind</h3>
    <p>{windSpeed} kph Direction {windDirection}</p>

    </div>
}

const App = () =>{
  const [countryFilter,setCountryFilter] = useState('')
  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState('')
  const hook = () => {
        console.log('effect')
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response =>{
          console.log('promise fulfilled')
          //console.log(response.data[0].name)
          setCountries(response.data)
          //setNotes(response.data)
        })
      }

  useEffect(hook, [])
 //console.log(countries)
  const filterHandleChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const showCountryDetails = (countryName)=>{
    //event.preventDefault()
    console.log(countryName)
    setCountryFilter(countryName)
  }


  const getCountryNames = () => {
    if(countryFilter !== '') {
      const result = countries.filter(country => {
      return country.name.toLowerCase().includes(countryFilter.toLowerCase())
      }
      )
      if(result.length === 1)
      {
          return <ShowCountryData thisCountry={result} />
      }
      if(result.length < 10 &&  result.length > 1){
        return result.map(thisCountry =>
            <p key={thisCountry.name}> {thisCountry.name} <button onClick={() => showCountryDetails(thisCountry.name)}>Show </button> </p>
          )

      }
      if(result.length > 10)
      {
        return <p>Search too broad, specify another filter</p>
      }
  }
}

  return  <div>
    <p>find countries <input value={countryFilter} onChange={filterHandleChange}></input></p>
    <div>
        {getCountryNames()}
      </div>

  </div>


}











export default App
