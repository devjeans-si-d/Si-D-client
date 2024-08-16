<template>
    <v-container fluid class="custom-container flex-container">
      
        <h2 style="text-align:center; margin: 20px;">내 프로젝트</h2>
        <ProjectManagementComponent
        :projectList="projectList"
        :key="currentPage"
        ref="myProjectComponent"
        />


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
  import ProjectManagementComponent from '@/components/card/ProjectManagementComponent.vue';
  import axios from 'axios'

  export default {
    components: {
        ProjectManagementComponent
    },
    data() {
        return {
            projectList: [],
            currentPage: 0,
            totalPage: 0,
        }
    },
    methods: {
      moveToEdit() {
            this.$router.push("/member/edit");
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
          this.$refs.myProjectComponent.changePage(this.currentPage);
        },
    },
    watch: {
      currentPage() {
        this.onPageChange(this.currentPage);
      },
    },
    async created() {

      try {

        const params = {
          size: 3,
          page: this.currentPage
        }
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects`, { params });
        
        this.projectList = response.data.content;
        this.totalPage = response.data.totalPage;
      } catch(e) {
        console.log(e);
      }
      
      
    }

  }
  </script>
  
<style scoped>
.self-center {
  margin: auto;
}

.custom-container {
  max-width: 1200px !important; /* 원하는 최대 폭 */
  margin: 0 auto !important;    /* 중앙 정렬 */
  width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
}
</style>