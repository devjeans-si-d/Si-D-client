<template>
    <v-container>
      <!-- 모달을 여는 버튼 -->
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" @click="showModal = true">태그 선택하기</v-btn>
        </v-col>
      </v-row>
  
      <!-- 선택된 태그를 직무별로 표시 -->
      <v-row v-if="Object.keys(finalSelectedTechStacks).length > 0">
        <v-col cols="12">
          <h3>선택한 기술 스택</h3>
          <v-row>
            <v-col cols="12" v-for="(techs, jobField) in finalSelectedTechStacks" :key="jobField">
              <strong>{{ jobField }}:</strong>
              <v-chip-group column>
                <v-chip v-for="tech in techs" :key="tech">
                  {{ tech }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
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

            <v-spacer :style="{height: '50px'}"></v-spacer>
  
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
                    :key="tech"
                    :value="tech"
                  >
                    {{ tech }}
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
        finalSelectedTechStacks: {},
        jobFields,  // import한 jobFields를 사용
        techStacks, // import한 techStacks를 사용
      };
    },
    computed: {
      filteredTechStacks() {
        return this.selectedJobField
          ? this.techStacks[this.selectedJobField]
          : [];
      },
    },

    methods: {
      submitTechStacks() {
        // 현재 선택된 스택들을 최종 선택 리스트에 저장
        this.finalSelectedTechStacks = {
          ...this.finalSelectedTechStacks,
          [this.selectedJobField]: [...this.selectedTechStacks[this.selectedJobField]],
        };
        // 모달 닫기
        this.showModal = false;
      },
      resetSelections() {
        // 선택된 스택들 초기화
        this.selectedTechStacks[this.selectedJobField] = [];
      },
    },
  };
  </script>
  
  <style scoped>
  h3 {
    margin-top: 20px;
  }
  </style>
  