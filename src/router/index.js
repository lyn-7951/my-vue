// src/router/index.js
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import SwipeRefreshLayout2 from '../utils/SwipeRefreshLayout2'
import Home from '../views/Home.vue'
import Info from '@/views/Info'
import VueRouteLyn from '@/views/VueRouteLyn'
import A from '@/test/A'
import B from '@/test/B'
import PopViews from '@/views/PopViews'
import Test from "@/views/Test";
import Login from "@/pages/login";
import Layout from "@/layout/layout";
import CustomerHome from "@/pages/home";
import CustomerService from "@/pages/customer-service"
import My from "@/pages/my"
import MyList from "@/xiala/MyList";
import MyItem from "@/xiala/MyItem";
import MyList2 from "@/xiala/MyList2";
import TestImg from "@/views/TestImg";
import MyTablePage from "@/mytable/MyTablePage";
import MyTabsPage from "@/mytabs/MyTabsPage";

/*
* SwipeRefreshLayout2传给Info，Info 接收,之前说过
* */
const routes = [
    {
        path: '/SwipeRefreshLayout2',
        name: 'SwipeRefreshLayout2',
        component: SwipeRefreshLayout2,
        meta: { keepAlive: true } // 这个路由对应的组件会被缓存
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/info',
        name: 'Info',
        component: Info,
        props: route => ({ item: route.query.item })
    },
    {
        path: '/a',
        name: 'VueRouteLyn',
        component: VueRouteLyn,
        // redirect: 'a', // 添加这一行来重定向到子路由'A'
        children: [
                {
                    path: 'a', // 子路由的默认路径
                    name: 'A',
                    component: A,
                    meta: { keepAlive: true } // 添加这一行
                },
            {
                path: 'b',
                name: 'B',
                component: B,
                meta: { keepAlive: true } // 添加这一行
            },
            ]
    },
    {
        path: '/pop-views',
        name: 'PopViews',
        component: PopViews
    },
    {
        path: '/',
        name: 'Test',
        component: Test
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/layout',
        name: 'Layout',
        component: Layout,
        redirect: '/customer-home',
        children: [
            {
                path: '/customer-home',
                name: 'CustomerHome',
                component: CustomerHome,

        },
            {
            path: '/customer-service',
            name: 'CustomerService',
            component: CustomerService,
        },
            {
                path: '/my',
                name: 'My',
                component: My,
            }
        ]
    },
    {
        path: '/my-list',
        name: 'MyList',
        component: MyList,
    },
    {
        path: '/my-item',
        name: 'MyItem',
        component: MyItem,
        props: route => ({
            item: route.query.item
        })
    },
    {
        path: '/my-list2',
        component: MyList2,
    },
    {
        path: '/test-img',
        component: TestImg,
    },
    {
        path: '/my-table-page',
        name: 'MyTablePage',
        component: MyTablePage,
    },
    {
        path: '/my-tabs-page',
        name: 'MyTabsPage',
        component: MyTabsPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.path);
    next();
});
export default router
