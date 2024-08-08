<template>
      <v-container>
        <v-card class="my-page-card" color="#F3F3F3">
            <v-text>
                <v-container>
                    <v-row v-for="project in projectList" :key="project.name">
                        <v-col>
                            <img :src="project.imageUrl" width="400px">
                        </v-col>
                        <v-col>
                            <p>{{project.name}}</p>
                        </v-col>
                    </v-row>
                </v-container>
            </v-text>
        </v-card>
      </v-container>
</template>
<script>
export default{
    props: ['projectList'],
    data() {
        return {
            // project
        }
    },
    created() {
        console.log(this.projectList);
    }

}
</script>