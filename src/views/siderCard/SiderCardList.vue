<template>
    <v-container>
        <v-row style="padding-bottom: 20px; margin-top: 5px;">
            <v-sheet class="py-4 px-1">
                <v-chip-group v-model="siderCardFilter" selected-class="text-primary" mandatory>
                    <v-chip v-for="(job, index) in jobFields" :key="index" color="#094F08" size="large"
                        filter :value="job.value">{{ job.name }}</v-chip>
                </v-chip-group>
            </v-sheet>
        </v-row>
        <v-row justify="space-around">
            <v-col style="max-width: 286px;" v-for="(card, index) in cards" :key="index">
                <a style="text-decoration-line: none;" :href="`/sider-card/${card.member_id}`"><CardComponent :name="card.member_nickname" :jobField="card.member_jobField"
                    :image="card.member_image" /></a>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CardComponent from '@/components/siderCard/CardComponent.vue';
import axios from 'axios';

export default {
    components: {
        CardComponent
    },
    data() {
        return {
            siderCardFilter:'',
            jobFields:[
                { name: '전체', value: '' },
                { name: '프론트엔드', value: 'FRONTEND' },
                { name: '백엔드', value: 'BACKEND' },
                { name: '앱', value: 'APP' },
                { name: '디자인', value: 'DESIGNER' },
                { name: 'PM', value: 'PM' },
            ],
            cards: [
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
                {member_nickname:'푸바오',member_jobField:'BACKEND',member_image:'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'},
            ]
        }
    },
    async created() {
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/sider-card/list`)
            console.log(response.data.result);
            this.cards = response.data.result.content
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        
    }
}
</script>