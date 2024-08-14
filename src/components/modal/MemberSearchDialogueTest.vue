<template>
    <div>
      <v-btn @click="showModalFn">멤버 검색</v-btn>
  
      <member-search-dialog-component
        :cardTitle="'멤버 추가'"
        :apiUrl="apiUrl"
        v-model:showDialog="showDialog"
        @members-fetched="handleMembersFetched"
        @selected-members="handleSelectedMembers"
      ></member-search-dialog-component>
    </div>
  </template>
  
  <script>
    import MemberSearchDialogComponent from './MemberSearchDialogComponent.vue';
  
  export default {
    components: {
        MemberSearchDialogComponent,
    },
    
    data() {
      return {
        showDialog: false,
        apiUrl: `${process.env.VUE_APP_API_BASE_URL}/api/member/list`,
      };
    },
  
    methods: {
      showModalFn() {
      this.showDialog = true;
    },
  
      handleMembersFetched(members) {
        console.log('Fetched members:', members);
      },
  
      handleSelectedMembers(selectedMembers) {
        console.log('Selected members:', selectedMembers);
      },
    }
  };
  </script>
  