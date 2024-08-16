<template>
<v-card class="sidebar" color="#F6F6F6">
    <v-card-text class="sidebar-element">전체보기</v-card-text>
    <v-card-text class="sidebar-element">진행 중</v-card-text>
    <v-card-text class="sidebar-element">모집 마감</v-card-text>
</v-card>

</template>
<script>
export default{
    data() {
        return {
        }
    },
    methods: {
        spaMoveTo(destination) {
            this.$router.push(destination);
        }

    },
    created() {
        console.log(this.menus);
    }
}
</script>
<style>

.sidebar {
    width: 18%;
    height: auto;
    text-align: center;
}

.sidebar-element:hover {
    font-weight: bold;
}

</style>