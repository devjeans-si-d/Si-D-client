<template>
    <v-container fluid class="custom-container">
        <v-spacer :style="{height: '20px'}"></v-spacer>
        <h1 style="text-align:center; color:#094F08;">Launched-Project</h1>

        <v-spacer :style="{height: '20px'}"></v-spacer>

        <!-- 검색창 -->
        <!-- <v-row>
          <v-col cols="auto">
            <v-select
              v-model="searchType"
              :items="searchOptions"
              item-title="text"
              item-value="value"
              dense
              style="custom-height"
            >
            </v-select>
          </v-col>

          <v-col cols="auto">
            <v-text-field
            v-model="searchValue" label="Search"
            dense
            >
            </v-text-field>
          </v-col>

          <v-col cols="auto">
              <v-btn type="submit">검색</v-btn>    
          </v-col>
        </v-row> -->
        <!-- <v-spacer :style="{height: '50px'}"></v-spacer> -->
        <v-row>
            <v-sheet class="py-4 px-1">
              <v-chip-group v-model="selectedStack" selected-class="text-primary" mandatory>
                <v-chip value="전체" color="#094F08" size="large" filter>전체</v-chip>
                <filter-stack-chip title="Spring" value="Spring" color="#77BC1F" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/spring.svg"/>
                <filter-stack-chip title="Node.js" value="Node.js" color="#676F5E" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/nodejs.svg"/>
                <filter-stack-chip title="Android" value="Android" color="#A4C439" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/android.svg"/>
                <filter-stack-chip title="iOS" value="iOS" color="#5A5656" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/apple.svg"/>
                <filter-stack-chip title="React" value="React" color="#61DAFB" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/react.svg"/>
                <filter-stack-chip title="Vue.js" value="Vue.js" color="#35495E" url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/vuejs.png"/>
              </v-chip-group>
            </v-sheet>
        </v-row>

        <v-spacer :style="{height: '10px'}"></v-spacer>

        <v-row>
          <!-- <v-switch class="mx-2" v-model="isLaunched" label="출시된 프로젝트만 보기" color="#8DBCA8"></v-switch> -->
    
          <v-chip-group v-model="sortOrder" selected-class="text-primary" mandatory>
            <v-chip value="조회수 정렬" class="ma-1" color="#094F08" size="large" filter>조회수 정렬</v-chip>
            <v-chip value="🍾 순 정렬" class="ma-1" color="#094F08" size="large" filter>🍾 순 정렬</v-chip>
          </v-chip-group>
        </v-row>

        <v-spacer :style="{height: '20px'}"></v-spacer>
        
        <v-row>
            <v-col
                v-for="project in filteredProjects"
                :key="project.id"
                cols="12" md="4" lg="3"
            >
                <v-card 
                class="mx-auto; custom-card"
                :key="project.id"
                :projectId="project.id"
                @click="() => moveToProject(project.id)"
                >  
                  <v-img
                      class="custom-img"
                      height="250"
                      :src="project.launchedProjectImage"
                      cover
                  />

                  <v-card-title class="d-flex justify-space-between align-center">
                      <span>{{ project.projectName }}</span>
                      <v-chip color="primary" text-color="white">
                      🍾 {{ project.scraps }}
                      </v-chip>
                  </v-card-title>

                  <v-card-subtitle class="pt-3; custom-contents">
                      <div>{{ project.launchedProjectContents }}</div>
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
import axios from 'axios';

export default{
    data() {
        return {
          searchType: 'optional',
          searchOptions: [
              {text:"선택", value:'optional'},
              {text:"프로젝트명", value: "projectName"},
              {text:"회원명", value: "memberName"}
          ],
          searchValue: "",
          selectedStack: '전체',  // 기본값: 전체
          // isLaunched: false,       // 기본값: false
          sortOrder: '조회수 정렬', // 기본값: 조회수 정렬
          projects: [],
          pageSize:12,
          currentPage:0,
          isLastPage: false,
          isLoading: false,
        };
    },
    computed: {
      filteredProjects() {
        return this.projects.filter(project => {
          const matchesStack = this.selectedStack === '전체' || project.techStacks.includes(this.selectedStack);
          // const matchesLaunched = this.isLaunched ? project.siteUrl !== null : true;
          return matchesStack;
        });
      }
    },
    components:{
        FilterStackChip
    },
    created(){
      this.loadLaunchProjectPage();
      window.addEventListener('scroll', this.scrollPagination); // 화면상에서 스크롤이 감지될 때 scrollPagination 호출
    },
    beforeUnmount(){
        window.removeEventListener('scroll', this.scrollPagination);
    },
    methods:{
      async loadLaunchProjectPage() {
        try {
          if (this.isLoading || this.isLastPage) return;
                  
          this.isLoading = true;

          let params = {
            size: this.pageSize,
            page: this.currentPage
          };

          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/list`, { params });
          console.log(response.data.content);
          
          const additionalData = response.data.content.map(p => ({
            ...p,
            techStacks: p.techStacks.join(' · ')
          }));

          if (additionalData.length === 0) {
            this.isLastPage = true;
          } else {
            this.projects = [...this.projects, ...additionalData]; // 기존 projects 배열에 추가
            this.currentPage++; // 페이지 증가
          }

          this.isLoading = false;
        } catch (error) {
          console.error("완성된 페이지 Pageable data load 에러 : ", error);
          this.isLoading = false;
        }
    },
    scrollPagination() {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (isBottom && !this.isLastPage && !this.isLoading) {
        this.loadLaunchProjectPage(); // 잘못된 함수명 수정
      }
    },
    moveToProject(projectId){
      this.$router.push('/launched-project/' + projectId).then(() => {
        // 페이지 이동 후 스크롤을 최상단으로 이동
        window.scrollTo(0, 0);
      });
    }
  }
}
</script>

<style scoped>
.custom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
.custom-height{
  max-height: 10px !important; /* 최소 높이 조정 */
  font-size: 14px !important; /* 글자 크기 조정 */
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
</style>