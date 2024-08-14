<template>
    <v-container class="outer-box">
      <v-card class="chatting-card" variant="elevated">
          <v-text>
              <v-container>
                <div class="chatroom-box">
                    <v-text v-if="this.chatroomList.length === 0">채팅 기록이 없습니다.</v-text>
                  <v-row class="chatroom-outer" v-for="chatroom in chatroomList" :key="chatroom.id" @click="changeChatroom(chatroom.chatRoomId)" >
                      <v-col cols="12">
                        <div class="chatroom-element">
                            <div class="member-img">
                                <img class="profile-img" :src="chatroom.participantProfileImageUrl" height="100px" width="auto" overflow="hidden">
                            </div>
                        
                          <div class="project-content">
                            <div class="project-info">
                                <h4 style="margin-bottom: 10px">{{ chatroom.participantNickName}}</h4>

                                <p class="project-description">{{ chatroom.unreadContent }}</p>
                            </div>
                            <div v-if="chatroom.unreadCount >= 1" class="unread-count">
                                <span>{{chatroom.unreadCount}}</span>
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
export default{
  props: ['chatroomList'],
  components: {

  },
  data() {
      return {
          
      }
  },
  methods: {
      changeChatroom(chatroomId) {
          this.$router.push(`/member/chatroom/${chatroomId}`);
      },
      getChipColor(title) {
            if(title === '승인') {
                return 'sid_btn2';
            } else if(title === '마감') {
                return '#F15F5F';
            } else {
                return '#5D5D5D';
            }
        },
        getJobColor(job) {
            if(job === 'Backend') {
                return 'be_blue';
            } else if(job === 'Frontend') {
                return 'fe_yellow';
            } else if(job === 'PM') {
                return 'pm_green';
            } else if(job === 'AOS') {
                return 'app_red';
            } else if(job === 'iOS') {
                return 'app_red';
            } else if(job === 'Designer') {
                return 'de_purple';
            } else {
                return 'white';
            }
        }
  },
  created() {
      console.log(this.projectList);
  }

}
</script>
<style scoped>


.project-content {
  margin: 10px;
  display: flex;
}

.project-description {
  margin-top: 3px;
  font-size: 12px;
  color: #5D5D5D;
}

.chip-wrap {
  margin-top: 10px;
}

.chatroom-element:hover {
  opacity: 0.7;
  /*filter: brightness(1.1);*/
  cursor:pointer;
  transition: 0.5s ease-out;
}

.project-info {
    width: 100%;
}

.project-status {
    margin-right: 10px;
    display: flex;
    justify-content: end;
    justify-self: end;
    width: 20px;
}

.outer-box {
    display: flex;
    justify-content: center;
    width: 40%;
    margin: 0px !important;
}

.chatting-card {
    width: 100%;
    height: 500px; /* TODO: 채팅방 컴포넌트 채팅 바까지해서 60으로 맞춰야함*/
    display: flex;
    justify-content: center;
    margin: 0px;
    background-color: #F6F6F6;
    /*overflow-y: auto;*/
    /*overflow-x: hidden;*/
}

.chatroom-box {
    align-items: center;
}

.chatroom-element {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.member-img {
    width: 43px;
    height: 43px;
    min-width: 43px;
    min-height: 43px; 
    border-radius: 50%;
    object-fit: cover;
}

.profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
} 

.chatroom-outer {
    border-bottom: 1px solid #D4D4D4;
}

.unread-count {
    justify-self: flex-end;
    background-color: rgb(218, 69, 69);
    color: white;
    width: 30px;
    height: 30px;
    text-align: center;
    align-content: center;
    border-radius: 20px;
}

</style>