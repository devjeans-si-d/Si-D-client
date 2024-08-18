<template>
<v-chip :color=color size="default">
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