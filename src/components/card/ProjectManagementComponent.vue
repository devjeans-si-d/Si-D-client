<template>
    <v-container class="outer-box">
        <ProjectSidebar />
      <v-card class="my-page-card" color="#F3F3F3">
          <v-text>
              <v-container>
                  <v-row v-for="project in projectList" :key="project.name" @click="spaMoveTo(project.id)">
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
                      </v-col>
                  </v-row>
              </v-container>
          </v-text>
      </v-card>
    </v-container>
</template>
<script>
import BasicSmallChip from '@/components/chip/BasicSmallChip.vue';
import ProjectSidebar from '../navbar/ProjectSidebar.vue';

export default{
  props: ['projectList'],
  components: {
      BasicSmallChip,
      ProjectSidebar
  },
  data() {
      return {
          
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
        }
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


.outer-box {
    display: flex;
}

.my-page-card {
    min-width: 550px;
}

</style>