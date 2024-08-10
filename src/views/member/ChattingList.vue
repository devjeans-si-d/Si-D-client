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
        :chatroomList="[
            {id:1, memberName: '대 슬 기', content: '나를 뽑아', unread: 3, memberImage: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/glasses_mandoo.jpg'}
        ]"
        />
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