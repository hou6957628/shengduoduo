<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/activityManagement' }">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加活动</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请填写活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动说明" prop="explainTxt">
        <el-input v-model="ruleForm.explainTxt" placeholder="请填写活动说明"></el-input>
      </el-form-item>
      <el-form-item label="起止时间" prop="position">
          <el-date-picker
                          v-model="ruleForm.position"
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
      </el-form-item>
      <el-form-item label="活动规则说明" prop="ruleExplain">
        <el-input type="textarea" v-model="ruleForm.ruleExplain" placeholder="请填写活动规则说明"></el-input>
      </el-form-item>
      <el-form-item label="活动banner" prop="file">
        <a class="upload-file" href="javascript:;" v-model="ruleForm.file">{{ruleForm.image}}<input type="file" multiple accept="image/png,image/gif,image/jpeg" value="上传弹窗图片"  @change="tirggerFile($event)"></a>
        <input class="fileBox" type="hidden" v-model="ruleForm.file">
        <el-alert :closable="false" style="padding: 3px 16px;" title="banner推荐尺寸（636*210）" type="success"></el-alert>
      </el-form-item>
      <el-form-item label="活动链接" prop="jumpUrl">
        <el-input v-model="ruleForm.jumpUrl" placeholder="请填写活动链接"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="info">取消</el-button>
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
          position:'',
          jumpUrl:'',
        },
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },

          ],
          file: [
            {  required: true, message: '请上传图片', trigger: 'change' }
          ],
          explainTxt: [
            { required: true, message: '请填写活动说明', trigger: 'change' }
          ],
          ruleExplain: [
            { required: true, message: '请填写活动规则说明', trigger: 'change' }
          ],
          position: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
          jumpUrl: [
            { required: true, message: '请输入活动链接', trigger: 'change' }
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('file', this.ruleForm.file);
            param.append('title', this.ruleForm.title);
            param.append('explainTxt', this.ruleForm.explainTxt);
            param.append('ruleExplain', this.ruleForm.ruleExplain);
            param.append('startDate', this.startDate);
            param.append('endDate', this.endDate);
            param.append('enable', true);
            param.append('jumpUrl', this.ruleForm.jumpUrl);
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/flowPool/admin/activity_planing/add",
              headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              data:param,
            }).then((res)=>{
              if(res.data.msgCd=='ZYCASH-200'){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('/activityManagement');
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
      //时间筛选
      logTimeChange(){
        if(this.ruleForm.position!='' && this.ruleForm.position!=null){
          var startTime=this.ruleForm.position[0];
          var endTime=this.ruleForm.position[1];
          this.startDate=startTime;
          this.endDate=endTime;
        } else {
          this.startTime='';
          this.endTime='';
        }
      },
    },
    mounted:function () {
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
