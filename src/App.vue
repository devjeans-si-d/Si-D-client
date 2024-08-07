<template>

  <v-app>
    <HeaderComponent />
    <v-main>
      <RouterView></RouterView>
    </v-main>
    <FooterComponent/>
  </v-app>
</template>

<script>
import FooterComponent from './components/footer/FooterComponent.vue';
import HeaderComponent from './components/test/HeaderComponent.vue'
export default {
  name: 'App',
  components: {
    FooterComponent,
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
