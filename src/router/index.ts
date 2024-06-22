import {createRouter, createWebHistory} from "vue-router";
import Index from "@/views/Index.vue";
import ProductManage from "@/views/ProductManage.vue";
import UserManage from "@/views/UserManage.vue";
import DataCount from "@/views/DataCount.vue";
import Login from "@/views/Login.vue";


const router =createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "HomePage",
            path: "/",
            component: Index,
            children: [
                {
                    name: "ProductManage",
                    path: "/ProductManage",
                    component: ProductManage
                },
                {
                    name: "UserManage",
                    path: "/UserManage",
                    component: UserManage
                },
                {
                    name: "DataCount",
                    path: "/DataCount",
                    component: DataCount
                },
            ]

        },
        {
            name: 'Login',
            path: '/login',
            component: Login
        }
    ]
})

export default router
