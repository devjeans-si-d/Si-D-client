<template>
    <v-card class="rounded-xl fixed-card d-flex flex-column align-center justify-center">
        <v-card-item class="card-avatar">
            <v-avatar class="mx-auto" size="120">
                <img :src="image" alt="Profile Image" style="height:120px; width:120px; object-fit: cover;"/>
            </v-avatar>
        </v-card-item>
        <v-card-item class="card-text">
            <v-card-title class="d-flex justify-center align-center" style="font-weight: bold;">
                {{ name }}
            </v-card-title>
            <v-card-subtitle class="d-flex justify-center align-center" style="font-size: 18px;">
                {{ jobField }}
            </v-card-subtitle>
        </v-card-item>
    </v-card>
</template>

<script>
export default {
    props: ['name', 'jobField', 'image'],
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
.fixed-card {
    width: 250px;
    /* 고정 너비 */
    height: 250px;
    /* 고정 높이 */
}

.text-center {
    text-align: center;
}

.font-weight-bold {
    font-weight: bold;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.card-avatar {
    padding-top: 0px;
    /* 이미지를 조금 더 아래로 내립니다 */
}

.card-text {
    padding-top: 10px;
    /* 텍스트를 이미지 아래로 더 내립니다 */
}

.card-avatar img {
    border-radius: 50%;
    /* 이미지를 동그랗게 만듭니다 */
}
</style>