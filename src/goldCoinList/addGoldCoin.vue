<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/goldCoinList' }">金币抽大奖</el-breadcrumb-item>
      <el-breadcrumb-item>添加金币抽大奖活动</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
      <el-form-item label="奖品标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请填写奖品标题"></el-input>
      </el-form-item>
      <el-form-item label="总需人次" prop="personTime">
        <el-input v-model="ruleForm.personTime" placeholder="请填写总需人次"></el-input>
      </el-form-item>
      <el-form-item label="是否指定终奖用户:" prop="isSpecify">
        <el-select v-model="ruleForm.isSpecify" placeholder="是否指定终奖用户"  @change="selectChange1($event)">
          <el-option
            v-for="item in electData"
            :key="item.key"
            :label="item.Id"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="specify" label="获奖人ID" prop="specifyCustomerId">
        <el-input v-model="ruleForm.specifyCustomerId" placeholder="请填写获奖人ID"></el-input>
      </el-form-item>
      <el-form-item label="奖品价格" prop="price">
        <el-input v-model="ruleForm.price" placeholder="请填写奖品价格"></el-input>
      </el-form-item>
      <el-form-item label="奖品描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description" placeholder="为对此产品的奖品描述"></el-input>
      </el-form-item>
      <el-form-item label="奖品奖品icon" prop="iconFile">
        <a class="upload-file" href="javascript:;" v-model="ruleForm.iconFile">{{ruleForm.image}}<input type="file" multiple accept="image/png,image/gif,image/jpeg" value="上传弹窗图片"  @change="tirggerFile($event)"></a>
        <input class="fileBox" type="hidden" v-model="ruleForm.iconFile">
        <!--<el-alert :closable="false" style="padding: 3px 16px;" title="" type="success"></el-alert>-->
      </el-form-item>
      <el-form-item label="展示图片" prop="showFile">
        <a class="upload-file" href="javascript:;" v-model="ruleForm.showFile">{{ruleForm.showImage}}<input type="file" multiple accept="image/png,image/gif,image/jpeg" value="上传弹窗图片"  @change="tirggerShowFile($event)"></a>
        <input class="fileBox" type="hidden" v-model="ruleForm.showFile">
        <!--<el-alert :closable="false" style="padding: 3px 16px;" title="" type="success"></el-alert>-->
      </el-form-item>
      <el-form-item label="产品介绍图片" prop="introduceFile">
        <a class="upload-file" href="javascript:;" v-model="ruleForm.introduceFile">{{ruleForm.introduceImage}}<input type="file" multiple accept="image/png,image/gif,image/jpeg" value="上传弹窗图片"  @change="tirggerIntroduceFile($event)"></a>
        <input class="fileBox" type="hidden" v-model="ruleForm.introduceFile">
        <!--<el-alert :closable="false" style="padding: 3px 16px;" title="" type="success"></el-alert>-->
      </el-form-item>
      <el-form-item label="活动规则说明" prop="description1">
        <el-input type="textarea" v-model="ruleForm.description1" placeholder="活动规则说明"></el-input>
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
        specify:false,
        ruleForm: {
          image:'上传icon图片',
          showImage:'上传展示图片',
          introduceImage:'上传产品说明图片',
          title: '',
          personTime: '',
          isSpecify: 0,
          delivery: false,
          price: '',
          description: '',
          description1: '',
          iconFile: '',
          showFile: '',
          introduceFile: '',
          specifyCustomerId: '',
          files:[
            {type:'',imageUrlFile:'',description:''},
            {type:'',imageUrlFile:'',description:''}
          ]
        },
        rules: {
          title: [
            { required: true, message: '请输入奖品标题', trigger: 'blur' },

          ],
          iconFile: [
            {  required: true, message: '请上传图片', trigger: 'change' }
          ],
          showFile: [
            {  required: true, message: '请上传展示图片', trigger: 'change' }
          ],
          introduceFile: [
            {  required: true, message: '请上传产品介绍图片', trigger: 'change' }
          ],
          personTime: [
            { required: true, message: '请输入总需人次', trigger: 'change' }
          ],
          isSpecify: [
            { required: true, message: '请选择是否指定终奖用户', trigger: 'change' }
          ],
          specifyCustomerId: [
            { required: true, message: '请输入获奖人的ID', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请填写奖品价格', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请填写奖品描述', trigger: 'blur' }
          ],
          description1: [
            { required: true, message: '请填写附件描述', trigger: 'blur' }
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
        electData: [
          {key:0,Id:"否"},
          {key:1,Id:"是"},
        ],
      };
    },
    methods: {
      //状态下拉选择
      selectChange1(vId){
        if(vId==1){
            this.specify=true;
        }else {
          this.specify=false;
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.ruleForm.files[0].description=this.ruleForm.description;
          this.ruleForm.files[1].description=this.ruleForm.description;
          console.log(this.ruleForm.files);
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('iconFile', this.ruleForm.iconFile);
            param.append('title', this.ruleForm.title);
            param.append('personTime', this.ruleForm.personTime);
            param.append('isSpecify', this.ruleForm.isSpecify);
            param.append('price', this.ruleForm.price);
            param.append('description', this.ruleForm.description);
            if(this.ruleForm.specifyCustomerId){
              param.append('specifyCustomerId', this.ruleForm.specifyCustomerId);
            }
            param.append('showfile', this.ruleForm.showFile[0]);
            param.append('showfile', this.ruleForm.showFile[1]);
            param.append('showfile', this.ruleForm.showFile[2]);
            param.append('showfile', this.ruleForm.showFile[3]);
            param.append('showfile', this.ruleForm.showFile[4]);
            param.append('showfile', this.ruleForm.showFile[5]);
            param.append('desfile', this.ruleForm.introduceFile[0]);
            param.append('desfile', this.ruleForm.introduceFile[1]);
            param.append('desfile', this.ruleForm.introduceFile[2]);
            param.append('desfile', this.ruleForm.introduceFile[3]);
            param.append('desfile', this.ruleForm.introduceFile[4]);
            param.append('fileDescription', this.ruleForm.description1);
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/flowPool/admin/prizes/addPrize",
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
                this.$router.push('/goldCoinList');
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
      //上传ICON
      tirggerFile($event){
        var file = $event.target.files[0];
        var fileList = $event.target.files;
        var name = $event.target.files[0].name;
        this.ruleForm.iconFile = file;
        this.ruleForm.image = name;
        console.log(this.iconFile);
      },
      //上传展示图片
      tirggerShowFile($event){
        var file = $event.target.files[0];
        var fileList = $event.target.files;
        var name = $event.target.files[0].name;
        let imageUrlFile=[];
        // this.ruleForm.iconFile = file;
        // this.ruleForm.showImage = name;
        for (var i=0;i<fileList.length;i++){
         imageUrlFile.push(fileList[i]);
        }
         this.ruleForm.files[0].imageUrlFile=imageUrlFile;
        this.ruleForm.showFile=imageUrlFile;
         this.ruleForm.files[0].type=0;
      },
      //上传介绍图片
      tirggerIntroduceFile($event){
        var file = $event.target.files[0];
        var fileList = $event.target.files;
        var name = $event.target.files[0].name;
        let IntroduceFile=[];
        // this.ruleForm.iconFile = file;
        // this.ruleForm.introduceImage = name;
        for (var i=0;i<fileList.length;i++){
          IntroduceFile.push(fileList[i]);
        }
        this.ruleForm.files[1].imageUrlFile=IntroduceFile;
        this.ruleForm.introduceFile=IntroduceFile;
        this.ruleForm.files[1].type=1;
        console.log(this.ruleForm.files);
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
