<template>
    <v-container>
        <v-alert
        color="#2A3B4D"
        density="compact"
        icon="mdi-firework"
        theme="dark"
        v-if="this.alertCnt >= 1"
      >
        {{this.alertCnt}}개의 새로운 채팅이 있어요!
      </v-alert>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            alertCnt: 0,
        }
    },
    created() {
        this.alertCnt = Number(localStorage.getItem('chat'));
        localStorage.setItem('chat', '0');
    },

}
</script>