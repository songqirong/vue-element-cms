<template>
    <div class="bannerAdd"> 
       <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="图片描述" prop="desc" class="item">
        <el-input v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <el-upload
            class="avatar-uploader"
            action="https://static.persion.cn/upload/images?type=banners"
            :show-file-list="false"
            :on-success="imgUpload">
            <img v-if="ruleForm.img" :src='ruleForm.img' class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>
<script>
export default {    
    data() {
      return {
        ruleForm: {
          desc: '',
          img:''
        },
        rules: {
          desc: [
            { required: true, message: '请输入商品描述', trigger: 'blur' },
          ],
          img: [
            { required: true, message: '请上传商品图片', trigger: 'blur' },
          ],
        }
      };
    },
    mounted(){
      this.init();
    },
     methods: {
       init(){
         let id = this.$route.params.id
         if(id!=" "){
           this.$http.fetchGetBanner({id}).then(res=>{
             this.ruleForm=res.data[0]
           })
         }
       },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let id = this.$route.params.id
            let data = this.ruleForm
            if(id!=" "){data.id=id}
            this.$http.fetchCreateBanner(data).then(res=>{
              // console.log(res)
              if(res.err==0){
                this.$message({
                  message:res.msg,
                  type:'success'
                })
                this.resetForm(formName);
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
        // console.log(this.ruleForm)
      },
      imgUpload(res){
        console.log(res);
          this.ruleForm.img = res.data.url
      },
     }
}
</script>
<style lang="scss" scoped>
.item{
  width:500px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload :hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border:1px solid #ccc
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>