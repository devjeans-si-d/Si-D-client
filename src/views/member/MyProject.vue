<template>
        <h2 style="text-align:center; margin: 20px;">내 프로젝트</h2>
        <ProjectManagementComponent
        :projectList="projectList"
        :key="currentPage"
        ref="myProjectComponent"
        />

  </template>


  
  <script>
  // import PageNavbar from '@/components/navbar/PageNavbar.vue';
  import ProjectManagementComponent from '@/components/card/ProjectManagementComponent.vue';


  export default {
    components: {
        // PageNavbar,
        ProjectManagementComponent
    },
    data() {
        return {
        }
    },
    methods: {
      moveToEdit() {
            this.$router.push("/member/edit");
        },
    },
  
    async created() {    
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