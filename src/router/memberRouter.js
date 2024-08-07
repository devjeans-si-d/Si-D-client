
import MyPage from '@/views/member/MyPage.vue';
import MyPageEdit from '@/views/member/MyPageEdit.vue';

export const memberRouter = [
    {
        path: '/member/mypage',
        name: 'MyPage',
        component: MyPage
    },

    {
        path: '/member/edit',
        name: 'MyPageEdit',
        component: MyPageEdit
    },

]
