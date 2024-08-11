import LoginPage from '@/views/oauthLogin/LoginPage.vue';
import OauthRedirect from '@/components/oauth/OauthRedirect.vue';
import SignUpPage from '@/views/oauthLogin/SignUpPage.vue';
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
    {
        path: '/signup',
        name: 'SignUpPage',
        component: SignUpPage
    },
]