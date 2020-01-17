<template>
  <div class="register-box">
    <el-card>
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form label-width="100px">
        <el-form-item label="手机号码">
          <el-input /><el-button>获取验证码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>平台认证信息</span>
      </div>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>相关资质上传</span>
      </div>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>确认信息</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .register-box{
    padding: 30px;
  }
</style>
