<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/liveBroadcastList' }">直播管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加直播</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="content">
        <el-input v-model="ruleForm.content" placeholder="请填写用户名"></el-input>
      </el-form-item>
      <el-form-item label="直播备注" prop="remark">
        <el-input v-model="ruleForm.remark" placeholder="请填写直播备注"></el-input>
      </el-form-item>
      <el-form-item label="直播类型" prop="type">
          <el-select v-model="ruleForm.type" @change="selectChange1($event,electData)">
            <el-option
              v-for="item in electData"
              :key="item.key"
              :label="item.Id"
              :value="item.key">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="ruleForm.number" placeholder="请填写数量"></el-input>
      </el-form-item>
      <el-form-item label="照片" prop="file">
        <a class="upload-file" href="javascript:;" v-model="ruleForm.file">{{ruleForm.image}}<input type="file" accept="image/png,image/gif,image/jpeg" value="上传照片"  @change="tirggerFile($event)"></a>
        <input class="fileBox" type="hidden" v-model="ruleForm.file">
        <el-alert :closable="false" style="padding: 3px 16px;" title="照片推荐尺寸（636*210）" type="success"></el-alert>
      </el-form-item>
      <el-form-item label="跳转地址" prop="redirectUrl">
        <el-input v-model="ruleForm.redirectUrl" placeholder="请填写跳转地址"></el-input>
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
        electData: [
          {key:1,Id:"美女直播"},
          {key:2,Id:"游戏直播"},
        ],
        electData1:[],
        electValue1:'',
        ruleForm: {
          image:'上传照片',
          content: '',
          file: '',
          type:1,
          redirectUrl:'',
          remark:'',
          number:'',
        },
        rules: {
          content: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },

          ],
          file: [
            {  required: true, message: '请上传banner图片', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择直播类型', trigger: 'change' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'change' }
          ],
          number: [
            { required: true, message: '请填写数量', trigger: 'change' }
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
      //状态下拉选择
      selectChange1(vId,list){
        let obj1 = {};
        obj1 = list.find((item)=>{
          return item.Id ===vId;
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('content', this.ruleForm.content);
            param.append('file', this.ruleForm.file);
            param.append('remark', this.ruleForm.remark);
            param.append('number', this.ruleForm.number);
            param.append('redirectUrl', this.ruleForm.redirectUrl);
            param.append('type', this.ruleForm.type);
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/flowPool/admin/liveRadio/add",
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
                this.$router.push('/liveBroadcastList');
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
