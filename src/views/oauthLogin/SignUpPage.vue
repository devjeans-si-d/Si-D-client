<template>
  <v-container>
    <PageNavbar
      :menus="[{ menu: '회원가입', url: '/member/mypage', selected: true }]"
    />
    <div style="margin: 60px"></div>
    <v-card class="my-page-card" color="#F3F3F3">
      <div class="mx-auto">
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
              ><v-text-field density="compact" v-model="nickname"></v-text-field
            ></v-col>
          </v-row>
          <v-row class="item-wrap-field" style="margin: auto">
            <v-col cols="4"><span class="text-center">이름</span></v-col>
            <v-col cols="auto"
              ><v-text-field density="compact" v-model="name"></v-text-field
            ></v-col>
          </v-row>
          <v-row class="item-wrap-field" style="margin: auto">
            <v-col cols="4"><span class="text-center">전화번호</span></v-col>
            <v-col cols="auto"
              ><v-text-field
                density="compact"
                v-model="phoneNumber"
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
    async signup() {
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
        window.location.href = '/'
      } catch (error) {
        console.error(error.response);
        alert("올바르지 않은 입력입니다.")
      }
    },
  },
};
</script>

<style>
.mx-auto {
  width: 200px;
  height: auto;
  display: flex;
  align-self: center;
  align-content: center;
  margin-top: 40px;
}
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
