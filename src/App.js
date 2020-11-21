import {useState} from 'react'
import './assets/css/style.css'

function App() {
  const [weather, setWeather] = useState('')
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  const api = {
    key: '5351a50743107f93d5a66dba61e77e85',
    url : 'api.openweathermap.org/data/2.5/weather'
  }

  /**
   * Accepts a date object and returns the current date
   * @param {Object} d Date object
   */
  const dateBuilder = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  const submit = event => {
    if (event.key === 'Enter' && event.target.value !== '') {
      fetch(`http://${api.url}?q=${query}&units=metric&appid=${api.key}`)
      .then(response => response.json())
      .then(result => {

        // If city exists...
        if (result.cod !== '404') {
          setWeather(result)
          setQuery('')
          setError('')

        // Else if the city does not exist...
        } else {
          setError(result.message)
          setQuery('')
          setWeather('')
        }
      })
    }
  }

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={submit}
            className="search-bar"
            placeholder="Search a city..."
          />
        </div>

        {weather && (
          <div className="flex-container">
            <div className="info-box">

              {/* Location */}
              <div className="location-box">
                <h1 className="location">{`${weather.name}, ${weather.sys.country}`}</h1>
                <p className="date">{dateBuilder(new Date())}</p>
              </div>

              {/* Temperature */}
              <div className="temperature-box">
                <h2 className="temp">{weather && `${Math.round(weather.main.temp)}°C`}</h2>
                <small>{weather && `Feels like ${Math.round(weather.main.feels_like)}°C`}</small>
              </div>

              {/* Weather */}
              <div className="weather-box">
                <h2 className="weather">{weather.weather[0].main}</h2>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex-container">
            <h1>{error}</h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
