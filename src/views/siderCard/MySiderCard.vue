<template>
    <v-container>
        <v-row justify="center" align="center" class="line">
            <v-col cols="2">
                <v-avatar class="mx-auto" size="120">
                    <img :src="data.image" alt="Profile Image" style="height:120px; width:auto;" />
                </v-avatar>
            </v-col>
            <v-col>
                <v-row>
                    <h2>푸바오</h2>
                </v-row>
                <v-row>
                    <v-sheet class="py-4 px-1">
                        <v-chip-group selected-class="text-primary" mandatory>
                            <v-chip v-for="(job, index) in jobFields" :key="index" color="#094F08" size="large"
                                filter>{{ job.name }}</v-chip>
                        </v-chip-group>
                    </v-sheet>
                </v-row>
            </v-col>
        </v-row>

        <v-row class="line">
            <v-col>
                <v-row>
                    <h2>자기소개</h2>
                </v-row>
                <v-row class="textarea">
                        <v-textarea
                          :model-value="data.introduction"
                          :rules="rules"
                          label="자기소개"
                          counter
                          variant="outlined"
                        ></v-textarea>
                </v-row>
            </v-col>
        </v-row>

        <v-row class="line">
            <v-col>
                <v-row>
                    <h2>경력</h2>
                </v-row>
                <v-row v-for="(career, index) in data.careers" :key="index" class="my-4">
                    <v-col cols="3">
                        <v-text-field v-model="career.company" label="회사명"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field v-model="career.position" label="포지션"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field v-model="career.period" label="재직기간"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-checkbox v-model="career.isCurrent" label="재직중"></v-checkbox>
                    </v-col>
                    <v-col cols="1">
                        <v-btn color="red" @click="removeCareer(index)">삭제</v-btn>
                    </v-col>
                </v-row>
                <v-row justify="end">
                    <v-col cols="2">
                        <v-btn :disabled="data.careers.length >= 5" @click="addCareer">경력 추가하기</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="d-flex justify-center">
                    <v-date-input
                      v-model="date"
                      label="Select range"
                      max-width="468"
                      multiple="range"
                    ></v-date-input>
                  </div>
            </v-col>
        </v-row>
        <FooterComponent />
    </v-container>

</template>

<script>
import FooterComponent from '@/components/footer/FooterComponent.vue';
import { VDateInput } from 'vuetify/labs/VDateInput'
export default {
    components: {
        FooterComponent,VDateInput
    },
    data() {
        return {
            jobFields: [
                { name: '없음', selected: true },
                { name: '프론트엔드', selected: false },
                { name: '백엔드', selected: false },
                { name: '안드로이드', selected: false },
                { name: 'iOS', selected: false },
                { name: '디자인', selected: false },
                { name: 'PM', selected: false },
            ],
            date: null,
            name: "푸바오",
            rules: [v => v.length <= 3000 || 'Max 3000 characters'],

            data: {
                image: 'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png',
                jobField: "",
                introduction: "",
                socialLink: {
                    email: "seho@naver.com",
                    github: "sseho",
                    behance: "behance",
                    linkedin: "linkedin",
                    etc: "etc"
                },
                careers: [],
                teckStacks: [],
            },




        }
    },
    created() {

    },
    watch: {

    },
    updated() {

    },
    computed: {

    },
    methods: {
        addCareer() {
            if (this.data.careers.length < 5) {
                this.data.careers.push({
                    company: '',
                    position: '',
                    employedStart: '',
                    employedEnd: '',
                    employedYn: 'N',
                });
            }
        },
        removeCareer(index) {
            this.data.careers.splice(index, 1);
        },
    }
}
</script>

<style scoped>
.mx-auto {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 60px;
}

.line {
    border-bottom: 1px solid;
}

.textarea {
    margin-bottom: 200px;
}
</style>