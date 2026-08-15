<script>
import WeatherCard from '@/components/WeatherCard.vue'
import { lugares } from '@/data/weatherData.js'

export default {
  name: 'HomeView',

  components: {
    WeatherCard
  },

  data() {
    return {
      lugares,
      busqueda: '',
      unidad: 'C'
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
    }
  },

  methods: {
    buscarLugar() {
      console.log('Buscando:', this.busqueda)
    },

    limpiarBusqueda() {
      this.busqueda = ''
    }
  }
}
</script>

<template>
  <main class="home">
    <section class="hero">
      <p class="hero__eyebrow">Pronóstico nacional</p>

      <h1>Descubre el clima de Chile</h1>

      <p class="hero__description">
        Revisa la temperatura actual, el pronóstico semanal y las estadísticas
        de diferentes ciudades.
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

          <button type="submit">
            Buscar
          </button>

          <button
            v-show="busqueda"
            type="button"
            class="button-secondary"
            @click="limpiarBusqueda"
          >
            Limpiar
          </button>
        </div>
      </form>

      <div class="unit-selector">
        <p>Unidad de temperatura</p>

        <label>
          <input
            v-model="unidad"
            type="radio"
            value="C"
          />
          Celsius °C
        </label>

        <label>
          <input
            v-model="unidad"
            type="radio"
            value="F"
          />
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

      <div
        v-if="lugaresFiltrados.length > 0"
        class="weather-grid"
      >
        <WeatherCard
          v-for="lugar in lugaresFiltrados"
          :key="lugar.id"
          :lugar="lugar"
          :unidad="unidad"
        />
      </div>

      <div
        v-else
        class="empty-state"
      >
        <span>🔍</span>
        <h3>No se encontró el lugar</h3>

        <p>
          Intenta buscar otra ciudad o limpia el campo de búsqueda.
        </p>

        <button @click="limpiarBusqueda">
          Mostrar todos los lugares
        </button>
      </div>
    </section>
  </main>
</template>