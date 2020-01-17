<template>
  <div class="index">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.user" size="small" placeholder="审批人" />
      </el-form-item>
      <el-form-item label="类目">
        <el-select v-model="formInline.region" placeholder="活动区域" size="small">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="上架时间">
        <el-date-picker
          v-model="searchTime"
          size="small"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="fetchGoodsList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'GoodsHeader',
  props: [],
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      searchTime: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {},
  methods: {
    onSubmit() {
      console.log('新增')
      this.$emit('handleAddGoods')
    },
    fetchGoodsList() {
      console.log('查询')
      let formInline = this.formInline
      formInline = {
        ...formInline,
        time: this.searchTime
      }
      this.$emit('fetchGoodsList', formInline)
    }
  }
}
</script>
