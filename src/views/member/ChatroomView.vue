<template>
    <v-container>
        <v-card color="#F3F3F3">
            <v-text>
                <v-container>
                  <div>
                    <v-row class="chatroom-outer" v-for="chatroom in chatroomList" :key="chatroom.id" @click="spaMoveTo(chatroom.id)" >
                        <v-col cols="12">
                          <div class="chat-element">
                              <div class="member-img">
                                  <img class="profile-img" :src="chatroom.memberImage" height="100px" width="auto" overflow="hidden">
                              </div>
                          
                            <div class="project-content">
                              <div class="project-info">
                                  <h4 style="margin-bottom: 10px">{{ chatroom.memberName }}</h4>
  
                                  <p class="project-description">{{ chatroom.content }}</p>
                              </div>
                              <div class="unread-count">
                                  <span v-if="chatroom.unread >= 1">{{chatroom.unread}}</span>
                              </div>
                            </div>
    
                          </div>
                        </v-col>
                    </v-row>
                  </div>
                </v-container>
            </v-text>
        </v-card>



    </v-container>
</template>
<script>
// import axios from 'axios'

export default {
    data() {
        return {
            chatting: [
                
            ]
        }
    },
    created() {
        // axios.get()
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