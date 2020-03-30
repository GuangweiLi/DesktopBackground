<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './components/Home'
  export default {
    name: 'background',
    components: {
      Home
    }
  }
</script>

<style>
  /* CSS */
  html, body, #app {
    height: 100%;
    width: 100%;
  }
</style>
