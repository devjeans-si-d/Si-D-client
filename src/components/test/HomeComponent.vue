<template>
  <v-container>
    <v-row>
      <v-col>Si-D</v-col>
    </v-row>
    <v-row>
      <ButtonComponent @click="test" content="Si-D" type="change" />
    </v-row>
    <v-row>
      <v-col class="d-flex justify-start" cols="1">
        <v-btn outlined color="sid_green">시그니처 색</v-btn>
      </v-col>
      <v-col class="d-flex justify-start" cols="1">
        <v-btn outlined color="sid_btn1">버튼 색1</v-btn>
      </v-col>
      <v-col class="d-flex justify-start" cols="1">
        <v-btn outlined color="sid_btn2">버튼 색2</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>사람칩</v-col>
      <v-col
        ><AvatarChip
          url="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/sid-practice/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2024-08-05+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+10.08.49.png"
          name="최세호"
      /></v-col>
    </v-row>

    <v-row>
      <v-col>기술 스택 칩(closeable)</v-col>
      <v-col class="d-flex justify-start" cols="1.5">
        <CloseableChip title="Spring" color="be_blue" />
      </v-col>
      <v-col class="d-flex justify-start" cols="1.5">
        <CloseableChip title="React" color="fe_yellow" />
      </v-col>
      <v-col>기술 스택 칩(basic)</v-col>
      <v-col class="d-flex justify-start" cols="1.5">
        <BasicChip title="Figma" color="de_purple" />
      </v-col>
      <v-col class="d-flex justify-start" cols="1.5">
        <BasicChip title="Swift" color="app_red" />
      </v-col>
      <v-col class="d-flex justify-start" cols="1.5 ">
        <BasicChip title="JIRA" color="pm_green" />
      </v-col>
    </v-row>

    <!-- Footer입니다 -->
    <v-row>
      <FooterComponent />
    </v-row>
  </v-container>

  <!-- 인원 검색 modal -->
  <v-btn @click.stop="searchMemberShowModal()">멤버 검색</v-btn>
  <!-- 모달창을 위한 v-dialog -->
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-form @submit.prevent="searchMembers">
        <v-row>
          <v-col cols="auto">
            <v-select
              v-model="searchType"
              :items="searchOptions"
              item-title="text"
              item-value="value"
            >
            </v-select>
          </v-col>
          <v-col>
            <v-text-field v-model="searchValue" label="Search"> </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn type="submit">검색</v-btn>
          </v-col>
          <v-data-table :headers="tableHeaders" :items="memberList">
          </v-data-table>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import CloseableChip from "@/components/chip/CloseableChip.vue";
import BasicChip from "@/components/chip/BasicChip.vue";
import FooterComponent from "@/components/footer/FooterComponent.vue";
import AvatarChip from "@/components/chip/AvatarChip.vue";
import ButtonComponent from "../button/ButtonComponent.vue";
import axios from "axios";

export default {
  data() {
    return {
      tableHeaders: [
        { title: "이름", key: "name", align: "center" },
        { title: "EMAIL", key: "email", align: "center" },
        { title: "닉네임", key: "nickname", align: "center" },
      ],
      dialog: false,
      searchType: "optional",
      searchOptions: [
        { text: "이름", value: "name" },
        { text: "이메일 아이디", value: "email" },
        { text: "닉네임", value: "nickname" },
      ],
      searchValue: "",
      memberList: [],
      pageSize: 5,
      currentPage: 0,
      isLastPage: false,
    };
  },

  components: {
    CloseableChip,
    BasicChip,
    FooterComponent,
    AvatarChip,
    ButtonComponent,
  },
  methods: {
    test() {
      alert("test");
    },
    searchMemberShowModal() {
      this.dialog = true;
    },
    async searchMembers() {
      if(this.isLastPage) return; 
      this.memberList = [];
      let params = {
        // size: this.pageSize,
        // page: this.currentPage,
      };
      if (this.searchType == "name") {
        params.name = this.searchValue;
      } else if (this.searchType == "email") {
        params.email = this.searchValue;
      }
      if (this.searchType == "nickname") {
        params.nickname = this.searchValue;
      }

      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/api/member/list`,
        { params }
      );
      this.isLastPage = response?.data?.result?.last;
      this.memberList=response?.data?.content;
    },
  },
};
</script>
