<template>
    <v-card
      style="background-color: #F3F3F3; border-radius: 15px; padding: 20px; max-width: 1200px; width: 100%;"
      rounded="0"
      flat
    >
      <v-carousel v-model="onboarding" hide-delimiter-background>
        <!-- v-model="onboarding": 현재 활성화된 슬라이드의 인덱스를 바인딩 -->
        <v-carousel-item v-for="n in windowCount" :key="`window-${n}`">
          <v-row class="d-flex justify-center">
            <v-col
              v-for="(project, index) in paginatedProjects(n)"
              :key="index"
              cols="12"
              md="3"
              class="d-flex justify-center"
            >
              <v-card
                class="mx-auto"
                style="width: 100%; max-width: 250px;"
                @click="() => moveToProject(project.id)"
              >
                <v-img
                  class="custom-img"
                  height="250"
                  :src="project.launchedProjectImage"
                  alt="LaunchedProject 썸네일"
                  cover
                />
                <v-card-title class="d-flex justify-space-between align-center">
                  <span
                    style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                  >
                    {{ project.projectName }}
                  </span>
                  <v-chip color="primary" text-color="white">
                    🍾 {{ project.scraps }}
                  </v-chip>
                </v-card-title>
                <v-card-subtitle class="pt-3 mr-5 custom-contents">
                  <div>{{ project.launchedProjectContents }}</div>
                </v-card-subtitle>
                <v-card-subtitle class="pt-2 mr-5 custom-contents">
                  <div class="mb-4">{{ project.techStacks }}</div>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
  
      <v-card-actions class="justify-space-between">
        <v-btn icon="mdi-chevron-left" variant="plain" @click="prev"></v-btn>
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
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        onboarding: 0 // v-carousel의 인덱스는 0부터 시작
      };
    },
    methods: {
      next() {
        this.onboarding =
          this.onboarding + 1 >= this.windowCount ? 0 : this.onboarding + 1;
      },
      prev() {
        this.onboarding =
          this.onboarding - 1 < 0 ? this.windowCount - 1 : this.onboarding - 1;
      },
      paginatedProjects(page) {
        // 페이지에 따라 프로젝트를 반환하도록 수정
        const projectsPerPage = 4;
        const start = (page - 1) * projectsPerPage;
        const end = start + projectsPerPage;
        return this.projects.slice(start, end);
      },
      moveToProject(projectId) {
        this.$router.push('/launched-project/' + projectId).then(() => {
          // 페이지 이동 후 스크롤을 최상단으로 이동
          window.scrollTo(0, 0);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .small-btn {
    font-size: 12px;
    padding: 4px 8px;
    min-width: 40px;
    height: 24px;
  }
  .custom-contents {
    padding-right: 2px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  </style>
  