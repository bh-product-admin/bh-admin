<template>
  <el-dialog
    :title="dialogTitle"
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
  blogAddComment, // 添加一条评论
  blogAddReply // 帖子中的评论，添加回复内容
} from '@/api/bbsModule'
import {
  getCookieByCode,
  filterPhone
} from '@/utils/index'
export default {
  name: 'PostOrReplyDialog',
  data() {
    return {
      dialogVisible: false,
      formInline: {
        cont: ''
      },
      userId: getCookieByCode('id'),
      phone: getCookieByCode('phone'),
      blogId: undefined,
      dialogTitle: '评论',
      commentId: undefined
    }
  },
  methods: {
    addAddReply() {
      blogAddComment()
    },
    replyAddReply() {
      if (!this.formInline.cont) {
        this.$message.error('请填写内容')
      } else {
        const replyOrComment = this.replyOrComment === 'comment'
        const params = {
          content: this.formInline.cont
        }
        if (replyOrComment) {
          const newParams = {
            ...params,
            blogId: this.blogId,
            userId: this.userId
          }
          blogAddComment(newParams).then((res = {}) => { // 添加评论
            console.log(res, 'res')
            this.dialogVisible = false
            this.$message.success('操作成功')
            this.formInline.cont = ''
            this.$emit('blogReplayAddSuccess')
          }).catch((err = {}) => {
            console.log(err, 'err')
          })
        } else {
          const replyJson = {
            phone: filterPhone(this.phone),
            content: this.formInline.cont
          }
          const newParams = {
            id: this.commentId,
            replyJson: JSON.stringify(replyJson)
          }
          console.log(newParams, 'newParams')
          blogAddReply(newParams).then((res = {}) => { // 回复评论
            console.log(res, 'res')
            this.dialogVisible = false
            this.$message.success('操作成功')
            this.formInline.cont = ''
            this.$emit('blogReplayAddSuccess')
          }).catch((err = {}) => {
            console.log(err, 'err')
          })
        }
      }
    },

    //   aadBlogAdd, // 添加一条帖子
    // blogAddComment, // 添加一条评论
    // blogAddReply // 帖子中的评论，添加回复内容
    createBlog() {

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    showDialog(isDialogVisible, replyOrComment, blogId, id) {
      this.dialogVisible = isDialogVisible
      this.replyOrComment = replyOrComment
      this.blogId = blogId
      this.dialogTitle = replyOrComment === 'comment' ? '评论' : '回复'
      if (id >= 0) this.commentId = id
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
