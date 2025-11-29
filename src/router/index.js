import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLayout from "@/layouts/AuthLayout.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DashboardHomeView from '../views/Dashboard/HomeView.vue'

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
                    component: LoginView
                }
            ]
        },
        {
            path: '/dashboard',
            component: DashboardLayout,
            children: [
                {
                    path: '',
                    name: 'dashboard.home',
                    component: DashboardHomeView
                }
            ]
        },
    ],
})

export default router
