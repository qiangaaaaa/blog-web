import Vue from "vue";
import VueRouter from 'vue-router';

// 路由懒加载
const CasualUserManage = () => import('../views/casualUserManage/CasualUserManage');
const LabelManage = () => import('../views/labelManage/LabelManage');
const ArticleManage = () => import('../views/articleManage/ArticleManage');
const CategoryManage = () => import('../views/categoryManage/CategoryManage');

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
    },
    {
        path: '/articleManage',
        component: ArticleManage
    },
    {
        path: '/categoryManage',
        component: CategoryManage
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router