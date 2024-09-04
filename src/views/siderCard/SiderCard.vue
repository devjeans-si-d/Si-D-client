<template>
  <v-container>
    <v-row justify="center" align="center" class="line">
      <div style="margin: 0 30px">
        <v-avatar class="mx-auto" size="120">
          <img
            :src="data.image"
            alt=""
            style="height: 120px; width: 120px; object-fit: cover;"
          />
        </v-avatar>
      </div>
      <v-col>
        <v-row justify="space-between">
          <h2>{{ data.nickname }}</h2>
          <v-btn
            v-if="isMine"
            small
            icon
            color="secondary"
            style="margin-right: 50px;"
            :to="{ path: '/sider-card'}"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-sheet class="py-4 px-1">
            <ButtonComponent v-if="data.jobField" :content="data.jobField" />
          </v-sheet>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="line">
      <v-col class="margin-tb">
        <v-row>
          <h2 style="margin-bottom: 20px">자기소개</h2>
        </v-row>
        <v-row class="introduction">
          <v-textarea v-model="data.introduction" readonly variant="solo" no-resize></v-textarea>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="line">
      <v-col class="margin-tb">
        <v-row>
          <h2 style="margin-bottom: 20px">소셜정보</h2>
        </v-row>
        <v-row>
          <v-btn v-if="data.socialLink.email" variant="text" @click="email"
            ><img
              src="@/assets/email.png"
              alt="이메일"
              style="height: 30px; width: 35px"
          /></v-btn>
          <h3 v-if="emailTogle">{{ data.socialLink.email }}</h3>
          <a
            v-if="data.socialLink.github"
            :href="data.socialLink.github"
            class="social"
            ><img
              src="@/assets/github.png"
              alt="이메일"
              style="height: 30px; width: auto"
          /></a>
          <a
            v-if="data.socialLink.behance"
            :href="data.socialLink.behance"
            class="social"
            ><img
              src="@/assets/behance.png"
              alt="이메일"
              style="height: 30px; width: auto"
          /></a>
          <a
            v-if="data.socialLink.linkedin"
            :href="data.socialLink.linkedin"
            class="social"
            ><img
              src="@/assets/linkedIn.png"
              alt="이메일"
              style="height: 30px; width: auto"
          /></a>
          <a
            v-if="data.socialLink.etc"
            :href="data.socialLink.etc"
            class="social"
            ><img
              src="@/assets/home.png"
              alt="이메일"
              style="height: 30px; width: auto"
          /></a>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="line">
      <v-col class="margin-tb">
        <v-row>
          <h2>경력</h2>
        </v-row>
        <v-row>
          <div
            v-for="(career, index) in data.careers"
            :key="index"
            class="my-4 career"
          >
            <h2>{{ career.company }}</h2>
            <p>{{ career.position }}</p>
            <div style="display: flex; flex-direction: row">
              <p>{{ career.employedStart }} ~</p>
              <p v-if="career.employedYn">&nbsp;현재</p>
              <p v-else>&nbsp;{{ career.employedEnd }}</p>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="line">
      <v-col class="margin-tb">
        <v-row>
          <h2>사용기술</h2>
        </v-row>
        <v-row>
          <TechStackSelector />
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="margin-tb">
        <v-row>
          <h2 style="margin-bottom: 20px">프로젝트</h2>
        </v-row>
        <v-row>
          <v-col
            v-for="item in data.launchedProjects"
            :key="item.launchedProjectId"
            cols="12"
            md="3"
            class="d-flex justify-center"
          >
            <a :href="`/launched-project/${item.launchedProjectId}`"
              >
              <img
                :src="item.launchedProjectImage"
                alt="출시 프로젝트"
                style="height: 250px; width: 250px; object-fit: cover;"
            /></a>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <div class="foot-margin"></div>
</template>

<script>
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import TechStackSelector from "@/components/modal/TechStackSelector.vue";
import axios from "axios";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    ButtonComponent,
    TechStackSelector,
  },
  data() {
    return {
      isMine: false,
      emailTogle: false,
      jobFields: [
        { name: "프론트엔드", value: "FRONTEND" },
        { name: "백엔드", value: "BACKEND" },
        { name: "앱", value: "APP" },
        { name: "디자인", value: "DESIGNER" },
        { name: "PM", value: "PM" },
      ],
      date: null,
      name: "푸바오",
      rules: [(v) => v.length <= 3000 || "Max 3000 characters"],
      data: {
        id: "",
        nickname: "",
        image: "",
        jobField: "",
        introduction: "",
        socialLink: {
          email: "",
          github: "",
          behance: "",
          linkedin: "",
          etc: "",
        },
        careers: [],
        teckStacks: [],
        launchedProjects: [
          {
            launchedProjectId: 1,
            launchedProjectImage:
              "https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png",
          },
          {
            launchedProjectId: 2,
            launchedProjectImage:
              "https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png",
          },
          {
            launchedProjectId: 3,
            launchedProjectImage:
              "https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png",
          },
        ],
      },
    };
  },
  async created() {
    this.isMine = this.id == localStorage.getItem("id")
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/api/sider-card/${this.id}`
      );
      const data = response.data.result;
      this.data.id = data.id;
      this.data.nickname = data.nickname;
      this.data.jobField = data.jobField;
      this.data.image = data.image
        ? data.image
        : "https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png";
      this.data.introduction = data.introduction;
      this.data.socialLink = data.socialLinkRes;
      this.data.careers = data.careerRes;
      this.data.launchedProjects = data.launchedProjectRes;
      // this.data.teckStacks = data.teckStackRes
      this.$store.dispatch("updateTechStacksRes", data.teckStackRes);
      console.log(response.data.result);
    } catch (e) {
      console.log(e.response.data);
    }
  },
  watch: {},
  updated() {},
  computed: {},
  methods: {
    email() {
      this.emailTogle = !this.emailTogle;
    },
  },
};
</script>

<style scoped>
.margin-tb {
  margin: 20px 20px;
}
.career {
  margin: 10px;
}
.social {
  margin-left: 10px;
  margin-right: 10px;
}
.introduction {
  min-height: 50px;
  padding-bottom: 150px;
}
.email {
  min-height: 50px;
  margin: 20px;
}

.foot-margin {
  margin-bottom: 100px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
}

.line {
  border-bottom: 1px solid;
  padding-bottom: 20px;
}

.textarea {
  margin-bottom: 200px;
}
</style>
