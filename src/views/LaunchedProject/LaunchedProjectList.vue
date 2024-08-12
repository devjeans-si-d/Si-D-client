<template>
    <v-container fluid class="custom-container">
        <v-spacer :style="{height: '20px'}"></v-spacer>
        <h1 style="text-align:center; color:#094F08;">Launched-Project</h1>

        <v-spacer :style="{height: '20px'}"></v-spacer>

        <v-row>
            <v-sheet class="py-4 px-1">
                <v-chip-group  selected-class="text-primary" mandatory>
                    <v-chip color="#094F08" size="large" filter>전체</v-chip>
                    <filter-stack-chip title="Spring" color="#77BC1F" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/spring.svg"/>
                    <filter-stack-chip title="Node.js" color="#676F5E" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/nodejs.svg"/>
                    <filter-stack-chip title="Android" color="#A4C439" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/android.svg"/>
                    <filter-stack-chip title="iOS" color="#5A5656" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/apple.svg"/>
                    <filter-stack-chip title="React" color="#61DAFB" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/react.svg"/>
                    <filter-stack-chip title="Vue.js" color="#35495E" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/vuejs.png"/>
                </v-chip-group>
            </v-sheet>
        </v-row>

        <v-spacer :style="{height: '10px'}"></v-spacer>

        <v-row>
            <v-switch class="mx-2" v-model="isChecked" label="출시된 프로젝트만 보기" color="#8DBCA8"></v-switch>
            <v-chip-group  selected-class="text-primary" mandatory>
                <v-chip class="ma-1" color="#094F08" size="large" filter> 🍾 순 정렬</v-chip>
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
                <v-card 
                class="mx-auto; custom-card"
                >
                  
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

                <v-card-subtitle class="pt-3; custom-contents">
                    <div>{{ project.contents }}</div>
                </v-card-subtitle>

                <v-card-subtitle class="pt-2; custom-contents">
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
          isChecked: "false",
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
.custom-card{
  max-width: 280px !important;
}
.custom-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 또는 'contain' */
  }
  .custom-contents{
    margin: 0;
    max-width: 250px; /* 제목의 최대 너비를 설정 */
    overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
    text-overflow: ellipsis !important; /* 넘치는 텍스트에 '...' 추가 (이거 적용안됨 이후 수정필요)*/
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
  }
  .custom-contents {
    text-align: center;
  }
</style>