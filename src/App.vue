<template>

  <v-app>
    <v-main>
      <RouterView></RouterView>
      <FooterComponent/>
    </v-main>
  </v-app>
</template>

<script>
import FooterComponent from './components/footer/FooterComponent.vue';

// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    FooterComponent
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
