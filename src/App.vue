<script>
export default {
  name: 'App'
}
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header__container">
        <router-link
          to="/"
          class="logo"
        >
          <span>🌦️</span>
          Clima Chile
        </router-link>

        <nav class="navigation">
          <router-link to="/">
            Inicio
          </router-link>
        </nav>
      </div>
    </header>

    <router-view />

    <footer class="footer">
      <p>
        App de Clima desarrollada con Vue 3 y Vue Router.
      </p>

      <p>
        Proyecto Módulo 6 · Nayaret Orellana
      </p>
    </footer>
  </div>
</template>