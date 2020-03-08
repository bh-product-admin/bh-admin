<template>
  <div class="index">
    <el-dialog :visible.sync="dialogEditPhoneVisible" width="550px">
      <el-form :model="form" label-width="140px">
        <el-form-item label="输入新手机号码：">
          <div width="300px">
            <el-input v-model="form.phone" />
          </div>
        </el-form-item>
        <el-form-item label="验证码：">
          <div width="300px" class="send-code-box">
            <el-input v-model="form.code" />
            <el-button class="ml10" type="primary" :loading="loading" :disabled="disabled" @click="setCode">{{ buttonText }}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditPhoneVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangePhone">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  userEditPhone, // 换绑手机号码
  smsSendCode // 用户换绑手机号码，发送验证码
} from '@/api/property'
export default {
  name: 'EditPhone',
  props: [],
  data() {
    return {
      form: {
        phone: '',
        code: ''
      },
      formLabelWidth: '120px',
      dialogEditPhoneVisible: false,
      buttonText: '发送验证码',
      disabled: false,
      loading: false
    }
  },
  created() {},
  methods: {
    onSubmit() {
      alert('submit!')
    },
    showDialog(isdialogEditPhoneVisible) {
      this.dialogEditPhoneVisible = isdialogEditPhoneVisible
    },
    isPhone(str) {
      return /^1[3456789]\d{9}$/.test(str)
    },
    setCode() {
      const {
        phone
      } = this.form
      if (this.isPhone(phone)) {
        const params = {
          phone,
          type: 2
        }
        this.disabled = true
        this.loading = false
        smsSendCode(params).then((res = {}) => {
          this.$message.success('发送成功')
          this.changeText()
          this.loading = false
        }).catch((err = {}) => {
          this.disabled = false
          this.loading = false
          // this.$message.error('发送失败，请重试')
        })
      } else {
        this.$message.error('请输入正确的手机号')
      }
    },
    changeText() {
      let number = 59
      const intervalss = setInterval(() => {
        number--
        this.buttonText = `${number}s后重新获取`
      }, 1000)
      setTimeout(() => {
        this.disabled = false
        this.buttonText = `发送验证码`
        window.clearInterval(intervalss)
      }, 59000)
    },
    handleChangePhone() {
      const {
        code,
        phone
      } = this.form
      if (!this.isPhone(phone)) {
        this.$message.error('请输入正确的手机号')
      } else if (!code) {
        this.$message.error('请输入验证码')
      } else {
        const params = {
          phone,
          code
        }
        userEditPhone(params).then((res = {}) => {
          this.$message.success('操作成功')
          this.dialogEditPhoneVisible = false
          this.$emit('handleSuccess')
        }).catch((err = {}) => {
        // this.$message.error('操作失败，请重试')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body{
  padding-top: 30px;
  padding-bottom: 10px;
}
::v-deep .el-form-item__content{
  width: 300px;
}
::v-deep .el-dialog__footer{
  text-align: center
}
.send-code-box{
  display: flex;
  justify-content: flex-start;
  align-items: center
}
.ml10{
  margin-left: 10px;
}
.cred{
  color: red;
}
.p0{
  padding: 0;
}
.sku-box{
  display: flex;
  justify-content: center;
  flex-direction:row;
}
</style>
