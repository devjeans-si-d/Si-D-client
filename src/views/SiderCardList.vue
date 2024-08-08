<template>
    <v-container>
        <v-row :style="{marginTop:'80px'}" justify="start">
            <div v-for="(jobField,i) in jobFields" :key="i" :style="{margin:'10px'}">
                <ButtonComponent v-if="jobField.selected" :content="jobField.name"/>
                <ButtonComponent v-else :content="jobField.name" color=000000 background="#D9D9D9" />
            </div>
        </v-row>
        <v-row justify="space-around">
            <v-col style="max-width: 286px;" v-for="(card, index) in cards" :key="index">
                <CardComponent :name="card.member_nickname" :jobField="card.member_jobField"
                    :image="card.member_image" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CardComponent from '@/components/siderCard/CardComponent.vue';
import ButtonComponent from '@/components/button/ButtonComponent.vue';
// import axios from 'axios';

export default {
    components: {
        CardComponent,ButtonComponent
    },
    data() {
        return {
            jobFields:[
                {name:'전체', selected:true},
                {name:'프론트엔드', selected:false},
                {name:'백엔드', selected:false},
                {name:'안드로이드', selected:false},
                {name:'iOS', selected:false},
                {name:'디자인', selected:false},
                {name:'PM', selected:false},
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
        // try {
        //     const token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjI5NDY1MzEsImV4cCI6MTcyNTUzODUzMX0.vP8jv4v6FcBxxNB_o6-Q8mhUjt4aZf2HjXNUZ0v5Hl0`
        //     const headers = { Authorization: `Bearer ${token}` }
        //     const response = await axios.get(`http://localhost:8080/api/sider-card/list`, { headers })
        //     console.log(response.data.result);
        //     this.cards = response.data.result.content
        // } catch (e) {
        //     console.log(e);
        // }
    },
    methods: {
        // Your methods
    }
}
</script>