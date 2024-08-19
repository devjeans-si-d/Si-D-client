<template>
  <v-container max-width="1200px">

    <v-spacer :style="{ height: '20px' }"></v-spacer>

    <h2 style="text-align:center; color:#094F08;">프로젝트 모집글 작성</h2>

    <v-spacer :style="{ height: '20px' }"></v-spacer>

    <v-row class="mt-10 mb-10">
      <v-text-field label="제목" type="text" id="title" v-model="title" variant="underlined" rounded="xs"></v-text-field>
    </v-row>

    <v-row class="mt-10 mb-10">
      <v-file-input label="프로젝트 이미지" accept="image/" @change="fileUpdate" variant="underlined" rounded="xs">
      </v-file-input>
    </v-row>
    <v-row v-if="this.projectImageUrl" class="justify-center">
      <img :src="this.projectImageUrl" style="height:auto; width:500px;">
    </v-row>

    <v-row class="mt-10 mb-10">
      <v-text-field label="한줄 설명" type="text" id="description" v-model="description" variant="underlined"
        rounded="xs"></v-text-field>
    </v-row>

    <v-spacer :style="{ height: '20px' }"></v-spacer>

    <!-- 모집 기한 -->
    <v-row class="mt-10 mb-10">
      <h3 class="mr-10"> 모집 기한 </h3>
      <input type="datetime-local"  v-model="deadline" name="datetime" @click="checkDate()">
      <!-- <input type="date" id="deadline" v-model="deadline" /> -->
    </v-row>
    <!-- 
    <v-row>
      <input type="date" id="deadline" v-model="deadline" />
    </v-row> -->

    <v-spacer :style="{ height: '20px' }"></v-spacer>

    <!-- 모집 정보 추가 -->
    <v-row class="mt-10 align-center justify-start">
      <!-- 추가 버튼 -->
      <h3 style="margin-right: 20px;"> 모집 정보 </h3>
      <ButtonComponent content="추가" class="mr-3" @click="recruitInfoAdd()" />
    </v-row>


    <!-- 모집 정보 리스트 표시 -->
    <v-row class="mt-10 mb-10 d-flex align-center justify-start">

      <v-chip v-for="(info, index) in showRecruitInfoList" :key="info.recruitField" class="ma-2" closable
        @click:close="removeRecruitInfo(index)">

        {{ info.recruitField }} - {{ info.count }}명
      </v-chip>
    </v-row>
    <v-row>
      <h3 class="mr-10 mb-5"> 프로젝트 소개 </h3>
      <v-textarea class="textareaSize" v-model="recruitContents" row-height="30" no-resize></v-textarea>
    </v-row>

    <v-row justify="center" class="mt-5">

      <v-col cols="auto">
        <ButtonComponent content="취소" :style="{ color: '#650101', backgroundColor: '#FFAFAF' }" @click="clickBack()"
          class="ml-1" />
      </v-col>
      <v-col cols="auto">
        <ButtonComponent content="확인" @click="saveContent()" class="mr-1" />
      </v-col>
    </v-row>


    <!-- recruitInfo 모달 창 -->
    <v-dialog v-model="recruitInfoDialogue" rounded="xl" max-width="430px" class="h-50">
      <v-card class="modal-card">
        <v-card-title class="modal-title">모집 정보 추가</v-card-title>
        <v-divider class="mb-4"></v-divider>
        <!-- 직무 선택 -->
        <v-card-text>
          <v-row class="mb-10 ml-10">
            <h3 style="margin-right: 20px;"> 직무 </h3>
            <v-select v-model="recruitField" clearable label="Field" density="compact"
              :items="['DESIGNER', 'FRONTEND', 'BACKEND', 'APP']" variant="outlined" class="mr-10"></v-select>
          </v-row>
          <v-row class="ma-10">
            <h3 style="margin-right: 20px;"> 인원 수 </h3>
            <v-text-field v-model="count" type="number" rounded="xs" variant="outlined"></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <ButtonComponent content="취소" :style="{ color: '#650101', backgroundColor: '#FFAFAF' }"
              @click="recruitInfoDialogueClose()" class="ml-1" />
            <ButtonComponent content="확인" @click="recruitInfoConfirm()" />
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import ButtonComponent from "@/components/button/ButtonComponent.vue";
//import Editor from "@toast-ui/editor";
//import "@toast-ui/editor/dist/toastui-editor.css";
// import dayjs from "dayjs";
import axios from "axios";
export default {
  components: {
    ButtonComponent,
  },
  data() {
    return {
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
      recruitContents: "",
    };
  },

  methods: {

    checkDate(){
      console.log(this.deadline);
    },

    clickBack() {
      window.history.back();
    },


    async uploadImage(blob) {

      console.log(blob.name);
      const accessToken = localStorage.getItem('token');
      const body = {
        prefix: "test-prefix",
        url: `${blob.name}`,
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // JSON 형식의 데이터를 전송할 경우 Content-Type을 지정해야 합니다.
      };
      const getUrl = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/upload/prisigned-url`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body), // body를 JSON 문자열로 변환하여 전송합니다.
        }
      );

      const urlContentType = getUrl.headers.get("content-type");
      console.log("urlContentType" + urlContentType);
      let getUrlResult;
      if (urlContentType && urlContentType.includes("application/json")) {
        getUrlResult = await getUrl.json(); // JSON으로 파싱
        console.log("json" + JSON.stringify(getUrlResult))
      } else {
        getUrlResult = await getUrl.text(); // 텍스트로 파싱
      }

      const awsUrl = {
        data: `${getUrlResult.split("?")[0]}`,
        auth: `?${getUrlResult.split("?")[1]}`,
      };

      // // 파일을 S3에 업로드
      const options = {
        method: "PUT", // PUT 메서드 사용
        headers: {
          "Content-Type": blob.type, // Blob의 MIME 타입 설정
        },
        body: blob, // 업로드할 파일 데이터
      };
      console.log(new Date());
      let response = await fetch(awsUrl.data + awsUrl.auth, options);
      console.log(response);

      return awsUrl.data;
    },
    async fileUpdate(event) {
      this.projectImageFile = event.target.files[0];
      console.log(this.projectImageFile)
      this.projectImageUrl = await this.uploadImage(this.projectImageFile);

    },

    // recruit info modal open
    recruitInfoAdd() {
      this.recruitInfoDialogue = true;
    },
    // recruit info modal close
    recruitInfoDialogueClose() {
      this.recruitInfoDialogue = false;
      this.recruitInfoClear();
    },
    // recruit confirm
    recruitInfoConfirm() {
      if (this.recruitField != "" && this.count != "") {
        this.showRecruitInfoList.push({
          recruitField: this.recruitField,
          count: this.count,
        });
        this.recruitInfoDialogueClose();
      } else {
        alert("필드와 인원 수를 모두 입력해주세요.");
      }
    },
    // recruit remove
    removeRecruitInfo(index) {
      this.showRecruitInfoList.splice(index, 1);
    },
    // recruit clear
    recruitInfoClear() {
      this.recruitField = "";
      this.count = "";
    },
    reloadPage() {
      window.location.reload();
    },
    searchMemberShowModal() {
      this.membrerAddDialog = true;
    },
    closeMemberAddDialog() {
      this.membrerAddDialog = false;
      this.clearMemberAddModal();
    },
    async searchMembersList() {
      const params = {};
      if (this.searchType === "name") {
        params.name = this.searchValue;
      } else if (this.searchType === "email") {
        params.email = this.searchValue;
      } else if (this.searchType === "nickname") {
        params.nickname = this.searchValue;
      }
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/api/member/list`,
          { params });
        this.memberList = response.data.content;
        console.log("memberList:" + this.memberList);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    },
    selectMember(member) {
      console.log("member 정보", member)
      this.selectedMember = member.memberId; // 멤버를 선택하면 해당 멤버의 ID를 저장
    },
    clearMemberAddModal() {
      this.selectedMember = null;
      this.memberField = "";
      this.memberList = [];
    },
    confirmMemberSelection() {
      const selected = this.memberList.find(
        (member) => member.memberId === this.selectedMember
      );
      console.log("selected", selected)
      if (selected) {
        // 선택된 멤버가 showMemberList에 이미 있는지 확인
        const alreadySelected = this.showMemberList.find(
          (item) => item.memberId === selected.memberId
        );
        console.log("alreadySelected", alreadySelected)

        if (!alreadySelected) {
          this.showMemberList.push({
            memberId: selected.memberId,
            name: selected.name, // 이름을 Chip에 표시하기 위해 추가
            jobfield: this.memberField, // 사용자가 선택한 직무 필드
          });
        }
      }
      this.membrerAddDialog = false; // 모달 닫기
      this.clearMemberAddModal();
    },
    removeMember(index) {
      this.showMemberList.splice(index, 1); // showMemberList에서 해당 멤버 제거
    },
    async saveContent() {
      console.log(this.deadline)
      // const deadlineTime = dayjs().format('HH:mm:ss');
      // const content = this.editor.getMarkdown();

      let projectMembers = [];
      console.log("SAVE showmemberlist 확인" + this.showMemberList)
      this.showMemberList.forEach((member) => {
        let dataMember = {
          memberId: member.memberId,
          jobField: member.jobfield,
        };
        projectMembers.push(dataMember);

      });

      let recruitInfos = [];
      console.log("SAVE showrecruitlist 확인" + this.showRecruitInfoList)
      this.showRecruitInfoList.forEach((info) => {
        let dataInfo = {
          jobField: info.recruitField,
          count: info.count,
        };
        recruitInfos.push(dataInfo);
      });

      if (this.projectImageUrl == "") this.projectImageUrl = "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/test-prefix/start-5699157_640.jpg";
      try {
        const body = {
          imageUrl: this.projectImageUrl,
          projectName: this.title,
          deadline: this.deadline,
          description: this.description,
          // recruitmentContents: this.editor.getMarkdown().toString(),
          recruitmentContents: this.recruitContents,
          projectMembers,
          recruitInfos,
        };
        if (this.title == "") {
          alert("제목을 입력해야합니다.");
          return;
        }
        else {
          const projectCreateResponse = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/project/create`, body);
          console.log(projectCreateResponse);
          const createdProjectId = projectCreateResponse?.data?.id; // 생성된 프로젝트 ID
          console.log(createdProjectId)
          // 프로젝트 상세 화면으로 라우팅
          this.$router.push({ name: 'ProjectView', params: { projectId: createdProjectId } });
        }

      } catch (e) {
        alert(e);
        console.log(e);
      }
    },
  },
};
</script>
<style>
.textareaSize {

  width: 100%;
  height: 500px;
  border: none;
  resize: none !important;
}
</style>
