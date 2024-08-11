
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

        <v-row>
            <v-col>
                <v-text-field></v-text-field>
            </v-col>
            <v-col>
                <ButtonComponent content="전송"/>
            </v-col>
        </v-row>

    </v-container>
</template>
<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import axios from 'axios'
import { useRoute } from 'vue-router';



export default {
    components: {
        ButtonComponent
    },
    data() {
        return {
            chatList: [],
            chatroomId: 0
        }
    },
    async created() {
        const route = useRoute();
        this.chatroomId = route.params.chatroomId;
        
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/receiver/4`);
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