<template>
  <el-dialog
    title="评论"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <div>
        <el-form-item label="帖子类型">
          <el-select v-model="formInline.type" size="small" placeholder="请选择">
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
          v-model="formInline.cont"
          class="main-text"
          type="textarea"
          :rows="2"
          placeholder="请输入正文"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">发 布</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'PostingDialog',
  data() {
    return {
      dialogVisible: false,
      formInline: {
        type: '',
        title: '',
        cont: ''
      },
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '找货源'
      }, {
        value: '1',
        label: '找渠道'
      }, {
        value: '2',
        label: '找代运营'
      }, {
        value: '3',
        label: '找培训'
      }, {
        value: '4',
        label: '其他'
      }]
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
  width: 680px;
  height: 300px;
  resize: none
}
</style>
