<template>
  <div class="index">
    <el-dialog title="审核" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form ref="ruleForm" :model="form" label-width="120px">
        <el-form-item label="申请账户电话：">
          <span>{{ rowdata.phone }}</span>
        </el-form-item>
        <el-form-item label="申请时间：">
          <span>{{ rowdata.created | datetimeDot }}</span>
        </el-form-item>
        <el-form-item label="资质图片：">
          <img :src="rowdata.idNumIcon">
          <img :src="rowdata.idNumReverseIcon">
          <img :src="rowdata.licenseIcon">
        </el-form-item>
        <el-form-item label="申请备注：">
          <span>{{ rowdata.note || '--' }}</span>
        </el-form-item>
        <el-form-item label="申请结果：">
          <el-radio-group v-if="rowdata.status == 0" v-model="form.certification" class="sku-box" style="display: inline-flex;">
            <el-radio label="1">同意</el-radio>
            <el-radio label="2">拒绝</el-radio>
          </el-radio-group>
          <span v-else>{{ handleResult(rowdata.status) }}</span>
        </el-form-item>
        <el-form-item label="拒绝原因：">
          <el-input v-if="rowdata.status == 0" v-model="form.msg" type="textarea" />
          <span v-else> {{ rowdata.msg }} </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" v-if="rowdata.status == 0">取 消</el-button>
        <el-button type="primary" @click="onSubmit" v-if="rowdata.status == 0">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  manufacturerCertification // userId=1&certification=1
} from '@/api/user'
import {
  getCookieByCode // userId=2&certification=4&msg=图片不清晰"
} from '@/utils/index'
export default {
  props: [],
  data() {
    return {
      form: {
        msg: '',
        certification: '1',
        userId: getCookieByCode('id')
      },
      rowdata: {},
      title: '',
      img: '',
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  created() {},
  methods: {
    handleResult(code) {
      return code == 2 ? '已拒绝' : '已通过'
    },
    onSubmit() {
      manufacturerCertification(this.form).then(res => {
        console.log(res, 'resdsdsd-has')
        const { data = false, msg = '操作成功' } = res
        if (data) {
          this.$message.success(msg)
          this.initForm()
          this.dialogFormVisible = false
          this.$emit('handleSuccess')
        } else {
          this.$message.error(msg)
        }
      }).catch(err => {
        console.log(err, 'errhas')
      })
    },
    showDialog(item = {}, isDialogFormVisible) {
      this.initForm()
      this.rowdata = item
      this.dialogFormVisible = isDialogFormVisible
    },
    initForm() {
      this.form = {
        msg: '',
        certification: '1',
        userId: getCookieByCode('id')
      }
    },
    handleClose() {
      this.initForm()
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body{
  padding-top: 0;
  padding-bottom: 0;
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
