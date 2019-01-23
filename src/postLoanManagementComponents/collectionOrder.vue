<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/collectionOrder' }">催收分单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listContent">
      <div class="listBox" v-for="(item,index) in productList" :key="index" @click="fen(item.key)">{{item.Id}}</div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-col :span="12" style="height: 55px;">
        <template>
          选择到期时间：
          <el-date-picker style="margin-left: 0"
                          v-model="value7"
                          type="datetimerange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions2"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          @change="logTimeChange2()">
          </el-date-picker>
        </template>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        渠道：
        <el-select v-model="electValue" placeholder="请选择" @change="selectChange">
          <el-option
            v-for="item in electData"
            :key="item.id"
            :label="item.classifyName"
            :value="item.classifyId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        期数：
        <el-select v-model="electValue1" placeholder="请选择" @change="selectChange1">
          <el-option
            v-for="item in electData1"
            :key="item.id"
            :label="item.classifyName"
            :value="item.classifyId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        新老户：
        <el-select v-model="electValue2" placeholder="请选择" @change="selectChange2">
          <el-option
            v-for="item in electData2"
            :key="item.id"
            :label="item.classifyName"
            :value="item.classifyId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="height: 55px;line-height: 40px;text-indent: 15px">
        案件数量:<span style="margin-right: 15px">{{casesNumber}}</span>
        <el-button type="primary">查询<i class="el-icon-search el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="24">
        <h3 style="color: #606266;font-weight: 400;height: 40px">导入催收员</h3>
        <el-form-item style="margin-left: 0" class="labelList" v-for="(domain, index) in electDataList.domains" :key="index">
            <!--<el-input style="height: 2px;display: inline-block;width: 2px" type="hidden" v-model="domain.itemAlias"></el-input>-->
            <!--<el-input style="height: 2px;display: inline-block;width: 2px" type="hidden" v-model="domain.symbolCode"></el-input>-->
            <div style="margin-left: -100px">
            催收员{{index}}： 姓名：
              <el-select v-model="domain.fieldCode">
                <el-option
                  v-for="item in fieldCodeList"
                  :key="item.key"
                  :label="item.Id"
                  :value="item.key">
                </el-option>
              </el-select>
            </div>
        </el-form-item>
          <el-button type="primary"  @click="addDomain" size="medium">添加催收员</el-button>
      </el-col>
      <el-col :span="24" style="margin-top: 30px;text-align: center">
        <el-button type="primary" class="btntn" @click="fendan()">分单</el-button><el-button class="btntn">取消</el-button>
      </el-col>
    </el-form>
    <el-dialog
      title="分单提醒"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <el-col :span="6" v-for="(item,index) in orderList" :key="index" style="margin-bottom: 15px">{{item.name}}&nbsp;:&nbsp;{{item.value}}单</el-col>
      <el-col :span="24" style="height: 40px;margin-bottom: 20px">
        <el-col :span="6" style="font-size: 16px">共计:1008</el-col>
        <el-col :span="6" style="font-size: 16px">催收员:10人</el-col>
      </el-col>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editTag()">确 定</el-button>
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
        orderList:[
          {name:"张磊",value:100},
          {name:"张磊",value:101},
          {name:"张磊",value:102},
          {name:"张磊",value:103},
          {name:"张磊",value:104},
        ],
        electData:[
          {key:0,Id:'不启用'},
          {key:1,Id:'启用'},
          {key:2,Id:'启用1'},
          {key:3,Id:'启用2'},
          {key:4,Id:'启用3'}
        ],
        electData1:[
          {key:0,Id:'不启用'},
          {key:1,Id:'启用'},
          {key:2,Id:'启用1'},
          {key:3,Id:'启用2'},
          {key:4,Id:'启用3'}
        ],
        electData2:[
          {key:0,Id:'不启用'},
          {key:1,Id:'启用'},
          {key:2,Id:'启用1'},
          {key:3,Id:'启用2'},
          {key:4,Id:'启用3'}
        ],
        fieldCodeList:[
          {key:0,Id:'天使分单1'},
          {key:1,Id:'天使分单2'},
          {key:2,Id:'天使分单3'},
          {key:3,Id:'天使分单4'},
          {key:4,Id:'天使分单5'}
        ],
        electValue:"",
        electValue1:"",
        electValue2:"",
        ruleForm: {
          merchantName: '',
          companyAddress: '',
          companyDetail: null,
          enabled: null,
          enabled1: [],
          enabled2: [],
          enabled3: [],
        },
        rules: {
          merchantName: [
            { required: true, message: '请输入商户名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          companyAddress: [
            { required: true, message: '请输入公司地址', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          companyDetail: [
            {  required: true, message: '请输入公司描述', trigger: 'change' }
          ],
          enabled: [
            { required: true, message: '请选择商户名称', trigger: 'change' }
          ]
        },
        value7:null,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        casesNumber:1000,
        electDataList: {
          domains: [{
            itemAlias: 1,symbolCode: null,fieldCode:null,
          }]
        },
        centerDialogVisible:false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('merchantName', this.ruleForm.merchantName)  // 通过append向form对象添加数据
            param.append('companyAddress', this.ruleForm.companyAddress) // 添加form表单中其他数据
            param.append('companyDetail', this.ruleForm.companyDetail) // 添加form表单中其他数据
            param.append('enabled', this.ruleForm.enabled) // 添加form表单中其他数据
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/operate/admin/productManage/createProduct",
              headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              data:param,
            }).then((res)=>{
              if(res.data.msgCd=='ZYCASH-200'){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('/productProductList');
              }else if(res.data.msgCd=='ZYCASH-1009'){
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
      //编辑产品接口
      editProduct(row){
        var param = new FormData();  // 创建form对象
        param.append('merchantName', this.ruleForm.merchantName);
        param.append('enabled', this.ruleForm.enabled);
        param.append('enableDelete', 0);
        param.append('company', null);
        param.append('companyAddress', this.ruleForm.companyAddress);
        param.append('companyDetail', this.ruleForm.companyDetail);
        param.append('email', null);
        param.append('mobile', null);
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/operate/admin/merchant/get",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          data:param,
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$router.push('/merchantProductList');
          }else if(res.data.msgCd=='ZYCASH--1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      fendan(){
        // this.idd;
        this.centerDialogVisible=true;
      },
      fen(data){
        this.idd=data;
        this.value7=null;
        this.electValue=null;
        this.electValue1=null;
        this.electValue2=null;
        this.casesNumber=null;
        this.electDataList.domains=[{
          itemAlias: 1,symbolCode: null,fieldCode:null,
        }];
        console.log(data);
      },
      editTag(){
        this.centerDialogVisible=true;
      },
      //添加数据
      addDomain() {
        localStorage.num++;
        this.electDataList.domains.push({
          itemAlias: localStorage.num,
          rate: null,
        });
      },
      //创建群组
      gozu(){},
      //时间筛选2
      logTimeChange2(){
        if(this.value5==''||this.value5==null){
          this.getProductList(this.pageNum,this.nowPageSizes,this.value8,null,null);
        }else {
          var startTime=this.value5[0];
          var endTime=this.value5[1];
          this.startTime=startTime;
          this.endTime=endTime;
          console.log("开始时间 : "+this.startTime+"结束时间 : "+this.endTime);
          // this.getProductList(this.pageNum,this.nowPageSizes,this.value8,this.startTime,this.endTime);
        }
      },
      //下拉选择
      selectChange(row){
        console.log(this.electValue);
      },
      selectChange1(row){
        console.log(this.electValue1);
      },
      selectChange2(row){
        console.log(this.electValue2);
      },

    },
    mounted:function () {
      localStorage.num=1;
      //this.getProductList();
    }
  }
</script>

<style scoped>
  .btntn {
    width: 120px;
    height: 50px;
    font-size: 18px;
    letter-spacing: 2px;
    margin: 0 20px;
  }
  .content{
    padding-left: 200px;
    padding-top: 80px;
  }
  .demo-ruleForm{
    width: 80%;
    text-align: left;
  }
  .fs-16{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .listContent{
    width: 100%;
    height: 80px;
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
</style>
