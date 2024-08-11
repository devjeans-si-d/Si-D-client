<template>
    <v-container fluid class="custom-container">
        <!-- 전체 container -->
        <v-spacer :style="{height: '50px'}"></v-spacer>
        <v-img
            alt="MainPageBanner"
            src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/main_page_banner.png"
        ></v-img>

        <v-spacer :style="{height: '50px'}"></v-spacer>

        <!-- <v-img
            src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/capture.PNG"
        >
        </v-img> -->

        <v-container
            style="background-color: #F3F3F3; border-radius:15px; max-width: 1200px;"
        >
            <!-- 지금 모집중인 인기공고 container -->
            <v-spacer :style="{height: '20px'}"></v-spacer>

            <v-row>
                <v-col>
                    <h2 style="text-align:center">🔥 지금 모집중인 인기공고 🔥</h2>
                </v-col>
            </v-row>
            <v-spacer :style="{height: '20px'}"></v-spacer>


        </v-container>
        
        <v-spacer :style="{height: '50px'}"></v-spacer>

        <v-container
            style="background-color: #F3F3F3; border-radius: 15px; max-width: 1200px; padding: 20px;"
        >
            <!-- Launched-Project container -->
            <v-spacer :style="{ height: '20px' }"></v-spacer>

            <v-row>
            <v-col>
                <h2 style="text-align: center">🚀 Launched Project 🚀</h2>
            </v-col>
            </v-row>

            <v-row justify="center" align="center">
            <h5 style="text-align: center; color: #787575;">
                Si-D에 합류하면 이런 프로젝트를 진행할 수 있어요!
            </h5>
            </v-row>

            <v-spacer :style="{ height: '30px' }"></v-spacer>

            <v-row justify="center">
            <v-card
                style="background-color: #F3F3F3; border-radius: 15px; padding: 20px; max-width: 1200px; width: 100%;"
                rounded="0"
                flat
            >
                <v-window v-model="onboarding"
                    style="max-width: 1200px; width: 100%;"
                    >
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
                    ></v-btn>
                    </v-item>
                </v-item-group>
                <v-btn icon="mdi-chevron-right" variant="plain" @click="next"></v-btn>
                </v-card-actions>
            </v-card>
            </v-row>
        </v-container>

        <v-spacer :style="{height: '50px'}"></v-spacer>

        <v-container
            style="background-color: #DEF5EC; border-radius:15px; max-width: 1200px;"
        >
            <!-- Si-Der와 함께해보세요 container -->
            <v-spacer :style="{height: '20px'}"></v-spacer>

            <v-row>
                <v-col>
                    <h2 style="text-align:center; color: #094F08">🍀 Si-Der와 함께해보세요!</h2>
                </v-col>
            </v-row>

            <v-spacer :style="{height: '20px'}"></v-spacer>

        </v-container>



    </v-container>

    
</template>
<script>
  export default {
    data: () => ({
      onboarding: 1,
      projectTemplate: {
        id: 1,
        name: 'Project 1',
        image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/smallchat.png',
        scraps: 100,
        contents: 'Contents 1',
        techStacks: 'Tech 1',
      },
      numberOfProjects: 8, // 반복할 데이터 수
      cardsPerPage: 4,
    }),

    computed: {
      projects() {
        return Array.from({ length: this.numberOfProjects }, (_, index) => ({
          ...this.projectTemplate,
          id: index + 1,
          name: `Project ${index + 1}`,
        }))
      },
      windowCount() {
        return Math.ceil(this.projects.length / this.cardsPerPage)
      },
    },

    methods: {
      paginatedProjects(page) {
        const start = (page - 1) * this.cardsPerPage
        const end = page * this.cardsPerPage
        return this.projects.slice(start, end)
      },
      next() {
        this.onboarding =
          this.onboarding + 1 > this.windowCount ? 1 : this.onboarding + 1
      },
      prev() {
        this.onboarding =
          this.onboarding - 1 <= 0 ? this.windowCount : this.onboarding - 1
      },
    },
  }
</script>
<style scoped>
.custom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
