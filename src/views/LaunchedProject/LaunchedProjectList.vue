<template>
    <v-container>
        <h2 style="text-align:center; color:#094F08;">Launched-Project</h2>
    </v-container>

    <v-row>
        <v-col>
            <BasicChip title="전체" color="#094F08"/>
        </v-col>
        
        <v-col>
            <IconChip title="React" color="#61DAFB" icon="mdi-react"/>
        </v-col>
    </v-row>
    
</template>

<script>
import BasicChip from '@/components/chip/BasicChip.vue'
import IconChip from '@/components/chip/IconChip.vue';
export default{
    data() {
        return {
        
            
        }
    },
    components:{
        BasicChip,
        IconChip
    },
    methods:{

    }
}
</script>

<style scoped>

</style>