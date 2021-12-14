import Vue from "vue";
import VueRouter from 'vue-router';

// 路由懒加载
const UserManage = () => import('../views/userManage/UserManage');
const Manage = () => import('../views/manage/Manage');

Vue.use(VueRouter)

// 路由映射
const routes = [
    {
        path: '',
        redirect: '/userManage'
    },
    {
        path: '/userManage',
        component: UserManage
    },
    {
        path: '/manage',
        component: Manage
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router