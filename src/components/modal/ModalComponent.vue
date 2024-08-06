<template>
  <v-dialog v-model="internalDialog" max-width="400px" rounded="xl" class="m">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>{{ content }}</v-card-text>
      <v-card-actions>
        <v-row justify="center">
          <v-btn
            rounded="xl"
            variant="flat"
            density="default"
            color="#A4DEC6"
            :style="{ color: '#FFFFFF' }"
            @click="confirm"
            >확인</v-btn
          >
          <v-btn
            rounded="xl"
            variant="flat"
            density="default"
            color="#808080"
            :style="{ color: '#FFFFFF' }"
            @click="closeDialog"
            >취소</v-btn
          >
        </v-row>
      </v-card-actions>
      <v-divider class="mt-2 mb-10"></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "제목 없음",
      required: false,
    },
    content: {
      type: String,
      default: "내용 없음",
    },
    onConfirm: {
      type: Function,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      internalDialog: this.showDialog,
    };
  },
  watch: {
    showDialog(newVal) {
      this.internalDialog = newVal;
    },
    internalDialog(newVal) {
      this.$emit("update:showDialog", newVal);
    },
  },
  methods: {
    confirm() {
      if (this.onConfirm) {
        this.onConfirm();
      }
      this.internalDialog = false;
    },
    closeDialog() {
      this.internalDialog = false;
    },
  },
};
</script>
