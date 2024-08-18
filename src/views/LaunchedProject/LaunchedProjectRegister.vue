<template>
  <v-container class="custom-container">

    <v-spacer :style="{ height: '20px' }"></v-spacer>

    <h4 style="text-align:center; color:#094F08;">Launched Project</h4>
    <h2 style="text-align:center; color:#094F08;">{{ this.projectName }}</h2>
    <v-spacer :style="{ height: '20px' }"></v-spacer>

    <v-row class="mt-10 mb-10">
      <v-file-input label="프로젝트 이미지" accept="image/" @change="fileUpdate" variant="underlined" rounded="xs">
      </v-file-input>
    </v-row>
    <v-row v-if="this.projectImageUrl" class="justify-center">
      <img :src="this.projectImageUrl" style="height:auto; width:500px;">
    </v-row>
    <v-row class="mt-10 mb-10">
      <!-- <label for="siteUrl" class="ma-auto">site url</label> -->
      <v-text-field type="text" id="siteUrl" label="site url" placeholder="https://www.si-d.com" v-model="siteUrl"
        variant="underlined" rounded="xs"></v-text-field>
    </v-row>

    <v-row class="mt-10 mb-10">
      <v-text-field label="한줄 설명" type="text" id="description" v-model="description" variant="underlined"
        rounded="xs"></v-text-field>
    </v-row>

    <v-spacer :style="{ height: '50px' }"></v-spacer>


    <!-- 멤버 추가 버튼 및 모달 -->
    <v-row class="mt-10 align-center justify-start">
      <h3 style="margin-right: 20px;"> 멤버 추가 </h3>
      <ButtonComponent content="검색" @click="searchMemberShowModal()" />
    </v-row>
    <v-row class="mt-10 mb-10">
      <v-chip v-for="(member, index) in showMemberList" :key="member.memberId" closable
        @click:close="removeMember(index)" class="ma-2">
        {{ member.memberName }} - {{ member.jobField }}
      </v-chip>
    </v-row>
    <v-spacer :style="{ height: '50px' }"></v-spacer>

    <v-row>
      <TechStackSelector require="true"/>
    </v-row>
    <v-spacer :style="{ height: '50px' }"></v-spacer>

    <v-row class="mt-10 mb-10">
      <v-textarea label="완성된 프로젝트 설명" variant="outlined" v-model="launchedProjectContents"></v-textarea>
    </v-row>
    <v-spacer :style="{ height: '200px' }"></v-spacer>
    <v-row justify="center" class="mt-15 ">

      <v-col cols="auto">
        <ButtonComponent content="취소" :style="{ color: '#650101', backgroundColor: '#FFAFAF' }" @click="clickCancel()"
          class="ml-1" />
      </v-col>
      <v-col cols="auto">
        <ButtonComponent content="확인" @click="registerLaunchedProject()" class="mr-1" />
      </v-col>
    </v-row>

    <!-- member add 모달창을 위한 v-dialog -->
    <v-dialog v-model="memberAddDialog" max-width="800px" class="pa-10">
      <v-card class="modal-card">
        <v-card-title class="modal-title">멤버 추가</v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text>
          <v-container class="pa-4">
            <v-row class="mt-3 mb-3 ml-9">
              <h3> 직무 </h3>
            </v-row>
            <v-row class="mb-10">
              <v-select v-model="memberField" clearable label="Field" density="compact"
                :items="['DESIGNER', 'FRONTEND', 'BACKEND', 'APP', 'PM']" variant="outlined"
                class="ml-10 mr-10"></v-select>
            </v-row>

            <v-row class="mt-10">
              <v-form @submit.prevent="searchMembersList()">
                <v-row class="mt-3 mb-3 ml-10">
                  <h3> 검색조건 </h3>
                </v-row>
                <!-- api 붙이면 풀 것 -->
                <v-row class="mt-3 mb-10">
                  <v-select v-model="searchType" :items="searchOptions" item-title="text" item-value="value"
                    variant="outlined" density="compact" class="ml-10 mr-10">
                  </v-select>
                </v-row>
                <br />
                <v-row class="mt-3 mb-3 ml-10">
                  <h3> 검색어 </h3>
                </v-row>
                <v-row class="mb-10">
                  <v-text-field v-model="searchValue" label="Search" variant="outlined" class="ml-10 mr-10"
                    density="compact"></v-text-field>
                </v-row>
                <br />

                <v-row>
                  <ButtonComponent content="검색" type="submit" class="mx-auto" @click="searchMembersList()" />
                </v-row>

                <!-- 테이블 및 페이지네이션 -->
                <v-row>
                  <v-col cols="12" class="mt-2">
                    <v-table rounded="lg">
                      <thead>
                        <tr>
                          <th class="text-center">선택</th>
                          <th class="text-center">이름</th>
                          <th class="text-center">EMAIL</th>
                          <th class="text-center">닉네임</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="member in memberList" :key="member.memberId" @click="selectMember(member)"
                          class="hoverable">
                          <td class="text-center">
                            <v-radio :value="member.memberId" v-model="selectedMember"></v-radio>
                          </td>
                          <td class="text-center">{{ member.name }}</td>
                          <td class="text-center">{{ member.email }}</td>
                          <td class="text-center">{{ member.nickname }}</td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-col>
                </v-row>
              </v-form>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <ButtonComponent content="취소" :style="{ color: '#650101', backgroundColor: '#FFAFAF' }"
              @click="closeMemberAddModal()" class="ml-1" />
            <ButtonComponent content="확인" @click="confirmMemberSelection()" />
          </v-row>
        </v-card-actions>
        <v-spacer :style="{ height: '20px' }"></v-spacer>
      </v-card>
    </v-dialog>




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
      console.log("url", this.projectImageUrl)
      console.log("projectId", this.projectId)
      console.log("contet", this.launchedProjectContents)
      console.log("siteUrl", this.siteUrl)
      console.log("tech",this.techStackList)
      let members = this.showMemberList.map(member => ({
        id: member.memberId,
        jobField: member.jobField
      }));
      let techStacks = [];
      this.techStackList.map((tech)=>{techStacks.push(tech.id)})
      console.log(members)
      // let techStackListJson = JSON.stringify(this.techStackList)
      // let techStackListJson = this.techStackList;
      // console.log("tech",techStackListJson)
      const body = {
        projectId: this.projectId,
        launchedProjectContents: this.launchedProjectContents,
        siteUrl: this.siteUrl,
        members,
        // techStackList: this.techStackList,
        techStackList:techStacks,
        imageUrl: this.projectImageUrl,
      };

      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/launched-project/register`, body);
        console.log('Launched Project 등록 성공:', response);
        // 필요 시 성공 후 처리 (예: 페이지 이동)
      } catch (error) {
        // alert(JSON.stringify(error.response));
        console.error('Launched Project 등록 실패:', error.response);
        // 필요 시 에러 처리
      }
    },
    clickCancel(){
      window.history.back();
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
        console.log("memberList:" + this.memberList);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    },
    selectMember(member) {
      console.log("member정보여", member)
      this.selectedMember = member.memberId; // 멤버를 선택하면 해당 멤버의 ID를 저장
    },
    confirmMemberSelection() {
      const selected = this.memberList.find(
        (member) => member.memberId === this.selectedMember
      );
      if (selected) {
        // 선택된 멤버가 showMemberList에 이미 있는지 확인
        const alreadySelected = this.showMemberList.find(
          (item) => item.memberId === selected.memberId
        );
        if (!alreadySelected) {
          this.showMemberList.push({
            memberId: selected.memberId,
            memberName: selected.name, // 이름을 Chip에 표시하기 위해 추가
            jobField: this.memberField, // 사용자가 선택한 직무 필드
          });
          // this.showMemberList.push(selected);
        }
      }
      console.log("confirm?" + this.showMemberList);

      this.memberAddDialog = false; // 모달 닫기
      this.clearMemberAddModal();
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
  },
  async created() {
    const route = useRoute();
    this.projectId = route.params.projectId;
    this.project = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}`)
    this.projectName = this.project?.data?.projectName ?? "";

    this.showMemberList = this.project.data.projectMembers.map((member) => {
      return {
        memberId: member.memberId,
        memberName: member.memberNickname, // 이름을 Chip에 표시하기 위해 추가
        jobField: member.jobField, // 사용자가 선택한 직무 필드
      }
    });
  },
  watch: {
    getTechStackIds() {
      this.techStackList= this.getTechStackIds;
    }
  },
  computed: {
    ...mapGetters(['getTechStackIds']),
  },
}
</script>
