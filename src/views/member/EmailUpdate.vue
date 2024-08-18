<template>

<!-- 로딩 모달 -->
<v-dialog v-model="loadingDialog" width="500px">
    <v-card class="dialog-card">
        <v-card-title>
            변경 중입니다..
            </v-card-title>
    
            <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="sid_btn1" text @click="alertDialog = false">확인</v-btn> -->
            </v-card-actions>
    </v-card>
</v-dialog>
    <!-- 로딩 모달 -->
<v-dialog v-model="confirmDialog" width="500px">
    <v-card class="dialog-card">
        <v-card-title>
            변경되었습니다!
            </v-card-title>
    
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="sid_btn1" text @click="moveToMyPage">확인</v-btn>
            </v-card-actions>
    </v-card>
</v-dialog>


    <!-- 실패 모달 -->
    <v-dialog v-model="alertDialog" width="500px">
        <v-card class="dialog-card">
            <v-card-title>
                😵‍💫 유효하지 않은 코드입니다.
            </v-card-title>
        
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="sid_btn1" text @click="moveToMyPage">확인</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>
<script>
import axios from 'axios';
import {useRoute} from 'vue-router';

export default {
    data() {
        return {
            loadingDialog: true,
            confirmDialog: false,
            alertDialog: false,
            code: "",
        }
    },
    methods: {
        moveToMyPage() {
            window.location.href='/member/mypage';
        }
    },
    async mounted() {
        const route = useRoute();
        this.code = route.params.code;
        try {
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/member/email-code/${this.code}`);
            this.loadingDialog = false;
            this.confirmDialog = true;
        } catch(e) {
            console.log(e);
            this.loadingDialog = false;
            this.alertDialog = true;
        }

    }
}
</script>