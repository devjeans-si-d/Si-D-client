<template>
  <v-container fluid class="custom-container">
      <v-spacer :style="{height: '20px'}"></v-spacer>
      <h1 style="text-align:center; color:#094F08;">Team Building</h1>

      <v-spacer :style="{height: '20px'}"></v-spacer>
      <v-row class="d-flex justify-space-between">
          <v-sheet class="py-4 px-1">
            <v-chip-group v-model="selectedJobfield" selected-class="text-primary" mandatory>
              <v-chip value="전체" color="#094F08" size="large" filter>전체</v-chip>
              <v-chip value="FRONTEND" color="#094F08" size="large" filter>프론트엔드</v-chip>
              <v-chip value="BACKEND" color="#094F08" size="large" filter>백엔드</v-chip>
              <v-chip value="APP" color="#094F08" size="large" filter>앱</v-chip>
              <v-chip value="DESIGNER" color="#094F08" size="large" filter>디자인</v-chip>
            </v-chip-group>
          </v-sheet>
          <!-- <v-spacer></v-spacer> -->
          <v-btn small icon style="bottom: -60px; right:20px; font-size: 14px;"
          color="secondary"
          text :to="{path:'/project-create'}"
          >
          <v-tooltip activator="parent" location="top">프로젝트 모집 글 쓰기</v-tooltip>
          <v-icon>mdi-pencil</v-icon>
          </v-btn>
      </v-row>

      <v-spacer :style="{height: '10px'}"></v-spacer>

  <v-row>
    <v-switch v-model="isClosed" label="마감공고까지 표시" class="ml-1 mr-3" color="#A4DEC6"></v-switch>
    <v-chip-group v-model="sorted" selected-class="text-primary" mandatory>
      <v-chip value="recent" class="ma-1" color="#094F08" size="large" filter>최신 순</v-chip>
      <v-chip value="views" class="ma-1" color="#094F08" size="large" filter>조회 순</v-chip>
      <v-chip value="scraps" class="ma-1" color="#094F08" size="large" filter>스크랩 순</v-chip>
    </v-chip-group>
  </v-row>
      

      <v-spacer :style="{height: '30px'}"></v-spacer>
      
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
                    :src="project.imageUrl"
                    cover
                />

                <v-card-title class="d-flex justify-space-between align-center">
                    <span class="custom-contents">{{ project.projectName }}</span>
                    <v-chip color="primary" text-color="white">
                      <v-icon>mdi-bookmark</v-icon> {{ project.scrapCount }}
                    </v-chip>
                </v-card-title>

                <v-card-subtitle class="pt-3; custom-contents">
                  <div>{{ project.description }}</div>
                </v-card-subtitle>

                <v-card-subtitle class="pt-2 custom-contents">
                  <div class="mb-4">
                    <v-chip
                      v-for="(info, index) in project.recruitInfos"
                      :key="index"
                      color="#094F08"
                      size="small"
                    >
                      {{ info.jobField }} 
                    </v-chip>
                  </div>
                </v-card-subtitle>
                
              </v-card>
          </v-col>
      </v-row>

  </v-container>

</template>

<script>
import axios from 'axios';

export default{
  data() {
      return {
        selectedJobfield: '전체',  // 기본값: 전체
        isClosed : false, // 기본값: 마감된 공고까지 표시 false
        sorted: 'recent', // 기본값: 조회수 정렬
        projects: [],
        recruitInfos: []
      };
  },
  computed: {
  filteredProjects() {
    return this.projects.filter(project => {
      const matchesJobfield = this.selectedJobfield === '전체' || 
        project.recruitInfos.some(info => info.jobField === this.selectedJobfield);
      const matchesClosed = this.isClosed || project.isClosed === 'N';
      
      return matchesJobfield && matchesClosed;
    });
  }
},
  watch: {
    sorted(newValue) {
            this.sorted = newValue;
            this.projects = [];
            this.currentPage = 0;
            this.isLastPage = false;
            this.loadProjectList();
        }

  },
  components:{
  },
  created(){
    this.loadProjectList();
    window.addEventListener('error', (e) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        e.stopImmediatePropagation();
      }
    });
  },
  methods:{
    async loadProjectList() {
      try {
        let params = {
          sorted: this.sorted
        };

        console.log(params);
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/listAll`, { params });
        console.log(response.data);
        
        this.projects = response.data;
      } catch (error) {
        console.error("프로젝트 리스트 data load 에러 : ", error);
      }
  },
  moveToProject(projectId){
    this.$router.push('/project/' + projectId).then(() => {
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