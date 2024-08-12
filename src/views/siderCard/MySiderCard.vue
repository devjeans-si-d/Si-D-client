<template>
    <div>mysidercard</div>
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

        <v-row>
            <v-row>
                <h2>자기소개</h2>
            </v-row>
            <v-row><v-textarea label="Label" variant="outlined"></v-textarea></v-row>
        </v-row>
        <FooterComponent />
    </v-container>
    
</template>

<script>
import FooterComponent from '@/components/footer/FooterComponent.vue';
export default {
    components:{
        FooterComponent
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
            name: "푸바오",

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
                careers:[],
                teckStacks:[],
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
</style>