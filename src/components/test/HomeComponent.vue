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
    <ButtonComponent content="Si-D" /><br><br>
    <ButtonComponent2 content="Si-D" color="#A4DEC6" background="#094F08"/>
  </v-container>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
import ButtonComponent2 from './ButtonComponent2.vue';

export default {
  components: {
    ButtonComponent,ButtonComponent2
    },
    methods:{
      test(){
        alert("test")
      }
    }
}
</script>

