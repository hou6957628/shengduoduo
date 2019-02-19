<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/channelStatistics' }">渠道统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-col :span="12" style="height: 55px;">
        <template>
          选择时间：
          <el-date-picker style="margin-left: 0"
                          v-model="value6"
                          type="datetimerange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions2"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          @change="logTimeChange1()">
          </el-date-picker>
        </template>
      </el-col>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 98%">
        <el-table-column
          fixed
          prop="id"
          label="渠道名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="parentChannelName"
          label="CPA"
          width="150">
        </el-table-column>
        <el-table-column
          prop="subChannelName"
          label="实名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="申请"
          width="120">
        </el-table-column>
        <el-table-column
          prop="longUrl"
          label="CPS"
          width="500">
        </el-table-column>
        <el-table-column
          prop="cpaPrice"
          label="cpa单价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cpsPrice"
          label="cps单价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="enable"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.enable == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.enable == true ? '启用' : '停用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="editProduct(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.enable" @click="obtainedProduct(scope.row)" type="text" size="small">停用</el-button>
            <el-button v-if="!scope.row.enable" @click="obtainedProduct(scope.row)" type="text" size="small">启用</el-button>
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
      //每页显示多少条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getProductList(this.pageNum,val,this.channel,this.ruleForm.productName);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.nowPageSizes);
        this.getProductList(val,this.nowPageSizes,this.channel,this.ruleForm.productName);
      },
      //非空判断
      chan(data){
        if(data==''|data==null){
          this.getProductList(1,30)
        }
      },
      /**
       * 获取渠道统计列表
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 开始时间
       * @param data4 结束时间
       */
      getProductList(data1,data2,data3,data4){
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/channel/admin/channel_statistics/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            startDate: data3,
            endDate: data4,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
          }else {
            this.$message.error(res.data.body.msgInfo);
          }
        })
      },
      //过滤类型字段
      typeFormatter(row){
        let status = row.type;
        if(status === 0){
          return '信贷产品'
        } else {
          return '分期产品'
        }
      },
      //时间筛选1
      logTimeChange1(){
        if(this.value6==''||this.value6==null){
          this.getProductList(this.pageNum,this.nowPageSizes,this.value8,null,null);
        }else {
          var startTime=this.value6[0];
          var endTime=this.value6[1];
          this.startTime=startTime;
          this.endTime=endTime;
          console.log("开始时间 : "+this.startTime+"结束时间 : "+this.endTime);
          // this.getProductList(this.pageNum,this.nowPageSizes,this.value8,this.startTime,this.endTime);
        }
      },
    },
    mounted:function () {
       this.getProductList(1,30);
    },
    data() {
      return {
        tableData: [],
        channel: '',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[30,40,50],
        nowPageSizes:30,
        value6:'',
        electData: [],
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
    margin-left: 20px;
    width: 300px;
    margin-right: 30px;
  }
  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
</style>
