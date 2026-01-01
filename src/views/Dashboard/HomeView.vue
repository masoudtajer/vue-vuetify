<script setup>
import { onMounted, ref, shallowRef, toRef } from 'vue'

const currentYear = new Date().getFullYear()

function createNewRecord () {
  return {
    title: '',
    author: '',
    genre: '',
    year: currentYear,
    pages: 1,
  }
}

const books = ref([])
const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = toRef(() => !!formModel.value.id)

const headers = [
  { title: 'Title', key: 'title', align: 'start' },
  { title: 'Author', key: 'author' },
  { title: 'Genre', key: 'genre' },
  { title: 'Year', key: 'year', align: 'end' },
  { title: 'Pages', key: 'pages', align: 'end' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

onMounted(() => {
  reset()
})

function add () {
  formModel.value = createNewRecord()
  dialog.value = true
}

function edit (id) {
  const found = books.value.find(book => book.id === id)

  formModel.value = {
    id: found.id,
    title: found.title,
    author: found.author,
    genre: found.genre,
    year: found.year,
    pages: found.pages,
  }

  dialog.value = true
}

function remove (id) {
  const index = books.value.findIndex(book => book.id === id)
  books.value.splice(index, 1)
}

function save () {
  if (isEditing.value) {
    const index = books.value.findIndex(book => book.id === formModel.value.id)
    books.value[index] = formModel.value
  } else {
    formModel.value.id = books.value.length + 1
    books.value.push(formModel.value)
  }

  dialog.value = false
}

function reset () {
  dialog.value = false
  formModel.value = createNewRecord()
  books.value = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, pages: 281 },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, pages: 328 },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, pages: 180 },
    { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-Fiction', year: 2011, pages: 443 },
    { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', year: 1965, pages: 412 },
  ]
}
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
    <v-sheet border rounded class="mt-5">
      <v-data-table
          :headers="headers"
          :hide-default-footer="books.length < 11"
          :items="books"
      >
        <template v-slot:top>
          <v-toolbar flat color="white" extended class="pt-5 pa-3">
            <template v-slot:prepend>
              <div>
                <p class="text-h4 font-weight-medium mb-5"> لیست کاربران</p>
              </div>
            </template>

            <template v-slot:append>


                <v-btn
                    class="me-2"
                    prepend-icon="mdi-plus"
                    rounded="lg"
                    text="Add a Book"
                    border
                    @click="add"
                ></v-btn>
              <v-spacer />
                <v-text-field label="Label" variant="underlined" class="w-full"></v-text-field>

            </template>

          </v-toolbar>
        </template>

        <template v-slot:item.title="{ value }">
          <v-chip :text="value" border="thin opacity-25" prepend-icon="mdi-book" label>
            <template v-slot:prepend>
              <v-icon color="medium-emphasis"></v-icon>
            </template>
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
          </div>
        </template>

        <template v-slot:no-data>
          <v-btn
              prepend-icon="mdi-backup-restore"
              rounded="lg"
              text="Reset data"
              variant="text"
              border
              @click="reset"
          ></v-btn>
        </template>
      </v-data-table>
    </v-sheet>

    <v-dialog v-model="dialog" max-width="500">
      <v-card
          :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
          :title="`${isEditing ? 'Edit' : 'Add'} a Book`"
      >
        <template v-slot:text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="formModel.title" label="Title"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="formModel.author" label="Author"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select v-model="formModel.genre" :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']" label="Genre"></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-number-input v-model="formModel.year" :max="currentYear" :min="1" label="Year"></v-number-input>
            </v-col>

            <v-col cols="12" md="6">
              <v-number-input v-model="formModel.pages" :min="1" label="Pages"></v-number-input>
            </v-col>
          </v-row>
        </template>

        <v-divider></v-divider>

        <v-card-actions class="bg-surface-light">
          <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

          <v-spacer></v-spacer>

          <v-btn text="Save" @click="save"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>

</style>