<template>
    <v-app-bar app style="background-color: #DEF5EC; min-width:1295px" >
        <v-container>
            <v-row align="center">

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

                <v-col class="d-flex justify-end">
                    <!-- 오른쪽 정렬 -->
                    <v-btn class="custom-button" v-if="!isLogin" :to="{path:'/member/create'}">회원가입</v-btn>
                    <v-btn class="custom-button" v-if="!isLogin" :to="{path:'/login'}">로그인</v-btn>
    
                    <v-btn v-if="isLogin" @click="doLogout">로그아웃</v-btn>
                </v-col>

            </v-row>
        </v-container>
    </v-app-bar>
  </template>
  
  <script>

  export default{
    data(){
        return{
            isLogin : false
        }
    },
    created(){
        const token = localStorage.getItem("token");
        if(token){
            // localStorage에 token이 있으면 로그인된 상태
            this.isLogin = true;
        }
    },
    methods:{
        doLogout(){
            localStorage.clear();
            window.location.reload();
        }
    }
  };
  </script>
  
  <style>
    /*  버튼 커스텀 */
    .custom-button {
        font-weight: bold !important; /* 글씨를 bold로 */
        font-size: 16px !important; /* 글씨 크기 */
        color: #094F08 !important; /* 글씨 색 */
        text-transform: none !important; /* 대문자 변환 방지 */
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
  