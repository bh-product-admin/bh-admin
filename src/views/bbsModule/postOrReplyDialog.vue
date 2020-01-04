<template>
  <el-dialog
    title="评论/回复弹窗"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="输入内容">
        <el-input
          v-model="formInline.cont"
          class="main-text"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'PostOrReplyDialog',
  data() {
    return {
      dialogVisible: false,
      formInline: {
        cont: ''
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    showDialog(isDialogVisible) {
      this.dialogVisible = isDialogVisible
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  width: 400px
}
::v-deep .el-textarea__inner{
  width: 650px;
  height: 300px;
  resize: none
}
</style>
