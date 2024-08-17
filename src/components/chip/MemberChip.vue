<template>
  <v-chip
    v-bind="props"
    size="x-large"
    link
    pill
    @click="navigateToSiderCard"
  >
    <v-avatar start>
      <v-img :src="url"></v-img>
    </v-avatar>
    {{ name }}
  </v-chip>
</template>

<script>
export default {
  props: {
    url: String,
    name: String,
    memberId: Number // memberId를 prop으로 추가합니다
  },
  methods: {
    navigateToSiderCard() {
      this.$emit('navigate', this.memberId); // 클릭 시 이벤트를 emit합니다
    }
  }
}
</script>
