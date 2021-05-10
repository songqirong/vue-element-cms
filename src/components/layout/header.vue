<template>
    <div class="header">
        <el-dropdown trigger="click" @command="handleCommand">
            <!-- <span></span> -->
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item command="outLogin">注销</el-dropdown-item>
                <el-dropdown-item>切换账号</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span v-text="user.username"></span>
    </div>
</template>
<script>
import {getCookie,removeCookie} from '@/untils/cookieTools.js';
export default {
    name:'Header',
    props:{
        user:{
            type: Object,
            required: true,
        }
    },
    computed:{
        username(){
            return getCookie('username')
        }
    },
    methods:{
        handleCommand(command){
            if(command=='outLogin'){
                removeCookie('username');
                localStorage.removeItem('token');
                this.$router.push('/login')
                // console.log(outLogin)
                this.$message({message:'注销成功',type:'success'});
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>