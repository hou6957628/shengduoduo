<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button id="addActivity" type="primary" @click="addActivity()" slot="append" icon="el-icon-plus">添加活动</el-button>
      <el-input class="searchContent" placeholder="请输入活动名称" v-model="activeName" clearable></el-input>
      <el-button type="primary" @click="selectChange()" slot="append" icon="el-icon-search">搜索</el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        highlight-current-row
        style="width:98%">
        <el-table-column
          fixed
          prop="id"
          align="center"
          label="活动编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="title"
          label="活动名称"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ruleExplain"
          label="备注"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="enable"
          label="状态"
          align="center"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.enable == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.enable == true ? '启用' : '禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="detailProduct(scope.row)" type="text" size="medium">详情</el-button>
            <el-button @click="prohibitBtn(scope.row)" type="text" size="medium">{{(scope.row.enable)?'禁用':'启用'}}</el-button>
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
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    methods: {
      //根据产品查询
      selectChange() {
        this.getProductList(1,20,this.activeName);
      },
      //条件查询
      searchContent(){
        this.getProductList(1,20,this.activeName);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.activeName);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.activeName);
      },
      /**
       * 获取金融产品列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 活动名称
       */
      getProductList(data1,data2,data3){
        axios({
          method:"GET",
          url:"http://"+this.baseUrl+"/flowPool/admin/activity_planing/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            activityName:this.activeName,
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
      //修改接口
      editProduct(row){
        let id=row.id;
        this.$router.push({
          path: `/modifyUserInformation/${id}`,
        });
      },
      //详情接口
      detailProduct(row){
        let id=row.id;
        this.$store.dispatch('setActiveId',id);
        this.$router.push({
          path: `/activityDetail`,
        });
      },
      //禁用按钮
      prohibitBtn(row){
        console.log(row.enable);
        let id=row.id;
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/activity_planing/enable",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:id,
            enable:!row.enable,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              showClose: true,
              message: res.data.msgInfo,
              type: 'success'
            });
            this.getProductList();
          }else {
            this.$message.error(res.data.msgInfo);
          }
        });
      },
      addActivity(){
        this.$router.push({
          path: `/addActivity`,
        });
      },
      stopBtn(){},
    },
    mounted:function () {
      this.getProductList(1,20);
    },
    data() {
      return {
        activeName:'',
        tableData:[],
        productId:null,
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
      }
    }
  }
</script>

<style scoped>
  #batchDele{
    margin-left:30px;
  }
  #batchPass{
    margin-left:30px;
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

  }
  .operationContent .searchContent{
    margin-left:520px;
    width: 200px;
    margin-right: 5px;
  }
  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
</style>
