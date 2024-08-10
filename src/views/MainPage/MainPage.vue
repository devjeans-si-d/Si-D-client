<template>
    <v-container fluid class="custom-container">
        <v-spacer :style="{height: '50px'}"></v-spacer>
        <v-img
            alt="MainPageBanner"
            src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/main_page_banner.png"
        ></v-img>

        <v-spacer :style="{height: '50px'}"></v-spacer>

        <v-container
            style="background-color: #F3F3F3; border-radius:15px;"
        >
            <v-spacer :style="{height: '20px'}"></v-spacer>
            <v-row>
                <v-img
                alt="fire1"
                src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/fire.png"
                height="50px"
                ></v-img>
                <h2 style="text-align:center;">지금 모집중인 인기공고</h2>
                <v-img
                alt="fire1"
                src="https://sejeong-file.s3.ap-northeast-2.amazonaws.com/devjeans-sid/fire.png"
                height="50px"
                ></v-img>
            </v-row>
            
        </v-container>
    </v-container>

    
</template>
<script>
export default{
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.custom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
