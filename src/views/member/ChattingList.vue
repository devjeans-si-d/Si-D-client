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
        <div class="chat-outer-box">
            <EnChattingListComponent 
            :chatroomList="chatroomList" v-on:moveToOtherRoom="move"
            />
            <EnChatroomComponent ref="chatroomComponent" :chatroomId="this.chatroomId" />
        </div>
    </v-container>
</template>
<script>
import PageNavbar from '@/components/navbar/PageNavbar.vue';
import EnChattingListComponent from '@/components/card/EnChattingListComponent.vue';
import EnChatroomComponent from '@/components/card/EnChatroomComponent.vue';
import axios from 'axios'

export default {
    data() {
        return {
            chatroomList: [],
            chatroomId: 0,
        }
    },
    methods: {
        move(dest) {
            console.log("방이동 발생!" + dest);
            this.chatroomId = dest;
            this.$refs.chatroomComponent.changeRoom(dest);
        },

    },
    components: {
        PageNavbar,
        EnChattingListComponent,
        EnChatroomComponent
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/list`)
        console.log(response.data.content);
        this.chatroomList = response.data.content;
    },
}   

</script>

<style scoped>
.custom-container {
    max-width: 1200px !important; /* 원하는 최대 폭 */
    margin: 0 auto !important;    /* 중앙 정렬 */
    width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
}

.chat-outer-box {
    display: flex;
}
</style>