<template>
    <v-container class="outer-box">
        <!-- <ProjectSidebar /> -->

              <v-container class="d-flex justify-center">
                  <v-card
                    class="apply-card"
                    v-for="project in projectList"
                    :key="project.id"
                    @click="spaMoveTo(project.projectId)"
                >
                    <v-img
                    height="200"
                    :src="project.imageUrl"
                    cover
                    ></v-img>
                    <v-card-title class="d-flex justify-space-between">
                        {{ project.projectName.substr(0, 7) }}
                        <span>
                            <BasicSmallChip :title="project.status" :color="this.getChipColor(project.status)" style="margin-right: 5px;"/>
                            <BasicSmallChip :title="project.jobField" :color="this.getJobColor(project.jobField)"/>
                        </span>
                    </v-card-title>
                    <v-card-text>
                        {{ project.description.substr(0,20) }}
                        <!-- <span style="font-size:small; color: gray;">...more</span> -->
                    </v-card-text>
                        
                </v-card>
              </v-container>
    </v-container>
</template>
<script>
// import BasicSmallChip from '@/components/chip/BasicSmallChip.vue';
import BasicSmallChip from '@/components/chip/BasicSmallChip.vue';
// import ProjectSidebar from '../navbar/ProjectSidebar.vue';

export default{
  props: ['projectList'],
  components: {
      BasicSmallChip,
  },
  data() {
      return {
          
      }
  },
  methods: {
      spaMoveTo(projectId) {
          // 이동하는 코드 구현
          this.$router.push('/project/' + projectId);
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
            if(job === 'BACKEND') {
                return 'be_blue';
            } else if(job === 'FRONTEND') {
                return 'fe_yellow';
            } else if(job === 'PM') {
                return 'pm_green';
            } else if(job === 'AOS') {
                return 'app_red';
            } else if(job === 'iOS') {
                return 'app_red';
            } else if(job === 'DESIGNER') {
                return 'de_purple';
            } else {
                return 'white';
            }
        },
        changePage(page) {
            this.currentPage = page;
        },

  },
  created() {
      
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


.my-project-card {
    color: "#FCFCFC";
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
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;
    justify-self: flex-end;
    width: 20px;
}

.outer-box {
    display: flex;
    width: 70%;
}

.my-project-card {
    width: 100%;
    background-color: #F6F6F6;
}

.apply-card {
    width: 33%;
    margin-left: 10px;
}

</style>