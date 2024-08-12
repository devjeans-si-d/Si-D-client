<template>
    <v-container fluid class="custom-container">
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
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/list`)
        console.log(response.data.content);
        this.chatroomList = response.data.content;
    }
}   

</script>

<style scoped>
.custom-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
}
</style>