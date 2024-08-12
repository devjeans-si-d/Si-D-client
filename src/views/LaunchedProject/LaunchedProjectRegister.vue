<template>
    <v-container fluid class="custom-container">
        <v-spacer :style="{height: '20px'}"></v-spacer>
        <h2 style="text-align:center; color:#094F08;">{{ project.projectName }}</h2>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            project: {
                projectName: "수상한안경만두 프로젝트",
                projectMembers: ""  // 필드 이름 수정
            }
        };
    }
};
</script>

<style scoped>
    .custom-container {
    max-width: 1200px !important; /* 원하는 최대 폭 */
    margin: 0 auto !important;    /* 중앙 정렬 */
    width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
    }
</style>
