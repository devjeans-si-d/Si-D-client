<template>
    <v-container fluid class="custom-container">
    <v-container class="outer-box2">
        
        <v-card class="sidebar" color="#F6F6F6" :key="this.currentMenu">
            <v-img
            height="200px"

            :src="this.projectInfo.imageUrl"
            cover
          ></v-img>
            <v-card-title>{{this.projectInfo.projectName}}</v-card-title>
            <v-card-text>{{this.projectInfo.projectName}}의 지원자 목록이에요.</v-card-text>
            <v-card-text style="color: gray;">
                모집 마감일: <br>
                {{this.getDay(this.projectInfo.deadline)}} {{this.getTime(this.projectInfo.deadline)}}
                </v-card-text>
        </v-card>
        <v-card class="my-project-card" variant="elevated" :key="projectList">
          <v-card-text>
            <span v-if="applyList.length == 0">아직은 지원자가 없네요. 📨</span>
              <v-container v-for="apply, index in applyList" class="element-row" :key="index">
                <div class="project-img"  @click="applymentModal(apply.id, apply.name, apply.content)">
                    <img :src="apply.profileImageUrl" height="100px" width="100px" style="object-fit: cover; border-radius: 50px;" overflow="hidden">
                </div>


              <v-container>
                    <v-row class="d-flex justify-space-between">
                        <h3>{{ apply.name }}</h3>
                        <div>
                        <v-btn
                        v-if="apply.status === '승인 대기'"
                        rounded="xl"
                        size="small"
                        color="sid_green"
                        style="margin-right: 30px;"
                        @click="accept(this.projectInfo.id, apply.id)"
                        >승인</v-btn>

                        </div>
                        <p v-if="apply.status === '승인 완료'">🍀 승인된 지원자</p>
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
    </v-container>

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



<!-- 모달 1 -->
<v-dialog v-model="this.acceptDialog" width="500px">
    <v-card class="dialog-card" style="text-align: center">
        <v-card-title>
            프로젝트 멤버로 초대하시겠습니까?
        </v-card-title>
        <v-card-text>
            승인하면 지원자에게 승인 되었다는 메일이 발송돼요.
            <br>
            신중하게 결정해주세요!
        </v-card-text>
    
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="sid_btn2" text @click="acceptDialog = false">닫기</v-btn>
            <v-btn color="sid_btn2" text @click="acceptComfirm">승인하기</v-btn>
            </v-card-actions>
    </v-card>
</v-dialog>

<!-- 모달 2 -->
<v-dialog v-model="this.acceptLoadingDialog" width="500px">
    <v-card class="dialog-card" style="text-align: center">
        <v-card-title>
            승인 처리 중입니다...
        </v-card-title>
    </v-card>
</v-dialog>


<!-- 모달 3: 지원서 -->
<v-dialog v-model="this.applyDialog" width="500px">
    <v-card class="dialog-card" style="text-align: center">
        <v-card-title>
            지원서
        </v-card-title>
        <v-card-text>
            <b>닉네임:</b> {{ this.currentMemberName }}
        </v-card-text>
        <!-- <v-card-text style="white-space:pre;"> -->
            <b>지원 내용:</b> <br>
            <div class="apply-content-div">
                {{ this.currentContent }}
            </div>
        <!-- </v-card-text> -->
        <v-btn style="width: 30%; margin: auto;" color="sid_btn2" @click="this.$router.push('/sider-card/' + this.currentMemberId)">사이더카드 보러가기</v-btn>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="sid_btn1" text @click="applyDialog = false">닫기</v-btn>
            </v-card-actions>
    </v-card>
</v-dialog>

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
        acceptDialog: false,
        acceptLoadingDialog: false,
        applyDialog: false,
        apId: 0,
        amId: 0,
        currentContent: "",
        currentMemberName: "",
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
    },
  methods: {
      getStatusColor(title) {
        if(title === '승인 완료') {
            return 'sid_btn2';
        } else if(title === '승인 대기') {
            return '#5D5D5D';
        }
      },
      async accept(projectId, memberId) {
        this.amId = memberId;
        this.apId = projectId;
        this.acceptDialog = true;
      },
      async cancel(projectId, memberId) {
        this.amId = memberId;
        this.apId = projectId;
        this.cancelDialog = true;

      },
      async acceptComfirm() {
        const body = {
            "projectId": this.apId,
            "applicantId":  this.amId
        };

        try {
            this.acceptDialog = false;
            this.acceptLoadingDialog = true;
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/project/applicant/accept`, body);
            window.location.reload();
        } catch(e) {
            console.log(e);
        }

        this.amId = 0;
        this.apId = 0;
      },
      async onPageChange() {
          try {
            const params = {
              size: 3,
              page: this.currentPage-1
            }
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects`, {params});
            this.projectList = response.data.content;
            } catch(e) {
            console.log(e);
          }
        },

        getJobColor(job) {
            if(job === 'Backend') {
                return 'be_blue';
            } else if(job === 'Frontend') {
                return 'fe_yellow';
            } else if(job === 'PM') {
                return 'pm_green';
            } else if(job === 'App') {
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
            let hour = createdAt[3];
            let minute = createdAt[4];
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
            return `${createdAt[0]}년 ${createdAt[1].toString().padStart(2, "0")}월 ${createdAt[2].toString().padStart(2, "0")}일`; 
        },
        applymentModal(id, name, description) {
            this.currentMemberId = id;
            this.currentMemberName = name;
            this.currentContent = description;
            this.applyDialog = true;
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
  object-fit: cover;
  border-radius: 50px;
}

.project-img:hover {
    opacity: 0.7;
    cursor:pointer;
    transition: 0.5s ease-out;
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
    min-height: 400px;
}

.sidebar {
    align-self:center;
    height: 100%;
    width: 30%;
    margin-right: 20px;
    min-height: 400px;
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

.apply-content-div {
    width:480px !important;
    height: 80px !important;
    overflow-y: auto !important;
}
</style>
