<script>
export default {
  name: 'WeatherCard',

  props: {
    lugar: {
      type: Object,
      required: true,
    },

    unidad: {
      type: String,
      default: 'C',
    },
  },

  methods: {
    convertirTemperatura(temperatura) {
      if (this.unidad === 'F') {
        return Math.round((temperatura * 9) / 5 + 32)
      }

      return temperatura
    },
  },
}
</script>

<template>
  <article class="weather-card">
    <div class="weather-card__header">
      <div>
        <h2>{{ lugar.nombre }}</h2>
        <p>{{ lugar.region }}</p>
      </div>

      <span class="weather-card__icon">
        <img
          class="weather-card__icon"
          :src="`https://openweathermap.org/img/wn/${lugar.icono}@2x.png`"
          :alt="lugar.condicion"
        />
      </span>
    </div>

    <div class="weather-card__temperature">
      {{ convertirTemperatura(lugar.temperatura) }}°{{ unidad }}
    </div>

    <p class="weather-card__condition">
      {{ lugar.condicion }}
    </p>

    <div class="weather-card__information">
      <span>💧 Humedad: {{ lugar.humedad }}%</span>
      <span>💨 Viento: {{ lugar.viento }} km/h</span>
    </div>

    <router-link
      :to="{
        name: 'detalle',
        params: { id: lugar.nombre },
      }"
      class="weather-card__button"
    >
      Ver pronóstico
    </router-link>
  </article>
</template>
