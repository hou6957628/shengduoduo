<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userProductList' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listContent">
      <div class="listBox" v-for="item in productList" @click="fen(item.key)">{{item.Id}}</div>
    </div>
    <div class="listContent">
      <router-link to="/jiben" tag="li">基本信息</router-link>
      <router-link to="/fenxian" tag="li">风险命中列表</router-link>
      <router-link to="/yunying" tag="li">运营商通讯录比对</router-link>
      <router-link to="/tianji" tag="li">天机报告</router-link>
      <router-link to="/zhifu" tag="li">支付宝报告</router-link>
      <router-link to="/yonghu" tag="li">用户催收记录</router-link>
      <router-link to="/dingdan" tag="li">订单记录</router-link>
      <router-link to="/fangkuan" tag="li">放款记录</router-link>
      <router-link to="/huankuan" tag="li">还款记录</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        productList:[
          {key:0,Id:'天使分单1'},
          {key:1,Id:'天使分单2'},
          {key:2,Id:'天使分单3'},
          {key:3,Id:'天使分单4'},
          {key:4,Id:'天使分单5'}
        ],
        electData: [
          {key:0,Id:"全部产品"},
          {key:1,Id:"借点儿"},
          {key:2,Id:"夏花花"},
          {key:3,Id:"取消救济"},
        ],
        tableData:[],
        electValue:0,
      };
    },
    methods: {
      //提交按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('classifyCode', null);  // 这个字段没有
            param.append('classifyName', this.ruleForm.classifyName); // 通过append向form对象添加数据
            param.append('classifyType', 1); // 添加0：用户标签 1：规则标签 2:规则集标签
            param.append('description', this.ruleForm.description);
            axios({
              method: "POST",
              // url:"http://"+this.baseUrl+"/operate/admin/productManage/createProduct",
              url: "http://39.105.217.251:9998/risk/admin/classification/add",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              data: param,
            }).then((res) => {
              if (res.data.msgCd == 'ZYCASH-200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('/productProductList');
              } else if (res.data.msgCd == 'ZYCASH-1009') {
                this.$message.error(res.data.msgInfo);
              }
              else {
                this.$message.error(res);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //下拉选择
      selectChange(row){
        console.log(this.electValue);
      },
      getProductList() {
        axios({
          method: "POST",
          // url:"http://"+this.baseUrl+"/operate/admin/merchant/list",
          url: "http://39.107.228.38:31999/operate/admin/merchant/list",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            pageNum: 1,
            pageSize: 20,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.electData = res.data.body.list;
            console.log(this.electData);
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //取消按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //
      getCheckedNodes() {
        var rad=''
        var ridsa = this.$refs.tree.getCheckedKeys().join(',')// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
        var ridsb = this.$refs.tree.getCheckedNodes()// 获取当前的选中的数据{对象}
        ridsb.forEach(ids=>{//获取选中的所有的父级id
          // rad+=','+ids.pid
        })
        rad=rad.substr(1) // 删除字符串前面的','
        var rids=rad+','+ridsa
        var arr=rids.split(',')//  把字符串转换成数组
        arr=[...new Set(arr)]; // 数组去重
        rids=arr.join(',')// 把数组转换成字符串
        console.log(rids)
      },
      //跳转到主渠道
      addChannel(){
        this.$router.push({
          path: `/addAccount`,
        });
      },
      //
      fen(data){
        console.log(data);
      },
    },
    mounted: function () {
      // this.getProductList();
    }
  }
</script>

<style scoped>
  .listBox{
    display: inline-block;
    float: left;
    padding: 10px 20px;
    margin: 0 5px;
    font-size: 17px;
    color: #000;
    background-color: #dedede;
    border: 1px solid #b0b0b0;
    border-radius: 10px;
    cursor: pointer;
  }
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }
  .listContent{
    clear: both;
    height: 80px;
  }
  .listContent li{
    display: inline-block;
    padding: 10px 15px;
    margin-right: 10px;
    margin-left: 5px;
    font-size: 16px;
    color: #ffffff;
    background-color: #118efe;
    border: 1px solid #0f91ff;
    border-radius: 5px;
    cursor: pointer;
  }
  .listContent li:hover{
    color: #ffffff;
    background-color: #0abcfe;
    border: 1px solid #0fbeff;
  }
  .fs-16 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
