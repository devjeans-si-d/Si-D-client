<template>
    <div>
        <p>로그인 중...</p>
    </div>
    <v-dialog v-model="this.acceptDialog" width="500px">
        <v-card class="dialog-card" style="text-align: center">
            <v-card-title>
                사이더카드 업데이트를 하면<br> 프로젝트 지원하는데 도움이 돼요!
            </v-card-title>
            <v-card-text>
                사이더카드 업데이트를 권장합니다.
            </v-card-text>
        
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="sid_btn1" text @click="later">다음에 할래요</v-btn>
                <v-btn color="sid_btn2" text @click="accept">지금 할게요</v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            acceptDialog:false,
        }
    },
    created() {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            // 백엔드로 인가 코드를 전송
            this.sendCodeToBackend(code);
        } else {
            console.error('카카오 로그인 인가 코드가 없습니다.');
        }
    },
    methods: {
        async sendCodeToBackend(code) {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/auth/login`, { code })
                console.log(response);
                const token = response.data.token;
                const id = response.data.id;
                localStorage.setItem('token', token)
                localStorage.setItem('id', id)
                if(localStorage.getItem('state') && localStorage.getItem('state')=="first"){
                    this.acceptDialog = true
                    // localStorage.setItem('state',null)
                }else{
                    window.location.href = '/'
                }
            } catch (error) {
                if (error.response.status == 401) {
                    console.log(error.response.data.status_message);
                    const social_id = error.response.data.result.social_id
                    const social_email = error.response.data.result.social_email
                    console.log(social_id, social_email);
                    window.location.href = `/signup?social_id=${social_id}&social_email=${social_email}`;

                } else {
                    console.error(error.response);
                }
            }
        },
        accept(){
            this.acceptDialog = false
            window.location.href = '/sider-card'
        },
        later(){
            this.acceptDialog = false
            window.location.href = '/'
        },
    },
}
</script>