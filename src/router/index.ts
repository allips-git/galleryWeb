import { createWebHistory, createRouter, } from "vue-router";

// RouteMeta 인터페이스 정의
interface RouteMeta {
    showTopHeader?: boolean; // showTopHeader 메타 필드 정의
    showAppFooter?: boolean;
    showBackHeader?: boolean
    title:string;
  }

import Index from "@/views/index.vue";



const routes = [

    {
        path: "/",
        name: "MainPage",
        component: Index,
        meta: { showTopHeader: true, showAppFooter: true } as RouteMeta
    },

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
