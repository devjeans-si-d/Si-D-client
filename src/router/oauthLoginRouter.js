import LoginPage from '@/views/LoginPage.vue';
import OauthRedirect from '@/components/oauth/OauthRedirect.vue';
export const oauthLoginRouter = [
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
]