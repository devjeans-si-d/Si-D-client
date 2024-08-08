<template>
<v-card class="sidebar" color="#F3F3F3">
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
    width: 150px;
    height: auto;
    color: #F3F3F3;
}

.sidebar-element:hover {
    font-weight: bold;
}

</style>