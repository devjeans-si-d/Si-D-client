<template>

        <h2 style="text-align:center; margin: 20px;">🗂️ 내 프로젝트 <BasicSmallChip @click="infoModal = true" title="?" :color="sid_green"/></h2>
        
        <div style="margin: auto; text-align:center; border-bottom: 1px solid #D4D4D4; width: 70%;">

        <br>
        </div>

        <ProjectManagementComponent
        :projectList="projectList"
        :key="currentPage"
        ref="myProjectComponent"
        />

<!-- 모달 -->
<v-dialog v-model="infoModal" width="500px">
  <v-card class="dialog-card">
      <v-card-title>
        🍀"내 프로젝트" 페이지에는 어떤 기능이 있나요?
      </v-card-title>
      <v-card-text>
        <p>내가 참여한 프로젝트 목록이에요.</p>
        <p>PM(프로젝트 리더)로 참여한 프로젝트와</p>
        <p>팀원으로 참여한 프로젝트로 나누어 볼 수 있어요.</p>
        <br>

        <p>
          
        </p>
      </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="sid_btn1" text @click="infoModal = false">확인</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
  </template>


  
  <script>
  import ProjectManagementComponent from '@/components/card/ProjectManagementComponent.vue';
  import BasicSmallChip from '@/components/chip/BasicSmallChip.vue';


  export default {
    components: {
        ProjectManagementComponent,
        BasicSmallChip
    },
    data() {
        return {
          infoModal: false,
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