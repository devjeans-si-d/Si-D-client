<template>
    <div>
        <p>로그인 중...</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {

        }
    },
    mounted() {
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
                if (response.status == 401) {
                    console.log(response.data.status_message);
                    
                } else if (response.status == 200) {
                    const token = response.data.token;
                    localStorage.setItem('token', token)
                }

            } catch (error) {
                console.error(error.response.data);
            }
        },
    },
}
</script>