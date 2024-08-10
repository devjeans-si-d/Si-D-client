<template>
    <v-dialog v-model="internalDialog" max-width="400px" rounded="xl" class="m">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-center align-center">{{ cardTitle }}</v-card-title>
        <v-divider class="mb-4"></v-divider>
        
        <!-- Select Field -->
        <v-container>
          <v-select
            v-model="memberField"
            clearable
            label="Field"
            :items="['DESIGNER', 'FRONTEND', 'BACKEND', 'APP', 'PM']"
            variant="outlined"
            class="mb-2"
          ></v-select>
        </v-container>
  
        <!-- Search Form -->
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
  
            <!-- Member List Table -->
            <v-row>
              <v-col cols="12" class="mt-2">
                <v-data-table
                  :headers="tableHeaders"
                  :items="memberList"
                  class="elevation-1"
                  @click:row="logMemberId"
                ></v-data-table>
              </v-col>
            </v-row>
  
            <!-- Pagination -->
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
  
            <!-- Total Elements -->
            <v-row>
              <v-col class="d-flex justify-center">
                <p>전체 항목 수: {{ totalElements }}</p>
              </v-col>
            </v-row>


            <v-table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>닉네임</th>
                  <th class="text-center" v-if="!isAdmin">선택</th>
                </tr>
                <tr v-for="member in memberList" :key="member.id">
                  <td>{{member.name}}</td>
                  <td>{{member.email}}</td>
                  <td>{{member.nickname}}</td>
                  <td class="text-center" v-if="!isAdmin">
                    <input type="checkbox" v-model="selected[member.id]">
                  </td>
                </tr>
              </thead>
            </v-table>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      cardTitle: {
        type: String,
        required: true
      },
      apiUrl: {
        type: String,
        required: true
      },
      showDialog: {
      type: Boolean,
      required: true,
    },
    },
    
    data() {
      return {
        searchType: "optional",
        searchOptions: [
          { text: "이름", value: "name" },
          { text: "이메일 아이디", value: "email" },
          { text: "닉네임", value: "nickname" },
        ],
        selected:{},
        memberField: "",
        searchValue: "",
        memberList: [],
        selectedMembers: [],
        currentPage: 1,
        totalPages: 1,
        totalElements: 0,
        tableHeaders: [
          { text: '이름', value: 'name', align: 'center' },
          { text: 'EMAIL', value: 'email', align: 'center' },
          { text: '닉네임', value: 'nickname', align: 'center' },
        ],
      internalDialog: this.showDialog,

      };
    },
    watch: {
    showDialog(newVal) {
      this.internalDialog = newVal;
    },
    internalDialog(newVal) {
      this.$emit("update:showDialog", newVal);
    },
  },
    methods: {
      logMemberId(member) {
        const memberId = member.memberId;
        const jobfield = this.memberField;
  
        const memberData = {
          memberId: memberId,
          field: jobfield,
        };
        const selectedMemberList = Object.keys(this.selected).filter(key=>this.selected[key]).map(key=>{
        const member=this.memerList.find(p=>p.id==key);
        return {id:member.id, field: jobfield};
      });
      console.log(selectedMemberList)
        this.selectedMembers.push(memberData);
        this.$emit('selected-members', this.selectedMembers);
      },
  
      async fetchPage(pageNumber) {
        this.currentPage = pageNumber;
        await this.searchMembers();
      },
  
      async searchMembers() {
        const params = {
          page: this.currentPage - 1, 
          size: 5, 
        };
  
        if (this.searchType === "name") {
          params.name = this.searchValue;
        } else if (this.searchType === "email") {
          params.email = this.searchValue;
        } else if (this.searchType === "nickname") {
          params.nickname = this.searchValue;
        }
  
        try {
          const response = await axios.get(this.apiUrl, { params });
  
          this.memberList = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
  
          this.$emit('members-fetched', this.memberList);  // Fetched members emit
        } catch (error) {
          console.error("Error fetching members:", error);
        }
      },
    }
  };
  </script>
  
  <style scoped>
  .hoverable:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
  </style>
  