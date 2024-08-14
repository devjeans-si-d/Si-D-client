
<template>
    <v-container class="chatroom-container">
        <v-card variant="elevated">
            <v-text>
                <v-container class="scroll-container">
                  <div>
                    <div class="chatroom-outer" v-for="(chat, index) in chatList" :key="chat.id">
                        <div class="member-info-box">
                            <img v-if="index === 0 || chat.sender != chatList[index-1].sender" class="chat-part-image" :src="this.getMemberImage(chat.sender)" />
                            <div v-else style="width: 43px;"></div>
                        </div>
                        <div class="chat-block">
                            <div v-if="index === 0 || chat.sender != chatList[index-1].sender" class="member-name">{{this.getMemberName(chat.sender)}}</div>
                            <div>
                                <span>{{chat.content}}</span>
                                <span class="chat-createdTime">{{this.getTime(chat.createdAt)}}</span>
                            </div>
                            
                        </div>

                    </div>
                  </div>
                </v-container>
            </v-text>
        </v-card>
        <v-container class="send-container">
            <v-text-field width="400" class="chat-text-field" v-model="chatMessage"></v-text-field>
            <ButtonComponent style="margin-left: 10px" @click="sendMessage()" content="전송"/>
        </v-container>

    </v-container>
</template>
<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import axios from 'axios'

import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'



export default {
    props: [
        'chatroomId'
    ],
    components: {
        ButtonComponent
    },
    data() {
        return {
            chatList: [],
            chatMessage: "",
            stompClient: "",
            memberInfos: new Map([]),
            prevSender: 0,
        }
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}`);
        this.chatList = response.data.content;

        // 참여자 정보 얻기
        const memberInfo = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/get-member-info`);
        this.memberInfos = new Map([
            [memberInfo.data[0].memberId, memberInfo.data[0]],
            [memberInfo.data[1].memberId, memberInfo.data[1]]
        ]);
    },
    beforeMount() {
        //== 연결하는 부분 ==//
        // 방에 입장
        this.connect();
    },
    beforeUnmount() {
        this.disconnect();
    },
    methods: {
        async sendMessage() {
        
            if (this.chatMessage && this.stompClient) {

                const chatObj = {
                    chatroomId: this.chatroomId,
                    content: this.chatMessage,
                    token: localStorage.getItem('token')
                };

                this.stompClient.send("/pub/" + this.chatroomId, JSON.stringify(chatObj));
                
                this.chatMessage = "";
            }
        },
        connect() {
            if (this.stompClient && this.stompClient.connected) return;


            const socket = new SockJS(`${process.env.VUE_APP_API_BASE_URL}/chat`);
            this.stompClient = Stomp.over(socket);

            // enter chatroom api - Concurrent Hashmap에 넣어주는 부분
            axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/enter`);

            
            // 헤더에 토큰 끼워넣는 부분
            const authToken = localStorage.getItem('token');
            this.stompClient.connect({Authorization: `Bearer ${authToken}`}, () => {
                // 수신할 메시지를 구독합니다.
                this.stompClient.subscribe('/sub/chatroom/' + this.chatroomId, response => {
                    const resObj = JSON.parse(response.body);
                    this.chatList.push(resObj);
                });
            });


            socket.onclose = function() {
                console.log('WebSocket connection closed for user');
            }
        },

        disconnect() {
            return new Promise((resolve, reject) => {
                if (this.stompClient && this.stompClient.connected) {
                    this.stompClient.unsubscribe('/sub/chatroom/' + this.chatroomId);
                    try {
                        this.stompClient.disconnect(() => {
                        this.isConnected = false;
                        console.log("Disconnected from the WebSocket Connection.");
                        resolve();
                        });
                    } catch (error) {
                        console.log("Failed to disconnect: ", error);
                        reject(error);
                    }
            }
            });
        },
        getMemberName(sender) {
            return this.memberInfos?.get(sender)?.nickname;
        },
        getMemberImage(sender) {
            return this.memberInfos?.get(sender)?.profileImageUrl;
        },
        getTime(createdAt) {
            const createdTime = new Date(createdAt);
            let hour = createdTime.getHours();
            let minute = createdTime.getMinutes();
            let ampm;
            if(hour < 12) {
                ampm = '오전'
            } else {
                ampm = '오후'
                hour -= 12;
            }
            if(hour < 10) {
                hour = '0'+hour;
            }

            if(minute < 10) {
                minute = '0'+minute;
            }

            return ampm + ' ' + hour + ':' + minute;
        }
    }
}   

</script>

<style scoped>
.chatroom-outer {
    padding: 10px;
    display: flex;
}

.member-info-box {
    display: flex;
}

.member-name {
    margin-bottom: 20px;
    font-size: medium;
    font-weight: bold;
}

.chat-part-image {
    margin-top: 10px;
    width: 43px;
    height: 43px;
    min-width: 43px;
    min-height: 43px; 
    border-radius: 50%;
    overflow: hidden;
}

.chat-block {
    margin-left: 20px;
}

.chat-createdTime {
    font-size: small;
    color: gray;
    justify-self: flex-end;
}


.chatroom-card {
    width: 100%;
    height: 550px;
    background-color: #F6F6F6;
    overflow-y: auto;
    overflow-x: hidden;
}

.scroll-container {
    width: 100%;
    height: 500px;
    background-color: #F6F6F6;
    overflow-y: auto;
    overflow-x: hidden;
}


.chatroom-container {
    width: 60%;
    margin: 0px !important;
}

.send-container {
    margin: 20px;
    width: 100%;
    display: flex;
}

.chat-text-field {
    width: 50%;
    margin:0px !important;
}
</style>