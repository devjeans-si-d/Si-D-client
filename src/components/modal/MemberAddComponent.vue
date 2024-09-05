<template>
    <div>
      <!-- 인원 검색 modal -->
      <v-btn @click.stop="searchMemberShowModal()">멤버 검색</v-btn>
      <!-- 모달창을 위한 v-dialog -->
      <v-dialog v-model="dialog" max-width="800px">
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-center align-center">멤버 추가</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <!-- select로 직업 필드 받기 -->
          <v-container>
            <v-select
              v-model="memberField"
              clearable
              label="Field"
              :items="['DESIGNER', 'FRONTEND', 'BACKEND', 'APP', 'PM']"
              variant="outlined"
              class="mb-3"
            ></v-select>
          </v-container>
  
          <v-container>
            <v-form @submit.prevent="searchMembers" rounded="xl">
              <v-row>
                <v-col cols="auto">
                  <v-select
                    v-model="searchType"
                    :items="searchOptions"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                  >
                  </v-select>
                </v-col>
                <v-col>
                  <v-text-field v-model="searchValue" label="Search"></v-text-field>
                </v-col>
                <v-col cols="auto">
                  <v-btn type="submit">검색</v-btn>
                </v-col>
              </v-row>
  
              <!-- 테이블 및 페이지네이션 -->
              <v-row>
                <v-col cols="12" class="mt-2">
                  <v-simple-table rounded="lg" class="elevation-1">
                    <thead>
                      <tr>
                        <th class="text-center">이름</th>
                        <th class="text-center">EMAIL</th>
                        <th class="text-center">닉네임</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(member) in memberList"
                        :key="member.memberId"
                        @click="logMemberId(member)"
                        class="hoverable"
                      >
                        <td class="text-center">{{ member.name }}</td>
                        <td class="text-center">{{ member.email }}</td>
                        <td class="text-center">{{ member.nickname }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-pagination
                    v-model="currentPage"
                    :length="totalPages"
                    circle
                    total-visible="7"
                    @input="fetchPage"
                  ></v-pagination>
                </v-col>
              </v-row>
  
              <!-- 전체 항목 수 표시 -->
              <v-row>
                <v-col class="d-flex justify-center">
                  <p>전체 항목 수: {{ totalElements }}</p>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        searchType: "optional",
        searchOptions: [
          { text: "이름", value: "name" },
          { text: "이메일 아이디", value: "email" },
          { text: "닉네임", value: "nickname" },
        ],
        memberField: "",
        searchValue: "",
        memberList: [],
        selectedMembers: [],
        dialog: false,
        currentPage: 1,
        totalPages: 1, // 기본 페이지 수 1로 설정
        totalElements: 0, // 전체 항목 수
      };
    },
  
    methods: {
      logMemberId(member) {
        const memberId = member.memberId;
        const jobfield = this.memberField;
  
        const memberData = {
          memberId: memberId,
          field: jobfield,
        };
  
        this.selectedMembers.push(memberData);
      },
  
      searchMemberShowModal() {
        this.dialog = true;
      },
  
      async fetchPage(pageNumber) {
        this.currentPage = pageNumber;
        await this.searchMembers();
      },
  
      async searchMembers() {
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
          const response = await axios.get(
            `${process.env.VUE_APP_API_BASE_URL}/api/member/list`,
            { params }
          );
  
          this.memberList = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
  
        } catch (error) {
          console.error("Error fetching members:", error);
        }
      },
    },
  };
  </script>
  
  <style>
  .hoverable:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
  </style>
  