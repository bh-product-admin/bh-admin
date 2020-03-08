<template>
  <div class="index">
    <el-dialog :visible.sync="dialogMoneyOutVisible" width="550px">
      <el-form :model="form" label-width="140px">
        <el-form-item label="提现金额：">
          <div width="300px">
            <el-input v-model="form.amount" type="number" />
          </div>
        </el-form-item>
        <el-form-item label="验证码：">
          <div width="300px" class="send-code-box">
            <el-input v-model="form.code" type="number" />
            <el-button class="ml10" type="primary" :loading="loading" :disabled="disabled" @click="setCode">{{ buttonText }}</el-button>
          </div>
        </el-form-item>
        <el-form-item label="本次最多可提：">
          ￥{{ totalMoney }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMoneyOutVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangePhone">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  smsSendCode, // 用户换绑手机号码，发送验证码
  moneyOutAdd
} from '@/api/property'
import {
  getCookieByCode
} from '@/utils/index'
export default {
  name: 'MoneyOutDialog',
  props: [],
  data() {
    return {
      form: {
        amount: '',
        code: ''
      },
      formLabelWidth: '120px',
      dialogMoneyOutVisible: false,
      buttonText: '发送验证码',
      disabled: false,
      loading: false,
      totalMoney: 0
    }
  },
  created() {},
  methods: {
    onSubmit() {
      alert('submit!')
    },
    showDialog(isdialogMoneyOutVisible, totalMoney) {
      this.dialogMoneyOutVisible = isdialogMoneyOutVisible
      this.totalMoney = totalMoney
    },
    isPhone(str) {
      return /^1[3456789]\d{9}$/.test(str)
    },
    setCode() {
      const phone = getCookieByCode('phone')
      if (this.isPhone(phone)) {
        const params = {
          phone,
          type: 5
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
        this.$message.error('账号信息有误请重新登陆')
        this.$router.push({ path: '/login' })
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
        amount = 0
      } = this.form
      const {
        totalMoney = 0
      } = this.$data
      if (!amount) {
        this.$message.error('请输入提现金额')
      } else if (Number(amount) > Number(totalMoney)) {
        this.$message.error('提现金额大于可提现金额')
      } else if (!code) {
        this.$message.error('请输入验证码')
      } else {
        const params = {
          amount,
          code
        }
        moneyOutAdd(params).then((res = {}) => {
          this.$message.success('提现成功')
          this.dialogMoneyOutVisible = false
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
