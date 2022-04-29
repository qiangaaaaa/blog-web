import Vue from "vue";
import VueRouter from 'vue-router';

// 路由懒加载
const CasualUserManage = () => import('../views/casualUserManage/CasualUserManage');
const LabelManage = () => import('../views/labelManage/LabelManage');
const ArticleManage = () => import('../views/articleManage/ArticleManage');
const CategoryManage = () => import('../views/categoryManage/CategoryManage');
const Manage = () => import('../views/manage/Manage');
const UserLogin = () => import('../views/userLogin/UserLogin');
const ArticleAddAndEditButton = () => import('../views/articleManage/ArticleAddAndEditButton')

Vue.use(VueRouter)

// 路由映射
const routes = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component: UserLogin
    },
    {
        path: '/manage',
        component: Manage,
        meta: {
            requireLogin:true
        },
        children: [
            {
                path: '',
                component: CasualUserManage,
                meta: {
                    requireLogin:true
                },
            },
            {
                path: '/casualUserManage',
                component: CasualUserManage,
                meta: {
                    requireLogin:true
                },
            },
            {
                path: '/labelManage',
                component: LabelManage,
                meta: {
                    requireLogin:true
                },
            },
            {
                path: '/articleManage',
                component: ArticleManage,
                meta: {
                    requireLogin:true
                },
            },
            {
                path: '/categoryManage',
                component: CategoryManage,
                meta: {
                    requireLogin:true
                },
            },
            {
                path: '/son2',
                component: ArticleAddAndEditButton,
                meta: {
                    requireLogin:true
                },
            }
        ]
    },

]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router