<template>
    <v-container fluid class="custom-container">
        <!-- 전체 container -->
        <v-spacer :style="{height: '50px'}"></v-spacer>
        <v-img
            alt="MainPageBanner"
            src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/main_page_banner.png"
        ></v-img>

        <v-spacer :style="{height: '50px'}"></v-spacer>

        <!-- <v-img
            src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/capture.PNG"
        >
        </v-img> -->

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
                <project-window
                    :windowCount="2"
                    :projects="projects"
                >
                </project-window>
            </v-row>

            <v-row justify="center" style="margin-top: -20px;">
                <v-btn
                    class="custom-button"
                    style="background-color: #E6E6E6;"
                    text :to="{path:'/team-building/list'}"
                >모집 공고 더보기</v-btn>
            </v-row> 

        <v-spacer :style="{height: '30px'}"></v-spacer>

        </v-container>
        
        <v-spacer :style="{height: '50px'}"></v-spacer>

        <v-container
            style="background-color: #F3F3F3; border-radius: 15px; max-width: 1200px; padding: 20px;"
        >
            <!-- Launched-Project container -->
            <!-- <v-spacer :style="{ height: '20px' }"></v-spacer> -->

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
                <launched-project-window
                    :windowCount="2"
                    :projects="launched_projects"
                >
                </launched-project-window>
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

            <sider-card-window
                :windowCount="2"
                :sidecards="siderCards"
            >
            </sider-card-window>

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

    
</template>
<script>
  import LaunchedProjectWindow from '@/components/windows/LaunchedProjectWindow.vue';
  import ProjectWindow from '@/components/windows/ProjectWindow.vue';
  import SiderCardWindow from '@/components/windows/SiderCardWindow.vue';

export default {
  components: {
    LaunchedProjectWindow,
    ProjectWindow,
    SiderCardWindow
  },
  data() {
    return {
      launched_projects: [
        { id: 1, name: 'Project 1', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/smallchat.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 2, name: 'Project 2', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/smallchat.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 3, name: 'Project 3', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/smallchat.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 4, name: 'Project 4', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/smallchat.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 5, name: 'Project 5', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/smallchat.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 6, name: 'Project 6', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/smallchat.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 7, name: 'Project 7', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/smallchat.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 8, name: 'Project 8', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/smallchat.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
      ],
      projects: [
        { id: 1, name: 'Project 1', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mbtips.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 2, name: 'Project 2', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mbtips.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 3, name: 'Project 3', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mbtips.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 4, name: 'Project 4', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mbtips.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 5, name: 'Project 5', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mbtips.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 6, name: 'Project 6', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mbtips.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 7, name: 'Project 7', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mbtips.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10},
        { id: 8, name: 'Project 8', image: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/mbtips.png', contents: 'Details about project 1', techStacks: 'Vue, Vuetify',scraps: 10}
      ],
      siderCards: [
        { id: 1, nickName: '갓세정1', profileImage: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/%EB%B9%99%ED%8B%B0.jpg', jobField: 'Backend'},
        { id: 2, nickName: '갓세정2', profileImage: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/%EA%92%B0+acnh+lolly+pfp+!+%EA%92%B1+%E2%99%A1.jpeg', jobField: 'Backend'},
        { id: 3, nickName: '갓세정3', profileImage: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/%EC%8A%A4%EB%88%84%ED%94%BC.jpg', jobField: 'Backend'},
        { id: 4, nickName: '갓세정4', profileImage: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/malmo.png', jobField: 'Backend'},
        { id: 5, nickName: '꿔바로우', profileImage: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/sid-practice/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2024-08-05+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+10.08.49.png', jobField: 'Backend'},
        { id: 6, nickName: '갓세정6', profileImage: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/glasses_mandoo.jpg', jobField: 'Backend'},
        
      ]
    };
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
</style>
