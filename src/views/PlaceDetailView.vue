<script>
import { getWeather, getForecast } from '@/services/weatherService.js'

export default {
  name: 'PlaceDetailView',

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      unidad: 'C',
      mostrarInformacion: true,
      lugar: null,
      pronostico: [],
      cargando: true,
      error: '',
    }
  },
  async mounted() {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY

      const clima = await getWeather(this.id, apiKey)
      const forecast = await getForecast(this.id, apiKey)

      this.lugar = {
        id: clima.id,
        nombre: clima.name,
        region: clima.sys.country,
        temperatura: clima.main.temp,
        sensacion: clima.main.feels_like,
        condicion: clima.weather[0].description,
        icono: clima.weather[0].icon,
        humedad: clima.main.humidity,
        viento: clima.wind.speed * 3.6,
        pronostico: this.crearPronosticoDiario(forecast.list),
      }
    } catch (error) {
      console.error('Error al obtener el detalle:', error)
      this.error = 'No se pudo obtener el clima de esta ciudad.'
    } finally {
      this.cargando = false
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },

    temperaturaMaxima() {
      if (!this.lugar) return 0

      return Math.max(...this.lugar.pronostico.map((dia) => dia.maxima))
    },

    temperaturaMinima() {
      if (!this.lugar) return 0

      return Math.min(...this.lugar.pronostico.map((dia) => dia.minima))
    },

    temperaturaPromedio() {
      if (!this.lugar) return 0

      const total = this.lugar.pronostico.reduce((suma, dia) => suma + dia.maxima + dia.minima, 0)

      return Math.round(total / (this.lugar.pronostico.length * 2))
    },

    promedioHumedad() {
      if (!this.lugar) return 0

      return this.lugar.humedad
    },
  },

  methods: {
    crearPronosticoDiario(lista) {
      const dias = {}

      lista.forEach((item) => {
        const fecha = new Date(item.dt * 1000)
        const clave = fecha.toISOString().split('T')[0]

        if (!dias[clave]) {
          dias[clave] = {
            dia: fecha.toLocaleDateString('es-CL', {
              weekday: 'long',
            }),
            maxima: item.main.temp_max,
            minima: item.main.temp_min,
            condicion: item.weather[0].description,
            icono: item.weather[0].icon,
          }
        } else {
          dias[clave].maxima = Math.max(dias[clave].maxima, item.main.temp_max)

          dias[clave].minima = Math.min(dias[clave].minima, item.main.temp_min)
        }
      })

      return Object.values(dias).slice(0, 5)
    },

    convertirTemperatura(temperatura) {
      if (this.unidad === 'F') {
        return Math.round((temperatura * 9) / 5 + 32)
      }

      return temperatura
    },

    cambiarVisibilidad() {
      this.mostrarInformacion = !this.mostrarInformacion
    },

    addFavorite() {
      this.$store.dispatch('auth/addFavorite', this.lugar.nombre)
    },
  },
}
</script>

<template>
  <main class="detail">
    <router-link to="/" class="back-link"> ← Volver al inicio </router-link>

    <div v-if="lugar" class="detail__content">
      <section class="detail-hero">
        <button v-if="isAuthenticated" @click="addFavorite">Agregar a favoritos</button>
        <div>
          <p class="hero__eyebrow">
            {{ lugar.region }}
          </p>

          <h1>{{ lugar.nombre }}</h1>

          <p>{{ lugar.descripcion }}</p>
        </div>

        <div class="detail-hero__weather">
          <span class="detail-hero__icon">
            {{ lugar.icono }}
          </span>

          <strong> {{ convertirTemperatura(lugar.temperatura) }}°{{ unidad }} </strong>

          <span>{{ lugar.condicion }}</span>
        </div>
      </section>

      <section class="detail-controls">
        <div class="unit-selector">
          <p>Mostrar temperatura en:</p>

          <label>
            <input v-model="unidad" type="radio" value="C" />
            Celsius °C
          </label>

          <label>
            <input v-model="unidad" type="radio" value="F" />
            Fahrenheit °F
          </label>
        </div>

        <button @click="cambiarVisibilidad">
          {{ mostrarInformacion ? 'Ocultar detalles' : 'Mostrar detalles' }}
        </button>
      </section>

      <section v-show="mostrarInformacion" class="current-details">
        <article>
          <span>🌡️</span>
          <p>Sensación térmica</p>
          <strong> {{ convertirTemperatura(lugar.sensacion) }}°{{ unidad }} </strong>
        </article>

        <article>
          <span>💧</span>
          <p>Humedad</p>
          <strong>{{ lugar.humedad }}%</strong>
        </article>

        <article>
          <span>💨</span>
          <p>Viento</p>
          <strong>{{ lugar.viento }} km/h</strong>
        </article>

        <article>
          <span>🌤️</span>
          <p>Condición</p>
          <strong>{{ lugar.condicion }}</strong>
        </article>
      </section>

      <section class="forecast-section">
        <div class="section-heading">
          <p class="section-eyebrow">Próximos días</p>
          <h2>Pronóstico semanal</h2>
        </div>

        <div class="forecast-grid">
          <article v-for="dia in lugar.pronostico" :key="dia.dia" class="forecast-card">
            <h3>{{ dia.dia }}</h3>

            <span class="forecast-card__icon">
              {{ dia.icono }}
            </span>

            <p>{{ dia.condicion }}</p>

            <div class="forecast-card__temperatures">
              <span>
                Máx.
                {{ convertirTemperatura(dia.maxima) }}°{{ unidad }}
              </span>

              <span>
                Mín.
                {{ convertirTemperatura(dia.minima) }}°{{ unidad }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section class="statistics-section">
        <div class="section-heading">
          <p class="section-eyebrow">Resumen</p>
          <h2>Estadísticas de la semana</h2>
        </div>

        <div class="statistics-grid">
          <article class="statistic-card">
            <span>🔥</span>
            <p>Temperatura máxima</p>

            <strong> {{ convertirTemperatura(temperaturaMaxima) }}°{{ unidad }} </strong>
          </article>

          <article class="statistic-card">
            <span>❄️</span>
            <p>Temperatura mínima</p>

            <strong> {{ convertirTemperatura(temperaturaMinima) }}°{{ unidad }} </strong>
          </article>

          <article class="statistic-card">
            <span>📊</span>
            <p>Promedio semanal</p>

            <strong> {{ convertirTemperatura(temperaturaPromedio) }}°{{ unidad }} </strong>
          </article>

          <article class="statistic-card">
            <span>💧</span>
            <p>Humedad actual</p>

            <strong> {{ promedioHumedad }}% </strong>
          </article>
        </div>
      </section>
    </div>

    <section v-else class="empty-state">
      <span>⚠️</span>
      <h1>Lugar no encontrado</h1>

      <p>El lugar solicitado no existe o fue eliminado.</p>

      <router-link to="/" class="empty-state__link"> Regresar al inicio </router-link>
    </section>
  </main>
</template>
