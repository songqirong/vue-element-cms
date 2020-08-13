const Home = ()=>import('@/views/home.vue')
const Good = ()=>import('@/views/good.vue')
const Overview = ()=>import('@/views/overview.vue')
const Analyze = ()=>import('@/views/analyze.vue')
const Add = ()=>import('@/views/add.vue')
const Editor = ()=>import('@/views/editor.vue')
const Cate = ()=>import('@/views/cate.vue')
const Ad = ()=>import('@/views/ad.vue')
const Chat = ()=>import('@/views/chat.vue')

export default[
    {
        id:1,
        path:'/home',
        comm:Home,
        title:'首页管理',
        icon:'el-icon-location',
        children:[
            {id:11,path:'/home/overview/:id',title:'轮播图管理',icon:'el-icon-document',comm:Overview},
            {id:12,path:'/home/analyze',title:'统计',icon: 'el-icon-setting', comm:Analyze}
        ]
    },
    {
        id:2,
        path:'/good',
        comm:Good,
        title:'商品管理',
        icon:'el-icon-menu',
        children:[
            { id:21, path: '/good/add/:id', title:'新增商品', icon: 'el-icon-circle-plus', comm:Add },
            { id:22, path: '/good/editor', title:'商品总览', icon: 'el-icon-platform-eleme', comm:Editor },
            { id:23, path: '/good/cate', title: '品类', icon: 'el-icon-chat-dot-round', comm: Cate }
        ]
    },
    {
        id: 3,
        path: '/ad',
        comm: Ad,
        title: '广告中心',
        icon: 'el-icon-platform-eleme'
    },
    {
        id: 4,
        path: '/chat',
        comm: Chat,
        title: '聊天室',
        icon: 'el-icon-chat-dot-round'
    }

]