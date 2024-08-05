<template>
    <v-app>
      <v-container>
        <v-chip :color=color closable>
          {{ title }}
        </v-chip>
      </v-container>
    </v-app>
</template>
<script>

export default{
    props: {
        title: String,
        color: String
    },

}
</script>