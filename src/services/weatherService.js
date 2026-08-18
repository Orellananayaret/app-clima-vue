import axios from 'axios'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export const getWeather = async (city, apiKey) => {
  const response = await axios.get(API_URL, {
    params: {
      q: city,
      appid: apiKey,
      units: 'metric',
      lang: 'es'
    }
  })

  return response.data
}
