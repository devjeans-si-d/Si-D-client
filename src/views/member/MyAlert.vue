<template>

    <h2 style="text-align:center; margin: 20px;">🔔 내 알림</h2>
    <div style="margin: auto; text-align:center; border-bottom: 1px solid #D4D4D4; width: 70%;">
    <br>
    </div>
<v-container style="width: 50%;">
        <v-alert
        v-if="this.aList.length == 0"
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
        class="d-flex justify-center chat-alert"
        @click="this.$router.push('/member/chatting-list');"
        v-if="this.localChatCnt >= 1"
        >
        <p> {{this.localChatCnt}}개의 새로운 채팅이 있어요! </p>
        </v-alert>

        <div v-for="al in this.aList" :key="al.id">
        <v-alert
        border="top"
        type="warning"
        variant="outlined"
        class="d-flex justify-center"
        v-if="al.isRead == 'N'"
        >
        <p> {{ al.title }} </p>
        <p> {{ al.content }} </p>
        <p> {{ al.createdAt }} </p>
        </v-alert>


        <v-alert
        style="margin-top: 10px;"
        color="#2A3B4D"
        density="compact"
        icon="mdi-firework"
        type="info"
        variant="tonal"
        class="d-flex justify-center"
        v-if="al.isRead == 'Y'"
        >
        <p style="font-weight: bold;"> {{ al.title }} </p>
        <p> {{ al.content }} </p>
        <p style="color: gray; font-size: small"> {{ getDay(al.createdAt)}} {{ getTime(al.createdAt) }} </p>
    </v-alert>
        </div>
</v-container>

</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    data() {
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
    },
    methods: {
        exist() {
            const total = this.localChatCnt + this.localAlertCnt;
            if(total >= 1) return true;
            return false;
        },
        getTime(createdAt) {
            const createdTime = new Date(createdAt);
            let hour = createdTime.getHours();
            let minute = createdTime.getMinutes();
            let ampm;
            if(hour < 12) {
                ampm = '오전'
            } else {
                ampm = '오후'
                hour -= 12;
            }
            if(hour < 10) {
                hour = '0'+hour;
            }

            if(minute < 10) {
                minute = '0'+minute;
            }

            return ampm + ' ' + hour + ':' + minute;
        },
        getDay(createdAt) {
            const createdTime = new Date(createdAt);

            return `${createdTime.getFullYear()}년 ${createdTime.getMonth()+1}월 ${createdTime.getDate()}일`; 
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