<template>
  <div>
    <template>
      <el-table
        :data="count"
        border
        style="width: 98%;margin-top: 20px;">
        <el-table-column
          fixed
          prop="id"
          label="还款编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="还款方式"
          width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          label="还款通道"
          width="150">
        </el-table-column>
        <el-table-column
          prop="cardNumber"
          label="状态"
          width="150">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="birthDate"
          label="手机号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="交易流水号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="合同额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="逾期费用"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="罚息金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="总费用"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="减免金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="实际还款金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="是否是部分还款"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="部分还款金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="是否展期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="展期还款金额"
          width="100">
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
    data() {
      return {
        count: [],
        finProduct: '',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[30,50,80],
        nowPageSizes:30,
        value7:'',
      };
    },
    methods: {
      //每页显示多少条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getProductList(this.pageNum,val,this.finProduct,this.finProduct);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.nowPageSizes);
        this.getProductList(val,this.nowPageSizes,this.finProduct,this.finProduct);
      },
      //详情
      detailProduct(row){
        let id=row.id;
        this.$router.push({
          path: `/editFinanceProduct/${id}`,
        });
      },
      getCollection(id) {
        axios({
          method: "POST",
          url:"http://"+this.baseUrl+"/user_center/admin/repayment/get",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params: {
            id: id,
          }
        }).then((res) => {
          if (res.data.msgCd == 'ZYCASH-200') {
            this.count = res.data.body;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
          } else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
    },
    mounted: function () {
      this.id=this.$route.params.id;
      this.getCollection(this.id);
    },
    filters:{
      typeFalse:function(arg1){
        console.log(arg1);
        if(arg1==true){
          var result = "是";
          return result;
        }else if(arg1==false){
          var result = "否";
          return result;
        }

      },
      yuqi:function(arg1){
        if(arg1==9){
          var result = "是";
          return result;
        }else{
          var result = "否";
          return result;
        }

      }
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

  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
  .fs-16 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
