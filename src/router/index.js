import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/test/HomeComponent.vue'
import { siderCardRouter } from './siderCardRouter';
import { LaunchedProjectRouter } from './LaunchedProjectRouter';
import { memberRouter } from './memberRouter';
import MainPage from '@/views/MainPage/MainPage.vue';
// import MainPage3 from '@/views/MainPage/MainPage3.vue';
import { oauthLoginRouter } from './oauthLoginRouter';
import {projectRouter} from './projectRouter'

const routes = [
    {
        path: '/home',
        name: 'HOME',
        component: HomeComponent
    },
    {
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
    
    ...siderCardRouter,
    ...LaunchedProjectRouter,
    ...memberRouter,
    ...oauthLoginRouter,
    ...projectRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(){
        return { top: 0 }
    },
});

export default router