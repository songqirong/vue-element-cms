import Vue from 'vue';
import VueRouter from 'vue-router';
// import Vue from 'vue';
// const Home = ()=>import('@/components/HelloWorld.vue');
// const Home = ()=>import('@/views/home.vue')
// const Good = ()=>import('@/views/good.vue')
// const Overview = ()=>import('@/views/overview.vue')
// const Analyze = ()=>import('@/views/analyze.vue')
// const Add = ()=>import('@/views/add.vue')
// const Editor = ()=>import('@/views/editor.vue')
// const Cate = ()=>import('@/views/cate.vue')
import navs from '@/untils/routerNav.js';
const Login = ()=>import('@/components/login/login.vue')
Vue.use(VueRouter);
const routes = [];
navs.map(item=>{
    routes.push({path:item.path,component:item.comm})
    if(item.children){
        item.children.map(item=>{
            // console.log(item.comm)
            routes.push({path:item.path,component:item.comm})
        })
    }
})
const router = new VueRouter({
    mode:'hash',
    routes:[
        ...routes,
        {path:'/login',component:Login},
        {path:'/*',redirect:'/home'}
    ]
})
router.beforeEach(function(to, from, next) {
    if (to.path != '/login') {
      if(localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })
export default router;