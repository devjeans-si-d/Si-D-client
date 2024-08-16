<template>
    <v-container class="title-con">
        <v-row class="title-row" justify="center" md="8" sm="6">
            <v-col v-for="m in menus" :key="m.menu">
            <v-btn v-if="m.selected === false" @click="this.spaMoveTo(m.url)" variant="plain">{{m.menu}}</v-btn>
            <span v-if="m.selected === true" class="selected-menu" :href="m.url" variant="plain">{{m.menu}}</span>
            </v-col>
        </v-row>
    </v-container>

</template>
<script>
export default{
    props: [ 
        'menus' // [{'menu', 'url'}, {'menu', 'url'}, ... ]
     ],
    data() {
        return {
        }
    },
    methods: {
        spaMoveTo(destination) {
            this.$router.push(destination);
        }

    },
    created() {
        console.log(this.menus);
    }
}
</script>
<style scoped>

.title-row {
    border-bottom: 1px solid #D4D4D4;
    text-align: center;
    padding-top: 20px;
}

.selected-menu {
    color: #094F08;
    font-weight: 700;
    text-align: center;
    border-bottom: 2px solid #094F08;
    margin-bottom: 10px;
    height: 40px;
}

</style>