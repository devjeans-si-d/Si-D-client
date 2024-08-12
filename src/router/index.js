import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/test/HomeComponent.vue'
import { siderCardRouter } from './siderCardRouter';
import { LaunchedProjectRouter } from './LaunchedProjectRouter';
import { memberRouter } from './memberRouter';
import MainPage from '@/views/MainPage/MainPage.vue';
import { oauthLoginRouter } from './oauthLoginRouter';

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
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router