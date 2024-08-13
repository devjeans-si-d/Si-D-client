<template>
  <v-app>
      <HeaderComponent />
          <v-main>
            <v-container fluid class="custom-container">
                <routerView/>
            </v-container>
          </v-main>
          <FooterComponent/>
  </v-app>
</template>

<script>

import HeaderComponent from './components/header/HeaderComponent.vue'
import FooterComponent from './components/footer/FooterComponent.vue'

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
.custom-container {
  max-width: 1200px !important; /* 원하는 최대 폭 */
  margin: 0 auto !important;    /* 중앙 정렬 */
  width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
  }
</style>
