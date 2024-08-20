<template>
  <v-container fluid class="custom-container flex-container">
    <v-container class="outer-box">
      <!-- <ProjectSidebar /> -->

      <v-card class="sidebar" color="#F6F6F6" :key="this.currentMenu">
        <v-card-text class="sidebar-element" :class="{ 'selected-menu': this.currentMenu === 1 }"
          @click="changeMenu(1)">전체보기</v-card-text>
        <v-card-text class="sidebar-element" :class="{ 'selected-menu': this.currentMenu === 2 }"
          @click="changeMenu(2)">내가 리더(PM)로<br>참여한 프로젝트</v-card-text>
        <v-card-text class="sidebar-element" :class="{ 'selected-menu': this.currentMenu === 3 }"
          @click="changeMenu(3)">내가 팀원으로<br>참여한 프로젝트</v-card-text>
      </v-card>

      <v-card class="my-project-card" variant="elevated" :key="projectList">
        <v-card-text>
          <v-container>
            <v-row v-for="project in projectList" class="element-row" :key="project.projectId"
              @click="spaMoveToProject(project.projectId)">
              <v-col class="project-element">
                <img class="project-img" :src="project.imageUrl" height="100px" width="auto" overflow="hidden"
                  @click="this.$router.push(`/project/${project.projectId}`)" />
                <div class="project-content">
                  <div class="project-info">
                    <h3>{{ project.projectName }}</h3>
                    <p class="project-description">{{ project.description }}</p>
                    <div class="chip-wrap">
                      <BasicSmallChip :title="project.myJob" :color="this.getJobColor(project.myJob)" />
                    </div>
                    <div class="chip-wrap">
                      <v-btn v-if="project.myJob === 'PM' && project.isLaunched === 'N'" rounded="xl" size="small"
                        color="sid_green" @click.stop="moveToCreateLaunched(project.projectId)">
                        🚀Launched-Project로 등록
                      </v-btn>
                      <v-btn
                      v-if="project.myJob === 'PM' && project?.isClosed === 'N' && project.isLaunched === 'N'"
                      @click.stop="openModal(project.projectId)"
                      rounded="xl"
                      color="#ad3b4c"
                      size="small"
                      style="margin-left: 10px;"
                      >
                        마감
                      </v-btn>
                    </div>
                  </div>

                </div>

              </v-col>
              <v-col style="justify-self: flex-end; display: flex; justify-content: flex-end; padding-right: 50px">
                <div>
                  <p v-if="project.myJob === 'PM'" style="margin-bottom: 15px;">
                    <v-list-item-icon>
                      <v-icon size=x-large class="manage-project"
                        @click.stop="moveToApplyManagement(project.projectId)"> mdi-database </v-icon>
                    </v-list-item-icon>
                  </p>
                  <p v-if="project.myJob === 'PM'" style="margin-bottom: 15px;">
                    <v-list-item-icon>
                      <v-icon size=x-large class="manage-project" @click.stop="moveToEditProject(project.projectId)">
                        mdi-pencil-box-outline </v-icon>
                    </v-list-item-icon>
                  </p>
                </div>
              </v-col>
            </v-row>
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
              <v-pagination v-model="currentPage" :length="totalPage" class="my-4 pagination mb-2"
                total-visible="4"></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </v-container>

  <!-- 마감 모달 -->
<v-dialog v-model="closeDialog" width="500px">
  <v-card class="dialog-card">
    <v-card-title>
      프로젝트를 직접 마감하시겠습니까?
      </v-card-title>
      <v-card-text>
        <p>"마감하기" 버튼을 누르면 프로젝트가 마감돼요.</p>
        <p>프로젝트가 마감되면 현재 상태에서 팀 빌딩이 완료되며</p>
        <p>다시 모집 중 상태로 돌아갈 수 없어요.</p>
        <p>정말 모집을 마감하실 건가요?</p>
      </v-card-text>

      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="sid_btn1" text @click="closeDialog = false">닫기</v-btn>
      <v-btn color="sid_btn2" text @click="closeDeadline(this.closeProjectId)">마감하기</v-btn>
      </v-card-actions>
  </v-card>
</v-dialog>

  <!-- 마감 모달 -->
<v-dialog v-model="noticeDialog" width="500px">
  <v-card class="dialog-card">
    <v-card-title>
      마감되었습니다!
    </v-card-title>
      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="sid_btn1" @click="confirmAndReload()">확인</v-btn>
      </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script>
import BasicSmallChip from '@/components/chip/BasicSmallChip.vue';
import { mapGetters } from 'vuex'
import axios from 'axios';

export default {
  components: {
    BasicSmallChip,
  },
  data() {
    return {
      projectApplication: [],
      currentPage: 0,
      totalPage: 0,
      currentMenu: 1,
      projectList: [],
      closeDialog: false,
      noticeDialog: false,
      closeProjectId: 0,
    }
  },
  computed: {
    ...mapGetters(['getCurrentFilter']),
  },
  watch: {
    async currentPage() {
      const params = {
        size: 3,
        page: this.currentPage - 1
      };

      if (this.getCurrentFilter === 1) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects`, { params });
        this.projectList = response.data.content;


      } else if (this.getCurrentFilter === 2) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects/pm`, { params });
        this.projectList = response.data.content;
      } else {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects/team`, { params });
        this.projectList = response.data.content;
      }
    }
  },
  async created() {
    const params = {
      size: 3,
      page: this.currentPage
    };
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects`, { params });
    this.projectList = response.data.content;
    this.currentPage = response.data.page;
    this.totalPage = response.data.totalPages;
  },
  methods: {
    spaMoveToProject(projectId) {
      // 이동하는 코드 구현
      console.log(this.projectList);
      console.log(projectId);
      //   alert('지금은 임시로 홈으로 이동합니다..');
      //   this.$router.push('/member/project/apply');
    },
    openModal(projectId) {
      this.closeProjectId = projectId;
      this.closeDialog = true;
    },
    getChipColor(title) {
      if (title === '승인') {
        return 'sid_btn2';
      } else if (title === '마감') {
        return '#F15F5F';
      } else {
        return '#5D5D5D';
      }
    },
    async closeDeadline(projectId) {
      this.closeDialog = false;
      try {
        await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/api/project/${projectId}/deadline`);
      }
      catch (e) {
        console.log(e)
      }
      this.noticeDialog = true;
    },
    getJobColor(job) {
      if (job === 'Backend') {
        return 'be_blue';
      } else if (job === 'Frontend') {
        return 'fe_yellow';
      } else if (job === 'PM') {
        return 'pm_green';
      } else if (job === 'AOS') {
        return 'app_red';
      } else if (job === 'iOS') {
        return 'app_red';
      } else if (job === 'Designer') {
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
    confirmAndReload() {
      window.location.reload();
    },
    async changeMenu(menu) {
      if (menu === this.getCurrentFilter) return;

      this.currentMenu = menu;
      this.$store.dispatch('updateCurrentFilter', menu);

      const params = {
        size: 3,
        page: 0
      };

      if (this.getCurrentFilter === 1) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects`, { params });
        this.projectList = response.data.content;
        this.currentPage = 0;
        this.totalPage = response.data.totalPages;
        console.log(response);

      } else if (this.getCurrentFilter === 2) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects/pm`, { params });
        this.projectList = response.data.content;
        this.currentPage = 0;
        this.totalPage = response.data.totalPages;
        console.log(response);

      } else {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects/team`, { params });
        this.projectList = response.data.content;
        this.currentPage = 0;
        this.totalPage = response.data.totalPages;
        console.log(response);
      }
    }
  },

}
</script>
<style scoped>
.project-element {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
}

.manage-project:hover {
  opacity: 0.5;
  transition: 0.5s ease;
}

.element-row {
  border-bottom: 1px solid #D4D4D4;
  align-items: center;
}

.project-img {
  margin-right: 10px;
  width: 100px;
  height: 100px;
  background-color: black;
  text-align: center;
  overflow: hidden;
  object-fit: cover;
}

.project-img:hover {
  opacity: 0.7;
  transition: 0.5s ease;
  cursor: pointer;
}

.project-content {
  margin: 10px;
  display: flex;
  justify-content: flex-start;
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

.project-info {
  width: 270px;
}


.outer-box {
  display: flex;
  width: 70%;
}

.my-project-card {
  width: 75%;
  margin-left: 20px;
  background-color: #F6F6F6;
}

.sidebar {
  width: 25%;
  height: auto;
  text-align: center;
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
  max-width: 1200px !important;
  /* 원하는 최대 폭 */
  margin: 0 auto !important;
  /* 중앙 정렬 */
  width: 100% !important;
  /* 컨테이너의 폭을 100%로 설정 */
}
</style>