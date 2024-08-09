<template>
    <v-container class="outer-box">
      <v-card class="chatting-card" color="#F3F3F3">
          <v-text>
              <v-container>
                <div class="chatroom-box">
                  <v-row v-for="chatroom in chatroomList" :key="chatroom.id" @click="spaMoveTo(chatroom.id)" >
                      <v-col cols="12">
                        <div class="chatroom-element">
                        <div class="member-img">
                            <img :src="chatroom.memberImage" height="100px" width="auto" overflow="hidden">
                        </div>
                    
                          <div class="project-content">
                            <div class="project-info">
                                <h4 style="margin-bottom: 10px">{{ chatroom.memberName }}</h4>

                                <p class="project-description">{{ chatroom.content }}</p>
                            </div>
                            <div class="chip-wrap">
                                안녕
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
          alert('지금은 임시로 홈으로 이동합니다..');
          this.$router.push('/');
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
  justify-self: flex-end;
}

.chatroom-element:hover {
  opacity: 0.7;
  /*filter: brightness(1.1);*/
  cursor:pointer;
  transition: 0.5s ease-out;
}

.project-info {
    width: 270px;
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
    width: 80%;
    display: flex;
    justify-content: center;

}

.chatroom-box {
    padding: 30px;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    align-items: center;
}


.chatroom-element {
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid #D4D4D4;
    align-items: center;
}

.member-img {
    margin-right: 50px;
    
}

</style>