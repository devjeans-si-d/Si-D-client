<template>
    <v-card
      style="background-color: #DEF5EC; border-radius: 15px; padding: 20px; max-width: 1200px; width: 100%;"
      rounded="0"
      flat
    >
      <v-window v-model="onboarding" style="width: 1080px;">
        <v-window-item v-for="n in windowCount" :key="`window-${n}`" :value="n">
          <v-row class="d-flex justify-center">
            <v-col
              v-for="(sidecard, index) in paginatedSidecards(n)"
              :key="index"
              cols="12"
              md="4"
              class="d-flex justify-center"
            >
              <v-card
              class="rounded-xl fixed-card d-flex flex-column align-center justify-center"
              @click="() => moveToSiderCard(sidecard.id)"
              >
                <v-card-item>
                  <v-avatar class="mx-auto" size="120">
                    <v-img
                    class="circle-img"
                    :src="sidecard.profileImageUrl ? sidecard.profileImageUrl : defaultImageUrl"
                    />
                  </v-avatar>
                </v-card-item>
                
                <v-card-item>
                  <v-card-title class="d-flex justify-center align-center" style="font-weight: bold;">
                    <span>{{ sidecard.nickname }}</span>
                  </v-card-title>
                  <v-card-text class="d-flex justify-center align-center" style="font-size: 15px;">
                    <div>{{ sidecard.jobField }}</div>
                  </v-card-text>
                </v-card-item>
              </v-card>

            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
  
      <v-card-actions class="justify-space-between">
        <v-btn icon="mdi-chevron-left" variant="plain" @click="prev"></v-btn>
        <v-item-group v-model="onboarding" class="text-center" mandatory>
          <v-item
            v-for="n in windowCount"
            :key="`btn-${n}`"
            v-slot="{ isSelected, toggle }"
            :value="n"
          >
          <v-btn
              :color="isSelected ? 'primary' : 'secondary'"
                icon="mdi-circle-small"
              @click="toggle"
            ></v-btn>

          </v-item>
        </v-item-group>
        <v-btn icon="mdi-chevron-right" variant="plain" @click="next"></v-btn>
      </v-card-actions>
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
      defaultImageUrl : {
        type: String,
        default : "https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/default_profile_image.png"
      }
    },
    data() {
      return {
        onboarding: 1
      };
    },
    methods: {
      next() {
        this.onboarding =
          this.onboarding + 1 > this.windowCount ? 1 : this.onboarding + 1;
      },
      prev() {
        this.onboarding =
          this.onboarding - 1 <= 0 ? this.windowCount : this.onboarding - 1;
      },
      paginatedSidecards(page) {
        const sidecardsPerPage = 3; // 한 페이지에 3개의 sidecard 표시
        const start = (page - 1) * sidecardsPerPage;
        const end = start + sidecardsPerPage;
        return this.sidecards.slice(start, end);
      },
      moveToSiderCard(memberId){
        this.$router.push('/sider-card/' + memberId).then(() => {
          // 페이지 이동 후 스크롤을 최상단으로 이동
          window.scrollTo(0, 0);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .fixed-card {
    width: 250px;
    /* 고정 너비 */
    height: 250px;
    /* 고정 높이 */
  }
  .circle-img {
    /* width: 150px;*/
    /* height: 150px; */
    border-radius: 50%;
    object-fit: cover; /* 이미지가 컨테이너를 완전히 덮도록 설정 */
    object-position: center;
    margin: 0 auto;
    display: block;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 음영 추가 */

  }
  .small-btn {
    font-size: 12px;
    padding: 4px 8px;
    min-width: 40px;
    height: 24px;
  }
  </style>
  