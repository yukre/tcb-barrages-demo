<template>
  <div id="app">
    <Barrages class="barrages"/>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Barrages from './components/Barrages'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
  },
  components: {
    Barrages
  }
}
</script>

<style>
html, body {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
