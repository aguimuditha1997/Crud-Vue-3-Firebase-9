import Index from '../views/Index.vue'
import About from '../views/About.vue'
import Edit from '../views/Edit.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path:'/about',
        name : 'index',
        component: Index
    },
    {
        path:'/',
        name : 'about',
        component: About
    },
    {   path:'/edit/:title',
        name : 'edit',
        component : Edit
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router