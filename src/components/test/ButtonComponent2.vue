<template>
    <v-btn class="rounded-xl text-body-1 font-weight-bold" :style="{ color: '#094F08', background: '#A4DEC6' }">
        {{ content }}
    </v-btn>
    <v-btn class="rounded-xl text-body-1 font-weight-bold"
        :style="{ color: color ? color : '#094F08', background: background ? background : '#A4DEC6' }">
        {{ content }}
    </v-btn>
    <v-btn class="rounded-xl text-h6 font-weight-bold" border="" variant="flat" :style="{ color: '#094F08', background: '#A4DEC6' }">{{
        content }}</v-btn>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: ['content', 'color', 'background'],
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