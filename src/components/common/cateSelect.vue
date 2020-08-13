<template>
  <el-select :value='value' placeholder="请选择商品分类"  size="medium"  @change='cateChange'>
    <el-option
      v-for="item in cates"
      :key="item._id"
      :label="item.cate_zh"
      :value="item.cate_en">
    </el-option>
  </el-select>
</template>
<script>

export default {
    props:{
        value:{
            type:String,
            required:true
        },
        cates:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
           
        }
    },
    methods: {
        cateChange(val) {
            this.$emit('input', val)
        }
    }
    
}
</script>