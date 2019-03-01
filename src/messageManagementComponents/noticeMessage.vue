<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/messageConfigurationList' }">消息配置</el-breadcrumb-item>
      <el-breadcrumb-item>创建短信</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item style="margin-top: 20px;width: 480px" label="选择所属APP:" prop="roleName">
        <el-select style="width: 320px" v-model="ruleForm.roleName" value-key="id" placeholder="请选择" @change="selectChange1($event,electData1)">
          <el-option
            v-for="item in electData1"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align: left">
        <el-button @click="addUser()" type="primary" plain>添加用户</el-button>
      </el-form-item>
      <el-form-item label="用户:" prop="user" v-if="user" style="margin-top: 20px;width: 480px">
        <el-input disabled="disabled" v-model="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item style="text-align: left;margin-top: 30px;">
        <el-button type="primary">短信</el-button>
        <el-button type="primary">弹窗</el-button>
        <el-button type="primary">推送</el-button>
        <el-button type="primary">提醒消息</el-button>
      </el-form-item>
      <el-form-item label="内容:" style="text-align: left;margin-top: 30px;">
        <template>
          <el-table
            :data="tableData4"
            style="width: 100%"
            max-height="1000">
            <el-table-column
              prop="name"
              label="消息形式"
              width="120">
            </el-table-column>
            <el-table-column
              prop="province"
              label="名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="分类"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="内容"
              width="200">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData4)"
                  type="text"
                  size="small">
                  移除
                </el-button>
                <el-button @click="detailProduct(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form-item>
      <el-form-item label="设定日期:" prop="dataTime" style="text-align: left">
        <el-radio-group v-model="ruleForm.time" @change="changeTime()">
          <el-radio label="1">每一天</el-radio>
          <el-radio label="2">时间段</el-radio>
          <el-radio label="3">某天</el-radio>
          <el-radio label="4">每隔多少天</el-radio>
          <el-radio label="5">立即执行</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="时间段:" prop="user" v-if="this.ruleForm.time==2" style="margin-top: 20px;width: 480px">
        <el-input v-model="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="日期:" prop="user" v-if="this.ruleForm.time==3" style="margin-top: 20px;width: 480px">
        <el-select style="width: 320px" v-model="ruleForm.roleName" value-key="id" placeholder="请选择" @change="selectChange1($event,electData1)">
          <el-option
            v-for="item in electData1"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="相隔天数:" prop="user" v-if="this.ruleForm.time==4" style="margin-top: 20px;width: 480px">
        <el-input v-model="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="输入具体时间:" prop="user" v-if="this.ruleForm.time==1" style="margin-top: 20px;width: 480px">
        <el-input v-model="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="desc">
        <el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="" @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
      <!--创建分类-->
      <el-dialog
        title="条件表"
        :visible.sync="centerDialogVisible"
        width="35%"
        center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="text-align: center;margin: 0 auto;" class="demo-ruleForm">
          <el-form-item>
            <el-radio-group style="text-align: center" v-model="ruleForm.resource" size="medium">
              <el-radio style="margin-bottom: 20px;width: 160px;margin-right: 10px" border label="线下场地免费"></el-radio>
              <el-radio style="margin-bottom: 20px;width: 160px;margin-right: 10px" border label="线下场地免费1"></el-radio>
              <el-radio style="margin-bottom: 20px;width: 160px;margin-right: 10px" border label="线下场地免费2"></el-radio>
              <el-radio style="margin-bottom: 20px;width: 160px;margin-right: 10px" border label="线下场地免费3"></el-radio>
              <el-radio style="margin-bottom: 20px;width: 160px;margin-right: 10px" border label="线下场地免费4"></el-radio>
              <el-radio style="margin-bottom: 20px;width: 160px;margin-right: 10px" border label="线下场地免费5"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="saveUser('ruleForm')">保存<i class="el-icon-check el-icon--right"></i></el-button>
            <el-button type="info"  @click="centerDialogVisible = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //手机号验证
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return {
        ruleForm: {
          name: '',
          mobile: '',
          password: '',
          rePassword: '',
          roleName: '',
          productName1: '',
          enabled: true,
          time:"1",
          dataTime:'',
        },
        user:false,
        rules: {
          name: [
            {required: true, message: '请输入产品说明', trigger: 'change'}
          ],
          mobile: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请选择是否启用', trigger: 'blur' }
          ],
          rePassword: [
            {  required: true, validator: validatePass2, trigger: 'blur' }
          ],
          roleName: [
            {required: true, message: '请选择是否启用', trigger: 'blur'}
          ],
          productName1: [
            {required: true, message: '请选择是否启用', trigger: 'blur'}
          ],
          enabled: [
            {required: true, message: '请选择是否启用', trigger: 'change'}
          ],
          productName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入备注', trigger: 'change' }
          ]
        },
        electData: [
          {key:true,Id:"启用"},
          {key:false,Id:"停用"},
        ],
        electData1: [],
        electData2: [],
        tableData:[],
        electValue:0,
        electValue1:0,
        products:[],
        products1:[],
        centerDialogVisible:false,
        tableData4:[{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: ' 1518 弄',
          zip: 200333
        },{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: ' 1518 弄',
          zip: 200333
        },{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: ' 1518 弄',
          zip: 200333
        },{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: ' 1518 弄',
          zip: 200333
        },
        ]
      };
    },
    methods: {

      //提交按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();
            param.append('id', this.id);
            param.append('name', this.ruleForm.name);
            param.append('mobile', this.ruleForm.mobile);
            param.append('password', this.ruleForm.password);
            param.append('roleId', this.ruleForm.roleName);
            param.append('roleName', this.ruleForm.roleName);
            param.append('enabled', this.ruleForm.enabled);
            param.append('products', this.ruleForm.productName1);
            axios({
              method: "POST",
              url: "http://39.105.217.251:9998/operate/admin/account/save",
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
        console.log(this.ruleForm.enabled);
      },
      //下拉选择
      selectChange1(vId,list){
        console.log(this.ruleForm.roleName);
      },
      //下拉选择
      selectChange2(){
        this.$forceUpdate();
        console.log(this.ruleForm.productName1);
      },
      getProductList() {
        axios({
          method: "POST",
          // url:"http://"+this.baseUrl+"/operate/admin/merchant/list",
          url: "http://39.107.228.38:31999/operate/admin/account/get",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            id: this.id,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.ruleForm = res.data.body;
            this.products.push({
              id:res.data.body.products[0].id,
              productName:res.data.body.products[0].productName,
            });
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //取消按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取管理产品列表
      getProductList1(){
        axios({
          method: "POST",
          url: "http://"+this.baseUrl+"/operate/admin/productManage/list",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            pageNum: 1,
            pageSize: 30,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.electData2 = res.data.body.list;
            for(var i=0;i<this.electData2.length;i++){
              this.products.push({
                id:this.electData2[i].id,
                productName:this.electData2[i].productName
              });
              this.$forceUpdate();
              console.log(this.products);
            }
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //添加用户
      addUser(){
        this.centerDialogVisible=true;
      },
      //创建分类
      toAddProduct(){
        this.centerDialogVisible=true;
      },
      //保存分类
      saveMessage(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('id', this.copyId)  // 通过append向form对象添加数据
            param.append('productName', this.ruleForm.productName)  // 通过append向form对象添加数据
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/operate/admin/productManage/saveProduct",
              headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              data:param,
            }).then((res)=>{
              if(res.data.msgCd=='ZYCASH-200'){
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.centerDialogVisible=true;
              } else {
                this.$message.error(res);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //保存用户
      saveUser(){
        this.user=true;
        this.centerDialogVisible=false;
      },
      //移除
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      //详情
      //审核订单
      detailProduct(){
        this.$router.push({
          path: `/editFinanceProduct`,
        });
      },
      //选择时间
      changeTime(){
        console.log(this.ruleForm.time);
      }
    },
    mounted: function () {
      this.getProductList1();
    },
  }
</script>

<style scoped>
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }

  .demo-ruleForm {
    width: 800px;
    text-align: center;
    margin-top: 50px;

  }

  .fs-16 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .upload-file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 30px;
    height: 30px;
  }

  .upload-file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .upload-file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
</style>
