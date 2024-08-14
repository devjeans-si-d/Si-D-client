<template>
  <v-container max-width="1200px">
    <v-row class="mt-10 mb-10">
      <label for="title" class="ma-auto">제목</label>
      <v-text-field
        type="text"
        id="title"
        v-model="title"
        variant="outlined"
        rounded="xs"
      ></v-text-field>
    </v-row>
    <v-row class="mt-10 mb-10">
      <label for="description">한줄 설명:</label>
      <v-text-field
        type="text"
        id="description"
        v-model="description"
        variant="outlined"
        rounded="xs"
      ></v-text-field>
    </v-row>
    <v-row class="mt-10 mb-10">
      <label for="deadline">모집 기한:</label>
      <input type="date" id="deadline" v-model="deadline" />
    </v-row>
    <!-- 모집 정보 추가 -->
    <v-row class="mt-10 mb-10">
      <label for="">모집 정보</label>
      <!-- 추가 버튼 -->
      <ButtonComponent content="추가" class="mr-3" @click="recruitInfoAdd()" />
    </v-row>
    <!-- 모집 정보 리스트 표시 -->
    <v-row class="mt-10 mb-10">
      <v-chip
        v-for="(info, index) in showRecruitInfoList"
        :key="index"
        class="ma-2"
        closable
        @click:close="removeRecruitInfo(index)"
      >
        {{ info.recruitField }} - {{ info.count }}명
      </v-chip>
    </v-row>

    <!-- 멤버 추가  -->

    <!-- 멤버 추가 버튼 및 모달 -->
    <v-row class="mt-10 mb-10">
      <label for="">멤버 추가</label>
      <ButtonComponent content="검색" @click="searchMemberShowModal()" />
    </v-row>

    <!-- 모달 외부에서 showMemberList의 멤버들을 Chip으로 보여줌 -->
    <v-row class="mb-10">
      <v-chip
        v-for="(member, index) in showMemberList"
        :key="index"
        closable
        @click:close="removeMember(index)"
        class="ma-2"
      >
        {{ member.name }} - {{ member.jobfield }}
      </v-chip>
    </v-row>

    <v-row>
      <div id="editor"></div>
    </v-row>

    <v-row justify="center">
      <ButtonComponent content="확인" @click="saveContent()" class="mr-1" />
      <ButtonComponent
        content="취소"
        color="#808080"
        :style="{ color: '#FFFFFF' }"
        @click="reloadPage()"
        class="ml-1"
      />
    </v-row>

    <!-- member add 모달창을 위한 v-dialog -->
    <v-dialog v-model="membrerAddDialog" max-width="800px" class="pa-10">
      <v-card class="modal-card">
        <v-card-title class="modal-title">멤버 추가</v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text>
          <v-container class="pa-4">
            <v-row class="mb-10">
              <v-select
                v-model="memberField"
                clearable
                label="Field"
                density="compact"
                :items="['DESIGNER', 'FRONTEND', 'BACKEND', 'APP', 'PM']"
                variant="outlined"
                class="ml-10 mr-10"
              ></v-select>
            </v-row>

            <v-row class="mt-10">
              <v-form @submit.prevent="searchMembers()">
                <!-- api 붙이면 풀 것 -->
                <!-- <v-row class="mt-10 mb-10">
                          <v-select
                            v-model="searchType"
                            :items="searchOptions"
                            item-title="text"
                            item-value="value"
                            variant="outlined"
                            density="compact"
                            class="ml-10 mr-10"
                          >
                          </v-select>
                        </v-row>
                        <br />
      
                        <v-row class="mb-10 mt-10">
                          <v-text-field
                            v-model="searchValue"
                            label="Search"
                            variant="outlined"
                            class="ml-10 mr-10"
                          ></v-text-field>
                        </v-row>
                        <br /> -->

                <v-row>
                  <ButtonComponent
                    content="검색"
                    type="submit"
                    class="mx-auto"
                  />
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
                        <tr
                          v-for="member in memberList"
                          :key="member.memberId"
                          @click="selectMember(member)"
                          class="hoverable"
                        >
                          <td class="text-center">
                            <v-radio
                              :value="member.memberId"
                              v-model="selectedMember"
                            ></v-radio>
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
            <ButtonComponent content="확인" @click="confirmMemberSelection" />
            <ButtonComponent
              content="취소"
              color="#808080"
              :style="{ color: '#FFFFFF' }"
              @click="closeMemberAddDialog()"
            />
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- recruitInfo 모달 창 -->
    <v-dialog
      v-model="recruitInfoDialogue"
      rounded="xl"
      max-width="430px"
      class="h-50"
    >
      <v-card class="modal-card">
        <v-card-title class="modal-title">모집 정보 추가</v-card-title>
        <v-divider class="mb-4"></v-divider>
        <!-- 필드 -->
        <v-card-text>
          <v-row class="mb-10 ml-10">
            <label>필드</label>
            <v-select
              v-model="recruitField"
              clearable
              label="Field"
              density="compact"
              :items="['DESIGNER', 'FRONTEND', 'BACKEND', 'APP', 'PM']"
              variant="outlined"
              class="mr-10"
            ></v-select>
          </v-row>
          <v-row class="ma-10">
            <label>인원 수</label>
            <v-text-field
              v-model="count"
              type="number"
              rounded="xs"
              variant="outlined"
            ></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <ButtonComponent content="확인" @click="recruitInfoConfirm()" />
            <ButtonComponent
              content="취소"
              color="#808080"
              :style="{ color: '#FFFFFF' }"
              @click="recruitInfoDialogueClose()"
            />
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
// import axios from "axios";

export default {
  components: {
    ButtonComponent,
  },
  data() {
    return {
      // 기존 데이터
      membrerAddDialog: false,
      //   searchValue: "",
      //   searchType:"",
      memberField: "",
      selectedMember: null, // 현재 선택된 멤버 ID
      memberList: [
        {
          memberId: 1,
          name: "yooho",
          email: "dnwls1313@naver.com",
          nickname: "heyho",
        },
      ], // 최종적으로 선택된 멤버들의 리스트
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
    };
  },
  mounted() {
    this.editor = new Editor({
      el: document.querySelector("#editor"),
      height: "500px",
      initialEditType: "wysiwyg",
      hooks: {
        addImageBlobHook: async (blob, callback) => {
          // 1. 다른 서버에 이미지를 업로드
          const uploadResult = await this.uploadImage(blob);
          // 2. 1에서 업로드 된 이미지를 접근할 수 있는 url 세팅
          callback(uploadResult);
        },
      },
    });
  },
  methods: {
        
    async uploadImage(blob) {
      
      console.log(blob.name);
      const accessToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjI0MjYxMjYsImV4cCI6MTcyNTAxODEyNn0.PrHtUt1jhj_zl2FNJGRirdnJQTsorAMXAzcgVHfybJg";
      const body = {
        prefix: "test-prefix",
        url: `${blob.name}`,
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // JSON 형식의 데이터를 전송할 경우 Content-Type을 지정해야 합니다.
      };
      const getUrl = await fetch(
        "http://localhost:8080/api/upload/prisigned-url",
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
      console.log(new Date());
      let response = await fetch(awsUrl.data + awsUrl.auth, options);
      console.log(response);

      return awsUrl.data;
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
    selectMember(member) {
      this.selectedMember = member.memberId; // 멤버를 선택하면 해당 멤버의 ID를 저장
    },
    clearMemberAddModal() {
      this.selectedMember = null;
      this.memberField = "";
      // 나중에 memberList도 초기화시키기
      // this.memberList=[];
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
      console.log(this.showMemberList);
    },
    async saveContent() {
      console.log(this.title);
      console.log(this.description);
      console.log(this.deadline);
      const content = this.editor.getMarkdown();
      console.log("내용:", content);

      let projectMembers = [];
      this.showMemberList.forEach((member) => {
        // 각 멤버에 대해 POST 요청 보내기(멤버 추가)
        console.log("멤버 ID:", member.memberId);
        console.log("직무 필드:", member.jobfield);
        let dataMember = {
          memberId: member.memberId,
          jobField: member.jobfield,
        };
        projectMembers.push(dataMember);
        // 여기에 POST 요청 코드를 추가하세요.

      });

      let recruitInfos = [];
      this.showRecruitInfoList.forEach((info) => {
        // 각 멤버에 대해 POST 요청 보내기(멤버 추가)
        console.log(info.recruitField +"-"+info.count);
        let dataInfo = {
          jobField: info.recruitField,
          count: info.count,
        };
        recruitInfos.push(dataInfo);
        // 여기에 POST 요청 코드를 추가하세요.

      });
      try {
          const data = {
            projectName: this.title,
            // imageUrl 넣어야함
            description: this.description,
            recruitmemtContents: content,
            deadline: this.deadline,
            // pmId 넣어야하는지 체크
            projectMembers,
            recruitInfos,
          };
          console.log(data);
          // const projectCreateResponse = axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/project/create`,data);
          // console.log(projectCreateResponse);
        } catch (e) {
          alert(e);
          console.log(e);
        }
    },
  },
};
</script>
