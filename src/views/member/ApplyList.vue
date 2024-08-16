<template>
    <v-container fluid class="custom-container">
        <PageNavbar
        :menus='[
            {"menu": "내 프로젝트", "url": "/member/my-projects", "selected": true},
            {"menu": "신청 내역", "url": "/member/apply", "selected": false},
        ]'
        />
        <h2 style="text-align:center; margin: 20px;">상세 신청 내역</h2>
        <ChattingListComponent />
    </v-container>
</template>
<script>
import PageNavbar from '@/components/navbar/PageNavbar.vue';
import ChattingListComponent from '@/components/card/ChattingListComponent.vue';

export default {
    components: {
        PageNavbar,
        ChattingListComponent
    }
}   

</script>
<style scoped>
.custom-container {
    max-width: 1200px !important; /* 원하는 최대 폭 */
    margin: 0 auto !important;    /* 중앙 정렬 */
    width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
}
</style>