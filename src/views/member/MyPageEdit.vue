<template>
    <v-container>
      <PageNavbar
      :menus='[
          {"menu": "내 정보", "url": "/member/mypage", "selected": true},
          {"menu": "내 채팅", "url": "/member/chatting-list", "selected": false},
          {"menu": "내 프로젝트", "url": "/member/my-projects", "selected": false},
          {"menu": "스크랩", "url": "/member/scrap", "selected": false},
      ]'
      />
        <h2 style="text-align:center; margin: 20px;">내 정보 수정</h2>
        <v-card class="my-page-card" color="#F3F3F3">
            <v-text>
                <v-container>
                    <v-row class="item-wrap-field" style="margin: auto">
                      <v-col cols="4"><span class="text-center">수신용이메일</span></v-col>
                      <v-col cols="auto">{{ email }}</v-col>
                    </v-row>
                    <v-row class="item-wrap-field" style="margin: auto">
                      <v-col cols="4"><span class="text-center">닉네임</span></v-col>
                      <v-col cols="auto"><v-text-field density=compact v-model="nickname"></v-text-field></v-col>
                    </v-row>
                    <v-row class="item-wrap-field" style="margin: auto">
                      <v-col cols="4"><span class="text-center">이름</span></v-col>
                      <v-col cols="auto"><v-text-field density=compact v-model="name"></v-text-field></v-col>
                    </v-row>
                    <v-row class="item-wrap-field" style="margin: auto">
                      <v-col cols="4"><span class="text-center">전화번호</span></v-col>
                      <v-col cols="auto"><v-text-field density=compact v-model="phone"></v-text-field></v-col>
                    </v-row>
            <v-row class="item-wrap">
                <ButtonComponent content="저장"/>
            </v-row>
            </v-container>
            </v-text>
        </v-card>
    </v-container>
  </template>


  
<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import PageNavbar from '@/components/navbar/PageNavbar.vue';

export default {
  components: {
      ButtonComponent,
      PageNavbar
  },
  data() {
      return {
          email: "default@devjeans.com",
          nickname: "야수의 심장",
          name: "김땡땡",
          careerCardId: "hypedev",
          phone: "010-1234-5678"
      }
  }
}
</script>

<style>
.v-text-field {
  height: 10px;
  width: 150px;
}
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


</style>