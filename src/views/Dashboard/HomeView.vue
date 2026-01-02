<script setup>
import {onMounted, ref, shallowRef, toRef} from 'vue'

const search = ref('');

function createNewRecord() {
  return {
    name: '',
    email: '',
    username: '',
    gender: '',
  }
}

const users = ref([])
const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = toRef(() => !!formModel.value.id)

const headers = [
  {title: 'اسم', key: 'name', align: 'start'},
  {title: 'ایمیل', key: 'email'},
  {title: 'اسم کاربری', key: 'username'},
  {title: 'جنسیت', key: 'gender'},
  {title: 'عملیات', key: 'actions', align: 'center', sortable: false},
]

onMounted(() => {
  reset()
})

function add() {
  formModel.value = createNewRecord()
  dialog.value = true
}

function edit(id) {
  const found = users.value.find(user => user.id === id)

  formModel.value = {
    id: found.id,
    name: found.name,
    email: found.email,
    username: found.username,
    gender: found.gender,
  }

  dialog.value = true
}

function remove(id) {
  const index = users.value.findIndex(user => user.id === id)
  users.value.splice(index, 1)
}

function save() {
  if (isEditing.value) {
    const index = users.value.findIndex(user => user.id === formModel.value.id)
    users.value[index] = formModel.value
  } else {
    formModel.value.id = users.value.length + 1
    users.value.push(formModel.value)
  }

  dialog.value = false
}

function reset() {
  dialog.value = false
  formModel.value = createNewRecord()
  users.value = [
    {id: 1, name: 'To Kill a Mockingbird', email: 'Harper Lee', username: 'Fiction', gender: 'مرد'},
    {id: 2, name: '1984', email: 'George Orwell', username: 'Dystopian', gender: 'زن'},
    {id: 3, name: 'The Great Gatsby', email: 'F. Scott Fitzgerald', username: 'Fiction', gender: 'مرد'},
    {id: 4, name: 'Sapiens', email: 'Yuval Noah Harari', username: 'Non-Fiction', gender: 'زن'},
    {id: 5, name: 'Dune', email: 'Frank Herbert', username: 'Sci-Fi', gender: 'مرد'},
  ]
}
</script>

<template>
  <v-container max-width="1785">
    <v-row >
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
    <v-row class="mt-5">
      <v-col cols="12">
        <v-sheet border rounded class="px-4 py-5" :elevation="2">
          <div class="d-flex flex-column flex-sm-row align-sm-center">
            <p class="text-h4 font-weight-medium mb-5">لیست کاربران</p>
            <v-spacer />
            <v-btn
                color="primary"
                class="me-3"
                append-icon="mdi-account-plus"
                text="کاربر"
                border
                @click="add"
            ></v-btn>
            <v-btn
                color="warning"
                class="me-3 mt-2 mt-sm-0"
                append-icon="mdi-backup-restore"
                text="ریست"
                border
                @click="reset"
            ></v-btn>
            <v-text-field v-model="search" label="جستجو" variant="underlined" class="w-full mt-2 mt-sm-0"></v-text-field>
          </div>
          <v-data-table
              :search="search"
              :headers="headers"
              :items="users"
              items-per-page-text="تعداد در هر صفحه"
              page-text="{0} تا {1} از {2}"
              :items-per-page-options="[
                { value: 5, title: '۵' },
                { value: 10, title: '۱۰' },
                { value: 25, title: '۲۵' },
                { value: -1, title: 'همه' },
              ]"
              prev-icon="mdi-chevron-right"
              next-icon="mdi-chevron-left"
              first-icon="mdi-page-last"
              last-icon="mdi-page-first"
          >

            <template #header.gender="{ column }">
              <div class="d-flex align-center">
                <span>{{ column.title }}</span>
                <p class="text-blue mr-1 text-overline">(مرد/زن)</p>
              </div>
            </template>

            <template v-slot:item.gender="{ item }">
              <v-chip
                  variant="flat"
                  :color="item.gender === 'مرد' ? 'green' : 'red'"
              >
                {{ item.gender }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <div class="d-flex ga-2 justify-center">
                <v-icon color="red" icon="mdi-delete" size="large" @click="remove(item.id)"></v-icon>
                <v-icon color="warning" icon="mdi-pen" size="large" @click="edit(item.id)"></v-icon>
              </div>
            </template>

            <template v-slot:no-data>
              <div class="w-full">
                <v-btn
                    width="100%"
                    append-icon="mdi-backup-restore"
                    rounded="lg"
                    text="ریست"
                    variant="text"
                    border
                    @click="reset"
                ></v-btn>
              </div>
            </template>
          </v-data-table>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="1000">
      <v-card
          :title="`${isEditing ? 'ویرایش' : 'افزودن'} کاربر`"
      >
        <template v-slot:text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="formModel.name" label="اسم"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field v-model="formModel.username" label="اسم کاربری"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="formModel.email" label="ایمیل"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select v-model="formModel.gender" :items="['مرد', 'زن']" label="جنسیت"></v-select>
            </v-col>
          </v-row>
        </template>

        <v-divider></v-divider>

        <v-card-actions class="bg-surface-light">
          <v-btn text="لغو" variant="plain" @click="dialog = false"></v-btn>

          <v-spacer></v-spacer>

          <v-btn text="ذخیره" @click="save"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>

</style>