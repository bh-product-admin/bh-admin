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
      <el-button type="primary" @click="replyAddReply">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  setAddReply, // 添加一条评论
  blogAddReply // 帖子中的评论，添加回复内容
} from '@/api/bbsModule'
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
    addAddReply() {
      setAddReply()
    },
    replyAddReply() {
      if (!this.formInline.cont) {
        this.$message.error('请填写内容')
      } else {
        const isAddOrReply = true
        const params = {
          content: this.formInline.cont,
          phone: '13677777777'
        }
        if (isAddOrReply) {
          setAddReply(params).then((res = {}) => { // 添加评论
            console.log(res, 'res')
            this.dialogVisible = false
            this.$message.success('操作成功')
          }).catch((err = {}) => {
            console.log(err, 'err')
          })
        } else {
          blogAddReply(params).then((res = {}) => { // 回复评论
            console.log(res, 'res')
            this.dialogVisible = false
            this.$message.success('操作成功')
          }).catch((err = {}) => {
            console.log(err, 'err')
          })
        }
      }
    },
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
