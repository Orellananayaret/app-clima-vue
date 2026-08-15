<template>
  <header class="navbar">
    <RouterLink to="/">
      App Clima
    </RouterLink>

    <nav>
      <RouterLink to="/">
        Inicio
      </RouterLink>

      <template v-if="isAuthenticated">
        <RouterLink to="/favoritos">
          Favoritos
        </RouterLink>

        <RouterLink to="/preferencias">
          Preferencias
        </RouterLink>

        <span>
          Hola, {{ user.name }}
        </span>

        <button @click="logout">
          Cerrar sesión
        </button>
      </template>

      <RouterLink
        v-else
        to="/login"
      >
        Iniciar sesión
      </RouterLink>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', {
      user: 'currentUser',
      isAuthenticated: 'isAuthenticated'
    })
  },

  methods: {
    async logout() {
      await this.$store.dispatch(
        'auth/logout'
      )

      this.$router.push('/login')
    }
  }
}
</script>
