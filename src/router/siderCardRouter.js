import SiderCardList from "@/views/siderCard/SiderCardList.vue"
import MySiderCard from "@/views/siderCard/MySiderCard.vue"
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
]