<template>
    <v-card
      style="background-color: #DEF5EC; border-radius: 15px; padding: 20px; max-width: 1200px; width: 100%;"
      rounded="0"
      flat
    >
      <v-carousel v-model="onboarding" hide-delimiter-background>
        <!-- 각 슬라이드를 v-carousel-item으로 변경 -->
        <v-carousel-item v-for="n in windowCount" :key="`carousel-${n}`">
          <v-row class="d-flex justify-center">
            <v-col
              v-for="(sidecard, index) in paginatedSidecards(n)"
              :key="index"
              cols="12"
              md="4"
              class="d-flex justify-center"
            >
              <v-card
                class="mx-auto"
                style="width: 100%; max-width: 300px; max-height: 300px"
                @click="() => moveToSiderCard(sidecard.id)"
              >
                <v-avatar size="150" class="mx-auto d-flex justify-center align-center">
                  <v-img
                    class="circle-img"
                    :src="sidecard.profileImageUrl ? sidecard.profileImageUrl : defaultImageUrl"
                  />
                </v-avatar>
                
                <v-card-title
                  class="d-flex justify-center align-center"
                  style="font-weight: bold;"
                >
                  <span>{{ sidecard.nickname }}</span>
                </v-card-title>
                <v-card-text
                  class="d-flex justify-center align-center"
                  style="font-size: 18px;"
                >
                  <div>{{ sidecard.jobField }}</div>
                </v-card-text>
                <v-spacer :style="{ height: '20px' }"></v-spacer>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
  
      <!-- <v-card-actions class="justify-space-between">
        <v-btn icon="mdi-chevron-left" variant="plain" @click="prev"></v-btn>
        <v-btn icon="mdi-chevron-right" variant="plain" @click="next"></v-btn>
      </v-card-actions> -->
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      windowCount: {
        type: Number,
        default: 1
      },
      sidecards: {
        type: Array,
        default: () => []
      },
      defaultImageUrl: {
        type: String,
        default:
          "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/default_profile_image.png"
      }
    },
    data() {
      return {
        onboarding: 0 // v-carousel의 인덱스는 0부터 시작
      };
    },
    methods: {
      next() {
        this.onboarding =
          this.onboarding + 1 >= this.windowCount ? 0 : this.onboarding + 1;
      },
      prev() {
        this.onboarding =
          this.onboarding - 1 < 0 ? this.windowCount - 1 : this.onboarding - 1;
      },
      paginatedSidecards(page) {
        const sidecardsPerPage = 3; // 한 페이지에 3개의 sidecard 표시
        const start = (page - 1) * sidecardsPerPage;
        const end = start + sidecardsPerPage;
        return this.sidecards.slice(start, end);
      },
      moveToSiderCard(memberId) {
        this.$router.push('/sider-card/' + memberId).then(() => {
          // 페이지 이동 후 스크롤을 최상단으로 이동
          window.scrollTo(0, 0);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .circle-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin: 0 auto;
    display: block;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .small-btn {
    font-size: 12px;
    padding: 4px 8px;
    min-width: 40px;
    height: 24px;
  }
  </style>
  