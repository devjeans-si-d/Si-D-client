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
                  <v-btn class="custom-button" text :to="{path:'/project/list'}" >
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
                        <v-img :src=profileImageUrl alt="profileImageUrl"></v-img> 
                      </v-avatar>
                      <span class="ml-2">{{ nickname }}</span>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item :href="`/sider-card/${id}`">
                      <v-list-item-title>나의 사이더 카드</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ path: '/member/mypage'}">
                      <v-list-item-title>마이페이지</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ path: '/member/my-projects'}">
                      <v-list-item-title>프로젝트 관리</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ path: '/member/chatting-list'}">
                      <v-list-item-title>내 채팅</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="doLogout">
                      <v-list-item-title>로그아웃</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <div v-if="isLogin"
                class="alert-div"
                @click="spaMoveToAlram">🔔
                <div
                :class="{ 'zero-alert': this.getAlertCnt + this.getChatCnt == 0 }"
                class="alert-count">{{this.getAlertCnt + this.getChatCnt}}</div></div>
              </v-col>


              <v-col cols="auto" md="auto" class="d-flex align-center justify-end text-no-wrap">
                <!-- 원래 !isLogin임 api 붙이는 작업 이후 수정 예정 -->
                <v-btn class="custom-button" v-if="!isLogin" :href="KAKAO_AUTH_URI"><img src="@/assets/kakao_login_small.png" alt="카카오로그인"></v-btn>
              </v-col>

            </v-row>
        </v-container>
    </v-app-bar>


  </template>

  
  <script>
  import axios from 'axios'
  import { EventSourcePolyfill } from 'event-source-polyfill';
  import { mapGetters } from 'vuex'


import MyAlert from '@/views/member/MyAlert.vue';

  export default{
    components: [MyAlert],
    data(){
        return{
            isLogin : false,
            nickname : "", 
            profileImageUrl: "",
            KAKAO_AUTH_URI: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.VUE_APP_REST_API_KEY}&redirect_uri=http://localhost:8082/oauth`,
            alertCnt: 0,
            id:'',
        };
    },
    created(){ 
      this.id = localStorage.getItem("id")
      const token = localStorage.getItem("token");
      if(token){
          // localStorage에 token이 있으면 로그인된 상태
          this.isLogin = true;
          this.loadUserProfile();
      }

      // sse
      this.subscribe();
      const alertCnt = Number(localStorage.getItem('alertCnt')) == undefined ? 0 : Number(localStorage.getItem('alertCnt'));
      const chatCnt = Number(localStorage.getItem('chatCnt')) == undefined ? 0 : Number(localStorage.getItem('chatCnt'));

      this.$store.dispatch('updateAlertCnt', alertCnt);
      this.$store.dispatch('updateChatCnt', chatCnt);

      localStorage.setItem('alertCnt', alertCnt);
      localStorage.setItem('chatCnt', chatCnt);
    },
    computed: {
      ...mapGetters(['getChatCnt']),
      ...mapGetters(['getAlertCnt']),
    },
    methods:{
        doLogout(){
            localStorage.clear();
            this.isLogin = false;
            this.nickname = '';
            this.profileImageUrl = '';
            window.location.href='/';
        },
        async loadUserProfile() {
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/member`);
            console.log(response.data);

            this.nickname = response.data.nickname; // 로그인한 사용자 닉네임
            // 프로필 이미지가 null이거나 빈 문자열인 경우 기본 이미지 할당
            this.profileImageUrl = response.data.profileImageUrl 
                ? response.data.profileImageUrl 
                : "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/devjeans-spring.png";
        } catch (error) {
            console.error("사용자 프로필 loading error:", error);
        }
      },
      async subscribe() {
        const token = localStorage.getItem("token");

        // axios 요청이 아니라서 토큰을 따로 세팅해 주어야 한다.
        let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/sse/subscribe`, {headers: {Authorization: `Bearer ${token}`}});
        console.log("line 155");
        console.log(sse);
        sse.addEventListener('connect', (event) => {
            console.log(event);
        }); // connect라는 이름의 이벤트가 들어오면

        // 채팅 수신
        sse.addEventListener('chat', (event) => {
          console.log("chat event 발생");
          console.log(event.data);

          const newChatCnt = this.getChatCnt + 1;
          this.$store.dispatch('updateChatCnt', newChatCnt);
          localStorage.setItem('chatCnt', newChatCnt);
          
        });

          // 모집 마감 이벤트 수신
          sse.addEventListener('team', (event) => {
          console.log("team event 발생");
          console.log(event.data);

          const newAlertCnt = this.getAlertCnt + 1;
          this.$store.dispatch('updateAlertCnt', newAlertCnt);
          localStorage.setItem('alertCnt', newAlertCnt);
          
        });

        sse.onerror = (error) => {
            console.log(error);
            // sse.close();
        } 
      },
      spaMoveToAlram() {
        this.$router.push('/member/my-alert');
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

  .alert-count {
    display: inline-block;
    border-radius: 50%;
    background-color: #CC3D3D;
    min-width: 25px;
    min-height: 25px;
    width: auto;
    text-align: center;
    color: white;
    font-weight: bold;
    margin-left: 3px;
    justify-content: center;
    align-items: center;
  }

  .zero-alert {
    display: inline-block;
    border-radius: 50%;
    background-color: #D4D4D4;
    min-width: 25px;
    min-height: 25px;
    width: auto;
    text-align: center;
    color: white;
    font-weight: bold;
    margin-left: 5px;
    justify-content: center;
    align-items: center;
  }

  .alert-div {
    display: inline-block;
    font-size: large;
  }
  .alert-div:hover {
    opacity: 0.8;
    transition: 0.5s ease;
  }

  </style>
  