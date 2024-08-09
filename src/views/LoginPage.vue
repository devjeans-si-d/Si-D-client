<template>
    <div>LoginPage</div>
    <a :href="KAKAO_AUTH_URI"><img src="../assets/kakao_login_button.png" alt="카카오로그인"></a>
</template>

<script>
    export default{
        data(){
            return{
                KAKAO_AUTH_URI: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.VUE_APP_REST_API_KEY}&redirect_uri=http://localhost:8082/oauth`
            }
        },
        created(){

        },
        watch:{
            
        },
        updated() {

        },
        computed: {
            
        },
        methods:{
            login(){

            }
        }
    }
</script>