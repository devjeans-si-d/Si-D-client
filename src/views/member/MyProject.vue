<template>
    <v-container fluid class="custom-container">
      <PageNavbar
      :menus='[
          {"menu": "내 정보", "url": "/member/mypage", "selected": false},
          {"menu": "내 채팅", "url": "/member/chatting-list", "selected": false},
          {"menu": "내 프로젝트", "url": "/member/my-projects", "selected": true},
          {"menu": "신청 내역", "url": "/member/apply", "selected": false},
          {"menu": "스크랩", "url": "/member/scrap", "selected": false},
      ]'
      />
      
        <h2 style="text-align:center; margin: 20px;">내 프로젝트</h2>
        <ProjectManagementComponent
        :projectList="projectList"
        />
    </v-container>
  </template>


  
  <script>
  import PageNavbar from '@/components/navbar/PageNavbar.vue';
  import ProjectManagementComponent from '@/components/card/ProjectManagementComponent.vue';
  import axios from 'axios'

  export default {
    components: {
        PageNavbar,
        ProjectManagementComponent
    },
    data() {
        return {
            projectList: []
        }
    },
    methods: {
      moveToEdit() {
            this.$router.push("/member/edit");
        },
    },
    async created() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-projects`);
        console.log(response);
        this.projectList = response.data;
      } catch(e) {
        console.log(e);
      }
    }

  }
  </script>
  
  <style scoped>
  

.custom-container {
  max-width: 1200px !important; /* 원하는 최대 폭 */
  margin: 0 auto !important;    /* 중앙 정렬 */
  width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
}
</style>