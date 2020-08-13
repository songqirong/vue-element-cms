import {fetchGetCates } from '@/untils/api.js'
export default{
    namespaced:true,
    // 存放公共数据
    state:{
        cates:[],

    },
    // 当state发生改变时会重新计算(参数state)
    getters:{

    },
    // 公共方法,用来改变state里面的数据(参数state)
    mutations:{
        changeCates(state,payload){
            // console.log(payload)
            if(payload.err==0){
                state.cates=payload.data
            }
        }
    },
    // 公共方法,用来获取后端数据存储到state里面的数据(参数store)
    actions:{
        getCates(store,payload){
            fetchGetCates(payload).then(res=>{
                store.commit('changeCates',res)
            })
        },
    }
}