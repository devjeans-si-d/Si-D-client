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
                        <v-chip-group v-model="data.jobField" selected-class="text-primary" mandatory>
                            <v-chip v-for="(job, index) in jobFields" :key="index" color="#094F08" size="large"
                                filter :value="job.value">{{ job.name }}</v-chip>
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
                    <v-textarea v-model="data.introduction" :rules="rules" label="자기소개" counter variant="outlined"
                        max-width="1200"></v-textarea>
                </v-row>
            </v-col>
        </v-row>

        <v-row class="line">
            <v-col>
                <v-row>
                    <h2>소셜정보</h2>
                </v-row>
                <v-row class="email">
                    <v-text-field v-model="data.socialLink.email" prepend-icon="mdi-email" label="개인 이메일 주소"
                        variant="solo-filled" max-width="1200"></v-text-field>
                </v-row>
                <v-row class="email">
                    <v-text-field v-model="data.socialLink.github" prepend-icon="mdi-github" label="깃허브 주소"
                        variant="solo-filled" max-width="1200"></v-text-field>
                </v-row>
                <v-row class="email">
                    <v-text-field v-model="data.socialLink.behance" prepend-icon="mdi-beta" label="비핸스 주소"
                        variant="solo-filled" max-width="1200"></v-text-field>
                </v-row>
                <v-row class="email">
                    <v-text-field v-model="data.socialLink.linkedin" prepend-icon="mdi-linkedin" label="링크드인 주소"
                        variant="solo-filled" max-width="1200"></v-text-field>
                </v-row>
                <v-row class="email">
                    <v-text-field v-model="data.socialLink.etc" prepend-icon="mdi-home" label="개인 블로그 주소"
                        variant="solo-filled" max-width="1200"></v-text-field>
                </v-row>
            </v-col>
        </v-row>

        <v-row class="line">
            <v-col>
                <v-row>
                    <h2>경력</h2>
                </v-row>
                <v-row v-for="(career, index) in data.careers" :key="index" class="my-4">
                    <v-col>
                        <v-row class="email">
                            <v-text-field v-model="career.company" label="회사명" max-width="1200"></v-text-field>
                        </v-row>
                        <v-row class="email">
                            <v-text-field v-model="career.position" label="포지션" max-width="1200"></v-text-field>
                        </v-row>
                        <v-row class="email">
                            <v-text-field placeholder="YYYY-MM" v-model="career.employedStart" label="재직기간 시작일" max-width="1200"></v-text-field>
                            <v-spacer></v-spacer>
                            <v-text-field placeholder="YYYY-MM" v-model="career.employedEnd" label="재직기간 종료일" max-width="1200"></v-text-field>
                        </v-row>
                        <v-row justify="center" align-content="center">
                            <v-col :style="{marginLeft: '20px'}">
                                <v-checkbox v-model="career.employedYn" label="재직중"></v-checkbox>
                            </v-col>
                            <v-col cols="2" justify-center align-center>
                                <v-btn color="red" @click="removeCareer(index)">삭제</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row justify="end">
                    <v-btn :disabled="data.careers.length >= 5" @click="addCareer">+ 경력 추가하기</v-btn>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <TechStackSelector />
        </v-row>
        <v-row justify="center">
            <v-col cols="1">
                <ButtonComponent @click="save" content="저장"/>
            </v-col>
        </v-row>
    </v-container>
    <div class="foot-margin"></div>
</template>

<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import TechStackSelector from '@/components/modal/TechStackSelector.vue';
import axios from 'axios';
export default {
    components: {
        ButtonComponent, TechStackSelector
    },
    data() {
        return {
            jobFields: [
                { name: '프론트엔드', value: 'FRONTEND' },
                { name: '백엔드', value: 'BACKEND' },
                { name: '앱', value: 'APP' },
                { name: '디자인', value: 'DESIGNER' },
                { name: 'PM', value: 'PM' },
            ],
            date: null,
            name: "푸바오",
            rules: [v => v.length <= 3000 || 'Max 3000 characters'],

            data: {
                image: 'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png',
                jobField: "",
                introduction: "",
                socialLink: {
                    email: "",
                    github: "",
                    behance: "",
                    linkedin: "",
                    etc: ""
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
                    employedYn: false,
                });
            }
        },
        removeCareer(index) {
            this.data.careers.splice(index, 1);
        },
        async save(){
            try{
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/sider-card/update`,this.data)
                console.log(response.data);
            }catch(e){
                console.log(e.response.data);
            }
            
        }
    }
}
</script>

<style scoped>
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