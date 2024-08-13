<template>
  <v-container>
    <!-- 모달을 여는 버튼 -->
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="showModal = true">태그 선택하기</v-btn>
      </v-col>
    </v-row>

    <!-- 최종 선택된 기술 스택을 직무별로 표시 -->
    <v-row v-if="Object.keys(finalSelectedTechStacks).length > 0">
      <v-col cols="12">
        <h3>선택한 기술 스택</h3>
        <v-list>
          <v-list-item-group v-for="(techs, jobField) in finalSelectedTechStacks" :key="jobField">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6" :style="{ color: jobFieldColors[jobField] }">
                  {{ jobField }}:
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip-group column>
                    <v-chip
                      v-for="tech in techs"
                      :key="tech.id"
                      :style="{ backgroundColor: jobFieldColors[jobField], color: '#fff' }"
                    >
                      {{ tech.name }}
                    </v-chip>
                  </v-chip-group>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>

    <!-- 모달 창 -->
    <v-dialog v-model="showModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">기술 스택 선택</span>
        </v-card-title>

        <v-card-text>
          <v-select
            v-model="selectedJobField"
            :items="jobFields"
            label="직무 선택"
          ></v-select>

          <v-row v-if="selectedJobField">
            <v-col cols="12">
              <v-chip-group
                v-model="selectedTechStacks[selectedJobField]"
                column
                multiple
                filter
              >
                <v-chip
                  v-for="tech in filteredTechStacks"
                  :key="tech.id"
                  :value="tech"
                >
                  {{ tech.name }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="secondary" @click="resetSelections">초기화</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitTechStacks">선택 완료</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// techData.js에서 jobFields와 techStacks를 가져옴
import { jobFields, techStacks } from '@/data/techData';

export default {
  data() {
    return {
      showModal: false,
      selectedJobField: null,
      selectedTechStacks: {
        Designer: [],
        Frontend: [],
        Backend: [],
        App: [],
        PM: [],
      },
      finalSelectedTechStacks: {},  // 직무별로 선택된 기술 스택을 담을 객체
      jobFields,  // import한 jobFields를 사용
      techStacks, // import한 techStacks를 사용
      jobFieldColors: {  // 직무별 색상 설정
        Designer: '#FF4081',
        Frontend: '#3F51B5',
        Backend: '#4CAF50',
        App: '#FFC107',
        PM: '#9E9E9E',
      },
    };
  },
  computed: {
    filteredTechStacks() {
      return this.selectedJobField
        ? this.techStacks[this.selectedJobField].map((tech, index) => ({ id: index + 1, name: tech })) // 고정 ID 값을 할당
        : [];
    },
  },
  methods: {
    getTechNameById(id) {
      // 기술 스택의 ID를 기반으로 이름을 찾아 반환
      for (const field in this.techStacks) {
        const tech = this.techStacks[field].find((_, index) => index + 1 === id);
        if (tech) return tech;
      }
      return '';
    },
    submitTechStacks() {
      // 각 직무에서 선택된 스택의 ID를 하나의 리스트로 모아 최종 데이터로 변환
      this.finalSelectedTechStacks = {};

      for (const jobField in this.selectedTechStacks) {
        if (this.selectedTechStacks[jobField].length > 0) {
          this.finalSelectedTechStacks[jobField] = this.selectedTechStacks[jobField];
        }
      }

      // 모달 닫기
      this.showModal = false;

      // ID 리스트를 생성하여 콘솔에 출력 (백엔드 전송을 위한 데이터)
      const finalIds = Object.values(this.selectedTechStacks)
        .flat()
        .map(tech => tech.id);

      console.log('Selected IDs:', finalIds);

      // 실제 백엔드로 전송하는 코드 (예시)
      // axios.post('/api/techstacks', finalIds)
      //   .then(response => console.log('Data sent successfully'))
      //   .catch(error => console.error('Error sending data:', error));
    },
    resetSelections() {
      // 선택된 스택들 초기화
      if (this.selectedJobField) {
        this.selectedTechStacks[this.selectedJobField] = [];
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin-top: 20px;
}
</style>
