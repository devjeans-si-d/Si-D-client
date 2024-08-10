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
            :projectList="[
                { projectId: 1,
                name: '안경 만두 프로젝트',
                content: '안경 만두를 찬양하는 프로젝트',
                myJob: 'Backend',
                imageUrl: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/glasses_mandoo.jpg',
                status: '승인'
                },
                { projectId: 2,
                name: '빙티 프로젝트',
                content: '빙티는 귀엽다',
                myJob: 'Frontend',
                imageUrl: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/15_Punchy+_3.jpeg',
                status: '진행 중'
                },
                { projectId: 3,
                    name: '빙티 프로젝트2',
                    content: '빙티는 왜 인기 주민이 아닌가',
                    myJob: 'PM',
                    imageUrl: 'https://sejeong-file.s3.ap-northeast-2.amazonaws.com/15_Punchy+_3.jpeg',
                    status: '마감'
                }
                
                ]"
        />
    </v-container>
</template>
<script>
import ProjectApplyComponent from '@/components/card/ProjectApplyComponent.vue';
import PageNavbar from '@/components/navbar/PageNavbar.vue';

export default {
    components: {
        PageNavbar,
        ProjectApplyComponent
    }
}   

</script>