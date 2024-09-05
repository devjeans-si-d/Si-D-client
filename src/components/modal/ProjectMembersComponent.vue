<template>
    <!-- 멤버 추가  -->

    <!-- 멤버 추가 버튼 및 모달 -->
    <v-row class="mt-10 align-center justify-start">
        <h3 style="margin-right: 20px;"> 멤버 추가 </h3>
        <ButtonComponent content="검색" @click="searchMemberShowModal()" />
      </v-row>
  
      <!-- 모달 외부에서 showMemberList의 멤버들을 Chip으로 보여줌 -->
      <v-row class="mt-10 mb-10">
        <v-chip v-for="(member, index) in showMemberList" :key="index" closable @click:close="removeMember(index)"
          class="ma-2">
          {{ member.name }} - {{ member.jobfield }}
        </v-chip>
      </v-row>

      <!-- member add 모달창을 위한 v-dialog -->
      <v-dialog v-model="membrerAddDialog" max-width="800px" class="pa-10">
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
                          <v-row class="mt-3 mb-3 ml-10">
                            <h3> 검색어 </h3>
                          </v-row>
                          <v-row class="mb-10">
                            <v-text-field
                              v-model="searchValue"
                              label="Search"
                              variant="outlined"
                              class="ml-10 mr-10"
                              density="compact"
                            ></v-text-field>
                          </v-row>
                          <br />
  
                  <v-row>
                    <ButtonComponent content="검색" type="submit" class="mx-auto" @click="searchMembersList()"/>
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
              <ButtonComponent content="취소" :style="{ color: '#650101', backgroundColor: '#FFAFAF'}" @click="reloadPage()" class="ml-1" />
              <ButtonComponent content="확인" @click="confirmMemberSelection" />
            </v-row>
          </v-card-actions>
          <v-spacer :style="{height: '20px'}"></v-spacer>
        </v-card>
      </v-dialog>
</template>
<script>
import ButtonComponent from "@/components/button/ButtonComponent.vue";
export default {
  components: {
    ButtonComponent,
  } 
  ,data(){
    return{
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

    };
  },
  methods:{
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
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    },
    selectMember(member) {
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
    }
  }
}
</script>
