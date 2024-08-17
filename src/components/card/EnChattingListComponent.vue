<template>
    <v-container class="outer-box">
      <v-card class="chatting-card" variant="elevated">
          <v-card-text style="width:100%;">
              <v-container>
                <div class="chatroom-box">
                    <v-card-text v-if="this.chatroomList.length === 0">채팅 기록이 없습니다.</v-card-text>
                  <v-row
                    v-for="chatroom in chatroomList"
                    :key="chatroom.id"
                    @click="moveToOtherRoom(chatroom.chatRoomId)"
                    :class="{ 'selected': chatroom.chatRoomId === this.chatroomId }"
                    >
                      <v-col :class="{selected}" cols="12">
                        <div class="chatroom-element">
                            <div class="member-img">
                                <img class="img1" :src="chatroom.projectImage" height="100px" width="auto" overflow="hidden">
                                <img class="profile-img img2" :src="chatroom.participantProfileImageUrl" height="100px" width="auto" overflow="hidden"> 
                            </div>
                          <div class="project-content">
                            <div class="project-info">
                                <span style="margin-bottom: 10px; font-weight: bold; font-size: medium;">{{ chatroom.participantNickName}}</span>
                                <span style="font-size: small; color: gray; margin-left: 10px;" v-if="this.myId == chatroom.pmId">내 프로젝트</span>
                                <p class="unread-count-text">{{ chatroom.unreadContent }}</p>
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
            </v-card-text>
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
          chatroomId: 0,
          myId: 0,
      }
  },
  created() {
    this.myId = localStorage.getItem('id');
  },
  methods: {
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
        },
        moveToOtherRoom(dest) {
            this.chatroomId = dest;

            this.$emit("moveToOtherRoom", dest); 
        },
        selectOrNot(id) {
            if(id === this.chatroomId) {
                return "black";
            } else {
                return "#D4D4D4";
            }
        }
  },

}
</script>
<style scoped>
.selected {
    background-color: #A4DEC6;
}

.img1 {
    width: 35px;
    height: 35px;
    object-fit: cover;
    /*position: absolute; 
    top: 0px;
    left: 20px;*/
    object-fit: cover;
    border-radius: 10px;
}
.img2 {
    /*position: absolute;
    top: 20px;*/
    object-fit: cover;
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


.chatroom-element:hover {
  opacity: 0.7;
  /*filter: brightness(1.1);*/
  cursor:pointer;
  transition: 0.5s ease-out;
}

.project-info {
    width: 100%;
}


.outer-box {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0px !important;
}

.chatting-card {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0px;
    background-color: #F6F6F6;

    /*overflow-y: auto;*/
    /*overflow-x: hidden;*/
}

.chatroom-box {
    width: 100%;
    align-items: center;
}

.chatroom-element {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}



.profile-img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
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