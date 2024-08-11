<template>
    <v-container>
        <PageNavbar
        :menus='[
            {"menu": "내 정보", "url": "/member/mypage", "selected": false},
            {"menu": "내 채팅", "url": "/member/chatting-list", "selected": false},
            {"menu": "내 프로젝트", "url": "/member/my-projects", "selected": false},
            {"menu": "신청 내역", "url": "/member/apply", "selected": true},
            {"menu": "스크랩", "url": "/member/scrap", "selected": false},
        ]'
        />
        <h2 style="text-align:center; margin: 20px;">신청 내역</h2>
        <ProjectApplyComponent 
            :projectList="projectList"
        />
    </v-container>
</template>
<script>
import ProjectApplyComponent from '@/components/card/ProjectApplyComponent.vue';
import PageNavbar from '@/components/navbar/PageNavbar.vue';
import axios from 'axios'

export default {
    components: {
        PageNavbar,
        ProjectApplyComponent
    },
    data() {
        return {
            projectList: []
        }
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-applications`);
        this.projectList = response.data.content;
        console.log(this.projectList);
    }
}   

</script>