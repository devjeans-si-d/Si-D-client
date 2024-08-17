
import MyPage from '@/views/member/MyPage.vue';
import ApplyManagement from '@/views/member/ApplyManagement.vue';
import ChattingList from '@/views/member/ChattingList.vue';
import MyPageEdit from '@/views/member/MyPageEdit.vue';
import MyProject from '@/views/member/MyProject.vue';
import MyApply from '@/views/member/MyApply.vue';
import MyScrap from '@/views/member/MyScrap.vue';
import ChatroomView from '@/views/member/ChatroomView.vue';
import EmailUpdate from '@/views/member/EmailUpdate.vue';
// import TestView from '@/views/member/TestView.vue';


export const memberRouter = [
    {
        path: '/member/mypage',
        name: 'MyPage',
        component: MyPage
    },
    {
        path: '/member/chatting-list',
        name: 'ChattingList',
        component: ChattingList
    },

    {
        path: '/member/edit',
        name: 'MyPageEdit',
        component: MyPageEdit
    },
    {
        path: '/member/my-projects',
        name: 'MyProject',
        component: MyProject
    },
    {
        path: '/member/apply',
        name: 'MyApply',
        component: MyApply
    },
    {
        path: '/member/scrap',
        name: 'MyScrap',
        component: MyScrap
    },
    {
        path: '/member/project/apply/:projectId', // TODO: project id 추가 필요
        name: 'ApplyManagement',
        component: ApplyManagement
    },
    {
        path: '/member/chatroom/:chatroomId',
        name: 'ChatroomView',
        component: ChatroomView,
    },
    // {
    //     path: '/member/test',
    //     name: 'TestView',
    //     component: TestView
    // }
    {
        path: '/member/email-code/:code',
        name: 'EmailUpdate',
        component: EmailUpdate
    }
]
