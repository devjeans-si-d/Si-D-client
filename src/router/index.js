import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/test/HomeComponent.vue'
import { LaunchedProjectRouter } from './LaunchedProjectRouter';
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
    ...LaunchedProjectRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router