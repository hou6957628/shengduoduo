<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/collectionTag' }">催收标签</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button class="upLoadBtn" @click="toTag()" type="primary">添加催收标签<i class="el-icon-upload el-icon-circle-plus"></i></el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="classifyCode"
          label="标签编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="classifyName"
          label="标签内容"
          width="400">
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
    <!--添加标签结构-->
    <el-dialog
      title="催收标签"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      标签内容：<el-input v-model="content" style="width: 300px"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitTag()">确 定</el-button>
  </span>
    </el-dialog>
    <!--编辑标签结构-->
    <el-dialog
      title="催收标签"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center>
      标签内容：<el-input v-model="content" style="width: 300px"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="editTag()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
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
      //创建金融产品
      toTag(){
        this.centerDialogVisible=true;
      },
      /**
       * 用户标签列表接口
       * @param data1 查询第几页
       * @param data2 每页显示多少条数据
       * @param data3 标签名称
       * @param data4 分类名称
       */
      getProductList(data1,data2,data3,data4){
        axios({
          method:"GET",
          // url:"http://"+this.baseUrl+"/admin/customer_tag/list",
          url:"http://39.105.217.251:9998/risk/admin/classification/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            classifyType: data3,
            classifyName: data4,
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
      //编辑产品接口
      editProduct(row){
        this.centerDialogVisible1=true;
      },
      //添加催收标签-保存按钮
      submitTag(){
        this.centerDialogVisible=false;
      },
      //编辑催收标签-保存按钮
      editTag(){
        this.centerDialogVisible1=false;
      },
      //删除产品接口
      deleteProduct(row){
        axios({
          method:"post",
          // url:"http://"+this.baseUrl+"/super/admin/product/obtainedProduct",
          url:"http://"+this.baseUrl+"/operate/admin/product/delOrStopProduct",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
            status: 1,
            enabled: row.enabled,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-SUPERMARKET-200'){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getProductList(1,10,this.finProduct,this.finProduct);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //过滤类型字段
      typeFormatter(row){
        let status = row.type;
        if(status === 0){
          return '用户标签'
        }else if(status === 1){
          return '规则标签'
        }else {
          return '规则集标签'
        }
      },
    },
    mounted:function () {
      this.getProductList(1,20,1,null);
    },
    data() {
      return {
        tableData:[],
        electValue:'',
        finProduct: '',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[20,30,50],
        nowPageSizes:20,
        content:'这是内容',
        centerDialogVisible:false,
        centerDialogVisible1:false,
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
