<template>
    <div class="aside">
        <div class="avatar">
            <el-avatar :size="100" cover :src="user.user_avatar"></el-avatar>
        </div>
        <el-menu :default-openeds="['1']">
            <el-submenu v-for='item in navs' :key='item.id' :index="item.id+''">
                <template slot="title"><i :class="item.icon"></i>
                    <router-link :to="item.path" active-class="navOn" tag="span" v-text='item.title'></router-link>
                </template>
                <el-menu-item  v-for="item in item.children" :key="item.id" :index="item.id+''">
                    <router-link :to="item.path.replace(':id',' ')" exact-active-class="on" tag="span">
                        <i :class="item.icon"></i>
                        <span v-text="item.title"></span>
                    </router-link>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
import navs from '@/untils/routerNav'
export default {
    name:'Aside',
    props:{
        user:{
            type: Object,
            required: true,
        }
    },
    data(){
        return{
            navs
        }
    }
}
</script>
<style lang="scss" scoped>
    
    .aside{
        .avatar{
            text-align: center;
            padding: 20px 0 50px;
            background-color: #fff;
        }
        width: 100%;
        .el-menu{
          li{
            // padding:0!important;
            // width: 100%!important;
            // height: 100%;
            &>span{
              display: block;
            //   text-align: center;
            }
          }
        }
        .navOn{
            color: blue;
            
        }
        .on {

                color: #ffd04b;
            // background-color: blue;
            }
        
    }
    
    
</style>