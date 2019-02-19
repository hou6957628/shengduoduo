<template>
  <div>
    <div class="listContent">
      <h4>基本信息</h4>
      <p>用户姓名：{{this.cusCustomer.realName}}</p>
      <p>手机号：{{this.cusCustomer.mobile}}</p>
      <p>身份证号：{{this.cusCustomer.cardNumber}}</p>
    </div>
    <div class="listContent">
      <h4>联系人</h4>
      <table >
        <tr><td>第一联系人</td><td>联系人借款关系：{{this.linkManList.relation | myCurrency}}</td><td>姓名：{{this.linkManList.name}}</td><td>手机号：{{this.linkManList.phoneNum}}</td></tr>
        <tr><td>第二联系人</td><td>联系人借款关系：{{this.linkManList.relation | myCurrency}}</td><td>姓名：{{this.linkManList.name}}</td><td>手机号：{{this.linkManList.phoneNum}}</td></tr>
      </table>
    </div>
    <div class="listContentBox">
      <el-row>
        <el-col :span="24">
          <div class="">
            <h4>通话呼入分析</h4>
            <template>
              <el-table
                :data="tableDataFrom"
                border
                style="width: 100%;margin-top: 20px;">
                <el-table-column
                  fixed
                  prop="name"
                  label="姓名"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="realName"
                  label="号码"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="互联网标识"
                  sortable
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="productId"
                  label="类别标签"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="createDate"
                  label="归属地"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="channelName"
                  label="联系时间(分)"
                  sortable
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="subChannelName"
                  label="被叫次数"
                  sortable
                  width="150">
                </el-table-column>
              </el-table>
            </template>
            <div class="block">
              <el-pagination class="paginationBox"
                             @size-change="handleSizeChangeFrom"
                             @current-change="handleCurrentChangeFrom"
                             :unique-opened="true"
                             :current-page="pageNum"
                             :page-sizes="pageSizes"
                             :page-size="pageSize"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="proTotal">
              </el-pagination>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="">
            <h4>通话呼出分析</h4>
            <template>
              <el-table
                :data="tableDataTo"
                border
                style="width: 100%;margin-top: 20px;">
                <el-table-column
                  fixed
                  prop="name"
                  label="姓名"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="realName"
                  label="号码"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="互联网标识"
                  sortable
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="productId"
                  label="类别标签"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="createDate"
                  label="归属地"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="channelName"
                  label="联系时间(分)"
                  sortable
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="subChannelName"
                  label="被叫次数"
                  sortable
                  width="150">
                </el-table-column>
              </el-table>
            </template>
            <div class="block">
              <el-pagination class="paginationBox"
                             @size-change="handleSizeChangeTo"
                             @current-change="handleCurrentChangeTo"
                             :unique-opened="true"
                             :current-page="pageNum1"
                             :page-sizes="pageSizes1"
                             :page-size="pageSize1"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="proTotal1">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        tableDataFrom: [],
        tableDataTo: [],
        finProduct: '',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[30,50,80],
        nowPageSizes:30,
        pageNum1: null,
        proTotal1:null,
        pageSize1:null,
        pageSizes1:[30,50,80],
        nowPageSizes1:30,
        value7:'',
        linkManList:[],
        cusCustomer:[],
      }
    },
    methods: {
      //每页显示多少条
      handleSizeChangeFrom(val) {
        this.getAddressFrom(this.pageNum,val,this.finProduct,this.finProduct);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChangeFrom(val) {
        console.log(this.nowPageSizes);
        this.getAddressFrom(val,this.nowPageSizes,this.finProduct,this.finProduct);
      },
      //每页显示多少条
      handleSizeChangeTo(val) {
        this.getAddressTo(this.pageNum1,val,this.finProduct,this.finProduct);
        this.nowPageSizes1=val;
      },
      //翻页
      handleCurrentChangeTo(val) {
        this.getAddressTo(val,this.nowPageSizes1,this.finProduct,this.finProduct);
      },
      //运营商通讯录比对---呼入
      getAddressFrom(id){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/user_center/admin/address/get",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
           id:id
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableDataFrom=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
            this.linkManList=res.data.body.linkMan;
            this.cusCustomer=res.data.body.cusCustomer;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //运营商通讯录比对--呼出
      getAddressTo(id){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/user_center/admin/address/get",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id:id
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableDataTo=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //过滤类型字段
      typeFormatter(row){
        let status = row.relation;
        if(status === 0){
          return '信贷产品'
        } else {
          return '分期产品'
        }
      }
    },
    mounted: function () {
      this.id=this.$route.params.id;
      this.getAddressFrom(this.id);
      this.getAddressTo(this.id);
    },
    //过滤器的本质 就是一个有参数有返回值的方法
    filters:{
      myCurrency:function(arg1){
        console.log(arg1);
        //根据业务需要，对传来的数据进行处理
        // 并返回处理后的结果
        if(arg1==0){
          var result = "父母";
          return result;
        }else if(arg1==1){
          var result = "配偶";
          return result;
        }
        else if(arg1==2){
          var result = "兄弟姐妹";
          return result;
        }
        else if(arg1==3){
          var result = "同事";
          return result;
        }
        else if(arg1==4){
          var result = "同学";
          return result;
        }
        else if(arg1==5){
          var result = "朋友";
          return result;
        }
      }
    }
  }
</script>

<style scoped>
  .listContent{
    clear: both;
    height: 140px;
    width: 90%;
    border: 1px solid #ccc;
    margin-top: 15px;
    padding: 10px;
  }
  .listContentBox{
    clear: both;
    min-height: 400px;
    width: 90%;
    border: 1px solid #ccc;
    margin-top: 15px;
    padding: 10px;
    margin-bottom: 30px;
  }
  .fs-16 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .content p{
    margin-top: 15px;
  }
  table,table tr th, table tr td { border:1px solid #838383; }
  table { width: 100%; min-height: 40px; line-height: 40px; text-align: left;text-indent: 5px; border-collapse: collapse;margin-top: 20px}

  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
</style>
