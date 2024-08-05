<template>
  <v-container>
    <v-row>
      <v-col>Si-D</v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-start" cols="1">
        <v-btn color="sid_green">시그니처 색</v-btn>
      </v-col>
      <v-col class="d-flex justify-start" cols="1">
        <v-btn color="sid_btn1">버튼 색1</v-btn>
      </v-col>
      <v-col class="d-flex justify-start" cols="1">
        <v-btn color="sid_btn2">버튼 색2</v-btn>
      </v-col>
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

    <v-row>

    </v-row>  

  </v-container>
</template>

<script>
import CloseableChip from '@/components/chip/CloseableChip.vue';
import BasicChip from '@/components/chip/BasicChip.vue';

export default {
  components: {
    CloseableChip,
    BasicChip
  }
}
</script>

