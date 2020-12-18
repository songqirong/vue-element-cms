<template>
    <div class="login">
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <h1>用户登录</h1>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {setCookie} from '@/untils/cookieTools.js'
 export default {
    name:'Login',
    data() {

      var validateUser = (rule, value, callback) => {
        //   console.log(111)
        // console.log(value)
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        //   console.log(value)
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback()
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert(valid);
            this.$http.fetchLogin({username:this.ruleForm.username.toString(),password:this.ruleForm.password}).then(res=>{
                console.log(res)
                if(res.err==0){
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    localStorage.setItem('token',res.token);
                    setCookie({key:"username",value:this.ruleForm.username,days:365})
                    this.$router.push('/home')
                }else{
                  // console.log(res)
                    this.$message.error(res.msg);
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
    .login{
        height: 100%;
        width: 100%;
        background-color: cadetblue;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-form{
            h1{
                text-align: center;
                margin: 50px 0 50px ;
            }
            background-color: #fff;
            width: 500px;
            height: 450px;
            .el-form-item__content{
                .el-button:first-child{
                    margin-left: 80px;
                }
                .el-input{
                    width: 300px;
                }
            }
        }
    }
</style>
