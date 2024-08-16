<template>
    <div class="sidebar">
    <v-container class="chatting-sidebar-container">
        <!-- <v-row>
            <v-card class="chatting-sidebar chatting-sidebar-top" color="#F3F3F3">
                
                <v-card-text class="sidebar-element">프젝이름</v-card-text>
            </v-card>  
        </v-row> -->
        <v-row>
            <v-card class="chatting-sidebar" color="#F3F3F3" :key="this.currentMenu" @click="changeMenu(4)">
                <p
                class="sidebar-element"
                :class="{ 'selected-menu': this.currentMenu === 1 }"
                @click="changeMenu(1)"
                >전체보기</p>
                <p
                class="sidebar-element"
                :class="{ 'selected-menu': this.currentMenu === 2 }"
                @click="changeMenu(2)"
                >진행 중</p>
                <p
                class="sidebar-element"
                :class="{ 'selected-menu': this.currentMenu === 3 }"
                @click="changeMenu(3)"
                >모집 마감</p>
            </v-card>
        </v-row>
    </v-container>
</div>
    
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
    created() {
        console.log(this.menus);
    },
}
</script>
<style scoped>

.chatting-sidebar-top {
    color: #F3F3F3;
    text-align: center;
    margin-bottom: 20px;
    width: 100%;
}

.chatting-sidebar {
    color: #F3F3F3;
    text-align: center;
    width: 100%;
}

.sidebar-element:hover {
    font-weight: bold;
}

.chatting-sidebar-container {
    width: 18%;
}

.sidebar {
    width: 18%;
    height: auto;
    color: #F3F3F3;
    text-align: center;
}

.selected-menu {
    font-weight: bold;
    background-color: red;
}
</style>