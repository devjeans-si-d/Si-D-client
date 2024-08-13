<template>
    <v-app-bar app style="background-color: #DEF5EC;" >
        <v-container fluid class="custom-container">
            <v-row align="center" no-gutters>

              <v-col cols="auto" class="d-flex justify-start">
                  <a href="/">
                      <img src="@/assets/si-d_logo.png" alt="sid-logo" height="60" class="sid-logo">
                  </a>
              </v-col>

              <v-col class="d-flex flex-row justify-start text-no-wrap" cols="auto">
                  <!-- 왼쪽 정렬 -->
                  <v-btn class="custom-button" text :to="{path:'/team-building/list'}" >
                      <v-icon left class="mr-1">mdi-hammer-wrench</v-icon>
                      Team-Building
                  </v-btn>

                  <v-btn class="custom-button" text :to="{path:'/launched-project/list'}">
                      <v-icon left class="mr-1">mdi-rocket-launch</v-icon>
                      Launched-Project
                  </v-btn>

                  <v-btn class="custom-button" text :to="{path:'/sider-card/list'}">
                      <v-icon left class="mr-1">mdi-google-downasaur</v-icon>
                      Si-Der Card
                  </v-btn>
              </v-col>  
                
              <!-- 여유 공간을 차지하여 오른쪽으로 정렬 -->
              <v-spacer></v-spacer>

              <v-col cols="auto" md="auto" class="d-flex align-center justify-end text-no-wrap">
                <!-- 오른쪽 정렬 -->
                <v-menu v-if="isLogin" open-on-hover>
                  <template v-slot:activator="{ props }">
                    <v-btn text v-bind="props" height="60">
                      <v-avatar size="40">
                        <img src='@/assets/default_profile_image.png' alt="profileImageUrl" class="avatar-image">
                      </v-avatar>
                      <span class="ml-2">{{ nickname }}</span>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item :to="{ path: '/sider-card'}">
                      <v-list-item-title>나의 커리어 카드</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ path: '/member/mypage'}">
                      <v-list-item-title>마이페이지</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ path: '/member/chatting-list'}">
                      <v-list-item-title>내 채팅</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="doLogout">
                      <v-list-item-title>로그아웃</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>

              <v-col cols="auto" md="auto" class="d-flex align-center justify-end text-no-wrap">
                <!-- 원래 !isLogin임 api 붙이는 작업 이후 수정 예정 -->
                <v-btn class="custom-button" v-if="!isLogin" href="/login">로그인</v-btn>
              </v-col>

            </v-row>
        </v-container>
    </v-app-bar>
  </template>
  
  <script>
  export default{
    data(){
        return{
            isLogin : false,
            nickname : 'devjeans', // 임시 닉네임. 이후에 빈값으로 두기
            profileImageUrl: '@/assets/default_profile_image.png',
        };
    },
    created(){ // 토큰때문에 테스트가 제대로 안되서 token 관련한 부분 주석처리 해놓음
        const token = localStorage.getItem("token");
        if(token){
            // localStorage에 token이 있으면 로그인된 상태
            this.isLogin = true;
            this.loadUserProfile();
        }
    },
    methods:{
        doLogout(){
            localStorage.clear();
            this.isLogin = false;
            this.nickname = '';
            this.profileImageUrl = '';
            window.location.reload();
        },
        loadUserProfile(){
            // api 갖다붙일 때 수정해야 됨
            this.nickname = 'devjeans'; // 로그인한 사용자 닉네임
            this.profileImageUrl = ''
        }
    }
  };
  </script>
  
  <style scoped>
    .custom-container {
    max-width: 1200px !important; /* 원하는 최대 폭 */
    margin: 0 auto !important;    /* 중앙 정렬 */
    width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
    }
    /*  버튼 커스텀 */
    .custom-button {
        font-weight: bold !important; /* 글씨를 bold로 */
        font-size: 14px !important; /* 글씨 크기 */
        color: #094F08 !important; /* 글씨 색 */
        text-transform: none !important; /* 대문자 변환 방지 */
    }
    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
  /* 미디어 쿼리: 화면이 600px 이하일 때 적용할 CSS 스타일*/
  @media (max-width: 600px) {
    .v-app-bar .v-row {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .v-app-bar .v-col {
      width: 100%;
      justify-content: center;
    }
  
    .v-app-bar .v-btn {
      width: 100%;
      justify-content: center;
      text-align: center; /* 버튼 텍스트 중앙 정렬 */
    }
  }

  </style>
  