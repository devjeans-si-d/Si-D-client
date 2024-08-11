<template>
    <v-container class="outer-box">
      <v-card class="chatting-card" color="#F3F3F3">
          <v-text>
              <v-container>
                <div class="chatroom-box">
                    <v-text v-if="this.chatroomList.length === 0">채팅 기록이 없습니다.</v-text>
                  <v-row class="chatroom-outer" v-for="chatroom in chatroomList" :key="chatroom.id" @click="spaMoveTo(chatroom.id)" >
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
      spaMoveTo(projectId) {
          // 이동하는 코드 구현
          console.log(projectId);
        //   alert('지금은 임시로 홈으로 이동합니다..');
          this.$router.push('/member/chatroom');
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
<style>


.member-img {
  margin-right: 10px;
  width: 100px;
  height: 100px;
  background-color: black;
  text-align: center;
}

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
}

.chatting-card {
    width: 50%;
    display: flex;
    justify-content: center;

}

.chatroom-box {
    padding: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    align-items: center;
}


.chatroom-element {
    display: flex;
    justify-content: flex-start;
    padding: 15px;
    align-items: center;
}

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