// src/router/index.js
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import SwipeRefreshLayout2 from '../utils/SwipeRefreshLayout2'
import Home from '../views/Home.vue'
import Info from '@/views/Info'
import VueRouteLyn from '@/views/VueRouteLyn'
import A from '@/test/A'
import B from '@/test/B'
import PopViews from '@/views/PopViews'

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
        path: '/',
        name: 'VueRouteLyn',
        component: VueRouteLyn,
        redirect: 'a', // 添加这一行来重定向到子路由'A'
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
