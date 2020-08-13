<template>
    <div class="goodsshow">
      <el-row type='flex' align='middle'>
            <el-col :span="4">
                <span>商品品类：</span>
            </el-col>
            <el-col :span="20">
                <!-- v-model 是 :value 和 @input 的简写 -->
                <my-cate-select v-model="cate" :cates="cates"/>
            </el-col>
        </el-row>
      <el-table :data="goods" v-show="show" style="width: 100%" height="400">
          <el-table-column prop="img" label="商品图片" width="180" align="center">
            <template slot-scope="scope">
                <img class="qf-good-img" :src="img.imgBaseUrl+scope.row.img">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="120" align="center">
          </el-table-column>
          <el-table-column prop="desc" label="商品描述" width="250" align="center">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="150" align="center">
            <template slot-scope="scope">
              <div class="price-filter">{{scope.row.price|rmb}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="cate" label="品类" width="80" align="center">
          </el-table-column>
          <el-table-column prop="hot" label="是否热销" width="100" align="center">
          </el-table-column>
          <el-table-column prop="rank" label="排行" width="60" align="center">
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
//代码2   存一个新变量 就能够修改 数组

import img from '@/untils/img'
import {myCateSelect} from '@/components/index'
import {mapActions,mapState} from 'vuex' 
export default {
  
    data() {
      return {
        img,
        page:1,
        show:false,
        cate:'',
        goods:[],
        total:0
      }
    },
    watch:{
      cate(){
        this.page=1;
        this.init()
      }
    },
    components:{
      myCateSelect
    },
    computed:{
      ...mapState('cate',['cates']),
      
    },
    methods:{
      ...mapActions('cate',['getCates']),
      init(){
        
        this.show=false
        let params={
          cate:this.cate,
          page:this.page,
          limit:5
        }
        if(this.cate=='all'){params.cate=''}
        this.$http.fetchGetCateGoods(params).then(res=>{
          res.data.forEach(item=>{
            if(item.hot){
              item.hot="true"
            }else{
              item.hot="false"
            }
          })
          if(res.err==0){
            this.goods=res.data;
            this.show=true,
            this.total = res.total
          }
        })
      },
      pageChange(page){
        this.page=page,
        this.init()
      },
      handleEdit(index, row) {
        // console.log(index,row)
          
        this.$router.push('/good/add/'+row._id)
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该商品种类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.fetchRemoveGood({_id:row._id}).then(res=>{
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
      this.getCates({}).then(()=>{
          this.cate='all'
      })
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