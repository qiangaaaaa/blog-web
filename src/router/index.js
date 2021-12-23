import Vue from "vue";
import VueRouter from 'vue-router';

// 路由懒加载
const CasualUserManage = () => import('../views/casualUserManage/CasualUserManage');
const LabelManage = () => import('../views/labelManage/LabelManage');

Vue.use(VueRouter)

// 路由映射
const routes = [
    {
        path: '',
        redirect: '/casualUserManage'
    },
    {
        path: '/casualUserManage',
        component: CasualUserManage
    },
    {
        path: '/labelManage',
        component: LabelManage
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router