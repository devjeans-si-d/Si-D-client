<template>
    <v-container class="outer-box">
        <ProjectSidebar />
      <v-card class="my-project-card" variant="elevated">
          <v-card-text>
              <v-container>
                  <v-row v-for="project in projectList" class="element-row" :key="project.name" @click="spaMoveTo(project.id)">
                      <v-col class="project-element">
                          <div class="project-img">
                              <img :src="project.imageUrl" height="100px" width="auto" overflow="hidden">
                          </div>
                          <div class="project-content">
                            <div class="project-info">
                                <h3>{{ project.projectName }}</h3>
                                <p class="project-description">{{ project.description }}</p>
                                <div class="chip-wrap">
                                    <BasicSmallChip :title="project.myJob" :color="this.getJobColor(project.myJob)"/>
                                </div>
                                <div class="chip-wrap">
                                    <v-btn rounded="xl"
                                    size="small"
                                    color="sid_green"
                                    @click.stop="this.$router.push('/');">
                                    🧪Launched-Lab 등록
                                </v-btn>
                                </div>
                            </div>
                              
                          </div>

                      </v-col>
                      <v-col style="justify-self: flex-end; display: flex; justify-content: flex-end; padding-right: 50px">
                        <div>
                        <p v-if="project.myJob === 'PM'" style="margin-bottom: 15px;">
                            <v-list-item-icon>
                            <v-icon
                            size=x-large
                            class="manage-project"
                            @click.stop="this.$router.push('/');"
                            > mdi-database </v-icon>
                          </v-list-item-icon>
                        </p>
                        <p v-if="project.myJob === 'PM'">
                            <v-list-item-icon>
                            <v-icon
                            size=x-large
                            class="manage-project"
                            @click.stop="this.$router.push('/');"
                            > mdi-pencil-box-outline </v-icon>
                          </v-list-item-icon>
                        </p>
                    </div>
                      </v-col>
                  </v-row>
              </v-container>
          </v-card-text>
      </v-card>
    </v-container>
</template>
<script>
import BasicSmallChip from '@/components/chip/BasicSmallChip.vue';
import ProjectSidebar from '../navbar/ProjectSidebar.vue';
// import ButtonComponent from '../button/ButtonComponent.vue';

export default{
  props: ['projectList'],
  components: {
      BasicSmallChip,
      ProjectSidebar,
    //   ButtonComponent
  },
  data() {
      return {
        projectApplication: [],
        currentPage: 0
      }
  },
  methods: {
      spaMoveTo(projectId) {
          // 이동하는 코드 구현
          console.log(projectId);
        //   alert('지금은 임시로 홈으로 이동합니다..');
        //   this.$router.push('/member/project/apply');
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
        changePage(page) {
            this.currentPage = page;
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
    color: "indigo darken-4";
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

}

.my-project-card {
    width: 100%;
    margin-left: 20px;
    background-color: #F6F6F6;
}

</style>