<template>
    <div class="content">
      <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>渠道统计中心</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operationContent">
        <el-col :span="9" style="height: 55px;">
          <template>
            时间：
            <el-date-picker style="margin-left: 0px"
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
                            @change="logTimeChange()">
            </el-date-picker>
          </template>
        </el-col>
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
          渠道：
          <el-select v-model="channelIds" placeholder="请选择">
            <el-option
              v-for="item in productList"
              :key="item.productId"
              :label="item.productName"
              :value="item.productId">
            </el-option>
          </el-select>
        </el-col>
        <el-input style="width: 300px;margin-right: 10px"
          placeholder="名称或链接"
          v-model="value8"
          clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchContent">搜索</el-button>
        <el-button type="primary" @click="daoBtn">导出<i class="el-icon-download el-icon--right"></i></el-button>
          <!--<a :href="http://192.168.20.216:9999/super/admin/productinfo/export?name="++'&startDate='+this.startTime+'&endDate='+this.endTime+'&token='+localStorage.token">导出</a>-->
          <!--<a href="http://192.168.20.216:9999/super/admin/productinfo/export?name"+{{}}+>导出</a>-->
          <!--<a v-bind:href="['http://192.168.20.216:9999/super/admin/productinfo/export?name'+this.value8+'&startDate='+this.startTime+'&endDate='+this.endTime+'&token='+localStorage.token]">导出</a>-->
          <!--<a :href="'http://192.168.20.216:9999/super/admin/productinfo/export?name'+this.value8+'&startDate='+this.startTime+'&endDate='+this.endTime+'&token='+this.token">这是一个动态链接</a>-->
      </div>
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="productName"
            label="产品名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="statisticsDate"
            label="主渠道名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="statisticsDate"
            label="子渠道名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="statisticsDate"
            label="时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="cpaPrice"
            label="CPA单价"
            width="120">
          </el-table-column>
          <el-table-column
            prop="cpaNumber"
            label="CPA数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="cpsPrice"
            label="CPS单价"
            width="120">
          </el-table-column>
          <el-table-column
            prop="cpsNumber"
            label="CPS数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="uvPrice"
            label="当日成本"
            width="120">
          </el-table-column>
          <el-table-column
            prop="uvPrice"
            label="备注"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button @click="detailChannel(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="editChannel(scope.row)" type="text" size="small">编辑</el-button>
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
      //条件查询
      searchContent(){
        this.getProductList(this.pageNum,this.nowPageSizes,this.startTime,this.endTime,this.productId,this.channelIds,this.channelName);
      },
      //每页显示多少条
      handleSizeChange(val) {
        this.nowPageSizes=val;
        this.getProductList(this.pageNum,val,this.startTime,this.endTime,this.productId,this.channelIds,this.channelName);
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.startTime,this.endTime,this.productId,this.channelIds,this.channelName);
      },
      //时间筛选
      logTimeChange(){
        if(this.value7!='' && this.value7!=null){
          var startTime=this.value7[0];
          var endTime=this.value7[1];
          this.startTime=startTime;
          this.endTime=endTime;
        } else {
          this.startTime='';
          this.endTime='';
        }
      },
      //导出
      daoBtn(){
        axios({
          method:"get",
          // url:"http://192.168.20.216:9999/super/admin/productinfo/export",
          url:"http://"+this.baseUrl+"/super/admin/productinfo/exportToken",
          headers:{
            "content-type":"application/x-download;charset=utf-8",
            "content-disposition":"attachment;filename=total.xls",
            'Authorization': localStorage.token
          },
          params:{
            name: this.value8,
            startDate: this.startTime,
            endDate: this.endTime,
            token:localStorage.token
          }
        }).then((res)=>{
          console.log(res);
          console.log(res.data);
          console.log(res.data.token);
          this.token=res.data.token;
          this.download(res);
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        })
      },
      /**
       * 列表查询
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 开始时间
       * @param data4 结束时间
       * @param data5 产品id
       * @param data6 渠道id集合
       * @param data7 名称或链接
       */
      getProductList(data1,data2,data3,data4,data5,data6,data7){
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/super/admin/productinfo/getProductInfoListByName",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            startDate: data3,
            endDate: data4,
            productId: data5,
            channelIds: data6,
            channelName: data7,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-SUPERMARKET-200'){
            this.tableData=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //下载文件
      download (data) {
        if (!data) {
          return
        }
        let url = "http://"+this.baseUrl+"/super/admin/productinfo/export?name="+this.value8+"&startDate="+this.startTime+"&endDate="+this.endTime+"&token="+this.token;
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', 'excel.xls');
        document.body.appendChild(link);
        link.click()
      },
      //详情
      detailChannel(){
        this.$router.push({
          path: `/operation/${id}/${countType}`,
        });
      },
      //编辑
      detailChannel(){
        this.$router.push({
          path: `/operation/${id}/${countType}`,
        });
      }
    },
    mounted:function () {
      this.getProductList(1,10,null,null,null,null,null);
    },
    data() {
      return {
        tableData: [],
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
        value8:'',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[10,30,50],
        nowPageSizes:10,
        value7: '',
        startTime:'',
        endTime:'',
        productId: '',
        channelIds: '',
        channelName: '',
        token:""
      }
    }
  }
</script>

<style scoped>
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
