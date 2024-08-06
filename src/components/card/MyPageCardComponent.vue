<template>
    <v-flex xs12 sm6 offset-sm3>
    <v-container>
       
        <v-card width="80%">
            <v-text>
                <v-container>
                    <v-row>
                    <v-col cols="8" style="margin: auto">
                    <v-simple-table class="bordered-table">
                        <tr>
                        <td class="text-center">수신용 이메일</td>
                        <td class="text-left">{{ email }}</td>
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
                            <td class="text-center">커리어 카드 ID</td>
                            <td class="text-left">{{ careerCardId }}</td>
                        </tr>
                        <tr>
                            <td class="text-center">전화번호</td>
                            <td class="text-left">{{ phone }}</td>
                        </tr>

                </v-simple-table>
            </v-col>
            </v-row>
            <v-row>
                
            </v-row>
            </v-container>
            </v-text>
        </v-card>
    </v-container>
</v-flex>
  </template>


  
  <script>
  export default {
    data() {
        return {
            email: "default@devjeans.com",
            nickname: "야수의 심장",
            name: "김땡땡",
            careerCardId: "hypedev",
            phone: "010-1234-5678"
        }
    }
  }
  </script>
  
  <style>
  /* 중앙 정렬을 위한 스타일 */
  .text-center {
    text-align: center;
    width: 300px;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  
  .text-center {
    text-align: left;
    width: 300px;
    padding-bottom: 10px;
    padding-top: 10px;
  }

  .bordered-table th,
  .bordered-table td {
    border-bottom: 1px solid black;
  }
  
  /* 열 너비 스타일 */
  .column-width {
    width: 1000px; /* 원하는 너비로 설정 */
  }
  </style>
  