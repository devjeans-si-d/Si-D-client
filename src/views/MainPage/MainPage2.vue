<template>
    <v-container fluid class="custom-container">
        <!-- 전체 container -->
        <v-spacer :style="{height: '50px'}"></v-spacer>
        <v-img
            alt="MainPageBanner"
            src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/main_page_banner.png"
        ></v-img>

        <v-spacer :style="{height: '50px'}"></v-spacer>

        <!-- 지금 모집중인 인기공고 container -->
        <v-container style="background-color: #F3F3F3; border-radius:15px; max-width: 1200px;">
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

            <v-row justify="center">
                <v-card
                    style="background-color: #F3F3F3; border-radius: 15px; padding: 20px; max-width: 1200px; width: 100%;"
                    rounded="0"
                    flat
                >
                    <v-window v-model="onboardingProject" style="max-width: 1200px; width: 100%;">
                        <v-window-item v-for="n in windowCount" :key="`window-${n}`" :value="n">
                            <v-row class="d-flex justify-center">
                                <v-col
                                    v-for="(project, index) in paginatedProjects(n)"
                                    :key="index"
                                    cols="12"
                                    md="3"
                                    class="d-flex justify-center"
                                >
                                    <v-card 
                                        class="mx-auto" 
                                        style="width: 100%; max-width: 250px;"
                                        @click="() => moveToProject(project.id)"
                                    >
                                        <v-img
                                            class="custom-img"
                                            height="250"
                                            :src="project.launchedProjectImage"
                                            alt="LaunchedProject 썸네일"
                                            cover
                                        />
                                        <v-card-title class="d-flex justify-space-between align-center">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                                {{ project.projectName }}
                                            </span>
                                            <v-chip color="primary" text-color="white">
                                                🍾 {{ project.scraps }}
                                            </v-chip>
                                        </v-card-title>
                                        <v-card-subtitle class="pt-3 mr-5 custom-contents">
                                            <div>{{ project.launchedProjectContents }}</div>
                                        </v-card-subtitle>
                                        <v-card-subtitle class="pt-2 mr-5 custom-contents">
                                            <div class="mb-4">{{ project.techStacks }}</div>
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>

                    <v-card-actions class="justify-space-between">
                        <v-btn icon="mdi-chevron-left" variant="plain" @click="prevProject"></v-btn>
                        <v-item-group v-model="onboardingProject" class="text-center" mandatory>
                            <v-item
                                v-for="n in windowCount"
                                :key="`btn-${n}`"
                                v-slot="{ isSelected, toggle }"
                                :value="n"
                            >
                                <v-btn
                                    :color="isSelected ? 'primary' : 'secondary'"
                                    icon="mdi-circle-small"
                                    @click="toggle"
                                ></v-btn>
                            </v-item>
                        </v-item-group>
                        <v-btn icon="mdi-chevron-right" variant="plain" @click="nextProject"></v-btn>
                    </v-card-actions>
                </v-card>
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

        <!-- Launched Project container -->
        <v-container style="background-color: #F3F3F3; border-radius: 15px; max-width: 1200px; padding: 20px;">
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
                <v-card
                    style="background-color: #F3F3F3; border-radius: 15px; padding: 20px; max-width: 1200px; width: 100%;"
                    rounded="0"
                    flat
                >
                    <v-window v-model="onboardingLaunchedProject" style="max-width: 1200px; width: 100%;">
                        <v-window-item v-for="n in windowCount" :key="`window-${n}`" :value="n">
                            <v-row class="d-flex justify-center">
                                <v-col
                                    v-for="(project, index) in paginatedLaunchedProjects(n)"
                                    :key="index"
                                    cols="12"
                                    md="3"
                                    class="d-flex justify-center"
                                >
                                    <v-card 
                                        class="mx-auto" 
                                        style="width: 100%; max-width: 250px;"
                                        @click="() => moveToProject(project.id)"
                                    >
                                        <v-img
                                            class="custom-img"
                                            height="250"
                                            :src="project.launchedProjectImage"
                                            alt="LaunchedProject 썸네일"
                                            cover
                                        />
                                        <v-card-title class="d-flex justify-space-between align-center">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                                {{ project.projectName }}
                                            </span>
                                            <v-chip color="primary" text-color="white">
                                                🍾 {{ project.scraps }}
                                            </v-chip>
                                        </v-card-title>
                                        <v-card-subtitle class="pt-3 mr-5 custom-contents">
                                            <div>{{ project.launchedProjectContents }}</div>
                                        </v-card-subtitle>
                                        <v-card-subtitle class="pt-2 mr-5 custom-contents">
                                            <div class="mb-4">{{ project.techStacks }}</div>
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>

                    <v-card-actions class="justify-space-between">
                        <v-btn icon="mdi-chevron-left" variant="plain" @click="prevLaunchedProject"></v-btn>
                        <v-item-group v-model="onboardingLaunchedProject" class="text-center" mandatory>
                            <v-item
                                v-for="n in windowCount"
                                :key="`btn-${n}`"
                                v-slot="{ isSelected, toggle }"
                                :value="n"
                            >
                                <v-btn
                                    :color="isSelected ? 'primary' : 'secondary'"
                                    icon="mdi-circle-small"
                                    @click="toggle"
                                ></v-btn>
                            </v-item>
                        </v-item-group>
                        <v-btn icon="mdi-chevron-right" variant="plain" @click="nextLaunchedProject"></v-btn>
                    </v-card-actions>
                </v-card>
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

        <!-- Si-Der와 함께해보세요 container -->
        <v-container style="background-color: #DEF5EC; border-radius:15px; max-width: 1200px;">
            <v-spacer :style="{height: '20px'}"></v-spacer>

            <v-row>
                <v-col>
                    <h2 style="text-align:center; color: #094F08">🍀 Si-Der와 함께해보세요!</h2>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-card
                    style="background-color: #F3F3F3; border-radius: 15px; padding: 20px; max-width: 1200px; width: 100%;"
                    rounded="0"
                    flat
                >
                    <v-window v-model="onboardingSiderCard" style="max-width: 1200px; width: 100%;">
                        <v-window-item v-for="n in windowCount" :key="`window-${n}`" :value="n">
                            <v-row class="d-flex justify-center">
                                <v-col
                                    v-for="(siderCard, index) in paginatedSiderCards(n)"
                                    :key="index"
                                    cols="12"
                                    md="3"
                                    class="d-flex justify-center"
                                >
                                    <v-card 
                                        class="mx-auto" 
                                        style="width: 100%; max-width: 250px;"
                                        @click="() => moveToSiderCard(siderCard.id)"
                                    >
                                        <v-img
                                            class="custom-img"
                                            height="250"
                                            :src="siderCard.imageUrl || defaultImageUrl"
                                            alt="SiderCard 썸네일"
                                            cover
                                        />
                                        <v-card-title class="d-flex justify-space-between align-center">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                                {{ siderCard.title }}
                                            </span>
                                        </v-card-title>
                                        <v-card-subtitle class="pt-3 mr-5 custom-contents">
                                            <div>{{ siderCard.contents }}</div>
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>

                    <v-card-actions class="justify-space-between">
                        <v-btn icon="mdi-chevron-left" variant="plain" @click="prevSiderCard"></v-btn>
                        <v-item-group v-model="onboardingSiderCard" class="text-center" mandatory>
                            <v-item
                                v-for="n in windowCount"
                                :key="`btn-${n}`"
                                v-slot="{ isSelected, toggle }"
                                :value="n"
                            >
                                <v-btn
                                    :color="isSelected ? 'primary' : 'secondary'"
                                    icon="mdi-circle-small"
                                    @click="toggle"
                                ></v-btn>
                            </v-item>
                        </v-item-group>
                        <v-btn icon="mdi-chevron-right" variant="plain" @click="nextSiderCard"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>

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
import axios from 'axios';

export default {
  data() {
    return {
      acceptDialog: false,
      launched_projects: [],
      projects: [],
      siderCards: [],
      defaultImageUrl: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/default_profile_image.png", // 사이더카드 설정 프로필 사진 없을 시 default사진으로 대체
      onboardingProject: 1,
      onboardingLaunchedProject: 1,
      onboardingSiderCard: 1,
      windowCount: 2,
    };
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
            console.log(response.data.content);

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
            console.log(response.data.content);
            
            this.siderCards = response.data.content;
        } catch (error) {
            console.error("메인페이지 SiderCard 리스트 data load 에러:", error);
        }    
    },
    async loadProject(){
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/main/top-project`);
            console.log(response.data.content);
            
            this.projects = response.data.content;
        } catch (error) {
            console.error("메인페이지 Project 리스트 data load 에러:", error);
        }  
    },
    accept(){
        this.acceptDialog = false;
        this.$router.push(`/sider-card`);
    },
    prevProject() {
      if (this.onboardingProject > 1) this.onboardingProject--;
    },
    nextProject() {
      if (this.onboardingProject < this.windowCount) this.onboardingProject++;
    },
    paginatedProjects(n) {
      const itemsPerPage = Math.ceil(this.projects.length / this.windowCount);
      const start = (n - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return this.projects.slice(start, end);
    },
    prevLaunchedProject() {
      if (this.onboardingLaunchedProject > 1) this.onboardingLaunchedProject--;
    },
    nextLaunchedProject() {
      if (this.onboardingLaunchedProject < this.windowCount) this.onboardingLaunchedProject++;
    },
    paginatedLaunchedProjects(n) {
      const itemsPerPage = Math.ceil(this.launched_projects.length / this.windowCount);
      const start = (n - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return this.launched_projects.slice(start, end);
    },
    prevSiderCard() {
      if (this.onboardingSiderCard > 1) this.onboardingSiderCard--;
    },
    nextSiderCard() {
      if (this.onboardingSiderCard < this.windowCount) this.onboardingSiderCard++;
    },
    paginatedSiderCards(n) {
      const itemsPerPage = Math.ceil(this.siderCards.length / this.windowCount);
      const start = (n - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return this.siderCards.slice(start, end);
    },
    moveToProject(id) {
      this.$router.push(`/project/${id}`);
    },
    moveToSiderCard(id) {
      this.$router.push(`/sider-card/${id}`);
    },
  },
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
.custom-img {
  border-radius: 10px;
}
</style>
