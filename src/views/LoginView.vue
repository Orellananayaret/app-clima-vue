<template>
  <main class="login">
    <div class="login__card">
      <h1>Iniciar sesión</h1>

      <form @submit.prevent="handleLogin">
        <div class="login__field">
          <label for="email">Correo</label>

          <input
            id="email"
            v-model="email"
            type="email"
            required
          />
        </div>

        <div class="login__field">
          <label for="password">
            Contraseña
          </label>

          <input
            id="password"
            v-model="password"
            type="password"
            required
          />
        </div>

        <p
          v-if="error"
          class="login__error"
        >
          {{ error }}
        </p>

        <button type="submit">
          Iniciar sesión
        </button>
      </form>

      <p class="login__demo">
        Usuario demo:
        nayaret@email.com / 123456
      </p>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginView',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    ...mapState('auth', ['error'])
  },

  methods: {
    async handleLogin() {
      const success = await this.$store.dispatch(
        'auth/login',
        {
          email: this.email,
          password: this.password
        }
      )

      if (success) {
        const redirect =
          this.$route.query.redirect || '/'

        this.$router.push(redirect)
      }
    }
  }
}
</script>
