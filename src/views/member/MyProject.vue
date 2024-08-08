<template>
    <v-container>
      <PageNavbar
      :menus='[
          {"menu": "내 정보", "url": "/member/mypage", "selected": false},
          {"menu": "내 채팅", "url": "/member/chatting-list", "selected": false},
          {"menu": "내 프로젝트", "url": "/member/my-projects", "selected": true},
          {"menu": "스크랩", "url": "/member/scrap", "selected": false},
      ]'
      />
        <h2 style="text-align:center; margin: 20px;">내 프로젝트</h2>
        <ProjectManagementComponent
        :projectList="[
            {name: '프로젝트!', imageUrl: ''}
            ]"
        />
    </v-container>
  </template>


  
  <script>
  import PageNavbar from '@/components/navbar/PageNavbar.vue';
  import ProjectManagementComponent from '@/components/card/ProjectManagementComponent.vue';

  export default {
    components: {
        PageNavbar,
        ProjectManagementComponent
    },
    data() {
        return {
            email: "default@devjeans.com",
            nickname: "야수의 심장",
            name: "김땡땡",
            careerCardId: "hypedev",
            phone: "010-1234-5678"
        }
    },
    methods: {
      moveToEdit() {
            this.$router.push("/member/edit");
        },
    }

  }
  </script>
  
  <style>
  .my-page-card{
    color: #E3E3E3;
    width: 500px;
    display: flex;
    align-self: center;
    align-content: center;
    margin: auto;
  }
  .item-wrap {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: auto;
  }
  /* 중앙 정렬을 위한 스타일 */
  .text-center {
    text-align: center;
    width: 300px;
    padding-bottom: 20px;
    padding-top: 20px;
    font-weight: bold;
  }
  
  .text-left {
    text-align: left;
    width: 300px;
    padding-bottom: 20px;
    padding-top: 20px;
  }

  .bordered-table th,
  .bordered-table td {
    border-bottom: 1px solid #D4D4D4;
    height: 60px;
  }
  
  /* 열 너비 스타일 */
  .column-width {
    width: 1000px; /* 원하는 너비로 설정 */
  }

.my-div {
    display: flex;
    justify-content: center;
}

.card-url {
    color:#D4D4D4;
}

.v-con {
    display: flex;
    align-self: center;
    align-content: center;
    text-align: center;
}

.row-center {
    text-align: center;
    align-items: centee;
}


</style>