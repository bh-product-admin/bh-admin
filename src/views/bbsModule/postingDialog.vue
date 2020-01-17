<template>
  <el-dialog
    title="发帖"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <div>
        <el-form-item label="帖子类型">
          <el-select v-model="formInline.typeId" size="small" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formInline.title" size="small" placeholder="请输入标题" maxlength="20" class="title" />
        </el-form-item>
      </div>
      <el-form-item label="正文">
        <el-input
          v-model="formInline.content"
          class="main-text"
          type="textarea"
          :rows="2"
          placeholder="请输入正文"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="createAddReply">发 布</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  aadBlogAdd // 添加一条帖子
} from '@/api/bbsModule'
import {
  getCookieByCode
} from '@/utils/index'
export default {
  name: 'PostingDialog',
  data() {
    return {
      dialogVisible: false,
      formInline: {
        typeId: '',
        title: '',
        content: ''
      },
      userId: getCookieByCode('userId')
    }
  },
  computed: {
    options() {
      return this.$store.state.bbsModule.options || []
    }
  },
  created() {
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    createAddReply() {
      if (!this.formInline.content) {
        this.$message.error('请填写内容')
      } else {
        const params = {
          ...this.formInline,
          userId: this.userId
        }
        aadBlogAdd(params).then((res = {}) => { // 添加一条帖子
          console.log(res, 'res')
          this.dialogVisible = false
          this.$message.success('操作成功')
          this.formInline = {
            typeId: '',
            title: '',
            content: ''
          }
          this.$emit('blogCreateSuccess')
        }).catch((err = {}) => {
          console.log(err, 'err')
        })
      }
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
  width: 680px;
  height: 300px;
  resize: none
}
</style>
