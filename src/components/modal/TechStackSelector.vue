<template>
  <!-- 모달을 여는 버튼 -->
  <v-container>
    <v-row v-if="require">
      <v-col cols="auto">
        <v-btn color="#A4DEC6" @click="showModal = true">기술 스택 선택하기</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="#FFAFAF" @click="resetFinalIds">전체 초기화</v-btn>
      </v-col>
    </v-row>

    <!-- 최종 선택된 기술 스택을 직무별로 표시 -->
    <v-row v-if="Object.keys(finalSelectedTechStacks).length > 0">
      <v-col cols="12">
        <h3>사용한 기술 스택</h3>
        <!-- 직무별로 기술 스택을 표시 -->
        <div v-for="(techs, jobField) in finalSelectedTechStacks" :key="jobField">
          <!-- 직무 이름 -->
          <div :style="{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px', color: jobFieldColors[jobField] }">
            {{ jobField }}
          </div>
          <!-- 기술 스택들 -->
          <v-chip-group column>
            <v-chip v-for="tech in techs" :key="tech.id"
              :style="{ backgroundColor: jobFieldColors[jobField], color: '#fff' }">
              {{ tech.name }}
            </v-chip>
          </v-chip-group>
        </div>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col>
        <v-btn color="#FFAFAF" @click="resetFinalIds">전체 초기화</v-btn>
      </v-col>
    </v-row> -->

    <!-- 모달 창 -->
    <v-dialog v-model="showModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">기술 스택 선택</span>
        </v-card-title>

        <v-card-text>
          <v-select v-model="selectedJobField" :items="jobFields" label="직무 선택"></v-select>

          <v-spacer :style="{ height: '50px' }"></v-spacer>

          <v-row v-if="selectedJobField">
            <v-col cols="12">
              <v-chip-group v-model="selectedTechStacks[selectedJobField]" column multiple filter>
                <v-chip v-for="tech in filteredTechStacks" :key="tech.id" :value="tech">
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
import { mapGetters } from 'vuex';

export default {
  props: ['require'],
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
      finalIds: [], // 선택된 기술 스택 ID를 저장할 배열
      saveIds: [],
      jobFields,  // import한 jobFields를 사용
      techStacks, // import한 techStacks를 사용
      jobFieldColors: {  // 직무별 색상 설정
        Designer: '#9A81B0',
        Frontend: '#FFAF6E',
        Backend: '#4C587D',
        App: '#EA7D70',
        PM: '#5F6F52',
      },
    };
  },
  watch: {
    getTechStackIdsRes() {
      for (const item in this.getTechStackIdsRes) {
        console.log('getTechStackIdsRes: ', this.getTechStackIdsRes);

        console.log('item.jobField: ', this.getTechStackIdsRes[item].jobField);

        this.selectedTechStacks[this.getTechStackIdsRes[item].jobField].push({ id: this.getTechStackIdsRes[item].id, name: this.getTechStackIdsRes[item].techStackName })
      }
      this.finalSelectedTechStacks = {};

      for (const jobField in this.selectedTechStacks) {
        if (this.selectedTechStacks[jobField].length > 0) {
          this.finalSelectedTechStacks[jobField] = this.selectedTechStacks[jobField];
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getTechStackIds']),
    ...mapGetters(['getTechStackIdsRes']),
    filteredTechStacks() {
      return this.selectedJobField
        ? this.techStacks[this.selectedJobField].map(tech => ({ id: tech.id, name: tech.name })) // techData에서 고유 ID를 사용
        : [];
    },
  },
  methods: {
    updateTechStacks() {
      this.$store.dispatch('updateTechStacks', this.saveIds)
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

      this.saveIds = Object.values(this.selectedTechStacks)
        .flat()
        .map(tech => ({ id: tech.id }));

      // ID 리스트를 생성하여 콘솔에 출력 (백엔드 전송을 위한 데이터)
      this.finalIds = Object.values(this.selectedTechStacks)
        .flat()
        .map(tech => tech.id);


      this.updateTechStacks();
      console.log('Selected IDs:', this.finalIds);
      // console.log('Selected IDs:', this.finalSelectedTechStacks);
      // console.log('Selected IDs:', this.selectedTechStacks);
      // console.log('Selected IDs:', this.getTechStackIds);

      // 실제 백엔드로 전송하는 코드 (예시)
      // axios.post('/api/techstacks', this.finalIds)
      //   .then(response => console.log('Data sent successfully'))
      //   .catch(error => console.error('Error sending data:', error));
    },
    resetSelections() {
      // 선택된 스택들 초기화
      if (this.selectedJobField) {
        this.selectedTechStacks[this.selectedJobField] = [];
      }
    },
    resetFinalIds() {
      // finalIds, finalSelectedTechStacks, selectedTechStacks 모두 초기화
      this.finalIds = [];
      this.finalSelectedTechStacks = {};

      // 직무별 선택된 기술 스택 초기화
      for (const jobField in this.selectedTechStacks) {
        this.selectedTechStacks[jobField] = [];
      }

      console.log('finalIds 초기화:', this.finalIds);
    },
  },
};
</script>

<style scoped>
h3 {
  margin-top: 20px;
}
</style>
