<script setup>
import { ref, watch } from 'vue';

const drawer = ref(true);
</script>

<template>
  <v-app>
    <v-main min-height="100vh">
      <v-navigation-drawer location="right" v-model="drawer">
        <v-list class="pt-0">
          <v-list-item
              class="py-3 bg-deep-purple-lighten-4"
              variant="tonal"
              prepend-avatar="https://avatars.githubusercontent.com/u/26341440?v=4&quot"
              subtitle="مدیر سایت"
              title="توفیق حمزه ئی"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar scroll-threshold="439" color="primary">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>پنل ادمین وب آموز</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-account"></v-btn>
        </template>
      </v-app-bar>
      <router-view/>
      <v-footer class="justify-center py-4" color="primary" app>
        <p>تمامی حقوق این سایت محفوظ میباشد.</p>
      </v-footer>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>