import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/test/HomeComponent.vue'

import { memberRouter } from './memberRouter';

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
    ...memberRouter,
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router