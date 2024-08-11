<template>
    <v-container>
        <PageNavbar
        :menus='[
            {"menu": "내 정보", "url": "/member/mypage", "selected": false},
            {"menu": "내 채팅", "url": "/member/chatting-list", "selected": true},
            {"menu": "내 프로젝트", "url": "/member/my-projects", "selected": false},
            {"menu": "신청 내역", "url": "/member/apply", "selected": false},
            {"menu": "스크랩", "url": "/member/scrap", "selected": false},
        ]'
        />
        <h2 style="text-align:center; margin: 20px;">내 채팅</h2>
        <ChattingListComponent 
        :chatroomList="chatroomList"
        />
    </v-container>
</template>
<script>
import PageNavbar from '@/components/navbar/PageNavbar.vue';
import ChattingListComponent from '@/components/card/ChattingListComponent.vue';
import axios from 'axios'

export default {
    data() {
        return {
            chatroomList: []
        }
    },
    components: {
        PageNavbar,
        ChattingListComponent
    },
    async created() {
        // TODO: 월요일에 인터셉터로 대체
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjIxNTMyNzcsImV4cCI6MTcyNDc0NTI3N30.mmOd-DSfAduSTWuTh5HdewBDP6dez2afR7RvvfDF8jE'
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/list`, { headers })
        console.log(response.data.content);
        this.chatroomList = response.data.content;
    }
}   

</script>