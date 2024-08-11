<template>
    <v-container fluid class="custom-container">
        <v-spacer :style="{height: '20px'}"></v-spacer>
        <h1 style="text-align:center; color:#094F08;">Project</h1>

        <v-spacer :style="{height: '20px'}"></v-spacer>

        <v-row>
            <v-sheet class="py-4 px-1">
                <v-chip-group  selected-class="text-primary" mandatory>
                    <v-chip color="#094F08" size="large" filter>전체</v-chip>
                    <filter-stack-chip title="BACKEND" color="#77BC1F"/>
                    <filter-stack-chip title="FRONTEND" color="#77BC1F"/>
                    <filter-stack-chip title="APP" color="#77BC1F"/>
                    <filter-stack-chip title="DESIGNER" color="#77BC1F"/>
                    <filter-stack-chip title="PM" color="#77BC1F"/>
                </v-chip-group>
            </v-sheet>
        </v-row>

        <v-spacer :style="{height: '10px'}"></v-spacer>

        <v-row>
            <v-switch class="mx-2" v-model="isChecked" label="모집중인 프로젝트만 보기" color="#8DBCA8"></v-switch>
            <v-chip-group  selected-class="text-primary" mandatory>
                <v-chip class="ma-1" color="#094F08" size="large" filter> 스크랩순 정렬</v-chip>
                <v-chip class="ma-1" color="#094F08" size="large" filter> 조회수 정렬</v-chip>
            </v-chip-group>
        </v-row>

        <v-spacer :style="{height: '10px'}"></v-spacer>
        
        <v-row>
            <v-col
                v-for="project in projects"
                :key="project.id"
                cols="12" md="4" lg="3"
            >
                <v-card class="mx-auto" max-width="300">
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

                <v-card-subtitle class="pt-3">
                    <div>{{ project.contents }}</div>
                </v-card-subtitle>

                <v-card-subtitle class="pt-2">
                    <div class="mb-4">{{ project.techStacks }}</div>
                </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>

    </v-container>

</template>

<script>
import FilterStackChip from '@/components/chip/FilterStackChip.vue';
export default{
    data() {
        return {
            projects: [
                // 임시데이터. api붙이면 수정예정
        {
          id: 1,
          name: "My Moji",
          image: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mymoji.png",
          scraps: 23,
          contents: "매일 불러보는 내 이모지! 마이모지(My Moji)",
          techStacks: "SpringBoot · Swift · SwiftUI · RxSwift"
        },
        {
          id: 1,
          name: "My Moji",
          image: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mymoji.png",
          scraps: 23,
          contents: "매일 불러보는 내 이모지! 마이모지(My Moji)",
          techStacks: "SpringBoot · Swift · SwiftUI · RxSwift"
        },
        {
          id: 1,
          name: "My Moji",
          image: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mymoji.png",
          scraps: 23,
          contents: "매일 불러보는 내 이모지! 마이모지(My Moji)",
          techStacks: "SpringBoot · Swift · SwiftUI · RxSwift"
        },
        {
          id: 1,
          name: "My Moji",
          image: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mymoji.png",
          scraps: 23,
          contents: "매일 불러보는 내 이모지! 마이모지(My Moji)",
          techStacks: "SpringBoot · Swift · SwiftUI · RxSwift"
        },
        {
          id: 1,
          name: "My Moji",
          image: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mymoji.png",
          scraps: 23,
          contents: "매일 불러보는 내 이모지! 마이모지(My Moji)",
          techStacks: "SpringBoot · Swift · SwiftUI · RxSwift"
        },
        {
          id: 1,
          name: "My Moji",
          image: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mymoji.png",
          scraps: 23,
          contents: "매일 불러보는 내 이모지! 마이모지(My Moji)",
          techStacks: "SpringBoot · Swift · SwiftUI · RxSwift"
        },
        {
          id: 1,
          name: "My Moji",
          image: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mymoji.png",
          scraps: 23,
          contents: "매일 불러보는 내 이모지! 마이모지(My Moji)",
          techStacks: "SpringBoot · Swift · SwiftUI · RxSwift"
        },
        {
          id: 1,
          name: "My Moji",
          image: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mymoji.png",
          scraps: 23,
          contents: "매일 불러보는 내 이모지! 마이모지(My Moji)",
          techStacks: "SpringBoot · Swift · SwiftUI · RxSwift"
        },
      ]
        };
    },
    components:{
        FilterStackChip
    },
    methods:{

    }
}
</script>

<style scoped>
.custom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
.custom-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 또는 'contain' */
  }
</style>