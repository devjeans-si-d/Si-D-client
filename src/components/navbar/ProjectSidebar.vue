<template>
<v-card class="sidebar" color="#F6F6F6">
    <v-card-text
    class="sidebar-element"
    :class="{ 'selected-menu': this.currentMenu === 1 }"
    >전체보기</v-card-text>
    <v-card-text
    class="sidebar-element"
    :class="{ 'selected-menu': this.currentMenu === 2 }"
    >진행 중</v-card-text>
    <v-card-text
    class="sidebar-element"
    :class="{ 'selected-menu': this.currentMenu === 3 }"
    >모집 마감</v-card-text>
</v-card>

</template>
<script>
export default{
    data() {
        return {
            currentMenu: 1,
        }
    },
    methods: {
        spaMoveTo(destination) {
            this.$router.push(destination);
        }
    },

}
</script>
<style scoped>

.sidebar {
    width: 18%;
    height: auto;
    text-align: center;
}

.sidebar-element:hover {
    font-weight: bold;
}

.selected-menu {
    font-weight: bold;
}
</style>