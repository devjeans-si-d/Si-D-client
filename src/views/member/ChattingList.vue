<template>
    <v-container fluid class="custom-container">

        <h2 style="text-align:center; margin: 20px;">내 채팅</h2>
        <v-container class="chat-outer-box">
            <EnChattingListComponent 
            v-on:moveToOtherRoom="move"
            style="width: 40%"
            />
            <EnChatroomComponent
            ref="chatroomComponent"
            :chatroomId="this.chatroomId"
            style="width: 60%"
            />
        </v-container>
    </v-container>
</template>
<script>
import EnChattingListComponent from '@/components/card/EnChattingListComponent.vue';
import EnChatroomComponent from '@/components/card/EnChatroomComponent.vue';
import axios from 'axios';


export default {
    data() {
        return {
            chatroomList: [],
            chatroomId: 0,
        }
    },
    methods: {
        async move(dest, projectId) {
            
            this.chatroomId = dest;

            // enter chatroom api - Concurrent Hashmap에 넣어주는 부분
            try {
                console.log(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/enter`);
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/enter`);
            } catch(e) {
                console.log(e);
            }
            this.$refs.chatroomComponent.changeRoom(this.chatroomId, projectId);
        },

    },
    components: {
        EnChattingListComponent,
        EnChatroomComponent
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