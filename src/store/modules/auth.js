import { users } from '@/data/users'

export default {
  namespaced: true,

  state: () => ({
    user: null,
    isAuthenticated: false,
    error: null
  }),

  getters: {
    currentUser(state) {
      return state.user
    },

    isAuthenticated(state) {
      return state.isAuthenticated
    },

    favorites(state) {
      return state.user?.favorites || []
    },

    preferences(state) {
      return state.user?.preferences || {}
    }
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = true
      state.error = null
    },

    LOGOUT(state) {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },

    SET_ERROR(state, message) {
      state.error = message
    },

    UPDATE_PREFERENCES(state, preferences) {
      if (state.user) {
        state.user.preferences = {
          ...state.user.preferences,
          ...preferences
        }
      }
    },

    ADD_FAVORITE(state, place) {
      if (
        state.user &&
        !state.user.favorites.includes(place)
      ) {
        state.user.favorites.push(place)
      }
    },

    REMOVE_FAVORITE(state, place) {
      if (state.user) {
        state.user.favorites =
          state.user.favorites.filter(
            favorite => favorite !== place
          )
      }
    }
  },

  actions: {
    login({ commit }, credentials) {
      const user = users.find(
        user =>
          user.email === credentials.email &&
          user.password === credentials.password
      )

      if (!user) {
        commit(
          'SET_ERROR',
          'Usuario o contraseña incorrectos'
        )

        return false
      }

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        favorites: [...user.favorites],
        preferences: { ...user.preferences }
      }

      commit('SET_USER', safeUser)

      return true
    },

    logout({ commit }) {
      commit('LOGOUT')
    },

    updatePreferences({ commit }, preferences) {
      commit('UPDATE_PREFERENCES', preferences)
    },

    addFavorite({ commit }, place) {
      commit('ADD_FAVORITE', place)
    },

    removeFavorite({ commit }, place) {
      commit('REMOVE_FAVORITE', place)
    }
  }
}
