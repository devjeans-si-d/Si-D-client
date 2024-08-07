<template>

  <v-app>
    <HeaderComponent />
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HeaderComponent from './components/header/HeaderComponent.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld
    HeaderComponent
  }
}
</script>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
