import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    const countryRequest = axios.get(
      'https://studies.cs.helsinki.fi/restcountries/api/all'
    )
    countryRequest.then((response) => setCountries(response.data))
  }, [])

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const country = filteredCountries[0]

  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
    setSelectedCountry(null)
  }

  const handleSelectedCountry = (targetedCountry) => {
    setSelectedCountry(targetedCountry)
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
        {selectedCountry ? (
          <CountryDetails
            name={selectedCountry.name.common}
            capital={selectedCountry.capital}
            area={selectedCountry.area}
            languages={selectedCountry.languages}
            flags={selectedCountry.flags}
          />
        ) : !searchQuery?.trim() ? (
          <p>Your search results will be displayed here.</p>
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
              <CountryListItem
                key={country.cca3}
                country={country}
                onShowClick={() => handleSelectedCountry(country)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const CountryListItem = ({ country, onShowClick }) => {
  return (
    <li>
      <div style={{ display: 'inline-block' }}>{country.name.common}</div>{' '}
      <button onClick={onShowClick}>Show</button>
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
