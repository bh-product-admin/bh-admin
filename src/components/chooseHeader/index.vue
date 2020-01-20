<template>
  <div class="index">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.goodsName" size="small" placeholder="请输入商品名称" style="width: 150px" />
      </el-form-item>
      <el-form-item label="类目">
        <el-select v-model="formInline.firstGroup" placeholder="类目一" size="small" style="width: 100px" @change="shangeSelect(1)">
          <el-option v-for="item in firstOptionsArr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-select v-model="formInline.secondGroup" placeholder="类目二" size="small" style="width: 100px" @change="shangeSelect(2)">
          <el-option v-for="item in secondOptionsArr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-select v-model="formInline.thirdGroup" placeholder="类目三" size="small" style="width: 100px" @change="shangeSelect(3)">
          <el-option v-for="item in thirdOptionsArr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="上架时间">
        <el-date-picker
          v-model="formInline.time"
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
        <el-button type="primary" size="small" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  classify
} from '@/api/user'
export default {
  name: 'ChooseHeader',
  props: [],
  data() {
    return {
      formInline: {
        goodsName: '',
        firstGroup: '',
        secondGroup: '',
        thirdGroup: '',
        time: ''
      },
      firstOptionsArr: [{
        id: '1',
        name: '11'
      }, {
        id: '2',
        name: '12'
      }, {
        id: '3',
        name: '13'
      }],
      secondOptionsArr: [{
        id: '1',
        name: '21'
      }, {
        id: '2',
        name: '22'
      }, {
        id: '3',
        name: '23'
      }],
      thirdOptionsArr: [{
        id: '1',
        name: '31'
      }, {
        id: '2',
        name: '32'
      }, {
        id: '3',
        name: '33'
      }],
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
  created() {
    this.fetchOptions()
  },
  methods: {
    search() {
      this.$emit('search', this.formInline)
    },
    // classify
    fetchOptions(level = 1) {
      console.log(level, 'levellevel')
      const labelArr = ['', 'first', 'second', 'third']
      let parent_id = ''
      const params = {
        level
      }
      if (level && level > 1) {
        parent_id = this.formInline[`${labelArr[level - 1]}Group`]
        params['parent_id'] = parent_id
      }
      classify(params).then((res = {}) => {
        console.log(res, 'ressssclassify')
        const { data: { list = [] }} = res
        console.log(list, 'listressssclassify')
        if (list && list instanceof Array) this.$data[`${labelArr[level]}OptionsArr`] = list
        this.shangeSelect(level, true)
      })
    },
    shangeSelect(codeIndex, isAuto) {
      console.log(codeIndex, 'codeIndex')
      const labelArr = ['', 'first', 'second', 'third']
      const startIndex = isAuto ? codeIndex : codeIndex + 1
      for (let i = startIndex; i < labelArr.length; i++) {
        this.formInline[`${labelArr[i]}Group`] = (this.$data[`${labelArr[i]}OptionsArr`][0] && this.$data[`${labelArr[i]}OptionsArr`][0].id) || ''
      }
      if (codeIndex < 3) {
        this.fetchOptions(codeIndex + 1)
      } else {
        this.$emit('search', this.formInline)
      }
    }
  }
}
</script>
