import LaunchedProjectEdit from '@/views/LaunchedProject/LaunchedProjectEdit.vue';
import LaunchedProjectList from '@/views/LaunchedProject/LaunchedProjectList.vue'
import LaunchedProjectRegister from '@/views/LaunchedProject/LaunchedProjectRegister.vue';
import LaunchedProjectView from '@/views/LaunchedProject/LaunchedProjectView.vue';

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
        path:'/launched-project/:launchedProjectId',
        name: 'LaunchedProjectView',
        component: LaunchedProjectView
    },
    {
        path:'/launched-project/:launchedProjectId/edit',
        name: 'LaunchedProjectEdit',
        component: LaunchedProjectEdit
    },
];