
import MyPage from '@/views/member/MyPage.vue';

import ChattingList from '@/views/member/ChattingList.vue';

import MyPageEdit from '@/views/member/MyPageEdit.vue';


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

]
