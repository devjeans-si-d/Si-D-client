<template>
    <div>LoginPage</div>
    <button @click="login"><img src="../assets/kakao_login_button.png" alt="카카오로그인"></button><br>
    <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=f1a9f25e347069f2e5fedb6375c0b82d&redirect_uri=http://localhost:8080/api/auth/kakao/callback"><img src="../assets/kakao_login_button.png" alt="카카오로그인"></a>
</template>

<script>
    export default{
        data(){
            return{
                
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
                window.location.href = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=f1a9f25e347069f2e5fedb6375c0b82d&redirect_uri=http://localhost:8080/api/auth/kakao/callback"
                const code = new URL(document.location.toString()).searchParams.get('code');
                console.log("code: ",code);
                
            }
        }
    }
</script>