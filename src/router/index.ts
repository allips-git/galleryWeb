import { createWebHistory, createRouter, } from "vue-router";

// RouteMeta 인터페이스 정의

import Login from "@/views/LoginPage.vue";
import Index from "@/views/index.vue";
import blindView from "@/views/blindView.vue";
import curtainView from "@/views/curtainView.vue";
import keywordView from "@/views/keywordView.vue";
import { useLoginStore, usePopupStore } from '@/stores';



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
    scrollBehavior() 
    {
        return { top: 0 };
    }
});

router.beforeEach(async (to, from, next) => {
    const login = useLoginStore();
    const popup = usePopupStore();
    
    const list  = ['LoginPage'];
    const check = list.includes(to.name);

    if (login.token === null && !check) 
    {
        next({ path: '/login', name: 'LoginPage' });
    } 
    else 
    {
        if (!check)
        {
            if(popup.list.length === 0)
            {
                next();
            }
            else
            {
                const lastPopNm = popup.list[popup.list.length - 1];
                await popup.getClose(lastPopNm);
                next(false);
            }
        } 
        else 
        {
            next();
        }
    }
});


export default router
