<template>
  <div id="app">
    <AppNavbar />

    <RouterView />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'

export default {
  components: {
    AppNavbar
  }
}
</script>
