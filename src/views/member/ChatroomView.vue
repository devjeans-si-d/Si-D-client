<template>
    <v-container>
        <v-card color="#F3F3F3">
            <v-text>
                <v-container>
                  <div>
                    <v-row class="chatroom-outer" v-for="chat in chatList" :key="chat.id" >
                        <v-col cols="12">
                            <div>{{chat.content}}</div>
                        </v-col>
                    </v-row>
                  </div>
                </v-container>
            </v-text>
        </v-card>



    </v-container>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            chatList: []
        }
    },
    async created() {
        // TODO: 월요일에 인터셉터로 대체
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjIxNTMyNzcsImV4cCI6MTcyNDc0NTI3N30.mmOd-DSfAduSTWuTh5HdewBDP6dez2afR7RvvfDF8jE'
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/1/receiver/1`, { headers })
        console.log(response.data.content);
        this.chatList = response.data.content;
    }
}   

</script>

<style>

.member-img {
    margin-right: 50px;
    width: 100px;
    height: 100px; 
    border-radius: 70%;
    overflow: hidden;
}

.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}   

</style>