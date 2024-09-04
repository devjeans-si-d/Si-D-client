<template>
    <v-card
      style="background-color: #F3F3F3; border-radius: 15px; padding: 20px; max-width: 1200px; width: 100%;"
      rounded="0"
      flat
    >
      <v-window v-model="onboarding" style="width: 1080px;">
        <!-- v-model="onboarding": 현재 활성화된 슬라이드의 인덱스를 바인딩 -->
        <v-window-item v-for="n in windowCount" :key="`window-${n}`" :value="n">
          <v-row class="d-flex justify-center">
            <v-col
              v-for="(project, index) in paginatedProjects(n)"
              :key="index"
              cols="12"
              md="3"
              class="d-flex justify-center"
            >
              <v-card 
              style="width:250px; height:350px;"
              @click="() => moveToProject(project.id)"
              >
                <v-img
                  class="custom-img"
                  width="250px"
                  height="250px"
                  :src="project.imageUrl"
                  alt="Project 썸네일"
                  cover
                />
                <v-card-title class="d-flex justify-space-between align-center">
                  <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    {{ project.projectName }}
                  </span>
                  <v-chip color="primary" text-color="white">
                    <v-icon>mdi-bookmark</v-icon> {{ project.scrapCount }}
                  </v-chip>
                </v-card-title>
                <v-card-subtitle class="pt-3 mb-5 mr-5 custom-contents">
                  <div>{{ project.description }}</div>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
  
      <v-card-actions class="justify-space-between">
        <v-btn icon="mdi-chevron-left" variant="plain" @click="prev"></v-btn>
        <v-item-group v-model="onboarding" class="text-center" mandatory>
          <v-item
            v-for="n in windowCount"
            :key="`btn-${n}`"
            v-slot="{ isSelected, toggle }"
            :value="n"
          >
            <v-btn
              :color="isSelected ? 'primary' : 'secondary'"
              icon="mdi-circle-small"
              @click="toggle"
            ></v-btn>
          </v-item>
        </v-item-group>
        <v-btn icon="mdi-chevron-right" variant="plain" @click="next"></v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      windowCount: {
        type: Number,
        default: 1
      },
      projects: {
        // 이후 Project에 맞게 수정예정
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        onboarding: 1
      };
    },
    methods: {
      next() {
        this.onboarding =
          this.onboarding + 1 > this.windowCount ? 1 : this.onboarding + 1;
      },
      prev() {
        this.onboarding =
          this.onboarding - 1 <= 0 ? this.windowCount : this.onboarding - 1;
      },
      paginatedProjects(page) {
        // 페이지에 따라 프로젝트를 반환하도록 수정
        const projectsPerPage = 4;
        const start = (page - 1) * projectsPerPage;
        const end = start + projectsPerPage;
        return this.projects.slice(start, end);
      },
      moveToProject(projectId){
        this.$router.push('/project/' + projectId).then(() => {
          // 페이지 이동 후 스크롤을 최상단으로 이동
          window.scrollTo(0, 0);
        });
      }
    }
  };
  </script>
  
  <style scoped>

  </style>
  