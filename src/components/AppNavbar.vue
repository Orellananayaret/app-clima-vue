<template>
  <header class="navbar">
    <RouterLink
      to="/"
      class="navbar__brand"
    >
      ☁️ App Clima
    </RouterLink>

    <nav class="navbar__links">
      <RouterLink
        to="/"
        class="navbar__link"
      >
        Inicio
      </RouterLink>

      <template v-if="isAuthenticated">
        <RouterLink
          to="/favoritos"
          class="navbar__link"
        >
          Favoritos
        </RouterLink>

        <RouterLink
          to="/preferencias"
          class="navbar__link"
        >
          Preferencias
        </RouterLink>

        <span class="navbar__user">
          Hola, {{ user.name }}
        </span>

        <button
          class="navbar__logout"
          @click="logout"
        >
          Cerrar sesión
        </button>
      </template>

      <RouterLink
        v-else
        to="/login"
        class="navbar__login"
      >
        Iniciar sesión
      </RouterLink>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppNavbar',

  computed: {
    ...mapGetters('auth', {
      user: 'currentUser',
      isAuthenticated: 'isAuthenticated'
    })
  },

  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
