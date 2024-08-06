<template>
  <v-container>
    <v-row>
      <v-col>Si-D</v-col>
    </v-row>
    <v-row>
      <ButtonComponent @click="test" content="Si-D" type="change" />
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
    </v-row>
    <v-row>
      <v-col>사람칩</v-col>
      <v-col><AvatarChip url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/sid-practice/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2024-08-05+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+10.08.49.png" name="최세호"/></v-col>
    </v-row>
    
    <v-row>
      <v-col>기술 스택 칩(closeable)</v-col>
      <v-col class="d-flex justify-start" cols="1.5">
        <CloseableChip title="Spring" color="be_blue"/>
      </v-col>
      <v-col class="d-flex justify-start" cols="1.5">
        <CloseableChip title="React" color="fe_yellow"/>
      </v-col>
      <v-col>기술 스택 칩(basic)</v-col>
      <v-col class="d-flex justify-start" cols="1.5">
        <BasicChip title="Figma" color="de_purple"/>
      </v-col>
      <v-col class="d-flex justify-start" cols="1.5">
        <BasicChip title="Swift" color="app_red"/>
      </v-col>
      <v-col class="d-flex justify-start" cols="1.5 ">
        <BasicChip title="JIRA" color="pm_green"/>
      </v-col>
    </v-row> 

  </v-container>
</template>

<script>
import CloseableChip from '@/components/chip/CloseableChip.vue';
import BasicChip from '@/components/chip/BasicChip.vue';
import AvatarChip from '@/components/chip/AvatarChip.vue';
import ButtonComponent from '../button/ButtonComponent.vue';

export default {
  components: {
    CloseableChip,
    BasicChip,
    AvatarChip,
    ButtonComponent
  },
  methods:{
      test(){
        alert("test")
      }
    }
}
</script>

