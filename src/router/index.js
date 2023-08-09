import Vue from 'vue'
import VueRouter  from 'vue-router'

Vue.use(VueRouter)
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
    return originPush.call(this,location).catch(err => err)
}

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/map1',
            name:'map1',
            component:() => import('../view/map1.vue')
        },
        {
            path:'/map2',
            name:'map2',
            component:() => import('../view/map2.vue')
        },
        {
            path:'/map3',
            name:'map3',
            component:() => import('../view/map3.vue')
        },
        {
            path:'/map4',
            name:'map4',
            component:() => import('../view/map4.vue')
        },
        {
            path:'/map5',
            name:'map5',
            component:() => import('../view/map5.vue')
        },
        {
            path:'/map6',
            name:'map6',
            component:() => import('../view/map6.vue')
        },
        {
            path:'/map7',
            name:'map7',
            component:() => import('../view/map7.vue')
        },
        {
            path:'/map8',
            name:'map8',
            component:() => import('../view/map8.vue')
        },
    ]
})
export default router