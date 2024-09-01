import LaunchedProjectEdit from '@/views/LaunchedProject/LaunchedProjectEdit.vue';
import LaunchedProjectList from '@/views/LaunchedProject/LaunchedProjectList.vue'
import LaunchedProjectRegister from '@/views/LaunchedProject/LaunchedProjectRegister.vue';
// import LaunchedProjectView from '@/views/LaunchedProject/LaunchedProjectView.vue';
import LaunchedProjectDetail from '@/views/LaunchedProject/LaunchedProjectDetail.vue';

export const LaunchedProjectRouter = [
    {
        path:'/launched-project/list',
        name: 'LaunchedProjectList',
        component: LaunchedProjectList
    },
    {
        path:'/launched-project/register/:projectId',
        name: 'LaunchedProjectRegister',
        component: LaunchedProjectRegister
    },
    {
        path:'/launched-project/:launchedProjectId/edit',
        name: 'LaunchedProjectEdit',
        component: LaunchedProjectEdit
    },
    {
        path:'/launched-project/:launchedProjectId',
        name: 'LaunchedProjectDetail',
        component: LaunchedProjectDetail
    },
];