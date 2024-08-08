<template>
    <v-container class="outer-box">
        <ProjectSidebar />
      <v-card class="my-page-card" color="#F3F3F3">
          <v-text>
              <v-container>
                  <v-row v-for="project in projectList" :key="project.projectId">
                      <v-col class="project-element">
                          <div class="project-img">
                              <img :src="project.imageUrl" height="100px" width="auto" overflow="hidden">
                          </div>
                          <div class="project-content">
                            <div class="project-info">
                                <h3>{{ project.name }}</h3>
                                <p class="project-description">{{ project.content }}</p>
                                <div class="chip-wrap">
                                    <BasicSmallChip :title="project.myJob" :color="this.getJobColor(project.myJob)"/>
                                </div>
                            </div>
                          </div>
                          <v-col class="project-status">
                            <BasicChip :title="project.status" :color="this.getChipColor(project.status)"/>
                            <!--mdi-->
                            <v-icon icon="mdi-bookmark" class="scrap-icon" @click="this.cancelBookmark(project.projectId)"></v-icon>
                          </v-col>
                      </v-col>

                  </v-row>
              </v-container>
          </v-text>
      </v-card>
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
                <v-btn color="sid_btn2" text @click="confirmCancel">북마크 취소</v-btn>
              </v-card-actions>
        </v-card>

     </v-dialog>
</template>
<script>
import BasicSmallChip from '@/components/chip/BasicSmallChip.vue';
import BasicChip from '@/components/chip/BasicChip.vue';
import ProjectSidebar from '../navbar/ProjectSidebar.vue';

export default{
  props: ['projectList'],
  components: {
      BasicSmallChip,
      BasicChip,
      ProjectSidebar,
  },
  data() {
      return {
        dialog: false
      }
  },
  methods: {
      spaMoveTo(projectId) {
          // 이동하는 코드 구현
          console.log(projectId);
          alert('지금은 임시로 홈으로 이동합니다..');
          this.$router.push('/');
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
        cancelBookmark(id) {
            console.log(id);
            this.dialog = true;
        },
        confirmCancel(id) {
            console.log(id + " 취소 api 호출");
            this.dialog = false;
            window.location.reload();
        },
  },
  created() {
      console.log(this.projectList);
  }

}
</script>
<style>
.project-element {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  border-bottom: 1px solid #D4D4D4;
  align-items: center;
}

.project-img {
  margin-right: 10px;
  width: 100px;
  height: 100px;
  background-color: black;
  text-align: center;
}

.project-content {
  margin: 10px;
  display: flex;
  justify-content: start;
}

.project-description {
  margin-top: 3px;
  font-size: 12px;
  color: #5D5D5D;
}

.chip-wrap {
  margin-top: 10px;
}

.project-element:hover {
  opacity: 0.7;
  /*filter: brightness(1.1);*/
  cursor:pointer;
  transition: 0.5s ease-out;
}

.project-info {
    width: 270px;
}

.project-status {
    align-items: center;
    margin-right: 10px;
    display: flex;
    justify-content: space-evenly;
}

.outer-box {
    display: flex;
}

.my-page-card {
    min-width: 600px;
}

.dialog-card {
    display: flex;
    justify-content: center;
    text-align: center
}

.scrap-icon:hover {
    color: grey;
}
</style>