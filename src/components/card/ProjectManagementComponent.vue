<template>
      <v-container>
        <v-card class="my-page-card" color="#F3F3F3">
            <v-text>
                <v-container>
                    <v-row class="item-wrap">
                    <v-col cols="8" style="margin: auto">
                    <v-simple-table class="bordered-table">
                        <tr>
                        <td class="text-center">수신용 이메일</td>
                        <td class="text-left">{{ email }} 
                        </td>
                        </tr>
                        <tr>
                        <td class="text-center">닉네임</td>
                        <td class="text-left">{{ nickname }}</td>
                        </tr>
                        <tr>
                        <td class="text-center">이름</td>
                        <td class="text-left">{{ name }}</td>
                        </tr>
                        <tr>
                            <td class="text-center">전화번호</td>
                            <td class="text-left">{{ phone }}</td>
                        </tr>

                </v-simple-table>
            </v-col>
            </v-row>
            <v-row class="item-wrap">
                <v-col cols="auto"><ButtonComponent content="이메일 변경" /></v-col>
                <v-col cols="auto"><ButtonComponent @click="moveToEdit" content="정보 수정"/></v-col>
            </v-row>
            <v-row class="item-wrap">
                    <PlainButtonComponent content="회원 탈퇴"/>
                    <PlainButtonComponent content="로그아웃"/>
            </v-row>
            </v-container>
            </v-text>
        </v-card>
      </v-container>
</template>
<script>
export default{
    props: {
        title: String,
        color: String
    },

}
</script>