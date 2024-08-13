<template>
    <div class="sidebar">
    <v-container class="chatting-sidebar-container">
        <v-row>
            <v-card class="chatting-sidebar chatting-sidebar-top" color="#F3F3F3">
                
                <v-card-text class="sidebar-element">프젝이름</v-card-text>
            </v-card>  
        </v-row>
        <v-row>
            <v-card class="chatting-sidebar" color="#F3F3F3">
                <v-card-text class="sidebar-element">전체보기</v-card-text>
                <v-card-text class="sidebar-element">진행 중</v-card-text>
                <v-card-text class="sidebar-element">모집 마감</v-card-text>
            </v-card>
        </v-row>
    </v-container>
</div>

 

    
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
    </style>