<template>
    <v-container max-width="1200px">

        <v-spacer :style="{ height: '20px' }"></v-spacer>
        <h6 style="text-align:center; color:#ced4da;" class="mb-2">Due to : {{ this.deadline }}</h6>


        <v-spacer :style="{ height: '10px' }"></v-spacer>
        <v-row class="justify-center ml-5" style="align-items:center;">
            <h1 style="text-align:center; color:#094F08; margin-right: 8px;">{{ this.title }}</h1>
            <v-btn size="x-small" icon="$vuetify" variant="plain" style="margin-right: 5px;"
                @click="clickScrap()">
                <v-icon left class="mr-1">{{ this.isScrap ? 'mdi-bookmark-multiple' : 'mdi-bookmark-multiple-outline' }}</v-icon><v-tooltip activator="parent"
                    location="top">프로젝트 스크랩</v-tooltip>
            </v-btn>
            <v-btn size="x-small" icon="$vuetify" variant="plain" style="margin-left: 5px;"
                :to="{ path: '/team-building/list' }">
                <v-icon left class="mr-1 justify-center">mdi-chat-processing-outline</v-icon><v-tooltip
                    activator="parent" location="top">PM과의 채팅</v-tooltip>
            </v-btn>
            <v-btn size="x-small" icon="$vuetify" variant="plain" style="margin-left: 5px;" @click="openApplyModal()">
                <v-icon left class="mr-1 justify-center">mdi-lead-pencil</v-icon><v-tooltip activator="parent"
                    location="top">프로젝트 지원</v-tooltip>
            </v-btn>
        </v-row>
        <v-spacer :style="{ height: '20px' }"></v-spacer>

        <v-divider class="mb-4"></v-divider>



        <v-row class="mt-10 mb-5 justify-center">
            <img :src="this.projectImageUrl" alt="Project Image" style="height:auto; width:40%;" />

        </v-row>
        <v-spacer :style="{ height: '10px' }"></v-spacer>

        <v-divider class="mb-4"></v-divider>
        <v-spacer :style="{ height: '10px' }"></v-spacer>

        <v-row class="mt-10 mb-10 justify-center">
            <v-icon left class="mr-1">mdi-star-circle-outline</v-icon>
            <h3 style="color:#495057;">Summary</h3>
            <!-- <v-text-field label="한줄 설명" type="text" id="description" v-model="description" variant="underlined"
                rounded="xs" readonly></v-text-field> -->
        </v-row>
        <v-row class="mt-5 mb-10 ml-5 justify-center">
            <h5>{{ this.description }}</h5>
        </v-row>
        <v-divider class="mb-4"></v-divider>

        <v-spacer :style="{ height: '20px' }"></v-spacer>

        <v-row class="mt-10 mb-10 justify-center">
            <v-icon left class="mr-1">mdi-star-circle-outline</v-icon>
            <h3 style="color:#495057;">Participants</h3>
            <!-- <v-text-field label="한줄 설명" type="text" id="description" v-model="description" variant="underlined"
                rounded="xs" readonly></v-text-field> -->
        </v-row>
        <v-row class="mt-10 mb-10 justify-center">
            <v-chip v-for="(member) in showMemberList" :key="member.memberId" size="large" class="ma-2">
                <v-avatar start>
                    <v-img :src="member.memberImageUrl"></v-img>
                </v-avatar>
                {{ member.nickname }} ({{ member.jobfield }})
            </v-chip>

        </v-row>
        <v-divider class="mb-4"></v-divider>

        <v-spacer :style="{ height: '20px' }"></v-spacer>

        <v-row class="mt-10 mb-10 justify-center">
            <v-icon left class="mr-1">mdi-star-circle-outline</v-icon>
            <h3 style="color:#495057;" class="text-align"> Recruit Info</h3>
            <!-- <v-text-field label="한줄 설명" type="text" id="description" v-model="description" variant="underlined"
                rounded="xs" readonly></v-text-field> -->
        </v-row>
        <ul id="recruitInfo">
            <li v-for="(info) in showRecruitInfoList" :key="info.recruitField" class="ml-10 justify-center">
                {{ info.recruitField }} : {{ info.count }}명
            </li>
        </ul>
        <v-divider class="mt-10 mb-10"></v-divider>

        <v-spacer :style="{ height: '20px' }"></v-spacer>

        <v-row>
            <textarea disabled v-model="this.contents"></textarea>
        </v-row>
        <v-row>
            <div id="editor"></div>

        </v-row>

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
</template>
<script>

import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import { useRoute } from 'vue-router';

export default {
    components: {
    },
    data() {
        return {
            applyModal: false,
            applyJobfield: "",
            applyJobFieldList: ['DESIGNER', 'FRONTEND', 'BACKEND', 'APP', 'PM'],

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

            // 모집 정보
            recruitInfoDialogue: false,
            showRecruitInfoList: [],
            recruitField: "",
            count: "",


            title: "",
            description: "",
            deadline: "",
            editor: null,
            contents: "",
        };
    },
    async mounted() {
        const route = useRoute();
        this.projectId = route.params.projectId;
        const getProjectResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}`)
        console.log(getProjectResponse);
        this.deadline = (getProjectResponse).data.deadline.split('T')[0];
        this.title = (getProjectResponse).data.projectName;
        this.projectImageUrl = (getProjectResponse).data.imageUrl;
        this.projectImageFile = (getProjectResponse).data.imageUrl;
        this.description = (getProjectResponse).data.description;
        this.showMemberList = (getProjectResponse).data.projectMembers.map((member) => {
            return {
                memberId: member.id,
                memberImageUrl: member.memberImageUrl,
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

        this.contents = (await getProjectResponse).data.recruitmentContents;

        this.editor = new Editor({
            el: document.querySelector("#editor"),
            height: "500px",
            initialEditType: "wysiwyg",
            initialValue: `${this.contents}`,
            width: 'auto',
            hooks: {
                addImageBlobHook: async (blob, callback) => {
                    // 1. 다른 서버에 이미지를 업로드
                    const uploadResult = await this.uploadImage(blob);
                    // 2. 1에서 업로드 된 이미지를 접근할 수 있는 url 세팅
                    callback(uploadResult);
                },
            },
        });
        // 추가: editor의 width를 1200px로 조정
        document.querySelector("#editor").style.width = "1200px";
    },
    methods: {
        clickScrap(){
            if(!this.isScrap) this.doScrap();
            else this.unDoScrap();
        },
        async doScrap() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}/scrap`)
                console.log(response);
                alert("scrap되었습니다");
            }
            catch (e) {
                console.log(e);
            }
        },
        async unDoScrap() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}/scrap/delete`)
                console.log(response);
                alert("스크랩 취소되었습니다")
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
            this.clearApplyModal();

        }

    },
};
</script>
<style>
.editor {
    border: 1px solid;
    width: 70%;
    margin: 0 auto;
}
</style>