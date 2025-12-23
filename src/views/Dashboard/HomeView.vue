<script setup>

</script>

<template>
  <v-container max-width="1785">
    <v-row justify="center">
      <v-col cols="12" sm=6 md="3">
        <v-card color="primary">
          <v-card-item>
            <div class="d-flex justify-space-between align-center pa-1">
              <v-icon icon="mdi-account-group" style="font-size: 40px"></v-icon>
              <p class="text-white text-md-h4">کاربران</p>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm=6 md="3">
        <v-card color="warning">
          <v-card-item>
            <div class="d-flex justify-space-between align-center pa-1">
              <v-icon icon="mdi-post" style="font-size: 40px"></v-icon>
              <p class="text-white text-md-h4">پست ها</p>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm=6 md="3">
        <v-card color="success">
          <v-card-item>
            <div class="d-flex justify-space-between align-center pa-1">
              <p class="text-white text-md-h4">سفارشات</p>
              <v-icon icon="mdi-cart" style="font-size: 40px"></v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm=6 md="3">
        <v-card color="info">
          <v-card-item>
            <div class="d-flex justify-space-between align-center pa-1">
              <p class="text-white text-md-h4">محصولات</p>
              <v-icon icon="mdi-cart-plus" style="font-size: 40px"></v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>