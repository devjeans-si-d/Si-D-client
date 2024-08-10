<template>
    <v-btn v-if="!type" class="rounded-xl text-body-1 font-weight-bold"
        :style="{ color: color ? color : '#094F08', background: background ? background : '#A4DEC6' }">
        {{ content }}
    </v-btn>
    <v-btn v-else class="rounded-xl text-body-1 font-weight-bold"
        :style="{ color: color ? color : 'white', background: background ? background : '#094F08' }">
        {{ content }}
    </v-btn>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: ['content', 'color', 'background', 'type'],
}
</script>