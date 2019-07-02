<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/activityBannerList' }">活动Banner管理</el-breadcrumb-item>
      <el-breadcrumb-item>Banner详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
      <el-form-item label="活动Banner名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请填写Banner名称" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="活动Banner备注" prop="remark">
        <el-input v-model="ruleForm.remark" placeholder="请填写活动Banner备注"></el-input>
      </el-form-item>
      <el-form-item label="活动Banner顺序" prop="sequence">
        <el-input v-model="ruleForm.sequence" placeholder="请填写Banner顺序"></el-input>
      </el-form-item>
      <el-form-item label="活动location" prop="location">
        <el-input v-model="ruleForm.location" placeholder="请填写location"></el-input>
      </el-form-item>
      <el-form-item label="活动banner" prop="file">
        <a class="upload-file" href="javascript:;" v-model="ruleForm.file">{{ruleForm.image}}<input type="file" accept="image/png,image/gif,image/jpeg" value="上传banner图片"  @change="tirggerFile($event)"></a>
        <input class="fileBox" type="hidden" v-model="ruleForm.file">
        <el-alert :closable="false" style="padding: 3px 16px;" title="banner推荐尺寸（636*210）" type="success"></el-alert>
      </el-form-item>
      <el-form-item label="活动Banner链接" prop="h5Url">
        <el-input v-model="ruleForm.h5Url" placeholder="请填写Banner链接"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="goBack" type="info">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        electData1:[],
        electValue1:'',
        ruleForm: {
          image:'上传banner图片',
          title: '',
          explainTxt: '',
          ruleExplain: '',
          file: '',
          position:[],
          jumpUrl:'',
          location:'',
        },
        rules: {
          name: [
            {  required: true, message: '请填写Banner名称', trigger: 'blur' },
          ],
          // file: [
          //   {  required: true, message: '请上传banner图片', trigger: 'change' }
          // ],
          sequence: [
            { required: true, message: '请填写banner顺序', trigger: 'change' }
          ],
          location: [
            { required: true, message: '请填写location', trigger: 'change' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'change' }
          ],
        },
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
        value7:'',
        newList:[],
      };
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            if(this.ruleForm.file){
              param.append('file', this.ruleForm.file);
            }
            param.append('name', this.ruleForm.name);
            param.append('id', this.$store.state.activeId);
            param.append('sequence', this.ruleForm.sequence);
            param.append('remark', this.ruleForm.remark);
            param.append('h5Url', this.ruleForm.h5Url);
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/flowPool/admin/activityBanner/edit",
              headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': this.$store.state.userToken
              },
              data:param,
            }).then((res)=>{
              if(res.data.msgCd=='ZYCASH-200'){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('/activityBannerList');
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
      tirggerFile($event){
        var file = $event.target.files[0];
        var name = $event.target.files[0].name;
        this.ruleForm.file = file;
        this.ruleForm.image = name;
      },
      //时间筛选11111
      logTimeChange(){
        if(this.ruleForm.position!='' && this.ruleForm.position!=null){
          var startTime=this.ruleForm.position[0];
          var endTime=this.ruleForm.position[1];
          this.startDate=startTime;
          this.endDate=endTime;
        } else {
          this.newList.push(this.ruleForm.position1,this.ruleForm.position2);
          // this.ruleForm.position=this.newList;
          // this.ruleForm.position=[this.ruleForm.position1,this.ruleForm.position2];
          this.startTime='';
          this.endTime='';
        }
      },
      /**
       * 通过活动id查询详情
       */
      getProductList(){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/activityBanner/get",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': this.$store.state.userToken
          },
          params:{
            id:this.$store.state.activeId,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.ruleForm=res.data.body;
            this.ruleForm.image='如需修改请点击上传';
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
    },
    mounted:function () {
      this.getProductList();
    }
  }
</script>

<style scoped>
  .content{
    padding-left: 200px;
    padding-top: 80px;
  }
  .demo-ruleForm{
    width: 600px;
    text-align: left;
  }
  .fs-16{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .upload-file{
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 30px;
    height: 30px;
  }
  .upload-file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .upload-file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
</style>
