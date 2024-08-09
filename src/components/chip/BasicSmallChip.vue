<template>

    <v-chip :color=color size="x-small">
      {{ title }}
    </v-chip>
    
    </template>
    <script>
    export default{
        props: {
            title: String,
            color: String
        },
    
    }
    </script>