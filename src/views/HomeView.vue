<script setup>

</script>

<template>
  <v-container class="mt-15">
    <v-row justify="center">
      <v-col class="text-center">
        <v-btn variant="outlined" :to="{ name: 'login' }">صفحه ورود</v-btn>
      </v-col>
      <v-col class="text-center">
        <v-btn class="bg-deep-purple" :to="{ name: 'dashboard.home' }">پنل ادمین</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>