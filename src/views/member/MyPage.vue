<template>
    <v-container class="v-con">
        <v-row>
            <v-col>
                <h2>회원 정보 변경</h2>
            </v-col>
        </v-row>
    </v-container>
    <v-container class="v-con">
        <v-row class="flex-row">
            <v-col><MyPageCardComponent /></v-col>
        </v-row>
    </v-container>
</template>

<script>
import MyPageCardComponent from '@/components/card/MyPageCardComponent.vue';

export default {
    components: {
        MyPageCardComponent
    },
    data() {

    },
    methods: {

    }
}
</script>
<style>
.flex-wrap {
    display: flex;
    margin: auto;
}

.flex-container {
    display: flex;
    align-items: center;
    margin: auto;
}
.flex-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}
.v-con {
    text-align: center;
    width: 300px;
    padding-bottom: 10px;
    padding-top: 10px;
  }
</style>