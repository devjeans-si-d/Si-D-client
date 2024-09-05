<template>
    <v-container>
        <v-row style="padding-bottom: 20px; margin-top: 5px;">
            <v-sheet class="py-4 px-1">
                <v-chip-group v-model="siderCardFilter" selected-class="text-primary" mandatory>
                    <v-chip v-for="(job, index) in jobFields" :key="index" color="#094F08" size="large"
                        filter :value="job.value">{{ job.name }}</v-chip>
                </v-chip-group>
            </v-sheet>
        </v-row>
        <v-row justify="space-around">
            <v-col style="max-width: 286px;" v-for="(card, index) in filteredCards" :key="index">
                <a style="text-decoration-line: none;" :href="`/sider-card/${card.member_id}`"><CardComponent :name="card.member_nickname" :jobField="card.member_jobField"
                    :image="card.member_image ? card.member_image : 'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'" /></a>
                <!-- <a v-if="card.member_jobField==siderCardFilter" style="text-decoration-line: none;" :href="`/sider-card/${card.member_id}`"><CardComponent :name="card.member_nickname" :jobField="card.member_jobField"
                    :image="card.member_image ? card.member_image : 'https://seho-files.s3.ap-northeast-2.amazonaws.com/3_devjeans.png'" /></a>
                     -->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CardComponent from '@/components/siderCard/CardComponent.vue';
import axios from 'axios';

export default {
    components: {
        CardComponent
    },
    data() {
        return {
            siderCardFilter:'',
            jobFields:[
                { name: '전체', value: '' },
                { name: '프론트엔드', value: 'FRONTEND' },
                { name: '백엔드', value: 'BACKEND' },
                { name: '앱', value: 'APP' },
                { name: '디자인', value: 'DESIGNER' },
                { name: 'PM', value: 'PM' },
            ],
            cards: [],
            pageSize: 20,
            currentPage: 0,
            isLoading: false,
            isLastPage: false,
        }
    },
    computed: {
        filteredCards() {
            return this.cards.filter(card => this.siderCardFilter === '' || card.member_jobField === this.siderCardFilter);
        }
    },
    created() {
        this.loadSiderCard();
    },
    updated(){
        window.addEventListener('scroll', this.scrollPagination)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.scrollPagination)
    },
    methods: {
        async loadSiderCard(){
            try {
                let params = {
                        size: this.pageSize,
                        page: this.currentPage,
                    }
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/sider-card/list`, { params })
                this.currentPage++;
                this.isLastPage = response.data.result.last
                this.cards = [...this.cards, ...response.data.result.content]
            } catch (e) {
                console.log(e);
            }
        },
        async scrollPagination() {
            // "현재화면 + 스크롤로 이동한 화면 > 전체화면 -n" 의 조건이 성립되면 추가 데이터 로드
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;
            if (isBottom && !this.isLastPage && !this.isLoading) {
                this.isLoading = true
                await this.loadSiderCard()
                this.isLoading = false
            }
        },
    }
}
</script>