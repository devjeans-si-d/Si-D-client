<template>
    <v-container fluid class="custom-container">
      <PageNavbar
      :menus='[
          {"menu": "내 정보", "url": "/member/mypage", "selected": true},
          {"menu": "신청 내역", "url": "/member/apply", "selected": false},
          {"menu": "스크랩한 프로젝트", "url": "/member/scrap", "selected": false},
      ]'
      />
        <h2 style="text-align:center; margin: 20px;">👨🏻‍💻 내 정보</h2>
        <v-card class="my-page-card">
            <v-card-text>
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
                <v-col cols="auto"><ButtonComponent @click="updateEmail" content="이메일 변경" /></v-col>
                <v-col cols="auto"><ButtonComponent @click="moveToEdit" content="정보 수정"/></v-col>
            </v-row>
            <v-row class="item-wrap">
                    <PlainButtonComponent content="회원 탈퇴"/>
                    <PlainButtonComponent content="로그아웃"/>
            </v-row>
            </v-container>
            </v-card-text>
        </v-card>
    </v-container>


<!-- 모달 -->
<v-dialog v-model="dialog1" width="500px">
  <v-card class="dialog-card">
      <v-card-title>
          변경할 이메일 주소를 입력해주세요.
      </v-card-title>
        <v-card-text>
          아래 이메일로 인증 링크가 담긴 메일이 발송됩니다.
        </v-card-text>
        <v-text-field v-model="newEmail"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="sid_btn1" text @click="dialog1 = false">취소</v-btn>
          <v-btn color="sid_btn2" text @click="confirmUpdate">인증 메일 발송</v-btn>
        </v-card-actions>
  </v-card>
</v-dialog>

  <!-- 모달 2 -->
<v-dialog v-model="dialog2" width="500px">
  <v-card class="dialog-card">
      <v-card-text>
          인증 메일이 발송되었습니다. 10분 내에 링크에 접속해주세요
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="sid_btn1" text @click="dialog2 = false">확인</v-btn>
        </v-card-actions>
  </v-card>

</v-dialog>
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
            phone: "",
            newEmail: "",
            dialog1: false,
            dialog2: false
        }
    },
    methods: {
      moveToEdit() {
            this.$router.push("/member/edit");
      },
      async updateEmail() {
        this.dialog1 = true;
      },
      async confirmUpdate() {
        this.dialog1 = false;
        this.dialog2 = true;
        
        const request = {
          email: this.newEmail
        }

        try {
          const res = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/member/update/email`, request);
          console.log(res);
        } catch(e) {
          console.log(e);
        }
        
      }
    },
    async created() {
      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/member`);

      this.email = response.data.email;
      this.nickname = response.data.nickname;
      this.name = response.data.name;
      this.phone = response.data.phoneNumber;
    }

  }
  </script>
  
  <style scoped>
  .my-page-card{
    width: 500px;
    display: flex;
    align-self: center;
    align-content: center;
    margin: auto;
    background-color: #F6F6F6;
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