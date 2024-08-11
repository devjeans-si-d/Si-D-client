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
    <v-row class="mt-10 mb-10">
      <label for="">모집 정보</label>
      <!-- count랑 분야 받으면 됨 -->
      <ButtonComponent content="추가" @click="recruitInfoAdd()" />
    </v-row>
    <v-row class="mt-10 mb-10">
      <label for="">멤버 추가</label>
      <!-- 인원 검색 modal -->
      <!-- <v-btn color="primary" @click="searchMemberShowModal()">멤버 검색</v-btn> -->
      <ButtonComponent content="검색" @click="searchMemberShowModal()" />

      <!-- 모달창을 위한 v-dialog -->
      <v-dialog v-model="dialog" max-width="800px">
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
                  <v-row class="mt-10 mb-10">
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
                  <br />

                  <v-row>
                    <ButtonComponent
                      content="검색"
                      type="submit"
                      class="mx-auto"
                    />

                    <!-- <v-btn type="submit" color="secondary" dark>검색</v-btn> -->
                  </v-row>
                  <div></div>

                  <!-- 테이블 및 페이지네이션 -->
                  <v-row>
                    <v-col cols="12" class="mt-2">
                      <v-table rounded="lg" class="elevation-1">
                        <thead>
                          <tr>
                            <th class="text-center">이름</th>
                            <th class="text-center">EMAIL</th>
                            <th class="text-center">닉네임</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="member in memberList"
                            :key="member.memberId"
                            @click="logMemberId(member)"
                            class="hoverable"
                          >
                            <td class="text-center">{{ member.name }}</td>
                            <td class="text-center">{{ member.email }}</td>
                            <td class="text-center">{{ member.nickname }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-col>
                  </v-row>
                  <!-- 페이지네이션 -->
                  <!-- <v-row>
             <v-col cols="12" class="d-flex justify-center">
               <v-pagination
                 v-model="currentPage"
                 :length="totalPages"
                 circle
                 total-visible="7"
                 @input="fetchPage"
               ></v-pagination>
             </v-col>
           </v-row> -->

                  <!-- 전체 항목 수 표시 -->
                  <!-- <v-row>
             <v-col class="d-flex justify-center">
               <p>전체 항목 수: {{ totalElements }}</p>
             </v-col>
           </v-row> -->
                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-action>
            <v-row justify="center" >
              <ButtonComponent
                content="확인"
                class="mr-1"
              />
              <ButtonComponent
                content="취소"
                color="#808080"
                :style="{ color: '#FFFFFF' }"
                class="ml-1"
                />
            </v-row>
          </v-card-action>
        </v-card>
      </v-dialog>
    </v-row>
    <div id="editor"></div>

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
              v-model="recriutField"
              clearable
              label="Field"
              density="compact"
              :items="['DESIGNER', 'FRONTEND', 'BACKEND', 'APP', 'PM']"
              variant="outlined"
              class=" mr-10"
            ></v-select>
          </v-row>
          <v-row class="ma-10">
            <label>인원 수</label>
            <v-text-field rounded="xs" variant="outlined"></v-text-field>
          </v-row>
        
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <ButtonComponent
              content="확인"
              @click="recruitInfoConfirm"
            />
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
    <v-row justify="center" >
      <ButtonComponent
        content="확인"
        @click="saveContent()"
        class="mr-1"
      />
      <ButtonComponent
        content="취소"
        color="#808080"
        :style="{ color: '#FFFFFF' }"
        class="ml-1"
        />
    </v-row>
  </v-container>
</template>

<script>
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import ButtonComponent from "@/components/button/ButtonComponent.vue";
export default {
  components: {
    ButtonComponent,
  },
  data() {
    return {
      title: "",
      description: "",
      deadline: "",
      editor: null,
      recruitInfoDialogue: false,
      // 모달 위한 변수
      dialog: false,
      searchType: "optional",
      searchOptions: [
        { text: "이름", value: "name" },
        { text: "이메일 아이디", value: "email" },
        { text: "닉네임", value: "nickname" },
      ],
      memberField: "",
      recriutField: "",
      searchValue: "",
      memberList: [],
      selectedMembers: [],
      currentPage: 2,
    };
  },
  mounted() {
    this.editor = new Editor({
      el: document.querySelector("#editor"),
      height: "500px",
      initialEditType: "wysiwyg",
    });
  },
  methods: {
    recruitInfoConfirm(){
      console.log("확인")
    },
    recruitInfoAdd() {
      this.recruitInfoDialogue = true;
    },
    recruitInfoDialogueClose(){
      this.recruitInfoDialogue = false;

    },
    async searchMembers() {

      console.log("check");
      const params = {
        page: this.currentPage - 1, // API에서 페이지는 0부터 시작하므로 -1
        size: 5, // 한 페이지당 보여줄 데이터 수
      };

      if (this.searchType === "name") {
        params.name = this.searchValue;
      } else if (this.searchType === "email") {
        params.email = this.searchValue;
      } else if (this.searchType === "nickname") {
        params.nickname = this.searchValue;
      }

      try {
        // const response = await axios.get(
        //   `${process.env.VUE_APP_API_BASE_URL}/api/member/list`,
        //   { params }
        // );
        const response = await fetch(
          `${
            process.env.VUE_APP_API_BASE_URL
          }/api/member/list?${params.toString()}`,
          {
            method: "GET",
          }
        );
   
        this.memberList = response.data.content;
        this.totalPages = response.data.totalPages;
        this.totalElements = response.data.totalElements;

        console.log(this.memberList); // 검색 결과 멤버 리스트
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    },
    logMemberId(member) {
      const memberId = member.memberId;
      const jobfield = this.memberField;

      const memberData = {
        memberId: memberId,
        field: jobfield,
      };

      this.selectedMembers.push(memberData);
      console.log(this.selectedMembers);
    },
    searchMemberShowModal() {
      this.dialog = true;
    },
    saveContent() {
      const content = this.editor.getMarkdown();

      console.log("제목:", this.title);
      console.log("한줄 설명:", this.description);
      console.log("모집 기한:", this.deadline);
      console.log("내용:", content);

      // 여기에 저장하는 코드
    },
  },
};
</script>

<style>
div {
  margin-bottom: 20px;
}

label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}

input {
  width: 300px;
  padding: 5px;
  margin-left: 10px;
}

#editor {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.hoverable:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
