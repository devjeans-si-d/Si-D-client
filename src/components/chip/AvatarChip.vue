<template>
    <v-chip
    v-bind="props"
    size="large"
    link
    pill
  >
    <v-avatar start>
      <v-img :src=url></v-img>
    </v-avatar>
    {{ name }}
  </v-chip>
</template>
<script>
export default{
    props: {
        url: String,
        name: String
    }
}
</script>