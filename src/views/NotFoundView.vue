<script>
export default {
  name: 'NotFoundView'
}
</script>

<template>
  <main class="not-found">
    <span>🌩️</span>

    <h1>Error 404</h1>

    <p>
      La página que estás buscando no existe.
    </p>

    <router-link
      to="/"
      class="not-found__link"
    >
      Volver al inicio
    </router-link>
  </main>
</template>