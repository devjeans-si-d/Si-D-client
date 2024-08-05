<template>
    <v-btn class="rounded-xl text-body-1 font-weight-bold" :style="{ color: '#094F08', background: '#A4DEC6' }">
        {{ content }}
    </v-btn>
    <v-btn class="rounded-xl text-body-1 font-weight-bold" :style="{ color: 'white', background: '#094F08' }">
        {{ content }}
    </v-btn>
    <v-btn class="rounded-xl text-h6 font-weight-bold" variant="flat" :style="{ color: '#094F08' }">{{
        content }}</v-btn>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: ['content'],
    data() {
        return {

        }
    },
    watch: {

    },
    updated() {

    },
    computed: {

    },
    methods: {

    }
}
</script>