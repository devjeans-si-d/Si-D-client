<template>
    <v-container fluid class="custom-container">

        <v-container style="background-color:#DEF5EC; min-height: 500px">
            <v-spacer :style="{ height: '20px' }"></v-spacer>
            <h3 style="text-align:center; color:#094F08;">Launched Project</h3>
            <v-row justify="space-between" align="center">
                <!-- 왼쪽 빈 공간을 차지하는 v-col -->
                <v-col cols="4">
                </v-col>
            
                <!-- 중앙에 위치하는 프로젝트 이름 -->
                <v-col cols="4" class="text-center">
                    <h1 style="color:#094F08;">{{ project.projectName }}</h1>
                </v-col>
            
                <!-- 오른쪽에 위치하는 스크랩,조회수 버튼 -->
                <v-col cols="4" class="text-right">
                    <v-chip
                    class="mr-3"
                    size="large"
                    :color="isScrapped ? '#8DBCA8' : 'grey lighten-2'"
                    :variant="isScrapped ? 'flat' : 'tonal'" 
                    @click="handleClickScrap"
                    > 🍾 {{basicInfo.scrapCount}}
                    </v-chip>

                    <v-chip
                    class="mr-10"
                    prepend-icon="mdi-eye"
                    size="large"
                    >{{basicInfo.views}}
                    </v-chip>
                </v-col>
            </v-row>
            <v-row class="mt-0">
                <v-col cols="12" class="d-flex justify-end">
                    <v-chip
                    v-if="isPm" 
                    style="width: 40px; height: 40px; border-radius: 50%;" 
                    color="#094F08"
                    class="mr-3"
                    @click="$router.push({ path: `/launched-project/${launchedProjectId}/edit` })"
                    >
                        <v-tooltip activator="parent" location="top">글 수정하기</v-tooltip>
                        <v-icon>mdi-pencil</v-icon>
                    </v-chip>
                    <v-chip 
                    v-if="isPm"
                    style="width: 40px; height: 40px; border-radius: 50%;" 
                    color="#094F08"
                    class="mr-10"
                    @click="deleteLaunchedProject"
                    >
                        <v-tooltip activator="parent" location="top">글 삭제하기</v-tooltip>
                        <v-icon>mdi-trash-can</v-icon>
                    </v-chip>
                </v-col>
            </v-row>
            
            <!-- <v-spacer :style="{ height: '50px' }"></v-spacer> -->

            <v-row>
                <v-col cols="7">
                    <v-container class="pa-7" style="position: relative;">
                        <!-- contents의 첫번 째줄은 h2태그로 출력 -->
                        <h2>{{ firstLine }}</h2>
                        <v-spacer :style="{ height: '15px' }"></v-spacer>
                        <!-- 나머지 내용을 v-text로 줄바꿈 유지하며 출력 -->
                        <v-text>
                            <span v-for="(line, index) in otherLines" :key="index">
                                {{ line }}<br>
                            </span>
                        </v-text> 
                        <v-spacer :style="{ height: '40px' }"></v-spacer>
                        <v-chip 
                        v-if="basicInfo && basicInfo.siteUrl"
                        class="mt-5" 
                        style="color:#094F08; size: x-large; position: absolute; bottom: 0; left: 10;"
                        size=x-large
                        @click="navigateToSite"
                        >
                        <v-icon icon="mdi-web" start></v-icon>
                        Web
                        </v-chip>
                    </v-container>   
                </v-col>

                <v-col cols="5">
                    <v-container class="pa-7">
                        <div class="phone-frame">
                            <img 
                                :src="phoneFrame"
                                alt="Phone Frame"
                                class="frame-image"
                            />
                            <img 
                                :src="basicInfo.launchedProjectImage" 
                                alt="Launched Project Image"
                                class="project-image"
                            />
                        </div>    
                    </v-container>    
                </v-col>
            </v-row>
        </v-container>
        <v-container style="background-color:#F3F3F3">
            <h2 class="ml-7 mt-7">이런 스킬을 사용했어요.</h2>
            <v-container class="mx-7">
                <v-row>
                    <!-- 직무별 기술 스택을 나열하는 예제 -->
                    <v-col v-for="(techStacks, jobField) in techStacksByJobField" :key="jobField" cols="12">
                      <h3>{{ jobField }}</h3>
                      <div class="chips-container">
                        <v-chip
                            v-for="techStack in techStacks"
                            :key="techStack"
                            :color="getColorForJobField(jobField)"
                            size="x-large"
                        >
                            {{ techStack }}
                        </v-chip>  
                      </div>
                    </v-col>
                  </v-row>
            </v-container>
            <h2 class="ml-7 mt-7">우리 팀원을 소개할게요.</h2>
            <v-container class="mx-7">
                <v-row>
                    <v-col v-for="(members, jobField) in membersByJobField" :key="jobField" cols="12">
                      <h3>{{ jobField }}</h3>
                        <div class="chips-container">
                            <MemberChip
                            v-for="member in members"
                            :key="member.memberId"
                            :url="member.profileImageUrl"
                            :name="member.nickname"
                            :memberId="member.memberId" 
                            @navigate="moveToSiderCard"
                            ></MemberChip>
                        </div>
                    </v-col>
                  </v-row>
            </v-container>
        </v-container>

        <!-- 비회원 스크랩 금지 모달 -->
        <v-dialog v-model="notMemberModal" max-width="500px" rounded="xl">
            <v-card>
                <v-card-title>로그인</v-card-title>
                <v-divider class="mb-4"></v-divider>
                <v-card-text>해당 기능은 로그인하셔야 사용하실 수 있습니다.</v-card-text>
                <v-card-actions>
                    <v-row justify="center">
                        <v-btn rounded="xl" variant="flat" density="default" color="#A4DEC6" :style="{ color: '#FFFFFF' }"
                            @click="notMemberModal = false">확인</v-btn>
                    </v-row>
                </v-card-actions>
                <v-divider class="mt-2 mb-10"></v-divider>
            </v-card>
        </v-dialog>

        <!-- 글 삭제 후 띄워줄 모달 -->

    </v-container>
    
</template>
<script>
import axios from 'axios';
import MemberChip from '@/components/chip/MemberChip.vue';
import { useRoute } from 'vue-router';

export default{
    components: {
        MemberChip,
    },
    data(){
        return{
            id:"",
            isPm: false,
            project: [],
            basicInfo: [],
            techStacks: [],
            members: [],
            firstLine: "",
            otherLines: [],
            phoneFrame: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/iPhoneMockup.png",
            colors: {
                Designer : 'pink lighten-1',
                Frontend: 'cyan lighten-2',
                Backend: 'deep-orange lighten-1',
                App: 'green',
                PM: 'purple lighten-1'
            },
            isScrapped: false, // 스크랩 여부를 저장하는 변수
            isLogin: false, // 로그인 여부
            modalTitle: "로그인",
            modalContents: "로그인 이용자만 가능한 서비스입니다. 로그인 후 이용해주세요",
            notMemberModal: false, // 비회원 스크랩금지 모달 상태
            // deleteModal: false, // 글 삭제 후 띄워줄 모달 상태
        };
    },
    async created(){
        const route = useRoute();

        const token = localStorage.getItem("token");
        if(token){
            this.isLogin = true;
        }
        this.launchedProjectId = route.params.launchedProjectId;
    },
    async mounted(){
        await this.loadBasicInfo(); // 기본 정보 로드 후 호출
        await this.loadTechStacks();
        await this.loadMembers();

        if(this.isLogin){
             await this.checkScrapStatus(); // 페이지가 로드된 후 스크랩 상태 확인
        }   
    },
    computed: {
        techStacksByJobField() {
            const grouped = {};
            this.techStacks.forEach(stack => {
                if (!grouped[stack.jobField]) {
                    grouped[stack.jobField] = [];
                }
                grouped[stack.jobField].push(stack.techStackName);
            });
            return grouped;
        },
        membersByJobField() {
        const grouped = {};
        this.members.forEach(member => {
            if (!grouped[member.jobField]) {
            grouped[member.jobField] = [];
            }
            grouped[member.jobField].push({
            memberId: member.memberId,
            nickname: member.nickname,
            profileImageUrl: member.profileImageUrl
            });
        });
        return grouped;
        }
    },
    methods:{
        async loadBasicInfo(){
            try{
                const basicInfoResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/detail/${this.launchedProjectId}/basic-info`);
                this.basicInfo = basicInfoResponse.data;

                // pm인지 확인
                const pmId = basicInfoResponse.data.pmId;
                this.isPm = pmId == localStorage.getItem("id") ? true : false;

                // 완성된프로젝트 글내용
                const contents = basicInfoResponse.data.launchedProjectContents;
                // 줄바꿈 기준으로 첫 번째 줄과 나머지 줄을 분리
                const lines = contents.split('\n').map(line => line.trim());
                this.firstLine = lines[0] || ''; // 첫 번째 줄
                this.otherLines = lines.slice(1) || []; // 나머지 줄

                // 완성된 프로젝트에 fk 걸린 project id
                const projectId = basicInfoResponse.data.projectId;
                const projectResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/`+ projectId);
                this.project = projectResponse.data;

            }catch(error){
                // 에러가 발생한 경우, 서버에서 반환한 메시지를 alert로 표시
                if (error.response && error.response.data) {
                    alert(error.response.data.message);// 서버에서 반환한 에러 메시지
                } else {
                    alert('An unknown error occurred. Please try again later.');
                }
            }
        },
        async checkScrapStatus() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/is-scrapped/${this.launchedProjectId}`);
                this.isScrapped = response.data; // API 응답으로 `isScrapped` 업데이트
            } catch (error) {                
                if (error.response && error.response.data) {
                    alert(error.response.data.message);// 서버에서 반환한 에러 메시지
                } else {
                    alert('An unknown error occurred. Please try again later.');
                }
            }
        },
            async loadTechStacks(){
            try{
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/detail/${this.launchedProjectId}/tech-stacks`);
                this.techStacks = response.data;
            }catch(error){
                // 에러가 발생한 경우, 서버에서 반환한 메시지를 alert로 표시
                if (error.response && error.response.data) {
                    alert(error.response.data.message);// 서버에서 반환한 에러 메시지
                } else {
                    alert('An unknown error occurred. Please try again later.');
                }
            }
        },
        async loadMembers(){
            try{
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/detail/${this.launchedProjectId}/members`);
                this.members = response.data;
            }catch(error){
                // 에러가 발생한 경우, 서버에서 반환한 메시지를 alert로 표시
                if (error.response && error.response.data) {
                    alert(error.response.data.message);// 서버에서 반환한 에러 메시지
                } else {
                    alert('An unknown error occurred. Please try again later.');
                }
            }
        },
        getColorForJobField(jobField) {
            return this.colors[jobField] || 'grey'; // 기본 색상 설정
        },
        moveToSiderCard(memberId){
            this.$router.push({ path: `/sider-card/${memberId}` });
        },
        navigateToSite() {
            if (this.basicInfo && this.basicInfo.siteUrl) {
                window.location.href = this.basicInfo.siteUrl;
            } else {
                console.error("사이트 URL이 존재하지 않습니다.");
            }
        },
        async clickScrap() {
            if (this.isScrapped) {
                await this.unDoScrap();
            } else {
                await this.doScrap();
            }
        },
        async doScrap() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/scrap/${this.launchedProjectId}`);
                this.isScrapped = true;
                this.basicInfo.scrapCount = response.data.scrapCount;
                // await this.loadBasicInfo(); // 데이터 새로 로드
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.message);// 서버에서 반환한 에러 메시지
                } else {
                    alert('An unknown error occurred. Please try again later.');
                }
            }
        },
        async unDoScrap() {
            try {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/scrap/${this.launchedProjectId}`);
                this.isScrapped = false;
                this.basicInfo.scrapCount = response.data.scrapCount;
                // await this.loadBasicInfo(); // 데이터 새로 로드
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.message);// 서버에서 반환한 에러 메시지
                } else {
                    alert('An unknown error occurred. Please try again later.');
                }
            }
        },
        handleClickScrap() {
            if(this.isLogin){
                this.clickScrap();
            }else{
                this.notMemberModal = true;
            }
        },
        async deleteLaunchedProject(){
            try{
                await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/delete/${this.launchedProjectId}`);
            }catch(error){
                if (error.response && error.response.data) {
                    alert(error.response.data.message);// 서버에서 반환한 에러 메시지 
                } else {
                    alert('An unknown error occurred. Please try again later.');
                }
            }
        }
    }
};
</script>
<style scoped>
.phone-frame {
    position: relative;
    width: 100%;
    padding-top: 120%;  /* 비율 유지 */
}

.project-image {
    position: absolute;
    top: 2px;  /* 프레임의 상단 여백을 설정 */
    left: 104px;  /* 프레임의 좌측 여백을 설정 */
    width: 170px;  /* 프레임 크기 대비 90% */
    height: 353px;  /* 프레임 크기 대비 90% */
    object-fit: cover;  /* 이미지를 프레임 크기에 맞춤 */
    z-index: 0;
    border-radius: 30px;
    overflow: hidden;
}

.frame-image {
    position: absolute;
    top: 0;
    left: 100px;
    width: 180px;
    height: 357.92px;
    object-fit: contain;  /* 프레임 이미지 크기 유지 */
    z-index: 1;
}
.chips-container {
  display: flex;
  flex-wrap: wrap; /* 줄바꿈을 허용 */
  gap: 8px; /* 태그 사이의 간격 */
  margin-top: 8px; /* 직무 제목과 태그 사이의 간격 */
}
</style>

