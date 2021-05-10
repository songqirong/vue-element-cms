<template>
    <div class="app-wrap">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <my-aside :user="userInfo"></my-aside>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                  <my-header :user="userInfo"></my-header>
                </el-header>
                <el-main>
                    <my-main></my-main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import {myHeader,myAside,myMain} from '../index';
import {mapState, mapActions} from 'vuex';
export default {
    name:'Layout',
    components:{
        myMain,
        myAside,
        myHeader
    },
    computed:{
        ...mapState('user', ['userInfo']),
    },
    methods:{
        ...mapActions('user', ['getUserInfo']),
    },
    mounted(){
        this.getUserInfo({})
    },
}
</script>
<style lang="scss" scoped>
.app-wrap{
    height: 100%;
    .el-aside {
      color: #333;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
}
</style>