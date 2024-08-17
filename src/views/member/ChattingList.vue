<template>
    <v-container fluid class="custom-container">

        <h2 style="text-align:center; margin: 20px;">내 채팅</h2>
        <v-container class="chat-outer-box">
            <EnChattingListComponent 
            :chatroomList="chatroomList"
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
        EnChattingListComponent,
        EnChatroomComponent
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/list`)
        console.log(response.data.content);
        this.chatroomList = response.data.content;
    },
    // mounted() {
    //     // 요소가 렌더링된 후 스크롤을 맨 아래로 이동
    //     this.$nextTick(() => {
    //     const container = this.$refs.chatroomComponent.$el;
    //     container.scrollTop = container.scrollHeight;
    //     });
    // },
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