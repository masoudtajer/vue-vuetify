<script setup>
import { ref } from 'vue'
import {useRouter} from "vue-router";

const router = useRouter();

const rules = {
  required: value => !!value || 'فیلد رمز عبور الزامیست',
  min: v => v.length >= 8 || 'طول رمز عبور نباید کمتر از 8 کاراکتر باشد',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'یک ایمیل درست را وارد کنید'
  },
}

const showPassword = ref(false);
const email = ref(null);
const password = ref(null);
const loading = ref(false);
const isFormValidated = ref(false);

const login = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    router.push({ name: 'dashboard.home' })
  }, 1000);
}
</script>

<template>
  <v-card :loading="loading" width="500" class="pt-2">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
          :active="isActive"
          color="primary"
          height="4"
          indeterminate
      ></v-progress-linear>
    </template>
    <v-card-title>
      فرم ورود
    </v-card-title>
    <v-form @submit.prevent="login" v-model="isFormValidated">
      <v-card-text class="pb-0 pt-2">
        <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="ایمیل"
            prepend-icon="mdi-email"
            variant="outlined"
        ></v-text-field>
        <v-text-field
            v-model="password"
            :prepend-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            class="mt-3"
            label="رمز عبور"
            variant="outlined"
            @click:prepend="showPassword = !showPassword"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!isFormValidated || loading" :loading="loading" color="primary" variant="elevated" type="submit">ارسال فرم</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<style scoped>

</style>