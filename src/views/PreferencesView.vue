<template>
  <main class="preferences">
    <h1>Mis preferencias de clima</h1>

    <p>
      Configuración de
      <strong>{{ user?.name }}</strong>
    </p>

    <div class="preferences__option">
      <label for="temperature">
        Unidad de temperatura
      </label>

      <select
        id="temperature"
        v-model="temperatureUnit"
      >
        <option value="C">
          Celsius (°C)
        </option>

        <option value="F">
          Fahrenheit (°F)
        </option>
      </select>
    </div>

    <div class="preferences__option">
      <label for="theme">
        Tema
      </label>

      <select
        id="theme"
        v-model="theme"
      >
        <option value="light">
          Claro
        </option>

        <option value="dark">
          Oscuro
        </option>
      </select>
    </div>

    <button @click="savePreferences">
      Guardar preferencias
    </button>

    <p v-if="saved">
      Preferencias actualizadas correctamente.
    </p>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PreferencesView',

  data() {
    return {
      temperatureUnit: 'C',
      theme: 'light',
      saved: false
    }
  },

  computed: {
    ...mapGetters('auth', [
      'currentUser',
      'preferences'
    ]),

    user() {
      return this.currentUser
    }
  },

  mounted() {
    this.temperatureUnit =
      this.preferences.temperatureUnit || 'C'

    this.theme =
      this.preferences.theme || 'light'
  },

  methods: {
    savePreferences() {
      this.$store.dispatch(
        'auth/updatePreferences',
        {
          temperatureUnit:
            this.temperatureUnit,

          theme:
            this.theme
        }
      )

      this.saved = true
    }
  }
}
</script>
