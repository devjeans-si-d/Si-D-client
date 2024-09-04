<template>
  <v-container>
    <PageNavbar
      :menus="[{ menu: '회원가입', url: '/member/mypage', selected: true }]"
    />
    <div width="100px" height="100px"></div>
    <v-card class="my-page-card" color="#F3F3F3">
      <div style="margin: auto" width="100%">
        <img
          src="@/assets/si-d_logo.png"
          alt="sid-logo"
          height="79"
          width="200"
        />
      </div>
      <v-text>
        <v-container>
          <v-row class="item-wrap-field" style="margin: auto">
            <v-col cols="4"><span class="text-center">닉네임</span></v-col>
            <v-col cols="auto"
              ><v-text-field density="compact" v-model="nickname" :rules="nicknameRules"></v-text-field
            ></v-col>
          </v-row>
          <v-row class="item-wrap-field" style="margin: auto">
            <v-col cols="4"><span class="text-center">이름</span></v-col>
            <v-col cols="auto"
              ><v-text-field density="compact" v-model="name" :rules="nameRules"></v-text-field
            ></v-col>
          </v-row>
          <v-row class="item-wrap-field" style="margin: auto">
            <v-col cols="4"><span class="text-center">전화번호</span></v-col>
            <v-col cols="auto"
              ><v-text-field
                density="compact"
                v-model="phoneNumber"
                :rules="phoneRules"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row class="item-wrap">
            <ButtonComponent @click="signup" content="저장" />
          </v-row>
        </v-container>
      </v-text>
    </v-card>
  </v-container>
</template>

<script>
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import PageNavbar from "@/components/navbar/PageNavbar.vue";
import axios from "axios";

export default {
  components: {
    ButtonComponent,
    PageNavbar,
  },
  data() {
    return {
      nickname: "",
      name: "",
      phoneNumber: "",
      socialId: "",
      email: "",
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
        v => /^\d+$/.test(v) || '숫자만 입력',
        v => (v && v.length === 11) || '11자리가 아닙니다.'
      ],
      KAKAO_AUTH_URI: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.VUE_APP_REST_API_KEY}&redirect_uri=${process.env.VUE_APP_MY_URL}/oauth`,
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.socialId = urlParams.get("social_id");
    this.email = urlParams.get("social_email");
    history.replaceState({}, null, location.pathname);
    console.log(this.socialId, this.email);
  },
  methods: {
    validateInput() {
      const validNickname = this.nicknameRules.every(rule => rule(this.nickname) === true);
      const validName = this.nameRules.every(rule => rule(this.name) === true);
      const validPhone = this.phoneRules.every(rule => rule(this.phoneNumber) === true);

      if (!validNickname) {
        alert('닉네임을 올바르게 입력해주세요.');
        return false;
      }
      if (!validName) {
        alert('이름을 올바르게 입력해주세요.');
        return false;
      }
      if (!validPhone) {
        alert('전화번호를 올바르게 입력해주세요.');
        return false;
      }
      return true;
    },
    async signup() {
      if (!this.validateInput()) {
        return;
      }
      try {
        const data = {
          name: this.name,
          nickname: this.nickname,
          email: this.email,
          phoneNumber: this.phoneNumber,
          socialId: this.socialId,
        };
        console.log(data);
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/api/auth/register`,
          data
        );
        console.log(response);
        localStorage.setItem('state',"first")
        window.location.href = this.KAKAO_AUTH_URI
      } catch (error) {
        console.error(error.response);
        alert("올바르지 않은 입력입니다.")
      }
    },
  },
};
</script>

<style>

.v-text-field {
  height: 10px;
  width: 150px;
}
.my-page-card {
  color: #e3e3e3;
  width: 500px;
  display: flex;
  align-self: center;
  align-content: center;
  margin: auto;
  flex-direction: column;
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
  padding-top: 10px;
  padding-bottom: 30px;
  border-bottom: 1px solid #d4d4d4;
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
  border-bottom: 1px solid #d4d4d4;
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
  color: #d4d4d4;
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
