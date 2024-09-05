<template>
  <v-container max-width="1200px">
    <v-container style="width: 70%;">

      <v-spacer :style="{ height: '20px' }"></v-spacer>

      <h4 style="text-align:center; color:#094F08;">Launched Project</h4>
      <h2 style="text-align:center; color:#094F08;">{{ this.projectName }}</h2>
      <v-spacer :style="{ height: '20px' }"></v-spacer>

      <v-row class="mt-10 mb-10 align-center">
        <v-file-input label="프로젝트 대표 이미지" prepend-icon="mdi-camera" accept="image/" @change="fileUpdate" variant="plain"
          rounded="xs">
        </v-file-input>
        <v-btn size="small" @click="imageDialog = true">이미지 확인</v-btn>

      </v-row>
      <v-dialog v-model="imageDialog">
        <v-card>
          <img :src="this.projectImageUrl">
          <v-btn size="small" @click="imageDialog = false">닫기</v-btn>
        </v-card>
      </v-dialog>
      <v-row class="mt-10 mb-10">
        <!-- <label for="siteUrl" class="ma-auto">site url</label> -->
        <v-text-field
        label="site url"
        type="text"
        id="siteUrl"
        placeholder="https://www.si-d.com"
        v-model="siteUrl"
        variant="plain"
        rounded="xs"></v-text-field>
      </v-row>


      <v-spacer :style="{ height: '50px' }"></v-spacer>

      <v-spacer :style="{ height: '50px' }"></v-spacer>

      <v-row>
        <TechStackSelector require="true" />
      </v-row>
      <v-spacer :style="{ height: '50px' }"></v-spacer>
      <v-row>
        <span style="font-weight: bold; font-size:large; margin-right: 30px; margin-bottom: 10px;"> 프로젝트 소개 </span>
      </v-row>
      <v-row>
        <v-textarea variant="solo" style="height: 220px;" v-model="launchedProjectContents" row-height="30" no-resize></v-textarea><br>
      </v-row>


      <v-row class="d-flex justify-end">
        <v-col cols="auto">
          <ButtonComponent content="업로드" @click="registerLaunchedProject()" class="mr-1" />
        </v-col>
      </v-row>


  
    </v-container>
  </v-container>
</template>

<script>
import TechStackSelector from '@/components/modal/TechStackSelector.vue';
import { useRoute } from 'vue-router';
import axios from "axios";
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import { mapGetters } from 'vuex';


export default {
  components: {
    TechStackSelector,
    ButtonComponent,
  },


  data() {
    return {
      imageDialog:false,
      launchedProjectId: 0,
      siteUrl: "",
      project: {},
      projectId: 0,
      projectImageFile: null,
      projectImageUrl: "",
      description: "",
      memberAddDialog: false,
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
      showMemberList: [], // 화면에 아직 확정되진 않은 선택된 memberList
      techStackList: [],
      launchedProjectContents: "",
      projectName: "",
    };
  },


  methods: {
    reloadPage() {
      window.location.reload();
    },
    async registerLaunchedProject() {
      let techStacks = [];
      this.techStackList.map((tech) => { techStacks.push(tech.id) })

      const body = {
        // launchedProjectId: this.launchedProjectId,
        launchedProjectContents: this.launchedProjectContents,
        siteUrl: this.siteUrl,
        techStackList: techStacks,
        imageUrl: this.projectImageUrl,
      };

      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/update/${this.launchedProjectId}`, body);
        const launchedProjectId = response?.data
        this.$router.push({ name: 'LaunchedProjectDetail', params: { launchedProjectId: launchedProjectId } });
        // 필요 시 성공 후 처리 (예: 페이지 이동)
      } catch (error) {
        alert(JSON.stringify(error.response));
        console.error('Launched Project 등록 실패:', error.response);
        // 필요 시 에러 처리
      }
    },
    searchMemberShowModal() {
      this.memberAddDialog = true;
    },
    clearMemberAddModal() {
      this.selectedMember = null;
      this.memberField = "";
      this.memberList = [];
    },
    closeMemberAddModal() {
      this.memberAddDialog = false;
      this.clearMemberAddModal();
    },
    removeMember(index) {
      this.showMemberList.splice(index, 1);
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
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    },
    selectMember(member) {
      this.selectedMember = member.memberId; // 멤버를 선택하면 해당 멤버의 ID를 저장
    },
    confirmMemberSelection() {
      const selected = this.memberList.find(
        (member) => member.memberId == this.selectedMember
      );
      if (selected) {
        // 선택된 멤버가 showMemberList에 이미 있는지 확인
        const alreadySelected = this.showMemberList.find(
          (item) => item.memberId === selected.memberId
        );
        if (!alreadySelected) {
          if (selected.memberId && selected.memberName && this.memberField) {
            this.showMemberList.push({
              memberId: selected?.memberId,
              memberName: selected?.name, // 이름을 Chip에 표시하기 위해 추가
              jobField: this.memberField, // 사용자가 선택한 직무 필드
            });
            // this.showMemberList.push(selected);
          }
        }
      }
      this.memberAddDialog = false; // 모달 닫기
      this.clearMemberAddModal();
    },
    async uploadImage(blob) {
      const accessToken = localStorage.getItem('token');
      const body = {
        prefix: "test-prefix",
        url: `${blob?.name}`,
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
      let getUrlResult;
      if (urlContentType && urlContentType.includes("application/json")) {
        getUrlResult = await getUrl.json(); // JSON으로 파싱
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
      await fetch(awsUrl.data + awsUrl.auth, options);

      return awsUrl.data;
    },
    async fileUpdate(event) {
      this.projectImageFile = event.target.files[0];
      this.projectImageUrl = await this.uploadImage(this.projectImageFile);

    },
  },
  watch: {
    getTechStackIds() {
      this.techStackList = this.getTechStackIds;
    }
  },
  computed: {
    ...mapGetters(['getTechStackIds']),
  },
  async created() {
    const route = useRoute();
    this.launchedProjectId = route.params.launchedProjectId;
    this.project = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/detail/${this.launchedProjectId}/basic-info`)
    const projectResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.project?.data?.projectId}`)
    this.projectId = this.project?.data?.projectId;
    this.projectName = projectResponse?.data?.projectName ?? "";
    this.siteUrl = this.project.data.siteUrl;
    this.projectImageUrl = this.project.data.launchedProjectImage;
    this.launchedProjectContents = this.project.data.launchedProjectContents;
    const getMembers = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/detail/${this.launchedProjectId}/members`);

    if (getMembers.length > 0) {
      this.showMemberList = getMembers?.data.map((member) => {
        return {
          memberId: member.memberId,
          memberName: member.nickname, // 이름을 Chip에 표시하기 위해 추가
          jobField: member.jobField, // 사용자가 선택한 직무 필드
        }
      });
    }
    const getTechList = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/detail/${this.launchedProjectId}/tech-stacks`);
    this.$store.dispatch('updateTechStacksRes', getTechList.data)
  },
}
</script>
