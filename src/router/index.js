import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/test/HomeComponent.vue'
import { siderCardRouter } from './siderCardRouter';
import { LaunchedProjectRouter } from './LaunchedProjectRouter';
import { memberRouter } from './memberRouter';
import LoginPage from '@/views/LoginPage.vue';
import OauthRedirect from '@/components/oauth/OauthRedirect.vue';

const routes = [
    {
        path: '/home',
        name: 'HOME',
        component: HomeComponent
    },
    {
        path: '/',
        name: 'ROOT',
        component: HomeComponent
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/oauth',
        name: 'OauthRedirect',
        component: OauthRedirect
    },
    
    
    ...siderCardRouter,
    ...LaunchedProjectRouter,
    ...memberRouter,
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router