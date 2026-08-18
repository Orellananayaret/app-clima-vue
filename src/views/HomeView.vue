<script>
import WeatherCard from '@/components/WeatherCard.vue'
import { lugares } from '@/data/weatherData.js'
import { getWeather } from '@/services/weatherService.js'

export default {
  name: 'HomeView',

  components: {
    WeatherCard,
  },

  data() {
    return {
      lugares,
      busqueda: '',
      unidad: 'C',
      climaApi: null,
      cargando: false,
      error: '',
    }
  },

  computed: {
    lugaresFiltrados() {
      const textoBuscado = this.busqueda.trim().toLowerCase()

      if (textoBuscado === '') {
        return this.lugares
      }

      return this.lugares.filter((lugar) => {
        return (
          lugar.nombre.toLowerCase().includes(textoBuscado) ||
          lugar.region.toLowerCase().includes(textoBuscado)
        )
      })
    },

    climaActual() {
      if (!this.climaApi) {
        return null
      }

      return {
        id: this.climaApi.id,
        nombre: this.climaApi.name,
        region: this.climaApi.sys.country,
        temperatura: this.climaApi.main.temp,
        condicion: this.climaApi.weather[0].description,
        icono: this.climaApi.weather[0].icon,
        humedad: this.climaApi.main.humidity,
        viento: this.climaApi.wind.speed * 3.6,
      }
    },
  },

  methods: {
    async buscarLugar() {
      if (!this.busqueda) {
        return
      }

      this.cargando = true
      this.error = ''
      this.climaApi = null

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY

        this.climaApi = await getWeather(this.busqueda, apiKey)

        console.log('Clima recibido:', JSON.parse(JSON.stringify(this.climaApi)))
      } catch (error) {
        console.error('Error al obtener el clima:', error)
        this.error = 'No se pudo encontrar esa ciudad.'
      } finally {
        this.cargando = false
      }
    },

    limpiarBusqueda() {
      this.busqueda = ''
    },
  },
}
</script>

<template>
  <main class="home">
    <section class="hero">
      <p class="hero__eyebrow">Pronóstico nacional</p>

      <h1>Descubre el clima de Chile</h1>

      <p class="hero__description">
        Revisa la temperatura actual, el pronóstico semanal y las estadísticas de diferentes
        ciudades.
      </p>
    </section>

    <section class="controls">
      <form class="search-form" @submit.prevent="buscarLugar">
        <label for="busqueda">Buscar una ciudad</label>

        <div class="search-form__group">
          <input
            id="busqueda"
            v-model.trim="busqueda"
            type="search"
            placeholder="Ejemplo: Santiago"
          />

          <button type="submit">Buscar</button>

          <button v-show="busqueda" type="button" class="button-secondary" @click="limpiarBusqueda">
            Limpiar
          </button>
        </div>
      </form>

      <div class="unit-selector">
        <p>Unidad de temperatura</p>

        <label>
          <input v-model="unidad" type="radio" value="C" />
          Celsius °C
        </label>

        <label>
          <input v-model="unidad" type="radio" value="F" />
          Fahrenheit °F
        </label>
      </div>
    </section>

    <section class="places-section">
      <div class="places-section__header">
        <div>
          <p class="section-eyebrow">Ciudades disponibles</p>
          <h2>Clima actual</h2>
        </div>

        <p>
          {{ lugaresFiltrados.length }}
          {{ lugaresFiltrados.length === 1 ? 'resultado' : 'resultados' }}
        </p>
      </div>

      <div v-if="climaActual" class="weather-grid">
        <WeatherCard :lugar="climaActual" :unidad="unidad" />
      </div>

      <div v-else class="empty-state">
        <span>🔍</span>
        <h3>No se encontró el lugar</h3>

        <p>Intenta buscar otra ciudad o limpia el campo de búsqueda.</p>

        <button @click="limpiarBusqueda">Mostrar todos los lugares</button>
      </div>
    </section>
  </main>
</template>
