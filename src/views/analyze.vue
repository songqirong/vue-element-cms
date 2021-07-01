<template>
    <div class="goodsshow">
      <el-table :data="bannerArr" v-show="show" style="width: 100%" height="400">
          <el-table-column prop="img" label="轮播图片" width="180" align="center">
            <template slot-scope="scope">
                <img class="qf-good-img" :src="scope.row.img">
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="图片描述" width="250" align="center">
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
        :total="total"
        :page-size="5"
        prev-text="上一页"
        next-text="下一页"
        >
      </el-pagination> 
    </div>
</template>
<script>
export default {
  
    data() {
      return {
        page:1,
        show:false,
        cate:'',
        bannerArr:[],
        total:0
      }
    },
    methods:{
      init(){
        
        this.show=false
        let params={
          page:this.page,
          limit:5
        }
        this.$http.fetchGetBanner(params).then(res=>{
            if(res.err==0){
              this.bannerArr=res.data
              this.show=true,
              this.total=res.total
            }
          })
        
      },
      pageChange(page){
        this.page=page,
        this.init()
      },
      handleEdit(index, row) {
        // console.log(index,row)
          
        this.$router.push('/home/overview/'+row._id)
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该商品种类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.fetchRemoveBanner({_id:row._id}).then(res=>{
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
    height: 400px;
    width: 100%;
    .imgbox{
      height: 400px;
      width: 400px;
      margin: 0 auto;
      img{
        height: 100%;
        width: 100%;
      }
    }
    
  }
  .el-pagination{
    margin-top: 50px;
  }

    .el-form{
      width:400px;
      height: 160px;
      h1{
        text-align: center;
      }
    }
    .qf-good-img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
}
.price-filter{
  color: red;
}
  
</style>