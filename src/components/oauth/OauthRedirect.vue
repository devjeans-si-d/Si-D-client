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
    created() {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');
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

                window.location.href = '/'
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
    },
}
</script>