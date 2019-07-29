<template>
  <div id="app">
    <div class="wrapper">

    </div>
    <img src="./assets/CIC-Rocket.png">
    <h1>Clicks in Context Google Ads Health Check Tool</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app img {
  width: 250px
}

h1 {
  padding: 25px
}

.wrapper {
  width: 480px
}
</style>
