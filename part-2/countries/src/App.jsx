import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const ow_api_key = import.meta.env.VITE_OPENWEATHER_API_KEY

  const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather'
  const countryEndpoint = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    const controller = new AbortController()

    axios
      .get(countryEndpoint, { signal: controller.signal })
      .then((response) => setCountries(response.data))
      .catch((e) => {
        if (!axios.isCancel(e)) {
          setError(`Failed to fetch country data: ${e.message}`)
        }
      })

    return () => controller.abort()
  }, [])

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const country = filteredCountries[0]

  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
    setSelectedCountry(null)
    setError(null)
  }

  const handleSelectedCountry = (targetedCountry) => {
    setSelectedCountry(targetedCountry)
    setError(null)
  }

  const activeCountry =
    selectedCountry ||
    (filteredCountries.length === 1 ? filteredCountries[0] : null)

  const capital = activeCountry?.capital?.[0]

  useEffect(() => {
    if (!capital) return

    const controller = new AbortController()

    axios
      .get(weatherEndpoint, {
        params: {
          q: capital,
          appid: ow_api_key,
          units: 'metric',
        },
        signal: controller.signal,
      })
      .then((response) => {
        setWeatherData({
          capital,
          data: response.data,
        })
      })
      .catch((e) => {
        if (!axios.isCancel(e)) {
          setError(`Failed to fetch weather data: ${e.message}`)
        }
      })

    return () => controller.abort()
  }, [capital, ow_api_key])

  const weather =
    weatherData && weatherData.capital === capital ? weatherData.data : null

  return (
    <div>
      <div>
        Find countries{' '}
        <input
          type="text"
          placeholder="Search countries..."
          value={searchQuery}
          onChange={handleQueryChange}
        />
        {error && (
          <div
            style={{
              color: 'red',
              margin: '10px 0',
              padding: '5px',
              backgroundColor: '#ffebee',
              borderRadius: '4px',
            }}
          >
            ⚠️ {error}
          </div>
        )}
        {selectedCountry ? (
          <CountryDetails
            country={selectedCountry}
            weather={weather}
            error={error}
          />
        ) : !searchQuery.trim() ? (
          <p>Your search results will be displayed here.</p>
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches specify another filter</p>
        ) : filteredCountries.length === 0 ? (
          <p>No country matched your query, check your spellings.</p>
        ) : filteredCountries.length === 1 ? (
          <CountryDetails country={country} weather={weather} error={error} />
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

const CountryListItem = ({ country, onShowClick }) => (
  <li>
    <div style={{ display: 'inline-block' }}>{country.name.common}</div>{' '}
    <button onClick={onShowClick}>Show</button>
  </li>
)

const CountryDetails = ({ country, weather, error }) => {
  const languageList = country.languages ? Object.values(country.languages) : []

  const capital = country.capital?.[0]

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>
        <strong>Capital:</strong> {capital || 'Not available'}
      </p>

      <p>
        <strong>Area:</strong> {country.area} km²
      </p>

      <h2>Languages</h2>
      <ul>
        {languageList.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={country.flags.alt || 'Country flag'}
        width="150"
      />

      <h2>Weather in {capital || 'the capital'}</h2>

      {!capital ? (
        <p>Capital information is unavailable.</p>
      ) : error ? null : weather ? (
        <div>
          <p>
            <strong>Temperature:</strong> {weather.main.temp} °C
          </p>

          <p>{weather.weather[0].description}</p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description || 'Weather condition'}
          />

          <p>
            <strong>Wind:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  )
}

export default App
