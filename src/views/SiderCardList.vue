<template>
    <v-container>
        <v-container>
            <v-row>
                <v-col cols="12" md="3" v-for="(card, index) in cards" :key="index">
                    <CardComponent :name="card.member_nickname" :jobField="card.member_jobField" :image="card.member_image"/>
                </v-col>
            </v-row>
        </v-container>
    </v-container>

</template>

<script>
import CardComponent from '@/components/siderCard/CardComponent.vue';
import axios from 'axios';

export default {
    components: {
        CardComponent
    },
    props: ['name', 'jobField', 'image'],
    data() {
        return {
            cards: []
        }
    },
    async created() {
        try {
            const token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjI5NDY1MzEsImV4cCI6MTcyNTUzODUzMX0.vP8jv4v6FcBxxNB_o6-Q8mhUjt4aZf2HjXNUZ0v5Hl0`
            const headers = { Authorization: `Bearer ${token}` }
            const response = await axios.get(`http://localhost:8080/api/sider-card/list`, {headers})
            console.log(response.data.result);
            this.cards = response.data.result.content
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        // Your methods
    }
}
</script>

<style scoped>
.fixed-card {
    width: 286px;
    /* 고정 너비 */
    height: 286px;
    /* 고정 높이 */
}

.text-center {
    text-align: center;
}

.font-weight-bold {
    font-weight: bold;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.card-avatar {
    padding-top: 20px;
    /* 이미지를 조금 더 아래로 내립니다 */
}

.card-text {
    padding-top: 20px;
    /* 텍스트를 이미지 아래로 더 내립니다 */
}

.card-avatar img {
    border-radius: 50%;
    /* 이미지를 동그랗게 만듭니다 */
}
</style>