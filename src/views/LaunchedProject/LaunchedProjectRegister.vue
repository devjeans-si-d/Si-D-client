<template>
  <v-container class="custom-container">
    <h4 style="text-align:center; color:#094F08;">Launched Project</h4>
    <h2 style="text-align:center; color:#094F08;">{{ project.projectName }}</h2>

    <v-text-field>


    </v-text-field>
    <v-spacer :style="{height: '50px'}"></v-spacer>
    <tech-stack-selector />
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
