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
              class="py-3 bg-deep-purple-lighten-5"
              variant="flat"
              prepend-avatar="https://avatars.githubusercontent.com/u/26341440?v=4&quot"
              subtitle="مدیر سایت"
              title="توفیق حمزه ئی"
          ></v-list-item>
        </v-list>
        <v-list
            density="compact"
            nav
        >
          <v-list-item prepend-icon="mdi-view-dashboard" value="داشبورد">
            <v-list-item-title class="text-body-1 font-weight-regular">
              داشبورد
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="px-3 pb-5">
            <v-btn block variant="elevated" class="bg-grey-darken-4">
              خروج
            </v-btn>
          </div>
        </template>
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