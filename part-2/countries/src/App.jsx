import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const countryRequest = axios.get(
      'https://studies.cs.helsinki.fi/restcountries/api/all'
    )
    countryRequest.then((response) => setCountries(response.data))
  }, [])

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  )

  const country = filteredCountries[0]

  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div>
      <div>
        Find countries{' '}
        <input
          type="text"
          placeholder="Search countries..."
          onChange={handleQueryChange}
        />
        {!searchQuery?.trim() ? (
          <p>No search results displayed!</p>
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches specify another filter</p>
        ) : filteredCountries.length === 0 ? (
          <p>No country matched your query, check your spellings.</p>
        ) : filteredCountries.length === 1 ? (
          <CountryDetails
            name={country.name.common}
            capital={country.capital}
            area={country.area}
            languages={country.languages}
            flags={country.flags}
          />
        ) : (
          <ul>
            {filteredCountries.map((country) => (
              <CountryListItem key={country.cca3} country={country}/>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const CountryListItem = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      <div style={{ display: 'inline-block' }}>
        {country.name.common}
      </div>{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails === true ? "Hide" : "Show"}
      </button>
      {
        showDetails === true &&
        <CountryDetails
          name={country.name.common}
          capital={country.capital}
          area={country.area}
          languages={country.languages}
          flags={country.flags}
        />
      }
    </li>
  )
}

const CountryDetails = ({ name, capital, area, languages, flags }) => {
  const languageList = languages ? Object.values(languages) : []

  return (
    <div>
      <h1>{name}</h1>
      <p>
        <strong>Capital:</strong> {capital}
      </p>
      <p>
        <strong>Area:</strong> {area} km²
      </p>

      <h2>Languages</h2>
      <ul>
        {languageList.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={flags.png} alt={flags.alt} width="150" />
    </div>
  )
}

export default App
