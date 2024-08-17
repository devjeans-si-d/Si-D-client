<template>
    <v-container class="outer-box">

    <v-container class="d-flex">
        <v-card
          class="mx-auto"
          max-width="400"
          v-for="project in projectList" :key="project.id"

      >
          <v-img
          height="200"
          :src="project.imageUrl"
          cover
          @click="spaMoveTo(project.id)"
          class="scrap-img"
          ></v-img>
          <v-card-title>
              {{ project.projectName }}
          </v-card-title>
          <v-card-text>
               <p>{{ project.description }}</p>
               <p style="font-size:small; color: gray;">{{ this.getDay(project.deadline) }} {{ this.getTime(project.deadline) }}</p>
          </v-card-text>
              
          <!-- <v-btn color="orange" text="Share"></v-btn>
          <v-btn color="orange" text="Explore"></v-btn> -->

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
</template>
<script>
import BasicChip from '@/components/chip/BasicChip.vue';
// import ProjectSidebar from '../navbar/ProjectSidebar.vue';
import axios from 'axios';

export default{
  props: ['projectList'],
  components: {
      BasicChip,
    //   ProjectSidebar,
  },
  data() {
      return {
        dialog: false,
        cancelId: 0,
      }
  },
  methods: {
        spaMoveTo(projectId) {
            // 이동하는 코드 구현
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
  created() {
      console.log(this.projectList);
  }

}
</script>
<style scoped>
.project-element {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  border-bottom: 1px solid #D4D4D4;
  align-items: center;
}

.scrap-img:hover {
    opacity: 0.7;
    cursor:pointer;
    transition: 0.5s ease-out;
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
  justify-content: flex-start;
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
    justify-content: flex-end;
}

.outer-box {
    display: flex;
    width: 70%;
}

.my-project-card {
    margin-left: 20px;
    width: 100%;
    background-color: #F6F6F6;
}

.dialog-card {
    display: flex;
    justify-content: center;
    text-align: center
}

.scrap-icon:hover {
    color: grey;
    justify-self: flex-end;
    
}
</style>