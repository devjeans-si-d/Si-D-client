<template>
  <v-container class="custom-container">

    <v-spacer :style="{height: '20px'}"></v-spacer>

    <h4 style="text-align:center; color:#094F08;">Launched Project</h4>
    <h2 style="text-align:center; color:#094F08;">{{ project.projectName }}</h2>

    <v-row class="mt-10 mb-10" >
      <!-- <label for="siteUrl" class="ma-auto">site url</label> -->
      <v-text-field
        type="text"
        id="siteUrl"
        label="site url"
        placeholder="https://www.si-d.com"
        max-width="1200px"
        v-model="siteUrl"
        variant="underlined"
        rounded="xs"
      ></v-text-field>
    </v-row>

    <v-spacer :style="{height: '50px'}"></v-spacer>

    <v-row>
      <tech-stack-selector />
    </v-row>
    

  </v-container>
</template>

<script>
import TechStackSelector from '@/components/modal/TechStackSelector.vue';

export default {
  components: {
    TechStackSelector
  },
  data() {
    return {
      project: {
        projectName: '안경만두의 수상한 프로젝트'

        // projectId, launchedProjectContents, siteUrl, members, techStackList, imageUrl
      }
    };
  }
}
</script>
