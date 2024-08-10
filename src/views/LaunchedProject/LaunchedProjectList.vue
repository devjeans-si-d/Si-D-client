<template>
    <v-container>
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
        
        <v-card class="mx-auto" max-width="300">
            <v-img
            class="custom-img"
            height="250"
            src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mymoji.png"
            cover />
            
            <v-card-title class="d-flex justify-space-between align-center">
                <!-- 프로젝트 이름 -->
                <span>{{ projectName }}</span>
                <v-chip
                  color="primary"
                  text-color="white"
                >
                <!-- 스크랩 수 -->
                🍾 {{launchedProjectScraps}} 
                </v-chip>
              </v-card-title>

            <v-card-subtitle class="pt-3">
                <!-- 완성된 프로젝트 설명 30자 -->
                 <div>{{launchedProjectContents}}</div>
                
            </v-card-subtitle>

            <v-card-subtitle class="pt-2">
                <!-- 사용된 기술스택 -->
                <!-- 나중에 v-for 로 기술스택 리스트에서 하나씩 return 해줘야 함 -->
                <div class="mb-4">{{launchedProjectTechStacks}}</div>
            </v-card-subtitle>
        </v-card>

    </v-container>

</template>

<script>
import FilterStackChip from '@/components/chip/FilterStackChip.vue';
export default{
    data() {
        return {
            isChecked: true,
            projectName : "마이모지(My Moji)",
            // redis에서 Set size값 구해와야 함
            launchedProjectScraps : 23,
            launchedProjectContents : "매일 불러보는 내 이모지! 마이모지(My Moji)",
            // List에서 v-for 해야함 이후 수정예정
            launchedProjectTechStacks : "SpringBoot · Swift · SwiftUI · RxSwift"
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
.custom-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 또는 'contain' */
  }
</style>