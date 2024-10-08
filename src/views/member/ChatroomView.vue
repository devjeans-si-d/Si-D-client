
<template>
    <v-container>
    <v-container class="chatroom-container">
        <v-card variant="elevated" class="chatroom-card" id="messageContainer">
            <v-card-text>
                <v-container class="scroll-container" ref="chatroomScroll">
                  <div>
                    <!-- 배너 시작 -->
                    <v-banner
                      color="deep-purple-accent-4"
                      lines="two"
                      style="border-radius: 10px; margin-bottom: 40px;"
                    >
                      <template v-slot:prepend>
                    <v-avatar size="x-large">
                        <v-img
                        :src="this.projectInfo.imageUrl"
                    ></v-img>
                    </v-avatar>
                      </template>
                      <v-banner-title>
                        {{ this.projectInfo.projectName }}에 대한 채팅의 시작이에요!
                      </v-banner-title>
                    </v-banner>
                        
                    <div class="chatroom-outer" v-for="(chat, index) in chatList" :key="chat.id">
                        <div v-if="index === 0 || this.isDifferentDay(chat.createdAt, chatList[index-1].createdAt)">
                            <div style="display: flex; align-content: center; text-align: center; margin: auto;">
                                <hr style="width: 27%; margin:auto;"><span style="margin:auto;">{{this.getDay(chat.createdAt)}}</span><hr style="width: 27%; margin:auto;">
                            </div>
                        </div>
                        <div class="chatroom-sub">
                        <div class="member-info-box">
                            <img v-if="index === 0 || chat.sender != chatList[index-1].sender" class="chat-part-image" :src="this.getMemberImage(chat.sender)" />
                            <div v-else style="width: 43px;"></div>
                        </div>
                        <div class="chat-block">

                            <div v-if="index === 0 || chat.sender != chatList[index-1].sender" style="margin-bottom: 20px;">
                                <span v-if="chat.sender != this.myId" class="member-name">{{this.getMemberName(chat.sender)}}</span>
                                <span v-if="chat.sender == this.myId" class="member-name">나</span>
                            </div>
                            <div>
                                <span>{{chat.content}}</span>
                                <span class="chat-createdTime">{{this.getTime(chat.createdAt)}}</span>
                            </div>
                            
                        </div>
                    </div>
                    </div>

                  </div>
                </v-container>
            </v-card-text>
            
        </v-card>
        <v-row class="send-container">
            <v-text-field v-on:keyup.enter="sendMessage" style="width: 90%;" class="chat-text-field" v-model="chatMessage"></v-text-field>
            <ButtonComponent style="margin-left: 10px; width:8%; min-width: 50px;" @click="sendMessage()" content="전송"/>
        </v-row>

    </v-container>
</v-container>

<!-- 모달 -->
<v-dialog v-model="alertDialog" width="500px">
    <v-card class="dialog-card">
        <v-card-title>
            ⚠️ 채팅방을 선택해주세요.
            </v-card-title>
    
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="sid_btn1" text @click="alertDialog = false">확인</v-btn>
            </v-card-actions>
    </v-card>
</v-dialog>

</template>
<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import axios from 'axios'

import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

import { useRoute } from 'vue-router';



export default {
    props: [
        'chatroomIdProp'
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
            chatroomId: 0,
            alertDialog: false,
            isVisible: true,
            myId: 0,
            projectId: 0,
            projectInfo: [],
            socket: ""
        }
    },
    async created() {
        const route = useRoute();
        this.chatroomId = route.params.chatroomId;
        this.projectId = route.params.projectId;
        this.myId = localStorage.getItem('id');
        this.scrollToBottom();

        try {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}`);
            this.chatList = response.data;

            // 참여자 정보 얻기
            const memberInfo = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/get-member-info`);
            this.memberInfos = new Map([
                [memberInfo.data[0].memberId, memberInfo.data[0]],
                [memberInfo.data[1].memberId, memberInfo.data[1]]
            ]);

            // 프로젝트 정보 얻기
            const projectRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}`);
            this.projectInfo = projectRes.data;

            this.connect();

        } catch(e) {
            console.log(e);
        }
    },
    beforeUnmount() {
        this.disconnect();
    },
    methods: {
        scrollToBottom() {
        // 메시지 목록을 감싸는 컨테이너 찾기
        const container = document.getElementById('messageContainer');
        if (container) {
            // 잠시 딜레이를 주고 스크롤을 최하단으로 이동
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100);
        }
        },
        async sendMessage() {

            if(this.chatroomId == undefined || this.chatroomId == 0) {
                this.alertDialog = true;
                return;
            }
        
            if (this.chatMessage && this.stompClient) {

                const chatObj = {
                    chatroomId: this.chatroomId,
                    content: this.chatMessage,
                    token: localStorage.getItem('token')
                };

                this.stompClient.send("/pub/" + this.chatroomId, JSON.stringify(chatObj));
                
                this.chatMessage = "";
                this.scrollToBottom();
            }
        },
        async connect() {
            if (this.stompClient && this.stompClient.connected) return;


            this.socket = new SockJS(`${process.env.VUE_APP_API_BASE_URL}/chat`);
            this.stompClient = Stomp.over(this.socket);

            // enter chatroom api - Concurrent Hashmap에 넣어주는 부분
            try {
                console.log(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/enter`);
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/enter`);
            } catch(e) {
                console.log(e);
            }
            

            
            // 헤더에 토큰 끼워넣는 부분
            const authToken = localStorage.getItem('token');
            this.stompClient.connect({Authorization: `Bearer ${authToken}`}, () => {
                // 수신할 메시지를 구독합니다.
                this.stompClient.subscribe('/sub/chatroom/' + this.chatroomId, response => {
                    this.scrollToBottom();
                    const resObj = JSON.parse(response.body);
                    this.chatList.push(resObj);
                });
            });


            this.onclose = function() {
                console.log('WebSocket connection closed for user');
            }

            this.scrollToBottom();
        },

        disconnect() {
            return new Promise((resolve, reject) => {
                if (this.stompClient && this.stompClient.connected) {
                    this.stompClient.unsubscribe('/sub/chatroom/' + this.chatroomId);
                    this.socket.close();
                    try {
                        this.stompClient.disconnect(() => {
                        this.isConnected = false;
                        // console.log("Disconnected from the WebSocket Connection.");
                        resolve();
                        });
                    } catch (error) {
                        // console.log("Failed to disconnect: ", error);
                        reject(error);
                    }
            }
            });
        },
        async changeRoom(dest, projectId) {
            this.disconnect();
            this.isVisible = false;
            this.chatroomId = dest;
            this.projectId = projectId;


            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}`);
                this.chatList = response.data;

                // 참여자 정보 얻기
                const memberInfo = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/chatroom/${this.chatroomId}/get-member-info`);
                this.memberInfos = new Map([
                    [memberInfo.data[0].memberId, memberInfo.data[0]],
                    [memberInfo.data[1].memberId, memberInfo.data[1]]
                ]);

                // 프로젝트 정보 얻기
                const projectRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/${this.projectId}`);
                this.projectInfo = projectRes.data;
                this.connect();

            } catch(e) {
                console.log(e);
            }

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
        },
        isDifferentDay(d1, d2) {
            const day1 = new Date(d1);
            const day2 = new Date(d2);


            if(day1.getFullYear() == day2.getFullYear()
            && day1.getMonth() == day2.getMonth()
            && day1.getDay() == day2.getDay()) return false;

            return true;
        },
        getDay(createdAt) {
            const createdTime = new Date(createdAt);

            return `${createdTime.getFullYear()}년 ${createdTime.getMonth() + 1}월 ${createdTime.getDate()}일`; 
        }
    }
}   

</script>

<style scoped>


.chatroom-sub {
    padding: 10px;
    display: flex;
}

.member-info-box {
    display: flex;
}

.member-name {
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
    object-fit: cover;
}

.chat-block {
    margin-left: 20px;
    width: 100%;
}

.chat-createdTime {
    font-size: small;
    color: gray;
    justify-self: flex-end;
    margin-left: 30px;
    
}


.chatroom-card {
    width: 100%;
    max-height: 300px;
    background-color: #F6F6F6;
    overflow-y: auto;
    overflow-x: auto;
}

.scroll-container {
    height: 300px;
}


.chatroom-container {
    justify-content: center;
    width: 70%;
    min-width: 700px;
}

.send-container {
    margin: 20px;
    width: 100%;
}

.chat-text-field {
    width: 50%;
    margin:0px !important;
}

.line {
    position: absolute; 
    width: 40px; 
    border-top: 3px solid black;
  }
</style>