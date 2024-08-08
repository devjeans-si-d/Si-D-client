<template>
<v-chip :color=color>
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