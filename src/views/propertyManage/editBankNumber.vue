<template>
  <div class="index">
    <el-dialog :visible.sync="dialogEditBankVisible" width="550px">
      <el-form :model="form" label-width="140px">
        <el-form-item label="输入新银行账户：">
          <div width="300px">
            <el-input v-model="form.account" type="number" />
          </div>
        </el-form-item>
        <el-form-item label="再次输入：">
          <div width="300px">
            <el-input v-model="form.account1" type="number" />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditBankVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangeBank">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  bankMoneyEdit // 修改账户信息
} from '@/api/property'
import {
  getCookieByCode
} from '@/utils/index'
export default {
  name: 'EditBankNumber',
  props: [],
  data() {
    return {
      form: {
        account: '',
        account1: ''
      },
      dialogEditBankVisible: false
    }
  },
  created() {},
  methods: {
    onSubmit() {
      alert('submit!')
    },
    showDialog(isdialogEditBankVisible) {
      this.dialogEditBankVisible = isdialogEditBankVisible
    },
    handleChangeBank() {
      const {
        account,
        account1
      } = this.form
      if (account === account1) {
        const id = getCookieByCode('id')
        const params = {
          id,
          account,
          int: 1
        }
        bankMoneyEdit(params).then((res = {}) => {
          this.$message.success('操作成功')
          this.dialogEditPhoneVisible = false
          this.$emit('handleSuccess')
        }).catch((err = {}) => {
        // this.$message.error('操作失败，请重试')
        })
      } else {
        this.$message.error('两次输入的银行卡号不一致')
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
