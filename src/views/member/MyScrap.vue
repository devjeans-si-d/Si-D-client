<template>
    <v-container>
      <PageNavbar
      :menus='[
          {"menu": "내 정보", "url": "/member/mypage", "selected": false},
          {"menu": "내 채팅", "url": "/member/chatting-list", "selected": false},
          {"menu": "내 프로젝트", "url": "/member/my-projects", "selected": false},
          {"menu": "신청 내역", "url": "/member/apply", "selected": false},
          {"menu": "스크랩", "url": "/member/scrap", "selected": true},
      ]'
      />
      
        <h2 style="text-align:center; margin: 20px;">내 프로젝트</h2>
        <ProjectScrapComponent
        :projectList="[
              { projectId: 1,
                name: '안경 만두 프로젝트',
                content: '안경 만두를 찬양하는 프로젝트',
                imageUrl: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/glasses_mandoo.jpg',
                status: '진행 중'
              },
              { projectId: 2,
                name: '빙티 프로젝트',
                content: '빙티는 귀엽다',
                imageUrl: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/15_Punchy+_3.jpeg',
                status: '마감'
              },
              { projectId: 3,
                name: '빙티 프로젝트2',
                content: '빙티는 왜 인기 주민이 아닌가',
                imageUrl: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/15_Punchy+_3.jpeg',
                status: '마감'
            }
            ]"
        />
    </v-container>
  </template>


  
  <script>
  import PageNavbar from '@/components/navbar/PageNavbar.vue';
  import ProjectScrapComponent from '@/components/card/ProjectScrapComponent.vue';

  export default {
    components: {
        PageNavbar,
        ProjectScrapComponent
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