<template>
  <div class="register-box">
    <el-card>
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form label-width="100px">
        <el-form-item label="手机号码">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.code" />
          <el-button v-if="disabled==false" type="primary" :disabled="disabled" @click="sendcode">发送验证码
          </el-button>
          <el-button v-if="disabled==true" type="button" :disabled="disabled" @click="sendcode">{{ btntxt }}
          </el-button>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>平台认证信息</span>
      </div>
      <el-form label-width="240px">
        <el-form-item label="是否申请为【认证厂家】：">
          <el-radio v-model="form.certified" :label="3">是</el-radio>
          <el-radio v-model="form.certified" :label="2">否</el-radio>
        </el-form-item>
      </el-form>
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
      <el-form label-width="130px">
        <el-form-item label="备注（可不填）">
          <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 2, maxRows: 15}" style="width:50%;" />
        </el-form-item>
      </el-form>
    </el-card>
    <div style="text-align:center;">
      <el-button type="primary" @click="submit">已确认，提交审核</el-button>
    </div>
  </div>
</template>

<script>
import { sendCode, upload, manufacturer } from '@/api/user'
export default {
  data() {
    return {
      disabled: false,
      btntxt: '重新发送',
      form: {
        certified: 5,
        licenseIcon: '123123',
        idNumIcon: '222',
        idNumReverseIcon: '333'
      }
    }
  },
  methods: {
    async submit() {
      const res = await manufacturer(this.form)
      console.log(res)
    },
    async sendcode() {
      const reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/
      if (this.form.phone === '') {
        this.$message({
          message: '手机号不能为空',
          center: true
        })
        return
      }
      if (!reg.test(this.form.phone)) {
        this.$message({
          message: '请输入正确的手机号',
          center: true
        })
        return
      } else {
        const res = await sendCode({ phone: this.form.phone, type: 2 })
        console.log(res)
        if (res.success) {
          this.$message.success({
            message: '发送成功',
            center: true
          })
          this.time = 60
          this.disabled = true
          this.timer()
        } else {
          this.$message.error(res.message)
        }
      }
    },
    // 60S倒计时
    timer() {
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = '获取验证码'
        this.disabled = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // this.$router.push({ path: this.redirect || '/' })
      console.log(222)
      this.loading = true
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
  .register-box{
    padding: 30px;
  }
  .el-input{
    width: 50%;
  }
  .el-card{
    margin-bottom:20px;
  }
</style>
