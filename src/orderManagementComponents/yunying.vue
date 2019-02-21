<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userProductList' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userDetail' }">用户详情</el-breadcrumb-item>
      <el-breadcrumb-item>运营商通讯录比对</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listContent">
      <h4>基本信息</h4>
      <p>用户姓名：杨晶晶</p>
      <p>手机号：13718825134</p>
      <p>身份证号：370831199012013670</p>
    </div>
    <div class="listContent">
      <h4>联系人</h4>
      <table >
        <tr><td>联系人1</td><td>联系人借款关系：父母</td><td>姓名：杨大头</td><td>手机号：13718825134</td></tr>
        <tr><td>联系人2</td><td>联系人借款关系：兄弟</td><td>姓名：李超</td><td>手机号：18766562305</td></tr>
      </table>
    </div>
    <div class="listContentBox">
      <el-row>
        <el-col :span="24">
          <div class="">
            <h4>通话呼入分析</h4>
            <template>
              <el-table
                :data="tableData"
                border
                style="width: 98%;margin-top: 20px;">
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
        </el-col>
        <el-col :span="24">
          <div class="">
            <h4>通话呼出分析</h4>
            <template>
              <el-table
                :data="tableData"
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
        tableData: [],
        finProduct: '',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[30,50,80],
        nowPageSizes:30,
        value7:'',
      }
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
    },
    mounted: function () {
      // this.getProductList();
    }
  }
</script>

<style scoped>
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }
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
