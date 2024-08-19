<template>
    <v-container class="custom-container">
      <PageNavbar
      :menus='[
          {"menu": "내 정보", "url": "/member/mypage", "selected": false},
          {"menu": "신청 내역", "url": "/member/apply", "selected": false},
          {"menu": "스크랩한 프로젝트", "url": "/member/scrap", "selected": true},
      ]'
      />
      
        <h2 style="text-align:center; margin: 20px;">📔 스크랩한 프로젝트</h2>
        <ProjectScrapComponent
        :projectList="this.projectList"
        ref="myScrapComponent"
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
                  class="my-4"
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
  import axios from 'axios';
  import PageNavbar from '@/components/navbar/PageNavbar.vue';
  import ProjectScrapComponent from '@/components/card/ProjectScrapComponent.vue';

  export default {
    components: {
        PageNavbar,
        ProjectScrapComponent,
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
            this.projectList = response.data.content;
            } catch(e) {
            console.log(e);
          }
          this.$refs.myScrapComponent.changePage(this.currentPage);
        },
    },
    watch: {
      currentPage() {
        this.onPageChange(this.currentPage);
      },
    },
    async created() {
      const params = {
        size: 3
      };

      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/scrap`, { params });
      this.projectList = response.data.content;
      this.currentPage = 0;
      this.totalPage = response.data.totalPages;
    },

  }
  </script>
  
  <style scoped>
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

.custom-container {
  max-width: 1200px !important; /* 원하는 최대 폭 */
  margin: 0 auto !important;    /* 중앙 정렬 */
  width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
}

.self-center {
  margin: auto;
}
</style>