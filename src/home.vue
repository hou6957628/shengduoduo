<template>
  <div>
    <topBar v-if="topBar"></topBar>
    <leftSilder v-if="leftSilder"></leftSilder>
    <router-view/>
  </div>
</template>
<script>
  //1.先使用import导入你要在该组件中使用的子组件
  import leftSilder from './components/leftSilder.vue'
  import topBar from './components/topBar.vue'

  export default {
    //2.然后,在components中写入子组件
    components: {leftSilder, topBar},
    methods: {},
    watch:{
      $route(e){
        if(e.name=='login'){
          this.topBar=false;
          this.leftSilder=false;
        }else{
          this.topBar=true;
          this.leftSilder=true;
        }
      }
    },
    mounted:function () {
      var test = window.location.href;
      if(test=="http://39.96.195.239/littleWhale/dist/index.html#/"){
        this.topBar=false;
        this.leftSilder=false;
      }else if(test=="http://47.93.234.167/littleWhale/dist/index.html#/"){
        this.topBar=false;
        this.leftSilder=false;
      }else if(test=="http://47.93.234.167/littleWhale/dist/index.html#/login"){
        this.topBar=false;
        this.leftSilder=false;
      }
      else if(test=="http://39.96.195.239/littleWhale/dist/index.html#/login"){
        this.topBar=false;
        this.leftSilder=false;
      }
    },
    data() {
      return {
        topBar: true,
        leftSilder: true,
      }
    }
  }
</script>

<style>
  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  /*清除浮动 解决父级塌陷问题*/
  #app:after {
    content: "";
    display: block;
    clear: both;
  }
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #eef0f5;
  }
</style>
