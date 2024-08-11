
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
                <v-text-field v-model="chatMessage"></v-text-field>
            </v-col>
            <v-col>
                <ButtonComponent @click="sendMessage()" content="전송"/>
            </v-col>
        </v-row>

    </v-container>
</template>
<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import axios from 'axios'
import { useRoute } from 'vue-router';

import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'



export default {
    components: {
        ButtonComponent
    },
    data() {
        return {
            chatList: [],
            chatroomId: 0,
            chatMessage: "",
            stompClient: ""
        }
    },
    async created() {
        const route = useRoute();
        this.chatroomId = route.params.chatroomId;
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}`);
        console.log(response.data.content);
        this.chatList = response.data.content;
        
        

        //== 연결하는 부분 ==//
        // 방에 입장
        this.connect()
    },
    methods: {
        async sendMessage() {
        
            if (this.chatMessage && this.stompClient) {

                const chatObj = {
                    chatroomId: this.chatroomId,
                    content: this.chatMessage,
                    token: localStorage.getItem('token')
                }

;
                this.stompClient.send("/pub/" + this.chatroomId, JSON.stringify(chatObj));
                
                this.chatMessage = "";
            }
        },
        connect() {
            const socket = new SockJS(`${process.env.VUE_APP_API_BASE_URL}/chat`);
            this.stompClient = Stomp.over(socket);

            // enter chatroom api - Concurrent Hashmap에 넣어주는 부분
            axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/enter`);

            
            // 헤더에 토큰 끼워넣는 부분
            const authToken = localStorage.getItem('token');
            this.stompClient.connect({Authorization: `Bearer ${authToken}`}, () => {
                // 수신할 메시지를 구독합니다.
                this.stompClient.subscribe('/sub/chatroom/' + this.chatroomId, async function (response) {
                    console.log("line 100!!");
                    console.log(response);
                    this.addMessage(response);
                });
            });


            socket.onclose = function() {
                console.log('WebSocket connection closed for user');
            }
        },
        addMessage(message) {
            this.chatList.append(message);
        }

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