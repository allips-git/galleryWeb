import { createWebHistory, createRouter, } from "vue-router";

// RouteMeta 인터페이스 정의

import Login from "@/views/LoginPage.vue";
import Index from "@/views/index.vue";
import blindView from "@/views/blindView.vue";
import curtainView from "@/views/curtainView.vue";
import keywordView from "@/views/keywordView.vue";



const routes = [
    {
        path: "/login",
        name: "LoginPage",
        component: Login,
    },
    {
        path: "/",
        name: "MainPage",
        component: Index
    },
    {
        path: "/blind",
        name: "blindView",
        component: blindView
    },
    {
        path: "/curtain",
        name: "curtainView",
        component: curtainView
    },
    {
        path: "/detail",
        name: "keywordView",
        component: keywordView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 항상 맨 위로 스크롤
        return { top: 0 };
      },
});


export default router
