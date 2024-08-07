
import MyPage from '@/views/member/MyPage.vue';
import ChattingList from '@/views/member/ChattingList.vue';

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

]
