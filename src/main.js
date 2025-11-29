import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import './assets/css/font.css';
import './assets/css/style.css';

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light', // 'light' | 'dark' | 'system'
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.deepPurple.base, // #E53935
                }
            },
        },
    },
    defaults: {
        VTextField: {
            color: 'primary',       // رنگ فوکوس
            baseColor: 'primary',   // رنگ لِیبِل و آیکون‌ها
            variant: 'outlined',
            rounded: 'lg',
        },

        VSelect: {
            color: 'primary',
            variant: 'outlined',
        },

        VAutocomplete: {
            color: 'primary',
            variant: 'outlined',
        },
    },
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
