<template>
  <v-container>
    <v-row justify="center" align="center" class="line">
      <div style="position: relative; margin: 0 30px; overflow: visible;">
        <v-avatar class="mx-auto" size="120">
          <img
            :src="data.image"
            alt="Profile Image"
            style="height: 120px; width: auto"
          />
          <!-- 파일 선택 인풋 -->
          <v-file-input
            ref="fileInput"
            hide-input
            style="position: absolute; bottom: 0; right: 0; z-index: -3;"
            v-model="imageFile"
            @change="fileUpdate"
          ></v-file-input>
        </v-avatar>
        <v-btn
            small
            icon
            style="position: absolute; bottom: 50px; right: -10px; font-size: 14px; z-index: 3;"
            @click="$refs.fileInput.click()"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
      </div>
      <v-col>
        <v-row>
          <h2>{{ data.nickname }}</h2>
        </v-row>
        <v-row>
          <v-sheet class="py-4 px-1">
            <v-chip-group
              v-model="data.jobField"
              selected-class="text-primary"
              mandatory
            >
              <v-chip
                v-for="(job, index) in jobFields"
                :key="index"
                color="#094F08"
                size="large"
                filter
                :value="job.value"
                >{{ job.name }}</v-chip
              >
            </v-chip-group>
          </v-sheet>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="line">
      <v-col class="margin-tb">
        <v-row>
          <h2 style="margin-bottom: 20px">자기소개</h2>
        </v-row>
        <v-row class="textarea">
          <v-textarea
            v-model="data.introduction"
            :rules="rules"
            label="자기소개"
            counter
            variant="outlined"
            max-width="1200"
          ></v-textarea>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="line">
      <v-col class="margin-tb">
        <v-row>
          <h2 style="margin-bottom: 20px">소셜정보</h2>
        </v-row>
        <v-row class="email">
          <v-text-field
            v-model="data.socialLink.email"
            prepend-icon="mdi-email"
            label="개인 이메일 주소"
            variant="solo-filled"
            max-width="1200"
            readonly
          ></v-text-field>
        </v-row>
        <v-row class="email">
          <v-text-field
            v-model="data.socialLink.github"
            prepend-icon="mdi-github"
            label="깃허브 주소"
            variant="solo-filled"
            max-width="1200"
          ></v-text-field>
        </v-row>
        <v-row class="email">
          <v-text-field
            v-model="data.socialLink.behance"
            prepend-icon="mdi-beta"
            label="비핸스 주소"
            variant="solo-filled"
            max-width="1200"
          ></v-text-field>
        </v-row>
        <v-row class="email">
          <v-text-field
            v-model="data.socialLink.linkedin"
            prepend-icon="mdi-linkedin"
            label="링크드인 주소"
            variant="solo-filled"
            max-width="1200"
          ></v-text-field>
        </v-row>
        <v-row class="email">
          <v-text-field
            v-model="data.socialLink.etc"
            prepend-icon="mdi-home"
            label="개인 블로그 주소"
            variant="solo-filled"
            max-width="1200"
          ></v-text-field>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="line">
      <v-col class="margin-tb">
        <v-row>
          <h2>경력</h2>
        </v-row>
        <v-row
          v-for="(career, index) in data.careers"
          :key="index"
          class="my-4"
        >
          <v-col style="padding: 0px">
            <v-row class="email">
              <v-text-field
                v-model="career.company"
                label="회사명"
                max-width="1200"
              ></v-text-field>
            </v-row>
            <v-row class="email">
              <v-text-field
                v-model="career.position"
                label="포지션"
                max-width="1200"
              ></v-text-field>
            </v-row>
            <v-row class="email">
              <v-text-field
                placeholder="YYYY-MM"
                v-model="career.employedStart"
                label="재직기간 시작일"
                max-width="1200"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field
                placeholder="YYYY-MM"
                v-model="career.employedEnd"
                label="재직기간 종료일"
                max-width="1200"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-col style="margin-left: 30px" class="row-1">
                <v-checkbox
                  v-model="career.employedYn"
                  label="재직중"
                ></v-checkbox>
              </v-col>
              <v-col cols="2" class="row-1">
                <v-btn
                  style="margin-top: 10px"
                  color="red"
                  @click="removeCareer(index)"
                  >삭제</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-btn :disabled="data.careers.length >= 5" @click="addCareer"
            >+ 경력 추가하기</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <v-row class="line">
      <TechStackSelector require="true" />
    </v-row>
    <v-row>
      <v-col class="margin-tb">
        <v-row>
          <h2 style="margin-bottom: 20px">프로젝트</h2>
        </v-row>
        <v-row>
          <div
            v-for="item in data.launchedProjects"
            :key="item.launchedProjectId"
            style="margin-right: 40px;"
          >
            <a :href="`/launched-project/${item.launchedProjectId}`"
              ><img
                :src="item.launchedProjectImage"
                alt="출시 프로젝트"
                style="height: 150px; width: auto"
            /></a>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="1">
        <ButtonComponent @click="save" content="저장" />
      </v-col>
    </v-row>
  </v-container>
  <div class="foot-margin"></div>
</template>

<script>
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import TechStackSelector from "@/components/modal/TechStackSelector.vue";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  components: {
    ButtonComponent,
    TechStackSelector,
  },
  data() {
    return {
      jobFields: [
        { name: "프론트엔드", value: "FRONTEND" },
        { name: "백엔드", value: "BACKEND" },
        { name: "앱", value: "APP" },
        { name: "디자인", value: "DESIGNER" },
        { name: "PM", value: "PM" },
      ],
      imageFile: null,
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
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/api/sider-card`
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
      this.data.launchedProjects = data.launchedProjectRes
      // this.data.teckStacks = data.teckStackRes
      this.$store.dispatch("updateTechStacksRes", data.teckStackRes);
      console.log(response.data.result);
    } catch (e) {
      console.log(e.response.data);
    }
  },
  watch: {
    getTechStackIds() {
      this.data.teckStacks = this.getTechStackIds;
    },
  },
  updated() {},
  computed: {
    ...mapGetters(["getTechStackIds"]),
  },
  methods: {
    addCareer() {
      if (this.data.careers.length < 5) {
        this.data.careers.push({
          company: "",
          position: "",
          employedStart: "",
          employedEnd: "",
          employedYn: false,
        });
      }
    },
    removeCareer(index) {
      this.data.careers.splice(index, 1);
    },
    async save() {
      if (this.data.jobField == "" || this.data.jobField == null) {
        alert("직무를 선택해주세요");
        return;
      }
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/api/sider-card/update`,
          this.data
        );
        alert("사이더카드 업데이트 완료");
        console.log(response.data);
      } catch (e) {
        console.log(e.response.data);
      }
    },
    async fileUpdate() {
      this.data.image = await this.uploadImage(this.imageFile);
    },
    async uploadImage(blob) {
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
      let response = await fetch(awsUrl.data + awsUrl.auth, options);
      console.log(response);

      return awsUrl.data;
      },
  },
};
</script>

<style scoped>
.margin-tb {
  margin: 40px 20px;
}
.row-1 {
  height: 50px;
  padding: 0px;
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
  margin-bottom: 130px;
}
</style>
