<template>
    <v-container class="custom-container">
      <PageNavbar
      :menus='[
          {"menu": "내 정보", "url": "/member/mypage", "selected": false},
          {"menu": "신청 내역", "url": "/member/apply", "selected": false},
          {"menu": "스크랩한 프로젝트", "url": "/member/scrap", "selected": true},
      ]'
      />
      
        <h2 style="text-align:center; margin: 20px;">📔 스크랩한 프로젝트</h2>
        <v-container class="outer-box">

          <v-container class="d-flex">
              <v-card
                class="mx-auto"
                v-for="project in projectList"
                :key="project.id"

                >
                <v-img
                height="200"
                :src="project.imageUrl"
                @click="spaMoveTo(project.id)"
                cover
                class="scrap-img"
                ></v-img>
                <v-card-title>
                    {{ project.projectName }}
                </v-card-title>
                <v-card-text>
                     <p>{{ project.description.substr(0, 7) }} <span style="font-size:small; color: gray;">...more</span></p>
                     <p style="font-size:small; color: gray;">모집 마감: </p>
                     <p style="font-size:small; color: gray;">{{ this.getDay(project.deadline) }} {{ this.getTime(project.deadline) }}</p>
                </v-card-text>
      
                <v-card-text  class="d-flex justify-space-between align-center">
                  <BasicChip :title="this.getProjectStatus(project.isClosed)" :color="this.getChipColor(project.isClosed)"/>
                  <v-icon style="margin-left: 15px" size="x-large" icon="mdi-bookmark" class="scrap-icon" @click="this.cancelBookmark(project.id)"></v-icon>
                </v-card-text>
            </v-card>
          </v-container>
      </v-container>
      
      <!-- 모달 -->
      <v-dialog v-model="dialog" width="500px">
      <v-card class="dialog-card">
          <v-card-title>
              북마크를 취소하시겠습니까?
              </v-card-title>
      
              <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="sid_btn1" text @click="dialog = false">닫기</v-btn>
              <v-btn color="sid_btn2" text @click="confirmCancel()">북마크 취소</v-btn>
              </v-card-actions>
      </v-card>
      
      </v-dialog>


        <!-- 페이지네이션 -->
        <div class="text-center self-center">
          <v-container>
          <v-row justify="center">
              <v-col cols="8">
              <v-container class="max-width">
                  <v-pagination
                  v-model="currentPage"
                  :length="totalPage"
                  class="my-4"
                  total-visible="100"
                  ></v-pagination>
              </v-container>
              </v-col>
          </v-row>
          </v-container>
      </div>
    </v-container>
  </template>


  
  <script>
  import axios from 'axios';
  import PageNavbar from '@/components/navbar/PageNavbar.vue';
  // import ProjectScrapComponent from '@/components/card/ProjectScrapComponent.vue';

  export default {
    components: {
        PageNavbar,
        // ProjectScrapComponent,
    },
    data() {
      return {
        projectList: [],
        currentPage: 0,
        totalPage: 0,
        dialog: false,
      }
    },
    methods: {
      moveToEdit() {
            this.$router.push("/member/edit");
        },
        spaMoveTo(projectId) {
            this.$router.push('/project/' + projectId);
        },
        getChipColor(title) {
            if(title === 'Y') {
                return '#F15F5F';
            } else {
                return 'sid_btn2';
            }
        },
        getJobColor(job) {
            if(job === 'Backend') {
                return 'be_blue';
            } else if(job === 'Frontend') {
                return 'fe_yellow';
            } else if(job === 'PM') {
                return 'pm_green';
            } else if(job === 'AOS') {
                return 'app_red';
            } else if(job === 'iOS') {
                return 'app_red';
            } else if(job === 'Designer') {
                return 'de_purple';
            } else {
                return 'white';
            }
        },
        getProjectStatus(yn) {
            if(yn == 'Y') {
                return '마감';
            } else {
                return '진행 중';
            }
        },
        cancelBookmark(id) {
            this.dialog = true;
            this.cancelId = id;
        },
        async confirmCancel() {
            try {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.cancelId}/scrap/delete`);
            } catch(e) {
                console.log(e);
            }
            this.dialog = false;
            window.location.reload();
        },
        getDay(deadline) {
            const createdTime = new Date(deadline);

            return `${createdTime.getFullYear()}년 ${createdTime.getMonth()}월 ${createdTime.getDate()}일`; 
        },
        getTime(deadline) {
            const createdTime = new Date(deadline);
            let hour = createdTime.getHours();
            let minute = createdTime.getMinutes();
            let ampm;
            if(hour < 12) {
                ampm = '오전'
            } else {
                ampm = '오후'
                hour -= 12;
            }
            if(hour < 10) {
                hour = '0'+hour;
            }

            if(minute < 10) {
                minute = '0'+minute;
            }

            return ampm + ' ' + hour + ':' + minute;
        },
    },
    watch: {
      async currentPage() {

        try {
            const params = {
              size: 3,
              page: this.currentPage-1
            }
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/scrap`, {params});
            this.projectList = response.data.content;
            } catch(e) {
            console.log(e);
          }
      },
    },
    async created() {
      const params = {
        size: 3,
        page: 0
      };

      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/scrap`, { params });
      this.projectList = response.data.content;
      this.currentPage = 1;
      this.totalPage = response.data.totalPages;
    },

  }
  </script>
  
  <style scoped>

  /* 중앙 정렬을 위한 스타일 */
  .text-center {
    text-align: center;
    width: 300px;
    padding-bottom: 20px;
    padding-top: 20px;
    font-weight: bold;
  }

.custom-container {
  max-width: 1200px !important; /* 원하는 최대 폭 */
  margin: 0 auto !important;    /* 중앙 정렬 */
  width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
}

.self-center {
  margin: auto;
}

.outer-box {
  display: flex;
  width: 70%;
}

.scrap-icon:hover {
  color: grey;
  justify-self: flex-end;
  
}
</style>