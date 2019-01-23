<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userProductList' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listContent">
      <table>
        <tr><td>用户ID</td><td> Ying2111</td></tr>
        <tr><td>手机号</td><td>13718825134</td></tr>
        <tr><td>姓名</td><td>扬子</td></tr>
        <tr><td>身份证号码</td><td>341224198207307817</td></tr>
        <tr><td>状态</td><td>启用</td></tr>
        <tr><td>性别</td><td>男</td></tr>
        <tr><td>出生日期</td><td>1982-07-30</td></tr>
        <tr><td>创建日期</td><td>2018-12-04 17:18:15</td></tr>
        <tr><td>更新日期</td><td>2018-12-04 17:18:15</td></tr>
      </table>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="修改登录密码:" prop="classifyName">
          <el-input v-model="ruleForm.classifyName"></el-input>
        </el-form-item>
        <el-form-item label="确认登录密码:" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="是否启用:" prop="enabled">
          <el-select v-model="ruleForm.enabled" placeholder="请选择" @change="selectChange">
            <el-option
              v-for="item in electData"
              :key="item.key"
              :label="item.Id"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        tableData:[],
        electValue:0,
        electData: [
          {key:0,Id:"不启用"},
          {key:1,Id:"启用"},
        ],
        ruleForm: {
          classifyName: '',
          description: '',
          enabled: 1,
        },
        rules: {
          classifyName: [
            { required: true, message: '请输入标签分类名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          description: [
            {  required: true, message: '请输入产品说明', trigger: 'change' }
          ],
          enabled: [
            { required: true, message: '请选择是否启用', trigger: 'change' }
          ]
        }
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
  .demo-ruleForm{
    width: 400px;
    font-size: 16px;
    margin-top: 20px;
  }
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
  table,table tr th, table tr td { border:1px solid #838383; }
  table { width: 40%; min-height: 40px; line-height: 40px; text-align: center; border-collapse: collapse; padding:10px 5px;margin-top: 20px}

</style>
