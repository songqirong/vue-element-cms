<template>
    <div class="cates">
      <el-table :data="cate" v-show="show">
          <el-table-column prop="create_time" label="创建时间" width="140" align="center">
          </el-table-column>
          <el-table-column prop="cate_zh" label="品类中文" width="200" align="center">
          </el-table-column>
          <el-table-column prop="cate_en" label="品类英文" align="center" width="200">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="loading" v-show="!show">
        <div class="imgbox">
          <img src="@/assets/loading.gif" alt="">
        </div>
      </div>
      <el-pagination
        @current-change="pageChange"
        background
        layout="prev, pager, next,jumper, ->, total"
        :total="catesCount"
        :page-size="5"
        prev-text="上一页"
        next-text="下一页"
        >
      </el-pagination>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm"  size="small">
        <h1>新增品类</h1>
        <el-form-item
          label="中文名称"
          prop="cate_zh"
          :rules="[
            { required: true, message: '品类中文名称不能为空'},
          ]"
        >
          <el-input type="text" v-model.trim="numberValidateForm.cate_zh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="英文名称"
          prop="cate_en"
          :rules="[
            { required: true, message: '品类英文名称不能为空'},
          ]"
        >
          <el-input type="text" v-model.trim="numberValidateForm.cate_en" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex' 
export default {
  
    data() {
      return {
        page:1,
        catesCount:0,
        show:false,
        numberValidateForm: {
          cate_zh: '',
          cate_en: ''
        }
      }
    },
    computed:{
      ...mapState('cate',['cates']),
      cate(){
        return this.cates.map(item=>{
            var d = (Date.now()-item.create_time)/(24*3600*1000);
            let str = d < 1 ?(d*24 < 1 ? Math.round(24*60*d) + '分钟前' : Math.round(24*d) + '小时前') : Math.round(d) + "天前";
            item.create_time = str;
            return item
        })
      } 
    },
    methods:{
      ...mapActions('cate',['getCates']),
      async init(){
        this.show = false
        
        let params = {
          page:this.page,
          limit:5
        }
        await this.getCates(params)
        this.$http.fetchGetCatesCount({}).then(res=>{
          // console.log(res)
          if(res.err==0){
            this.catesCount = res.data
            this.show = true
          }
        })
      },
      pageChange(page){
        this.page=page,
        this.init()
      },
      handleEdit(index, row) {
        // console.log(index, row);
        // const h = this.$createElement;
        this.$msgbox({
          title: '品类信息修改',
          message: `
          <div>
            <div>
              <span>品类中文:</span><input class='val1' value='${row.cate_zh}' />
            </div>
            <div>
                <span>品类英文:</span><input class='val2' value='${row.cate_en}'/>
            </div>
          </div>
          `,
          dangerouslyUseHTMLString:true,
          showCancelButton: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '放弃修改',
          center: true,
          beforeClose: (action, instance, done) => {
            let val1 = document.querySelector('.val1').value;
            let val2 = document.querySelector('.val2').value;
            row.cate_en=val2;
            row.cate_zh=val1
            done();
          }
        }).then(() => {
          this.$http.fetchUpdateCate({_id:row._id,cate_zh:row.cate_zh,cate_en:row.cate_en}).then(res=>{
            this.$message({
              type: 'success',
              message: res.msg
            });
            this.init();
          })
          
        }).catch(action => {
          if(action === 'cancel'){
            this.$message({
              type: 'info',
              message: '放弃修改'
            });
          }
            
        })
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该商品种类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.fetchRemoveCate({_id:row._id}).then(res=>{
            this.$message({
              type: 'success',
              message: res.msg
            });
          })
          this.init();
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let data={
              cate_zh:this.numberValidateForm.cate_zh,
              cate_en:this.numberValidateForm.cate_en
            }
            this.$http.fetchAddCate(data).then(res=>{
              if(res.err==0){
                this.$message({
                  message:res.msg,
                  type:'success'
                })
                this.init();
                this.$refs[formName].resetFields();
              }else{
                this.$message.error('品类新增失败')
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
    },
    mounted(){
      this.init()
    } ,  
}
</script>
<style lang="scss" scoped>
  .loading{
    height: 300px;
    width: 100%;
    .imgbox{
      height: 300px;
      width: 300px;
      margin: 0 auto;
      img{
        height: 100%;
        width: 100%;
      }
    }
    
  }
  .el-pagination{
    margin: 20px 0;
  }
  .el-table{
    height: 300px;
  }
    .el-form{
      width:400px;
      height: 160px;
      h1{
        text-align: center;
      }
    }
  
</style>