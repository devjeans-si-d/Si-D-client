<template>
<v-chip :color=color size="x-large">
  <v-icon :icon=icon start></v-icon>
  {{ title }}
</v-chip>
</template>
<script>
export default{
    props: {
        title: String,
        color: String,
        icon:String
    },

}
</script>