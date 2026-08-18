<template>
  <main class="favorites">
    <h1>Mis lugares favoritos</h1>

    <p>
      Lugares guardados por
      <strong>{{ user?.name }}</strong>
    </p>

    <p v-if="cargando">Cargando clima de tus favoritos...</p>

    <p v-if="error">
      {{ error }}
    </p>

    <div v-if="weatherFavorites.length">
      <article v-for="place in weatherFavorites" :key="place.nombre" class="favorites__item">
        <div>
          <strong>{{ place.nombre }}</strong>
          <span>{{ place.temperatura }}°C</span>
          <span>{{ place.condicion }}</span>
          <span>Humedad: {{ place.humedad }}%</span>
        </div>

        <img
          :src="`https://openweathermap.org/img/wn/${place.icono}@2x.png`"
          :alt="place.condicion"
        />

        <button @click="removeFavorite(place.nombre)">Eliminar</button>
      </article>
    </div>

    <p v-else>Todavía no tienes lugares favoritos.</p>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWeather } from '@/services/weatherService.js'

export default {
  name: 'FavoritesView',

  data() {
    return {
      weatherFavorites: [],
      cargando: false,
      error: '',
    }
  },

  async mounted() {
    await this.cargarClimaFavoritos()
  },

  computed: {
    ...mapGetters('auth', ['currentUser', 'favorites']),

    user() {
      return this.currentUser
    },
  },

  methods: {
    async cargarClimaFavoritos() {
      this.cargando = true
      this.error = ''

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY

        const resultados = await Promise.all(
          this.favorites.map(async (place) => {
            const clima = await getWeather(place, apiKey)

            return {
              nombre: clima.name,
              temperatura: clima.main.temp,
              condicion: clima.weather[0].description,
              humedad: clima.main.humidity,
              icono: clima.weather[0].icon,
            }
          }),
        )

        this.weatherFavorites = resultados
      } catch (error) {
        console.error('Error al cargar favoritos:', error)
        this.error = 'No se pudo cargar el clima de tus favoritos.'
      } finally {
        this.cargando = false
      }
    },

    removeFavorite(place) {
      this.$store.dispatch('auth/removeFavorite', place)

      this.weatherFavorites = this.weatherFavorites.filter((favorite) => favorite.nombre !== place)
    },
  },
}
</script>
