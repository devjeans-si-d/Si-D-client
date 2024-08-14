<template>
    <v-dialog v-model="internalDialog" max-width="400px" rounded="xl">
      <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-autocomplete
          v-model="selectedPerson"
          :items="searchResults"
          :loading="loading"
          item-text="name"
          item-value="id"
          label="Search"
          hide-no-data
          hide-details
          @input="onSearch"
        ></v-autocomplete>
        <v-card-actions>
          <v-row justify="center">
            <v-btn
              rounded="xl"
              variant="flat"
              density="default"
              color="#A4DEC6"
              :style="{ color: '#FFFFFF' }"
              @click="confirm"
            >확인</v-btn>
            <v-btn
              rounded="xl"
              variant="flat"
              density="default"
              color="#808080"
              :style="{ color: '#FFFFFF' }"
              @click="closeDialog"
            >취소</v-btn>
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
      onConfirm: {
        type: Function,
        required: false,
        default: null,
      },
    },
    data() {
      return {
        internalDialog: this.showDialog,
        searchValue: '',
        searchResults: [],
        selectedPerson: null,
        loading: false,
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
        if (this.selectedPerson) {
          this.addPerson(this.selectedPerson);
        }
        this.internalDialog = false;
      },
      closeDialog() {
        this.internalDialog = false;
      },
      async onSearch(query) {
        if (query.length < 3) {
          this.searchResults = [];
          return;
        }
        this.loading = true;
        try {
          const response = await fetch(`https://api.example.com/search?query=${query}`);
          const data = await response.json();
          this.searchResults = data.results;
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          this.loading = false;
        }
      },
      async addPerson(personId) {
        try {
          const response = await fetch('https://api.example.com/add-person', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ personId }),
          });
          if (!response.ok) {
            throw new Error("Failed to add person");
          }
          const data = await response.json();
          if (this.onConfirm) {
            this.onConfirm(data);
          }
        } catch (error) {
          console.error("Error adding person:", error);
        }
      },
    },
  };
  </script>
  