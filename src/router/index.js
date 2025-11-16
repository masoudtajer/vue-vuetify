import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLayout from "@/layouts/AuthLayout.vue";
import Login from "@/views/Auth/Login.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/auth',
            component: AuthLayout,
            children: [
                {
                    path: '',
                    name: 'login',
                    component: Login
                }
            ]
        },
    ],
})

export default router
