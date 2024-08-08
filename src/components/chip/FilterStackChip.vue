<template>
<v-chip 
:color=color size="x-large" 
filter>
  <v-avatar start>
    <v-img :src=url></v-img>
  </v-avatar>
  {{ title }}
</v-chip>
</template>
<script>
export default{
    props: {
        title: String,
        color: String,
        url: String
    },

}
</script>