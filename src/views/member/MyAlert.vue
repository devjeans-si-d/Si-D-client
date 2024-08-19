<template>
    <h2 style="text-align:center; margin: 20px;">🔔 내 알림</h2>
    <div style="margin: auto; text-align:center; border-bottom: 1px solid #D4D4D4; width: 70%;">
    <br>
    </div>
<v-container class="d-flex justify-center" style="width: 50%;">

    <v-alert
        v-if="!this.exist()"
        class="d-flex justify-center"
        title="아직은 새로운 알림이 없네요!"
        type="success"
        style="opacity: 0.8;"
    ></v-alert>

    <v-alert
    color="#2A3B4D"
    density="compact"
    icon="mdi-chat"
    theme="dark"
    v-if="this.localChatCnt >= 1"
    class="chat-alert"
    >
    <p> {{this.localChatCnt}}개의 새로운 채팅이 있어요! </p>
    </v-alert>



    <p
    v-for="al in this.aList" :key="al.id">
    ddd
    </p>


</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    date() {
        return {
            aList: [],
            localChatCnt: 0,
            localAlertCnt: 0,
        }
    },
    computed: {
      ...mapGetters(['getChatCnt']),
      ...mapGetters(['getAlertCnt']),
    },
    async created() {
        this.localChatCnt = this.getChatCnt;
        this.localAlertCnt = this.getAlertCnt;

        this.$store.dispatch('updateAlertCnt', 0);
        this.$store.dispatch('updateChatCnt', 0);

        localStorage.setItem('alertCnt', 0);
        localStorage.setItem('chatCnt', 0);

        // 안읽은 알림 가져오기
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/alert`);
        this.aList = response.data;
        console.log(this.aList);
    },
    methods: {
        exist() {
            const total = this.localChatCnt + this.localAlertCnt;
            if(total >= 1) return true;
            return false;
        }
    }

}
</script>

<style scoped>
.chat-alert:hover {
    opacity: 0.8;
    transition: 0.5s ease;
}
</style>