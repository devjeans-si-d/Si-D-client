<template>
    <v-container fluid class="custom-container">

        <v-container style="background-color:#DEF5EC">
            <v-spacer :style="{ height: '20px' }"></v-spacer>
            <h3 style="text-align:center; color:#094F08;">Launched Project</h3>
            <h1 style="text-align:center; color:#094F08;"> {{ project.projectName }} </h1>
            <v-spacer :style="{ height: '50px' }"></v-spacer>

            <v-row>
                <v-col cols="7">
                    <v-container class="pa-7">
                        <!-- contents의 첫번 째줄은 h2태그로 출력 -->
                        <h2>{{ firstLine }}</h2>
                        <v-spacer :style="{ height: '15px' }"></v-spacer>
                        <!-- 나머지 내용을 v-text로 줄바꿈 유지하며 출력 -->
                        <v-text>
                            <span v-for="(line, index) in otherLines" :key="index">
                                {{ line }}<br>
                            </span>
                        </v-text> 
                    </v-container>   
                </v-col>

                <v-col cols="5">
                    <v-container class="pa-7">
                        <div class="phone-frame">
                            <v-img 
                                :src="phoneFrame"
                                alt="Phone Frame"
                                class="frame-image"
                            ></v-img>
                            <v-img 
                                :src="basicInfo.launchedProjectImage" 
                                alt="Launched Project Image"
                                class="project-image"
                            ></v-img>
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
                            <member-chip
                            v-for="member in members"
                            :key="member.memberId"
                            :url="member.profileImageUrl"
                            :name="member.nickname"
                            :memberId="member.memberId" 
                            @navigate="moveToSiderCard"
                            ></member-chip>
                        </div>
                    </v-col>
                  </v-row>
            </v-container>
        </v-container>

    </v-container>
    
</template>
<script>
import axios from 'axios';
import MemberChip from '@/components/chip/MemberChip.vue';
import { useRoute } from 'vue-router';

export default{
    components: {
        MemberChip
    },
    data(){
        return{
            id:"",
            project: [],
            basicInfo: [],
            techStacks: [],
            members: [],
            firstLine: "",
            otherLines: [],
            phoneFrame: "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/iPhoneMockup.png",
            colors: {
                DESIGNER: 'pink lighten-1',
                FRONTEND: 'cyan lighten-2',
                BACKEND: 'deep-orange lighten-1',
                APP: 'green',
                PM: 'purple lighten-1'
            }

        };
    },
    created(){
        const route = useRoute();
        this.launchedProjectId = route.params.launchedProjectId;
        this.loadBasicInfo();
    },
    mounted(){
        this.loadTechStacks();
        this.loadMembers();
        
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
                // 이후 9 => {id}로 바꿔야됨
                const basicInfoResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/detail/${this.launchedProjectId}/basic-info`);
                console.log(basicInfoResponse.data);
                this.basicInfo = basicInfoResponse.data;
                
                // 완성된프로젝트 글내용
                const contents = basicInfoResponse.data.launchedProjectContents;
                // 줄바꿈 기준으로 첫 번째 줄과 나머지 줄을 분리
                const lines = contents.split('\n').map(line => line.trim());
                this.firstLine = lines[0] || ''; // 첫 번째 줄
                this.otherLines = lines.slice(1) || []; // 나머지 줄

                // 완성된 프로젝트에 fk 걸린 project id
                const projectId = basicInfoResponse.data.projectId;
                const projectResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/`+ projectId);
                console.log(projectResponse.data);
                this.project = projectResponse.data;

            }catch(error){
                console.error("완성된 프로젝트 기본정보 API 호출 실패:", error);
            }
        },
        async loadTechStacks(){
            try{
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/detail/${this.launchedProjectId}/tech-stacks`);
                console.log(response.data);
                this.techStacks = response.data;
            }catch(error){
                console.error("완성된 프로젝트 기술스택 API 호출 실패:", error);
            }
        },
        async loadMembers(){
            try{
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/detail/${this.launchedProjectId}/members`);
                console.log(response.data);
                this.members = response.data;
            }catch(error){
                console.error("완성된 프로젝트 참여멤버 API 호출 실패:", error);
            }
        },
        getColorForJobField(jobField) {
            return this.colors[jobField] || 'grey'; // 기본 색상 설정
        },
        moveToSiderCard(memberId){
            this.$router.push({ path: `/sider-card/${memberId}` });
        },
    },
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
    top: 2%;  /* 프레임의 상단 여백을 설정 */
    left: 2%;  /* 프레임의 좌측 여백을 설정 */
    width: 96%;  /* 프레임 크기 대비 90% */
    height: 96%;  /* 프레임 크기 대비 90% */
    object-fit: cover;  /* 이미지를 프레임 크기에 맞춤 */
    z-index: 0;
}

.frame-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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

