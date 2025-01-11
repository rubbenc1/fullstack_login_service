import { createRouter, createWebHistory } from 'vue-router';
import Home_page from '../components/Home.vue'
import SignUp from '../components/SignUp.vue';
import Login_page from '../components/Login_page.vue';

const routes = [
    {path: "/", component: Home_page},
    {path: "/signup", component: SignUp},
    {path: "/login", component: Login_page}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;