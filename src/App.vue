<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
    <router-view v-if='$route.path=="/login"'></router-view>
    <my-layout v-else></my-layout>
  </div>
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue';
Vue.filter('rmb',function(value){
  if(value){
    return '￥' + Number(value).toFixed(2)
  }else{
    return
  }
})
import {myLayout} from './components/index';
export default {
  name: 'App',
  components: {
    // HelloWorld
    myLayout
  },
  data:function(){
    return {
      // show:false
    }
  },  
}
</script>

<style lang="scss">
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
*{
  margin:0;
  padding: 0;
}
html,body{
  height: 100%;
}
#app{
  height: 100%;
  
}


</style>
