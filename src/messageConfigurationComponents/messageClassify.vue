<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/messageClassify' }">消息分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button class="upLoadBtn" @click="toAddProduct()" type="primary">创建产品&nbsp;<i class="el-icon-upload el-icon-circle-plus"></i></el-button>
      <template>
          申请时间：
          <el-date-picker style="margin-left: 0px;margin-right: 15px;"
                          v-model="value5"
                          type="datetimerange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions2"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          @change="logTimeChange()">
          </el-date-picker>
        </template>
      <el-input style="width: 350px;" class="searchContent"
                placeholder="输入名称或ID"
                v-model="finProduct"
                clearable>
        <el-button id="searchBtn" @click="searchContent(finProduct)" slot="append" icon="el-icon-search">查询</el-button>
      </el-input>
      <el-button type="primary" id="cancelBtn" @click="cancelContent()" slot="append">批量审批</el-button>
    </div>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        style="width: 98%">
        <el-table-column
          type="selection"
          label="批量"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="150">
        </el-table-column>
        <el-table-column
          fixed
          prop="classifyName"
          label="分类名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注"
          width="400">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="更新时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editProduct(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteProduct(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination class="paginationBox"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :unique-opened="true"
                     :current-page="pageNum"
                     :page-sizes="pageSizes"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="proTotal">
      </el-pagination>
    </div>
    <!--创建分类-->
    <el-dialog
      title="复制产品"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称:" prop="classifyName">
          <el-input v-model="ruleForm.classifyName"></el-input>
        </el-form-item>
        <el-form-item label="请输入备注:" prop="description">
          <el-input type="textarea":rows="3" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="ruleForm.id" @click="saveMessage('ruleForm')">保存<i class="el-icon-check el-icon--right"></i></el-button>
          <el-button type="primary" v-if="!ruleForm.id" @click="insertMessage('ruleForm')">保存<i class="el-icon-check el-icon--right"></i></el-button>
          <el-button type="info"  @click="centerDialogVisible = false">取消<i class="el-icon-close el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    methods: {
      //条件查询列表
      searchContent(data){
        this.getProductList(this.pageNum,this.nowPageSizes,this.startTime,this.endTime,data);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.nowPageSizes=val;
        this.getProductList(this.pageNum,val,this.startTime,this.endTime,this.finProduct);
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.startTime,this.endTime,this.finProduct);
      },
      /**
       * 获取分类列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 开始时间
       * @param data4 结束时间
       * @param data5 名称和id
       */
      getProductList(data1,data2,data3,data4,data5){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/message/admin/message_classify/find",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            startDate: data3,
            endDate: data4,
            condition: data5,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //审核订单
      detailProduct(){
        this.$router.push({
          path: `/editFinanceProduct`,
        });
      },
      //全选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //编辑
      editProduct(row){
        this.centerDialogVisible=true;
        this.ruleForm.id=row.id;
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/message/admin/message_classify/get",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id:row.id,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            console.log(res.data.body);
            this.ruleForm.classifyName=res.data.body.classifyName;
            this.ruleForm.description=res.data.body.description;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        });
      },
      //批量审批
      cancelContent(row){
        console.log(row);
      },
      //时间筛选
      logTimeChange(){
        if(this.value5==''||this.value5==null){
          this.startDate=null;
          this.endDate=null;
        }else {
          var startTime=this.value5[0];
          var endTime=this.value5[1];
          this.startTime=startTime;
          this.endTime=endTime;
        }
      },
      //提示删除分类接口
      deleteProduct(row){
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/message/admin/message_classify/delete",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            ids: row.id,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            if (res.data.body != 0) {
              this.$alert('该规则分类已被规则引用，不可删除', '提示', {
                confirmButtonText: '确定',
                center: true,
                type: 'warning'
              });
            } else {
              this.$confirm('是否确认删除此规则分类?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //确认删除分类接口
      deleteClassification(row){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/risk/admin/classification/delete",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
            status: 1,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getProductList(1,10,1,null);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
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
            param.append('classifyName', this.ruleForm.classifyName);
            param.append('description', this.ruleForm.description);
            param.append('id', this.ruleForm.id);
              axios({
                method:"POST",
                url:"http://"+this.baseUrl+"/message/admin/message_classify/update",
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
                  this.centerDialogVisible=false;
                  this.getProductList(1,30,null,null,null);
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
      //保存分类
      insertMessage(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('classifyName', this.ruleForm.classifyName);
            param.append('description', this.ruleForm.description);
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/message/admin/message_classify/insert",
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
                this.centerDialogVisible=false;
                this.getProductList(1,30,null,null,null);
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
      //检验分类创建校验名称是否重复
      repeatName(){

      }
    },
    mounted:function () {
      // this.startDate=this.dateFormat(new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate(), 0, 0, 0));
      // this.endDate=this.dateFormat(new Date());
      // this.value5=[this.startDate,this.endDate];
      // this.getProduct();
      this.getProductList(1,30,null,null,null);
    },
    data() {
      return {
        productList:[],
        ruleForm: {
          classifyName: '',
          description: '',
          merchantId: null,
        },
        finProduct:'',
        tableData:[],
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[20,30,50],
        nowPageSizes:20,
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
        productId:null,
        reBorrow:null,
        rules: {
          classifyName: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入备注', trigger: 'change' }
          ]
        },
        id:null,
        value5:null,
        startDate:null,
        endDate:null,
        centerDialogVisible:false,
      }
    }
  }
</script>

<style scoped>
  .searchContent{
    width: 200px;
  }
  .el-col-8{
    height: 55px;
  }
  .select{
    margin-left: 20px;
  }
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }
  .fs-16{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .operationContent{
    text-align: left;
    margin: 25px 30px 15px 0;
  }
  .operationContent .upLoadBtn{
    margin-right: 15px;
  }
  .operationContent .searchContent{
    margin-left:0;
    width: 200px;
    margin-right: 30px;
  }
  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
</style>
