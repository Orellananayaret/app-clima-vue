<script>
import WeatherCard from '@/components/WeatherCard.vue'
import { getWeather } from '@/services/weatherService.js'

export default {
  name: 'HomeView',

  components: {
    WeatherCard,
  },

  data() {
    return {
      busqueda: '',
      unidad: 'C',
      climaApi: null,
      cargando: false,
      error: '',
      ciudadesIniciales: ['Santiago', 'Valparaíso', 'Concepción'],
      climasIniciales: [],
    }
  },

  async mounted() {
    await this.cargarCiudadesIniciales()
  },

  computed: {
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

    lugaresMostrar() {
      if (this.climaActual) {
        return [this.climaActual]
      }

      return this.climasIniciales
    },
  },

  methods: {
    async cargarCiudadesIniciales() {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY

      try {
        const resultados = await Promise.all(
          this.ciudadesIniciales.map((ciudad) => getWeather(ciudad, apiKey)),
        )

        this.climasIniciales = resultados.map((clima) => ({
          id: clima.id,
          nombre: clima.name,
          region: clima.sys.country,
          temperatura: clima.main.temp,
          condicion: clima.weather[0].description,
          icono: clima.weather[0].icon,
          humedad: clima.main.humidity,
          viento: clima.wind.speed * 3.6,
        }))
      } catch (error) {
        console.error('Error al cargar ciudades iniciales:', error)
      }
    },

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
      this.climaApi = null
      this.error = ''
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
        <label for="busqueda"> Buscar una ciudad </label>

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
          {{ lugaresMostrar.length }}
          {{ lugaresMostrar.length === 1 ? 'resultado' : 'resultados' }}
        </p>
      </div>

      <p v-if="cargando" class="api-message">Buscando el clima...</p>

      <p v-if="error" class="api-message api-message--error">
        {{ error }}
      </p>

      <div v-if="lugaresMostrar.length > 0 && !cargando" class="weather-grid">
        <WeatherCard
          v-for="lugar in lugaresMostrar"
          :key="lugar.id"
          :lugar="lugar"
          :unidad="unidad"
        />
      </div>

      <div v-if="lugaresMostrar.length === 0 && !cargando" class="empty-state">
        <span>🔍</span>

        <h3>No se encontró el lugar</h3>

        <p>Intenta buscar otra ciudad o limpia el campo de búsqueda.</p>

        <button @click="limpiarBusqueda">Mostrar todos los lugares</button>
      </div>
    </section>
  </main>
</template>
