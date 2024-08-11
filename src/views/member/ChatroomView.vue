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
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/1/receiver/1`);
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