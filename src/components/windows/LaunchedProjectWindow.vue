<template>
    <v-card
      style="background-color: #F3F3F3; border-radius: 15px; padding: 20px; max-width: 1200px; width: 100%;"
      rounded="0"
      flat
    >
      <v-window v-model="onboarding" style="max-width: 1200px; width: 100%;">
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
              <v-card class="mx-auto" style="width: 100%; max-width: 250px;">
                <v-img
                  class="custom-img"
                  height="250"
                  :src="project.image"
                  cover
                />
                <v-card-title class="d-flex justify-space-between align-center">
                  <span>{{ project.name }}</span>
                  <v-chip color="primary" text-color="white">
                    🍾 {{ project.scraps }}
                  </v-chip>
                </v-card-title>
                <v-card-subtitle class="pt-3 custom-contents">
                  <div>{{ project.contents }}</div>
                </v-card-subtitle>
                <v-card-subtitle class="pt-2 custom-contents">
                  <div class="mb-4">{{ project.techStacks }}</div>
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
              :variant="isSelected ? 'outlined' : 'text'"
              icon="mdi-record"
              @click="toggle"
              class="small-btn"
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
      }
    }
  };
  </script>
  
  <style scoped>
  .small-btn {
    font-size: 12px; /* 버튼 텍스트 크기 */
    padding: 4px 8px; /* 버튼 내부 여백 */
    min-width: 40px; /* 버튼 최소 너비 */
    height: 24px; /* 버튼 높이 */
  }
  </style>
  