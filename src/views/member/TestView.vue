<template>
<v-container>

</v-container>
</template>

<script>
const token = localStorage.getItem('token');

if(token == null) {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjIxNTMyNzcsImV4cCI6MTcyNDc0NTI3N30.mmOd-DSfAduSTWuTh5HdewBDP6dez2afR7RvvfDF8jE");
}

</script>