<template>
  <div class="add">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="name" class="item">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price" class="item">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc" class="item" size="medium" >
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="商品类别" prop="cate">
        <my-cate-select v-model='ruleForm.cate' :cates='cates' ></my-cate-select>
      </el-form-item>
      <el-form-item label="是否热销" prop="hot">
        <el-switch v-model="ruleForm.hot"></el-switch>
      </el-form-item>
      <el-form-item label="商品图片" prop="img">
        <el-upload
            class="avatar-uploader"
            action="http://localhost:9000/api/v1/upload/img"
            :show-file-list="false"
            :on-success="imgUpload">
            <img v-if="ruleForm.img" :src='img.imgBaseUrl+ruleForm.img' class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品排名" prop="rank">
        <el-input-number 
            v-model="ruleForm.rank" 
            :min="0" 
            :max="100000" 
            label="给商品排序">
        </el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import img from '@/untils/img'
import {mapState,mapActions} from 'vuex'
import {myCateSelect} from '@/components/index'
export default { 
    name:'Add',   
    data() {
      return {
        img,
        ruleForm: {
          name: '',
          cate: '',
          price:'',
          hot: false,
          desc: '',
          rank:'',
          img:''
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
          ],
          img: [
            { required: true, message: '请上传商品图片', trigger: 'blur' },
          ],
          cate: [
            { required: true, message: '请选择商品类别', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写商品描述', trigger: 'blur' }
          ]
        }
      };
    },
    computed:{
        ...mapState('cate',['cates']),
    },
    mounted(){
        this.init()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let id = this.$route.params.id;
            // console.log(id)
            let data = this.ruleForm
            if(id){
              data.id = id
            }
            this.$http.fetchAddGood(data).then(res=>{
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
        console.log(this.ruleForm)
      },
      ...mapActions('cate',['getCates']),
      init(){
        let id = this.$route.params.id;
        if(id!=" "){
          this.$http.fetchGetGoodDetail({_id:id}).then(res=>{
            // console.log(res);
            if(res.err==0){
              this.ruleForm=res.data[0];
            }
          })
        }
        this.getCates({})
      },
      imgUpload(res){
        // console.log(res);
          this.ruleForm.img = res.data.url
      },
    },
    components:{
      myCateSelect
    }
    
}
</script>
<style lang="scss" scoped>
</style>
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
