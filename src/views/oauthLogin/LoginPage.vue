<template>
    <v-container>
        <v-row justify="center" :style="{marginTop:'200px'}">
                <a :href="KAKAO_AUTH_URI"><img src="@/assets/kakao_login_button.png" alt="카카오로그인"></a>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            KAKAO_AUTH_URI: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.VUE_APP_REST_API_KEY}&redirect_uri=https://server.si-d.site/oauth`
        }
    },
    created() {

    },
    watch: {

    },
    updated() {

    },
    computed: {

    },
    methods: {
        login() {

        }
    }
}
</script>