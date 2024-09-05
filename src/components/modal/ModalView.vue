<template>
    <v-container>
        <v-btn @click="showModalFn">모달 열기</v-btn>
        <ModalComponent
          v-model:showDialog="showDialog"
          title="모달 제목"
          content="모달 내용"
          :onConfirm="handleConfirm"
        />
      </v-container>
</template>
<script>
import ModalComponent from '@/components/modal/ModalComponent.vue';
export default {
  components: {
    ModalComponent
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    showModalFn() {
      this.showDialog = true;
    },
    handleConfirm() {
      // 추가적인 로직을 여기서 처리
      this.showDialog = false;
    }
  }
};
</script>