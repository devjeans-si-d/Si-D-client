<template>
    <v-container fluid class="custom-container">
        <!-- 전체 container -->
        <v-spacer :style="{height: '50px'}"></v-spacer>
        <v-img
            alt="MainPageBanner"
            src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/main_page_banner.png"
        ></v-img>

        <v-spacer :style="{height: '50px'}"></v-spacer>

        <v-container
            style="background-color: #F3F3F3; border-radius:15px; max-width: 1200px;"
        >
            <!-- 지금 모집중인 인기공고 container -->
            <v-spacer :style="{height: '20px'}"></v-spacer>

            <v-row>
                <v-col>
                    <h2 style="text-align:center">🔥 지금 모집중인 인기공고 🔥</h2>
                </v-col>
            </v-row>

            <v-row justify="center" align="center">
            <h5 style="text-align: center; color: #787575;">
                고민은 성장만 늦출 뿐! Si-Der와 함께 성장 Surfing에 동참하세요🏄
            </h5>
            </v-row>

            <!-- <v-spacer :style="{height: '20px'}"></v-spacer> -->

            <v-row justify="center">
                <ProjectWindow
                    :windowCount="2"
                    :projects="projects"
                >
                </ProjectWindow>
            </v-row>

            <v-row justify="center" style="margin-top: -20px;">
                <v-btn
                    class="custom-button"
                    style="background-color: #E6E6E6;"
                    text :to="{path:'/project/list'}"
                >모집 공고 더보기</v-btn>
            </v-row> 

        <v-spacer :style="{height: '30px'}"></v-spacer>

        </v-container>
        
        <v-spacer :style="{height: '50px'}"></v-spacer>

        <v-container
            style="background-color: #F3F3F3; border-radius: 15px; max-width: 1200px; padding: 20px;"
        >
            <!-- Launched-Project container -->
            <v-row>
            <v-col>
                <h2 style="text-align: center">🚀 Launched Project 🚀</h2>
            </v-col>
            </v-row>

            <v-row justify="center" align="center">
            <h5 style="text-align: center; color: #787575;">
                Si-D에 합류하면 이런 프로젝트를 진행할 수 있어요!
            </h5>
            </v-row>

            <v-spacer :style="{ height: '30px' }"></v-spacer>

            <v-row justify="center">
                <LaunchedProjectWindow
                    :windowCount="2"
                    :projects="launched_projects"
                >
                </LaunchedProjectWindow>
            </v-row>

            <v-row justify="center" style="margin-top: -20px;">
                <v-btn
                    class="custom-button"
                    style="background-color: #E6E6E6;"
                    text :to="{path:'/launched-project/list'}"
                >Launched Project 더보기</v-btn>
            </v-row> 

            <v-spacer :style="{height: '30px'}"></v-spacer>
        </v-container>

        <v-spacer :style="{height: '50px'}"></v-spacer>

        <v-container
            style="background-color: #DEF5EC; border-radius:15px; max-width: 1200px;"
        >
            <!-- Si-Der와 함께해보세요 container -->
            <v-spacer :style="{height: '20px'}"></v-spacer>

            <v-row>
                <v-col>
                    <h2 style="text-align:center; color: #094F08">🍀 Si-Der와 함께해보세요!</h2>
                </v-col>
            </v-row>

            <SiderCardWindow
                :windowCount="2"
                :sidecards="siderCards" 
                :defaultImageUrl=defaultImageUrl
            >
            </SiderCardWindow>

            <v-row justify="center" style="margin-top: -20px;">
                <v-btn
                    class="custom-button"
                    style="background-color: #A4C89C; color: #094F08"
                    text :to="{path:'/sider-card/list'}"
                >Sider-Card 더보기</v-btn>
            </v-row> 

            <v-spacer :style="{height: '30px'}"></v-spacer>

        </v-container>

    </v-container>

    <v-dialog v-model="acceptDialog" width="500px">
        <v-card class="dialog-card" style="text-align: center">
            <v-card-title>
                사이더카드 업데이트를 하면<br> 프로젝트 지원하는데 도움이 돼요!
            </v-card-title>
            <v-card-text>
                사이더카드 업데이트를 권장합니다.
            </v-card-text>
        
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="sid_btn1" text @click="acceptDialog = false">다음에 할래요</v-btn>
                <v-btn color="sid_btn2" text @click="accept">지금 할게요</v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
    
</template>
<script>
  import LaunchedProjectWindow from '@/components/windows/LaunchedProjectWindow.vue';
  import ProjectWindow from '@/components/windows/ProjectWindow.vue';
  import SiderCardWindow from '@/components/windows/SiderCardWindow.vue';
  import axios from 'axios';

export default {
  components: {
    LaunchedProjectWindow,
    ProjectWindow,
    SiderCardWindow
  },
  data() {
    return {
      acceptDialog: false,
      launched_projects: [],
      projects: [],
      siderCards: [],
      defaultImageUrl: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/default_profile_image.png" // 사이더카드 설정 프로필 사진 없을 시 default사진으로 대체
    }
  },
  created(){
    if(localStorage.getItem('state') && localStorage.getItem('state')=="first"){
        this.acceptDialog = true
        localStorage.setItem('state',null)
    }
    this.loadLaunchedProject();
    this.loadSiderCard();
    this.loadProject();
  },
  methods:{
    
    async loadLaunchedProject(){
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/main/top-launched-project`);

           // Pageable 객체에서 content 필드만 추출하여 launched_projects에 할당
           this.launched_projects = response.data.content.map(project => {
                return {
                    ...project,
                    techStacks: project.techStacks.join(' · ') // techStacks 배열을 문자열로 변환
                };
            });
        } catch (error) {
            console.error("메인페이지 LaunchedProject 리스트 data load 에러:", error);
        }
    },
    async loadSiderCard(){
        try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/main/top-sider-card`);
        this.siderCards = response.data.content;
      } catch (error) {
        console.error("메인페이지 SiderCard 리스트 data load 에러:", error);
      }    
    },
    async loadProject(){
        try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/main/top-project`);
        this.projects = response.data.content;
      } catch (error) {
        console.error("메인페이지 Project 리스트 data load 에러:", error);
      }  
    },
    accept(){
            this.acceptDialog = false
            this.$router.push(`/sider-card`)
        },
  }
};
</script>
<style scoped>
.custom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
.custom-button {
        font-weight: bold !important; /* 글씨를 bold로 */
        font-size: 14px !important; /* 글씨 크기 */
        color: black !important;
        text-transform: none !important; /* 대문자 변환 방지 */
}
.custom-contents {
    padding-right: 2px !important; /* 카드의 오른쪽 끝에서 2px 떨어지도록 */
    white-space: nowrap !important; /* 텍스트가 한 줄로 표시되도록 */
    overflow: hidden !important; /* 넘치는 부분이 보이지 않도록 */
    text-overflow: ellipsis !important; /* 넘치는 부분은 '...'으로 표시되도록 */
  }
</style>
