<template>
    <v-container fluid class="custom-container">
      <PageNavbar
      :menus='[
          {"menu": "내 정보", "url": "/member/mypage", "selected": true},
          {"menu": "내 채팅", "url": "/member/chatting-list", "selected": false},
          {"menu": "내 프로젝트", "url": "/member/my-projects", "selected": false},
          {"menu": "신청 내역", "url": "/member/apply", "selected": false},
          {"menu": "스크랩", "url": "/member/scrap", "selected": false},
      ]'
      />
        <h2 style="text-align:center; margin: 20px;">내 정보</h2>
        <v-card class="my-page-card" color="#F3F3F3">
            <v-text>
                <v-container>
                    <v-row class="item-wrap">
                    <v-col cols="9" style="margin: auto">
                    <v-simple-table class="bordered-table">
                        <tr>
                        <td class="text-center">수신용 이메일</td>
                        <td class="text-left">{{ email }} 
                        </td>
                        </tr>
                        <tr>
                        <td class="text-center">닉네임</td>
                        <td class="text-left">{{ nickname }}</td>
                        </tr>
                        <tr>
                        <td class="text-center">이름</td>
                        <td class="text-left">{{ name }}</td>
                        </tr>
                        <tr>
                            <td class="text-center">전화번호</td>
                            <td class="text-left">{{ phone }}</td>
                        </tr>

                </v-simple-table>
            </v-col>
            </v-row>
            <v-row class="item-wrap">
                <v-col cols="auto"><ButtonComponent content="이메일 변경" /></v-col>
                <v-col cols="auto"><ButtonComponent @click="moveToEdit" content="정보 수정"/></v-col>
            </v-row>
            <v-row class="item-wrap">
                    <PlainButtonComponent content="회원 탈퇴"/>
                    <PlainButtonComponent content="로그아웃"/>
            </v-row>
            </v-container>
            </v-text>
        </v-card>
    </v-container>
  </template>


  
  <script>
  import ButtonComponent from '@/components/button/ButtonComponent.vue';
  import PlainButtonComponent from '@/components/button/PlainButtonComponent.vue';
  import PageNavbar from '@/components/navbar/PageNavbar.vue';
  import axios from 'axios'

  export default {
    components: {
        ButtonComponent,
        PlainButtonComponent,
        PageNavbar
    },
    data() {
        return {
            email: "",
            nickname: "",
            name: "",
            phone: ""
        }
    },
    methods: {
      moveToEdit() {
            this.$router.push("/member/edit");
        },
    },
    async created() {
      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/member`);
      console.log(response.data);

      this.email = response.data.email;
      this.nickname = response.data.nickname;
      this.name = response.data.name;
      this.phone = response.data.phoneNumber;
    }

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
</style>