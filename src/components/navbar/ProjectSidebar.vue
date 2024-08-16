<template>
<v-card class="sidebar" color="#F6F6F6" :key="this.currentMenu">
    <v-card-text
    class="sidebar-element"
    :class="{ 'selected-menu': this.currentMenu === 1 }"
    @click="changeMenu(1)"
    >전체보기</v-card-text>
    <v-card-text
    class="sidebar-element"
    :class="{ 'selected-menu': this.currentMenu === 2 }"
    @click="changeMenu(2)"
    >진행 중</v-card-text>
    <v-card-text
    class="sidebar-element"
    :class="{ 'selected-menu': this.currentMenu === 3 }"
    @click="changeMenu(3)"
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
        },
        changeMenu(menu) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!");
            this.currentMenu = menu;
            console.log(this.currentMenu);
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
    color: #094F08;
    font-size: medium;
}
</style>