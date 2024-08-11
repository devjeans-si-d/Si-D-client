<template>
<v-chip class="mx-2"  :color=color size="large" filter>
  <v-avatar start class="custom-avatar">
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
<style>
.custom-avatar img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>