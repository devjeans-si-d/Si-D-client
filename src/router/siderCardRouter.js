import SiderCardList from "@/views/siderCard/SiderCardList.vue"
import MySiderCard from "@/views/siderCard/MySiderCard.vue"
import SiderCard from "@/views/siderCard/SiderCard.vue"
export const siderCardRouter = [
    {
        path: '/sider-card/list',
        name: 'SiderCardList',
        component: SiderCardList
    },
    {
        path: '/sider-card',
        name: 'MySiderCard',
        component: MySiderCard
    },
    {
        path: '/sider-card/:id',
        name: 'SiderCard',
        component: SiderCard,
        props: true
    },
]