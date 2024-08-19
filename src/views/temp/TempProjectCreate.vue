<template>
    <v-container fluid class="custom-container">
        <v-row class="justify-start ml-5 mt-10" style="align-items:center;">
            <member-chip :url="this.pmImage" :name="this.pmNickname" :memberId="this.pmId" @navigate="moveToSiderCard">
                <!-- <v-avatar start>
                    <v-img :src="this.pmImage" class="profile-image" max-height="30" max-width="30"></v-img>
                </v-avatar>
                {{ this.pmNickname }} -->
            </member-chip>
            <v-btn size="large" variant="tonal" rounded style="margin-left: 5px;" @click="openChatModalFn()">
                PM과의 채팅
            </v-btn>
            <v-btn size="large" variant="tonal" rounded style="margin-left: 5px;" @click="openApplyModal()">
                프로젝트 지원
            </v-btn>
            <!-- <v-btn size="x-small" icon="$vuetify" variant="plain" style="margin-left: 5px;" @click="openChatModalFn()">
                <v-icon left class="mr-1 justify-center">mdi-chat-processing-outline</v-icon><v-tooltip
                    activator="parent" location="top">PM과의 채팅</v-tooltip>
            </v-btn>
            <v-btn size="x-small" icon="$vuetify" variant="plain" style="margin-left: 5px;" @click="openApplyModal()">
                <v-icon left class="mr-1 justify-center">mdi-lead-pencil</v-icon><v-tooltip activator="parent"
                    location="top">프로젝트 지원</v-tooltip>
            </v-btn> -->

            <v-btn size="large" icon="$vuetify" variant="plain" style="margin-left:10px; margin-right: 5px;"
                @click="clickScrap()">
                <v-icon left class="mr-1">{{ this.isScrap ? 'mdi-bookmark-multiple' : 'mdi-bookmark-multiple-outline'
                    }}</v-icon>{{ this.scrapCount }}<v-tooltip activator="parent" location="top">프로젝트 스크랩</v-tooltip>
            </v-btn>
            <v-btn size="large" icon="$vuetify" variant="plain" style="margin-left:10px; margin-right: 5px;">
                <v-icon left class="mr-1">mdi-eye</v-icon>{{ this.views }}
            </v-btn>


        </v-row>
        <v-spacer :style="{ height: '40px' }"></v-spacer>

        <v-divider class="mb-4"></v-divider>
        <v-spacer :style="{ height: '50px' }"></v-spacer>

        <!-- <v-btn size="large" icon="$vuetify" variant="plain mt-10 mb-10 " width="30" height="30"
            style="margin-left: 5px;" @click="clickBack()">
            <v-icon left class="mr-1">mdi-arrow-left</v-icon>
        </v-btn> -->
        <v-row class="written-date" style="margin-left:50px">{{ this.createdAt }}</v-row>

        <v-row class="studyContent_title__3680o" style="margin-left:50px">{{ this.title }}</v-row>
        <v-row class="" style="margin-top:50px; margin-left:50px">
            <h4>{{ this.description }}</h4>
        </v-row>

        <v-row class="mt-10 mb-5 justify-center">
            <img :src="this.projectImageUrl" class="rounded-lg" alt="Project Image"
                style="height:auto; width:800px; margin-left:50px" />

        </v-row>
        <v-row style="white-space: pre-line;" class="d-flex align-center ma-10" v-html="this.contents.replace(/\n/g, '<br>')"></v-row>
        

        <v-row class="" style="margin-top:50px; margin-left:50px; margin-bottom:20px">
            <h4> 현재 모집중인 정보 </h4>
        </v-row>

        <v-row class="justify-start" style="margin-left:50px">
            <ul id="recruitInfo" class="list-style-none p-0 m-0">
                <li v-for="(info, index) in showRecruitInfoList" :key="index" class="mb-4 d-flex justify-between">
                    <v-chip :color="getColorForJobField(info.recruitField)" class="mr-5 justify-center" style=" width: 100px; text-align: center;">
                        {{ info.recruitField }} 
                    </v-chip>
                    <span class="d-flex align-center">
                        <v-icon class="mr-2">mdi-account</v-icon>
                        {{ info.count }} 명
                    </span>
                </li>

            </ul>
        </v-row>

        <v-row class="" style="margin-top:50px; margin-left:50px; margin-bottom:20px">
            <h4> 현재 팀 구성 </h4>
        </v-row>

        <v-row v-for="(members, jobfield) in groupedMembers" :key="jobfield" class="mt-10 mb-10">
            <v-col cols="12">
                <h5>{{ jobfield }}</h5>
            </v-col>
            <v-col cols="12">
                <v-row class="d-flex flex-wrap">
                    <v-col v-for="member in members" :key="member.memberId" cols="auto" class="pa-2">

                        <v-chip size="large" class="ma-2 d-flex align-center">
                            <v-avatar start>
                                <v-img :src="member.memberImageUrl"></v-img>
                            </v-avatar>
                            {{ member.nickname }} ({{ member.jobfield }})
                        </v-chip>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row v-for="(members, jobfield) in groupedMembers" :key="jobfield" class="mt-10 mb-10">
            <v-col cols="12">
                <h5>{{ jobfield }}</h5>
            </v-col>
            <v-col cols="12" class="flex-wrap">
                <v-chip v-for="member in members" :key="member.memberId" size="large" class="ma-2">
                    <v-avatar start>
                        <v-img :src="member.memberImageUrl"></v-img>
                    </v-avatar>
                    {{ member.nickname }} ({{ member.jobfield }})
                </v-chip>
            </v-col>
        </v-row>
        <!-- 
        <v-row class="justify-center ml-5 mt-10" style="align-items:center;">
            <v-avatar start>
                <v-img :src="this.pmImage" class="profile-image" max-height="30" max-width="30"></v-img>
            </v-avatar>
            {{ this.pmNickname }}


            <v-btn size="x-small" icon="$vuetify" variant="plain" style="margin-left: 5px;" @click="openChatModalFn()">
                <v-icon left class="mr-1 justify-center">mdi-chat-processing-outline</v-icon><v-tooltip
                    activator="parent" location="top">PM과의 채팅</v-tooltip>
            </v-btn>
            <v-btn size="x-small" icon="$vuetify" variant="plain" style="margin-left: 5px;" @click="openApplyModal()">
                <v-icon left class="mr-1 justify-center">mdi-lead-pencil</v-icon><v-tooltip activator="parent"
                    location="top">프로젝트 지원</v-tooltip>
            </v-btn>
            <v-btn size="x-small" icon="$vuetify" variant="plain" style="margin-left:10px; margin-right: 5px;"
                @click="clickScrap()">
                <v-icon left class="mr-1">{{ this.isScrap ? 'mdi-bookmark-multiple' : 'mdi-bookmark-multiple-outline'
                    }}</v-icon><v-tooltip activator="parent" location="top">프로젝트 스크랩</v-tooltip>
            </v-btn>
        </v-row> -->
        <v-spacer :style="{ height: '40px' }"></v-spacer>







        <v-spacer :style="{ height: '10px' }"></v-spacer>
        <v-row class="explainProject justify-center mt-10 mb-3">프로젝트 소개</v-row>

        <v-divider class="mb-4"></v-divider>

        <v-row class="mt-10 mb-5 justify-center">
            <img :src="this.projectImageUrl" alt="Project Image" style="height:auto; width:500px;" />

        </v-row>

        <v-spacer :style="{ height: '10px' }"></v-spacer>

        <v-row class=" subTitle mt-10 mb-10 ml-5">
            <h5>{{ this.description }}</h5>
        </v-row>


        <v-row style="white-space: pre-line;" class="d-flex align-center ma-10"
            v-html="this.contents.replace(/\n/g, '<br>')"></v-row>

        <v-spacer :style="{ height: '20px' }"></v-spacer>

        <v-container class="mx-7">
            <v-row>
                <!-- 직무별 기술 스택을 나열하는 예제 -->
                <v-col v-for="(techStacks, jobField) in techStacksByJobField" :key="jobField" cols="12">
                    <h3>{{ jobField }}</h3>
                    <div class="chips-container">
                        <v-chip v-for="techStack in techStacks" :key="techStack" :color="getColorForJobField(jobField)"
                            size="x-large">
                            {{ techStack }}
                        </v-chip>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-row class="justify-center ma-3">
            <ul id="recruitInfo" class="list-style-none p-0 m-0">
                <li v-for="(info, index) in showRecruitInfoList" :key="index" class="mb-4 d-flex justify-between">
                    <v-chip color="primary" class="mr-5" style="background-color: #DEF5EC;">
                        {{ info.recruitField }}
                    </v-chip>
                    <span class="d-flex align-center">
                        <v-icon class="mr-2">mdi-account</v-icon>
                        {{ info.count }} 명
                    </span>
                </li>
                <!-- this.deadline 값을 추가 -->
                <li class="mt-4 d-flex justify-between">
                    <span class="mr-5">마감일</span>
                    <span>{{ deadline }}</span>
                </li>
            </ul>
        </v-row>
        <v-row class="justify-center ma-3">
            <ul id="recruitInfo" class="list-style-none p-0 m-0">
                <li v-for="(info, index) in showRecruitInfoList" :key="index" class="mb-4 d-flex justify-between">
                    <span class="mr-5">{{ info.recruitField }} 모집</span>
                    <span>{{ info.count }} 명</span>
                </li>
                <!-- this.deadline 값을 추가 -->
                <li class="mt-4 d-flex justify-between">
                    <span class="mr-5">마감일</span>
                    <span>{{ deadline }}</span>
                </li>
            </ul>
        </v-row>
        <v-row v-for="(members, jobfield) in groupedMembers" :key="jobfield" class="mt-10 mb-10">
            <v-col cols="12">
                <h5>{{ jobfield }}</h5>
            </v-col>
            <v-col cols="12" class="flex-wrap">
                <v-chip v-for="member in members" :key="member.memberId" size="large" class="ma-2">
                    <v-avatar start>
                        <v-img :src="member.memberImageUrl"></v-img>
                    </v-avatar>
                    {{ member.nickname }} ({{ member.jobfield }})
                </v-chip>
            </v-col>
        </v-row>

        <v-divider class="mb-4"></v-divider>

        <v-spacer :style="{ height: '20px' }"></v-spacer>





        <!-- 지원하기 모달 -->
        <v-dialog v-model="applyModal" max-width="400px" rounded="xl">
            <v-card>
                <v-card-title> 지원하기 </v-card-title>
                <v-divider class="mb-4"></v-divider>
                <v-card-text>
                    <v-row class="mb-10">
                        <v-select v-model="this.applyJobfield" clearable label="Field" density="compact"
                            :items="this.applyJobFieldList" variant="outlined" class="ml-10 mr-10"></v-select>
                    </v-row>

                    <v-row class="mt-10"><v-text-field v-model="this.applyContents" label="한줄 소개" variant="underlined"
                            class="ml-10 mr-10" density="compact"></v-text-field></v-row>
                </v-card-text>
                <v-spacer :style="{ height: '5px' }"></v-spacer>
                <v-divider class="mt-5 mb-5"></v-divider>

                <v-card-actions>
                    <v-row justify="center">
                        <v-btn rounded="xl" variant="flat" density="default" color="#A4DEC6"
                            :style="{ color: '#FFFFFF' }" @click="this.confirmApply()">확인</v-btn>
                        <v-btn rounded="xl" variant="flat" density="default" color="#808080"
                            :style="{ color: '#FFFFFF' }" @click="this.closeApplyModal()">취소</v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>


    <v-dialog v-model="applyConfirmModal" max-width="500px" rounded="xl">
        <v-card>
            <v-card-title>지원</v-card-title>
            <v-divider class="mb-4"></v-divider>
            <v-card-text>지원되었습니다.</v-card-text>
            <v-card-actions>
                <v-row justify="center">
                    <v-btn rounded="xl" variant="flat" density="default" color="#A4DEC6" :style="{ color: '#FFFFFF' }"
                        @click="applyConfirmModalClose()">확인</v-btn>
                </v-row>
            </v-card-actions>
            <v-divider class="mt-2 mb-10"></v-divider>
        </v-card>
    </v-dialog>
    <v-dialog v-model="openChatModal" max-width="500px" rounded="xl">
        <v-card>
            <v-card-title>채팅</v-card-title>
            <v-divider class="mb-4"></v-divider>
            <v-card-text>PM에게 채팅하시겠습니까?</v-card-text>
            <v-card-actions>
                <v-row justify="center">
                    <ButtonComponent content="취소" :style="{ color: '#650101', backgroundColor: '#FFAFAF' }"
                        @click="closeChatModal()" class="ml-1" />
                    <ButtonComponent content="확인" @click="chatFn()" />
                </v-row>

            </v-card-actions>
            <v-divider class="mt-2 mb-10"></v-divider>
        </v-card>
    </v-dialog>
</template>
<script>

import axios from "axios";
import { useRoute } from 'vue-router';
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import MemberChip from '@/components/chip/MemberChip.vue';
// import BasicChip from '@/components/chip/BasicChip.vue';

export default {
    computed: {
        // 멤버를 jobfield별로 그룹화
        groupedMembers() {
            return this.showMemberList.reduce((groups, member) => {
                const field = member.jobfield;
                if (!groups[field]) {
                    groups[field] = [];
                }
                groups[field].push(member);
                return groups;
            }, {});
        },
        formattedContent() {
            return this.contents.replace(/\n/g, '<br>');
        }

    },
    components: {
        ButtonComponent,
        MemberChip,
        // BasicChip
    },
    data() {
        return {
            openChatModal: false,
            applyConfirmModal: false,
            applyModal: false,
            applyJobfield: "",
            applyJobFieldList: ['DESIGNER', 'FRONTEND', 'BACKEND', 'APP', 'PM'],
            dDay:"",
            isScrap: false,

            applyContents: "",
            projectImageFile: null,
            projectImageUrl: "",
            // 기존 데이터
            membrerAddDialog: false,
            searchValue: "",
            searchType: "optional",
            searchOptions: [
                { text: "이름", value: "name" },
                { text: "이메일 아이디", value: "email" },
                { text: "닉네임", value: "nickname" },
            ],
            memberField: "",
            selectedMember: null, // 현재 선택된 멤버 ID
            memberList: [], // 최종적으로 선택된 멤버들의 리스트
            showMemberList: [],
            projectId: 0,
            // 모집 정보
            recruitInfoDialogue: false,
            showRecruitInfoList: [],
            recruitField: "",
            count: "",


            title: "",
            description: "",
            deadline: "",
            contents: "",

            pmImage: "",
            pmNickname: "",
            pmId: 0,

            scrapCount: 0,
            views: 0,
            createdAt: "",
            colors: {
                DESIGNER: 'pink lighten-1',
                FRONTEND: 'cyan lighten-2',
                BACKEND: 'deep-orange lighten-1',
                APP: 'green',
                PM: 'purple lighten-1'
            },
        };
    },
    async mounted() {
        const route = useRoute();
        this.projectId = route.params.projectId;
        const getProjectResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}`)
        console.log(getProjectResponse);
        this.scrapCount = getProjectResponse?.data?.scrapCount;
        this.views = getProjectResponse?.data?.views;
        this.deadline = (getProjectResponse)?.data?.deadline;
        this.createdAt = getProjectResponse?.data?.createdAt.split('T')[0];
        this.title = (getProjectResponse)?.data?.projectName;
        this.projectImageUrl = (getProjectResponse)?.data?.imageUrl;
        this.projectImageFile = (getProjectResponse)?.data?.imageUrl;
        this.description = (getProjectResponse)?.data?.description;
        this.pmImage = getProjectResponse?.data?.pmImage;
        this.pmNickname = getProjectResponse?.data?.pmNickname;
        this.pmId = getProjectResponse?.data?.pmId;
        this.showMemberList = (getProjectResponse)?.data?.projectMembers.map((member) => {
            return {
                memberId: member.id,
                profileImageUrl: member.memberImageUrl,
                name: member.memberName, // 이름을 Chip에 표시하기 위해 추가
                nickname: member.memberNickname,
                jobfield: member.jobField, // 사용자가 선택한 직무 필드
            }
        });
        this.showRecruitInfoList = (getProjectResponse).data.recruitInfos.map((info) => {
            return {
                recruitField: info.jobField,
                count: info.count
            }
        })
        this.applyJobFieldList = this.showRecruitInfoList.map((recruit) => recruit.recruitField);
        this.isScrap = getProjectResponse?.data?.scrap;

        this.contents = getProjectResponse.data.recruitmentContents;
    },
    methods: {
        getColorForJobField(jobField) {
            return this.colors[jobField] || 'grey'; // 기본 색상 설정
        },
        moveToSiderCard(memberId) {
            this.$router.push({ path: `/sider-card/${memberId}` });
        },
        applyConfirmModalClose() {
            this.applyConfirmModal = false;
        },
        clickBack() {
            window.history.back();
        },
        clickScrap() {
            if (!this.isScrap) this.doScrap();
            else this.unDoScrap();
        },
        async doScrap() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}/scrap`)
                console.log(response);
                this.isScrap = true;
                this.scrapCount++;
                // 스크랩수 늘리기
            }
            catch (e) {
                console.log(e);
            }
        },
        async unDoScrap() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}/scrap/delete`)
                console.log(response);
                this.isScrap = false;
                this.scrapCount--;
                // 스크랩수 줄이기
            }
            catch (e) {
                console.log(e);
            }
        },

        // 지원하기 모달 관련 함수
        openApplyModal() {
            this.applyModal = true;
        },
        closeApplyModal() {
            this.applyModal = false;
            this.clearApplyModal();
        },
        reloadPage() {
            window.location.reload();
        },
        clearApplyModal() {
            this.applyJobfield = "";
            this.applyContents = "";

        },
        async confirmApply() {
            const data = {
                jobField: this.applyJobfield,
                content: this.applyContents
            };
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}/apply`, data)
                console.log(response);
            } catch (e) {
                console.log(e)
            }
            this.closeApplyModal();
            this.applyConfirmModal = true;

        },

        // 채팅하기 모달 관련 함수
        openChatModalFn() {
            this.openChatModal = true;
        },
        closeChatModal() {
            this.openChatModal = false;
        },
        async chatFn() {
            const data = {
                projectId: this.projectId,
                chatStarterMemberId: localStorage.id
            }
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/create`, data)
                console.log(response)
            } catch (e) {
                console.log(e);
            }
            this.closeChatModal();

            // window.href-
        }

    },
};
</script>
<style scoped>
.explainProject {
    margin-top: 40px;
    font-weight: 700;
    font-size: 24px;
    line-height: 126.5%;
    letter-spacing: -.005em;
    color: #000;
    overflow-wrap: break-word;
}

.studyContent_title__3680o {
    margin-top: 20px;
    font-weight: 800;
    font-size: 36px;
    line-height: 126.5%;
    letter-spacing: -.005em;
    color: #000;
    overflow-wrap: break-word;
}

.custom-container {
    max-width: 800px !important;
    /* 원하는 최대 폭 */
    margin: 0 auto !important;
    /* 중앙 정렬 */
    width: 100% !important;
    /* 컨테이너의 폭을 100%로 설정 */
}

.profile-image {
    width: 10px;
    /* 원하는 너비 */
    height: 10px;
    /* 원하는 높이 */
    border-radius: 50%;
    /* 원형으로 만들기 */
    object-fit: cover;
    /* 이미지가 잘리지 않도록 비율 유지 */
}

.subTitle {
    margin-top: 10px;
    font-weight: 300;
    font-size: 20px;
    line-height: 126.5%;
    letter-spacing: -.005em;
    color: #000;
    overflow-wrap: break-word;
}

p {
    /* 수평 중앙 정렬하기 */
    text-align: center;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.written-date {
    white-space: nowrap;
    font-size: 15px;
    margin-bottom: 24px;
    line-height: 1em;
    color: rgb(112, 112, 112);
    width: 100%;
}
</style>