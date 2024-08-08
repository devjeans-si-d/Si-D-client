<template>
    <v-container class="title-con">
        <v-row class="title-row" justify="center" md="8" sm="6">
            <v-col cols="auto"  class="title-col"> ddd </v-col>
        </v-row>
    </v-container>

</template>
<script>
export default{
    props: [ 'title' ],
    data() {
        return {
        }
    },
    methods: {

    }
}
</script>
<style>
.title-con {
    justify-content: center;
    display: flex;

}

.title-row {
    border-bottom: 1px solid #D4D4D4;
    text-align: center;
    padding-top: 20px;
}

.title-col {
    color: #094F08;
    font-weight: 700;
    font-size: large;
    text-align: center;
    border-bottom: 2px solid #094F08;
    margin-bottom: 10px;
    height: 40px;
}
</style>