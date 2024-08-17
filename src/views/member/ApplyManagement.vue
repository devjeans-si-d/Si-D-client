<template>
    <v-container fluid class="custom-container">
    <div class="outer-box2">
        
        <v-col cols="4">
        <v-card class="sidebar" color="#F6F6F6" :key="this.currentMenu">
            <v-img
            height="200px"

            :src="this.projectInfo.imageUrl"
            cover
          ></v-img>
            <v-card-title>{{this.projectInfo.projectName}}</v-card-title>
            <v-card-text>{{this.projectInfo.projectName}}의 지원자 목록이에요.</v-card-text>
            <v-card-text>모집 마감일: 
                <p>{{this.getDay(this.projectInfo.deadline)}} {{this.getTime(this.projectInfo.deadline)}}</p>

                </v-card-text>
        </v-card>
        </v-col>
        <v-card class="my-project-card" variant="elevated" :key="projectList">
          <v-card-text>
              <v-container v-for="apply, index in applyList" class="element-row" :key="index">
                <div class="project-img">
                    <img :src="apply.profileImageUrl" height="100px" width="auto" overflow="hidden">
                </div>


              <v-container>
                    <v-row class="d-flex justify-space-between">
                        <h3>{{ apply.name }}</h3>
                        <v-btn
                        v-if="apply.status === '승인 대기'"
                        rounded="xl"
                        size="small"
                        color="sid_green"
                        style="justify-content: flex-end;"
                        >승인하기</v-btn>

                        <v-btn
                        v-if="apply.status === '승인 완료'"
                        rounded="xl"
                        size="small"
                        color="#CC3D3D"
                        style="justify-self: flex-end;"
                        >승인 취소하기</v-btn>
                    <!-- <p class="project-description">{{ project.description }}</p> -->
                    </v-row>


                    <v-row class="d-flex mt-5">
                        <!-- <v-spacer :style="{height: '10px'}"></v-spacer> -->
                        <BasicSmallChip style="margin-right: 10px" :title="apply.jobField" :color="this.getJobColor(apply.jobField)"/>
                        <BasicSmallChip :title="apply.status" :color="this.getStatusColor(apply.status)"/>
                    </v-row>
                </v-container>
        </v-container>
          </v-card-text>
      </v-card>
    </div>

                <!-- 페이지네이션 -->
      <div class="text-center self-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="currentPage"
                  :length="totalPage"
                  class="my-4 pagination mb-2"
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
import BasicSmallChip from '@/components/chip/BasicSmallChip.vue';
import { mapGetters } from 'vuex'
import axios from 'axios';
import { useRoute } from 'vue-router';
// import ProjectSidebar from '../navbar/ProjectSidebar.vue';
// import ButtonComponent from '../button/ButtonComponent.vue';

export default{
  components: {
      BasicSmallChip,
    //   ProjectSidebar,
    //   ButtonComponent /my-projects/pm
  },
  data() {
      return {
        applyList: [],
        currentPage: 0,
        projectId: 0,
        projectInfo: {projectName: " "},
      }
  },
  computed: {
      ...mapGetters(['getCurrentFilter']),
    },
    watch: {
       async currentPage() {
        const params = {
                    size: 3,
                    page: this.currentPage-1
            }

            if(this.getCurrentFilter === 1) {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects`, { params });
                this.projectList = response.data.content;


            } else if(this.getCurrentFilter === 2) {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects/pm`, { params });
                this.projectList = response.data.content;
            } else {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects/team`, { params });
                this.projectList = response.data.content;
            }
       } 
    },
    async created() {
        const route = useRoute();
        this.projectId = route.params.projectId;

        const params = {
                    size: 3,
                    page: this.currentPage
        };
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}/applicants`, { params });
        this.applyList = response.data.content;
        this.currentPage = response.data.page;
        this.totalPage = response.data.totalPages;
        
        const projectRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}`);
        this.projectInfo = projectRes.data;
        console.log(this.projectInfo);
    },
  methods: {
      spaMoveToProject(projectId) {
          // 이동하는 코드 구현
          console.log(this.projectList);
          console.log(projectId);
        //   alert('지금은 임시로 홈으로 이동합니다..');
        //   this.$router.push('/member/project/apply');
      },
      getStatusColor() {

      },
      async onPageChange() {
          try {
            const params = {
              size: 3,
              page: this.currentPage-1
            }
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects`, {params});
            console.log(response);
            this.projectList = response.data.content;
            } catch(e) {
            console.log(e);
          }
        },
      getChipColor(title) {
            if(title === '승인') {
                return 'sid_btn2';
            } else if(title === '마감') {
                return '#F15F5F';
            } else {
                return '#5D5D5D';
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
        moveToCreateLaunched(projectId) {
            this.$router.push('/launched-project/register/' + projectId);
        },
        moveToEditProject(projectId) {
            this.$router.push('/project-edit/' + projectId);
            
        },
        moveToApplyManagement(projectId) {
            this.$router.push('/member/project/apply/' + projectId);
        },
        spaMoveTo(destination) {
            this.$router.push(destination);
        },
        async changeMenu(menu) {
            if(menu === this.getCurrentFilter) return;

            this.currentMenu = menu;
            this.$store.dispatch('updateCurrentFilter', menu);
            console.log('getCurrent: ', this.getCurrentFilter);

            const params = {
                    size: 3,
                    page: this.currentPage
            };

            if(this.getCurrentFilter === 1) {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects`, { params });
                this.projectList = response.data.content;
                this.currentPage = response.data.page;
                this.totalPage = response.data.totalPages;

            } else if(this.getCurrentFilter === 2) {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects/pm`, { params });
                this.projectList = response.data.content;
                this.currentPage = response.data.page;
                this.totalPage = response.data.totalPages;

            } else {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects/team`, { params });
                this.projectList = response.data.content;
                this.currentPage = response.data.page;
                this.totalPage = response.data.totalPages;
            }
        },
        getTime(createdAt) {
            const createdTime = new Date(createdAt);
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
        getDay(createdAt) {
            const createdTime = new Date(createdAt);

            return `${createdTime.getFullYear()}년 ${createdTime.getMonth()}월 ${createdTime.getDate()}일`; 
        }
  },

}
</script>
<style scoped>
.project-element {
  display: flex;
  justify-content: space-between;
}

.flex-div {
    display: flex;
}

.manage-project:hover {
    color: "indigo darken-4";
}

.element-row {
    border-bottom: 1px solid #D4D4D4;
    align-items: center;
    display: flex;
}

.project-img {
  margin-right: 25px;
  width: 100px;
  height: 100px;
  background-color: black;
  text-align: center;
}

.project-content {
  margin: 10px;
  display: flex;
  width: 100%;
}

.project-description {
  margin-top: 3px;
  font-size: 12px;
  color: #5D5D5D;
}

.chip-wrap {
  margin-top: 10px;
  justify-self: flex-end;
}

/*.project-element:hover {
  opacity: 0.7;
  cursor:pointer;
  transition: 0.5s ease-out;
}*/
    


.outer-box2 {
    display: flex;
    align-content: center;
    margin: auto;
    width: 80%
}

.my-project-card {
    background-color: #F6F6F6;
    height: 100%;
    width: 75%;
}

.sidebar {
    align-self:center;
    /*margin: auto;*/
}

.sidebar-element:hover {
    font-weight: bold;
}

.selected-menu {
    font-weight: bold;
    color: #094F08;
    font-size: medium;
}

.self-center {
    margin: auto;
  }
  
.custom-container {
    max-width: 1200px !important; /* 원하는 최대 폭 */
    margin: 0 auto !important;    /* 중앙 정렬 */
    width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
}
</style>