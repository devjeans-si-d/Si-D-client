import LaunchedProjectList from '@/views/LaunchedProject/LaunchedProjectList.vue'
import LaunchedProjectRegister from '@/views/LaunchedProject/LaunchedProjectRegister.vue';

export const LaunchedProjectRouter = [
    {
        path:'/launched-project/list',
        name: 'LaunchedProjectList',
        component: LaunchedProjectList
    },
    {
        path:'/launched-project/register',
        name: 'LaunchedProjectRegister',
        component: LaunchedProjectRegister
    }
];