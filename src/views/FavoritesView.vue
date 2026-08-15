<template>
  <main class="favorites">
    <h1>Mis lugares favoritos</h1>

    <p>
      Lugares guardados por
      <strong>{{ user?.name }}</strong>
    </p>

    <div v-if="favorites.length">
      <article
        v-for="place in favorites"
        :key="place"
        class="favorites__item"
      >
        <span>{{ place }}</span>

        <button
          @click="removeFavorite(place)"
        >
          Eliminar
        </button>
      </article>
    </div>

    <p v-else>
      Todavía no tienes lugares favoritos.
    </p>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FavoritesView',

  computed: {
    ...mapGetters('auth', [
      'currentUser',
      'favorites'
    ]),

    user() {
      return this.currentUser
    }
  },

  methods: {
    removeFavorite(place) {
      this.$store.dispatch(
        'auth/removeFavorite',
        place
      )
    }
  }
}
</script>
