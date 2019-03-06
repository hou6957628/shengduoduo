<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>消息配置</el-breadcrumb-item>
      <el-breadcrumb-item>任务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <div style="margin-bottom: 15px">
      <el-button class="upLoadBtn" @celectDatalick="toAddProduct()" type="primary">创建消息&nbsp;<i class="el-icon-upload el-icon-circle-plus"></i></el-button>
      <el-button class="upLoadBtn" @click="toMessageClassify()" type="primary">日志列表&nbsp;<i class="el-icon-upload el-icon-circle-plus"></i></el-button>
      <el-button type="primary" id="cancelBtn" @click="cancelContent()" slot="append">批量删除</el-button>
      <el-button type="primary" id="cancelBtn1" @click="cancelContent()" slot="append">批量停用</el-button>
      <el-button type="primary" id="cancelBtn2" @click="cancelContent()" slot="append">批量执行</el-button>
      </div>
      <el-col :span="6" style="height: 55px;">
        产品：
        <el-select v-model="productId" placeholder="请选择">
          <el-option
            v-for="item in productList"
            :key="item.productId"
            :label="item.productName"
            :value="item.productId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="height: 55px;">
        形式：
        <el-select v-model="modeId" placeholder="请选择">
          <el-option
            v-for="item in modeIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12" style="height: 55px;">
        分类：
        <el-select v-model="classifyId" placeholder="请选择">
          <el-option
            v-for="item in messageClassifyList"
            :key="item.id"
            :label="item.classifyName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <template>
        时间：
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
                placeholder="请输入消息名称，bean名称，ID"
                v-model="finProduct"
                clearable>
      </el-input>
      <el-button type="primary" id="searchBtn" @click="searchContent()" slot="append" icon="el-icon-search">查询</el-button>
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
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="所属产品"
          width="120">
        </el-table-column>
        <el-table-column
          prop="messageName"
          label="消息名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="modeName"
          label="消息形式"
          width="150">
        </el-table-column>
        <el-table-column
          prop="classifyName"
          label="消息分类"
          width="150">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="备注"
          width="300">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="更新时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="发送时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.enabled == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.enabled == true ? '使用中' : '已停用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="创建方式"
          :formatter="typeFormatter"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="280">
          <template slot-scope="scope">
            <el-button @click="editProduct(scope.row)" type="text" size="medium">编辑</el-button>
            <el-button @click="deleteProduct(scope.row)" type="text" size="medium">删除</el-button>
            <el-button @click="copeProduct(scope.row)" type="text" size="medium">复制</el-button>
            <el-button @click="copeProduct(scope.row)" type="text" size="medium">停用</el-button>
            <el-button @click="copeProduct(scope.row)" type="text" size="medium">执行</el-button>
            <el-button @click="detailProduct(scope.row)" type="text" size="medium">详情</el-button>
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
      //查询所有产品
      getProduct() {
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/order/admin/borrowing/getProductList",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.productList=res.data.body;
            this.productList.unshift({productId: null, productName: '全部产品'});
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      //查询所有分类
      getMessageClassifyList(data1,data2) {
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
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.messageClassifyList=res.data.body.list;
            this.messageClassifyList.unshift({id: null, classifyName: '全部分类'});
          }else if(res.data.msgCd=='ZYCASH-1009'){
            this.$message.error(res.data.msgInfo);
          }
          else {
            this.$message.error(res);
          }
        })
      },
      //条件查询列表
      searchContent(data){
        this.getProductList(this.pageNum,this.pageSize,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
          this.sex,this.mobile,this.startDate,this.endDate);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.nowPageSizes=val;
        this.getProductList(this.pageNum,val,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
          this.sex,this.mobile,this.startDate,this.endDate);
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.productId,this.reBorrow,this.parentChannelName,this.childrenChannelName,
          this.sex,this.mobile,this.startDate,this.endDate);
      },
      /**
       * 获取待放款订单列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 产品id
       * @param data4 消息形式id
       * @param data5 分类id
       * @param data6 开始时间
       * @param data7 结束时间
       * @param data8 消息名称、bean名称、ID
       */
      getProductList(data1,data2,data3,data4,data5,data6,data7,data8){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/message/admin/task/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum:data1,
            pageSize:data2,
            productId: data3,
            modeId: data4,
            classifyId: data5,
            startTime: data6,
            endTime: data7,
            conditionName: data8,
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
      toAddProduct(){
        this.$router.push({
          path: `/noticeMessage`,
        });
      },
      //审核订单
      toMessageClassify(){
        this.$router.push({
          path: `/messageClassify`,
        });
      },
      //审核订单
      detailProduct(){
        this.$router.push({
          path: `/editFinanceProduct`,
        });
      },
      //下拉选择
      selectChange(vId,list) {
        let obj = {};
        obj = list.find((item) => {
          console.log(item.productName === vId);
          return item.productName === vId;
        });
        this.getProductList(1,30,null,null);
      },
      //下拉选择
      selectChange1(vId,list) {
        let obj = {};
        obj = list.find((item) => {
          console.log(item.productName === vId);
          return item.productName === vId;
        });
        this.getProductList(1,30,null,null);
      },
      //下拉选择
      selectChange2(vId,list) {
        let obj = {};
        obj = list.find((item) => {
          console.log(item.productName === vId);
          return item.productName === vId;
        });
        this.getProductList(1,30,null,null);
      },
      //分类列表
      toMessageClassify(){
        this.$router.push({
          path: `/messageClassify`,
        });
      },
      //全选
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
          url:"http://"+this.baseUrl+"/risk/admin/classification/getRuleByClassId",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
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
                this.deleteClassification(row);
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
      //复制接口
      copeProduct(row){
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
      //过滤创建方式字段
      typeFormatter(row){
        let type = row.type;
        if (type == 0) {
          return '通知类';
        } else if (type == 1) {
          return '触发类';
        } else if (type == 2) {
          return '营销类';
        } else if (type == 3) {
          return '技术人员';
        }
      }
    },
    mounted:function () {
      this.getProduct();
      this.getMessageClassifyList(1,100);
      this.getProductList(1,30,null,null,null,null,null,null);
    },
    data() {
      return {
        productList:[],
        modeIdList: [
          {id:null,name:"全部形式"},
          {id:1,name:"短信消息"},
          {id:2,name:"提醒消息"},
          {id:3,name:"弹窗消息"},
          {id:4,name:"推送消息"},
        ],
        messageClassifyList:[],

        productId:'',
        modeId:null,
        classifyId:null,




        ruleForm: {
          id: '',
          parentChannelName: '',
          subChannelName: '',
          longUrl: '',
          cpaPrice: '',
          cpsPrice: '',
          productName: '',
          productCode: '',
        },
        finProduct:null,
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
        parentChannelName:null,
        childrenChannelName:null,
        sex:null,
        mobile:null,
        value5:'',
        startDate:null,
        endDate:null,
        electData1: [
          {productCode:1,productName:"启用1"},
          {productCode:0,productName:"停用1"},
        ],
        electData2: [
          {productCode:1,productName:"启用2"},
          {productCode:0,productName:"停用2"},
        ],
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
    margin-left:0px;
    width: 200px;
    margin-right: 30px;
  }
  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
</style>
