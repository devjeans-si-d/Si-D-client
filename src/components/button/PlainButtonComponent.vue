<template>
    <div>
        <v-btn variant="plain" v-if="!type" class="rounded-xl text-body-1 font-weight-bold">
            {{ content }}
        </v-btn>
        <v-btn variant="plain" v-else class="rounded-xl text-body-1 font-weight-bold">
            {{ content }}
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'PlainButtonComponent',
    props: ['content', 'type'],
}
</script>