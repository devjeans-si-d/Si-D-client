<template>
    <v-container>
      <v-row justify="center">
        <CardComponent name="개발진스" jobField="백엔드 개발자"/>
        <CardComponent name="개발진스" jobField="백엔드 개발자"/>
      </v-row>
    </v-container>
    
  </template>
  
  <script>
  import CardComponent from '@/components/siderCard/CardComponent.vue';
  
  export default {
    components:{
        CardComponent
    },
    props:['name','jobField','image'],
    data() {
      return {
        // Your data properties
      }
    },
    methods: {
      // Your methods
    }
  }
  </script>
  
  <style scoped>
  .fixed-card {
    width: 286px;  /* 고정 너비 */
    height: 286px; /* 고정 높이 */
  }
  
  .text-center {
    text-align: center;
  }
  
  .font-weight-bold {
    font-weight: bold;
  }
  
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  
  .card-avatar {
    padding-top: 20px;  /* 이미지를 조금 더 아래로 내립니다 */
  }
  
  .card-text {
    padding-top: 20px;  /* 텍스트를 이미지 아래로 더 내립니다 */
  }
  
  .card-avatar img {
    border-radius: 50%;  /* 이미지를 동그랗게 만듭니다 */
  }
  </style>
  