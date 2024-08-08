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
    </v-container>
</template>
<script>
import PageNavbar from '@/components/navbar/PageNavbar.vue';

export default {
    components: {
        PageNavbar,
    }
}   

</script>