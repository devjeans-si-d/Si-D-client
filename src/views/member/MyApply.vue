<template>
    <v-container fluid class="custom-container">
        <PageNavbar
        :menus='[
            {"menu": "내 정보", "url": "/member/mypage", "selected": false},
            {"menu": "신청 내역", "url": "/member/apply", "selected": true},
            {"menu": "스크랩한 프로젝트", "url": "/member/scrap", "selected": false},
        ]'
        />
        <h2 style="text-align:center; margin: 20px;">🍀 신청 내역</h2>
        <ProjectApplyComponent 
            :projectList="projectList"
            :key="currentPage"
            ref="myApplyComponent"
        />

        <!-- 페이지네이션 -->
        <div class="text-center self-center">
            <v-container>
            <v-row justify="center">
                <v-col cols="8">
                <v-container class="max-width">
                    <v-pagination
                    v-model="currentPage"
                    :length="totalPage"
                    total-visible="100"></v-pagination>
                </v-container>
                </v-col>
            </v-row>
            </v-container>
        </div>
    </v-container>
</template>
<script>
import ProjectApplyComponent from '@/components/card/ProjectApplyComponent.vue';
import PageNavbar from '@/components/navbar/PageNavbar.vue';
import axios from 'axios'

export default {
    components: {
        PageNavbar,
        ProjectApplyComponent
    },
    data() {
        return {
            projectList: [],
            totalPage: 0,
            currentPage: 0,
        }
    },
    methods: {
        async onPageChange() {
            try {
                const params = {
                    size: 3,
                    page: this.currentPage-1
                }
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-applications`, { params });
                this.projectList = response.data.content;
                console.log("line 62: ");
                console.log(this.currentPage);
                console.log(response);
            } catch(e) {
            console.log(e);
          }
          console.log(this.currentPage - 1);
          this.$refs.myApplyComponent.changePage(this.currentPage);
        },


    },
    watch: {
      currentPage() {
        this.onPageChange(this.currentPage);
      },
    },
    async created() {
        const params = {
            size: 3
        }
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/project/my-applications`, { params });
        this.projectList = response.data.content;
        this.totalPage = response.data.totalPages;
    }
}   

</script>
<style scoped>
.custom-container {
    max-width: 1200px !important; /* 원하는 최대 폭 */
    margin: 0 auto !important;    /* 중앙 정렬 */
    width: 100% !important; /* 컨테이너의 폭을 100%로 설정 */
}

.self-center {
    margin: auto;
}
</style>