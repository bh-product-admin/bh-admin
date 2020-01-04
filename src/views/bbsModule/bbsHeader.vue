<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="关键字">
      <el-input v-model="formInline.keywords" size="small" placeholder="请输入关键字" />
    </el-form-item>
    <el-form-item label="帖子类型">
      <el-select v-model="formInline.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="时间">
      <el-date-picker
        v-model="formInline.time"
        size="small"
        type="datetimerange"
        format="yyyy-MM-dd HH-mm-ss"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="$emit('posting')">我要发帖</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'BbsHeader',
  data() {
    return {
      formInline: {
        keywords: '',
        type: '',
        time: ''
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
    search() {
      this.$emit('search', this.formInline)
    }
  }
}
</script>
