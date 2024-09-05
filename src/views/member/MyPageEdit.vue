<template>
    <v-container class="custom-container">
      <PageNavbar
      :menus='[
          {"menu": "내 정보", "url": "/member/mypage", "selected": true},
          {"menu": "신청 내역", "url": "/member/apply", "selected": false},
          {"menu": "스크랩한 프로젝트", "url": "/member/scrap", "selected": false},
      ]'
      />
        <h2 style="text-align:center; margin: 20px;">✏️ 내 정보 수정</h2>
        <v-card class="my-page-card">
          <v-container>
            <v-row class="item-wrap-field" style="margin: auto">
              <v-col cols="4"><span class="text-center">수신용이메일</span></v-col>
              <v-col cols="auto">{{ email }}</v-col>
            </v-row>
            <v-row class="item-wrap-field" style="margin: auto">
              <v-col cols="4"><span class="text-center">닉네임</span></v-col>
              <v-col cols="auto"><v-text-field density=compact v-model="nickname" :rules="nicknameRules"></v-text-field></v-col>
            </v-row>
            <v-row class="item-wrap-field" style="margin: auto">
              <v-col cols="4"><span class="text-center">이름</span></v-col>
              <v-col cols="auto"><v-text-field density=compact v-model="name" :rules="nameRules"></v-text-field></v-col>
            </v-row>
            <v-row class="item-wrap-field" style="margin: auto">
              <v-col cols="4"><span class="text-center">전화번호</span></v-col>
              <v-col cols="auto"><v-text-field density=compact v-model="phone" :rules="phoneRules"></v-text-field></v-col>
            </v-row>
            <v-row class="item-wrap">
                <ButtonComponent @click="this.updateMemberInfo()" content="저장"/>
            </v-row>
          </v-container>
        </v-card>
    </v-container>
  </template>


  
<script>
import axios from 'axios';
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import PageNavbar from '@/components/navbar/PageNavbar.vue';

export default {
  components: {
      ButtonComponent,
      PageNavbar
  },
  data() {
      return {
          email: "",
          nickname: "",
          name: "",
          phone: "",
          nicknameRules: [
            v => !!v || '필수값 입니다.',
            v => (v && v.length >= 3) || '최소 3자 이상',
            v => (v && v.length <= 15) || '최대 15자 이하'
          ],
          nameRules: [
            v => !!v || '이름을 입력하세요.'
          ],
          phoneRules: [
            v => !!v || '필수값 입니다.',
            v => /^\d+$/.test(v) || '숫자만 입력해주세요',
            v => (v && v.length === 11) || '11자리가 아닙니다.'
          ],
      }
  },
  methods: {
    validateInput() {
      const validNickname = this.nicknameRules.every(rule => rule(this.nickname) === true);
      const validName = this.nameRules.every(rule => rule(this.name) === true);
      const validPhone = this.phoneRules.every(rule => rule(this.phone) === true);

      if (!validNickname) {
        alert('닉네임을 올바르게 입력해주세요.');
        return false;
      }
      if (!validName) {
        alert('이름을 올바르게 입력해주세요.');
        return false;
      }
      if (!validPhone) {
        console.log(this.phone);
        
        alert('전화번호를 올바르게 입력해주세요.');
        return false;
      }
      return true;
    },
    async updateMemberInfo() {
      if(!this.validateInput()) {
        return;
      }

      const request = {
        name: this.name,
        nickname: this.nickname,
        phoneNumber: this.phone,
      }

      await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/member/update`, request);
      window.location.href = '/member/mypage';
    }
  },
  async created() {
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/member`);

    this.id = response.data.memberId;
    this.name = response.data.name;
    this.email = response.data.email;
    this.nickname = response.data.nickname;
    this.phone = response.data.phoneNumber;

  }
}
</script>

<style scoped>
.v-text-field {
  height: 10px;
  width: 150px;
}
.my-page-card{
  width: 500px;
  display: flex;
  align-self: center;
  align-content: center;
  margin: auto;
  background-color: #F6F6F6;
  color: black !important;
}
.item-wrap {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;

}
.item-wrap-field {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #D4D4D4;
  width: 80%;
}
/* 중앙 정렬을 위한 스타일 */
.text-center {
  text-align: center;
  width: 300px;
  padding-bottom: 10px;
  padding-top: 10px;
  font-weight: bold;
}

.text-left {
  text-align: left;
  width: 300px;
  padding-bottom: 10px;
  padding-top: 10px;
}

.bordered-table th,
.bordered-table td {
  border-bottom: 1px solid #D4D4D4;
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

.edit-card-container {
  margin: 0px;
}

</style>