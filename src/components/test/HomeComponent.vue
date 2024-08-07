<template>
  <v-container>
    <v-row>
      <v-col>Si-D</v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-start" cols="1">
        <v-btn outlined color="sid_green">시그니처 색</v-btn>
      </v-col>
      <v-col class="d-flex justify-start" cols="1">
        <v-btn outlined color="sid_btn1">버튼 색1</v-btn>
      </v-col>
      <v-col class="d-flex justify-start" cols="1">
        <v-btn outlined color="sid_btn2">버튼 색2</v-btn>
      </v-col>
    </v-row><br>
    <ButtonComponent @click="test" content="Si-D" type="change" />
  </v-container>
</template>

<script>
import ButtonComponent from '../button/ButtonComponent.vue';

export default {
  components: {
    ButtonComponent
    },
    methods:{
      test(){
        alert("test")
      }
    }
}
</script>

