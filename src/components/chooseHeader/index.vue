<template>
  <div class="index">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.goodsName" size="small" placeholder="请输入商品名称" style="width: 150px" />
      </el-form-item>
      <el-form-item label="类目">
        <el-select v-model="formInline.firstGroup" placeholder="类目一" size="small" style="width: 100px" @change="shangeSelect(1)">
          <el-option v-for="item in firstOptionsArr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="formInline.secondGroup" placeholder="类目二" size="small" style="width: 100px" @change="shangeSelect(2)">
          <el-option v-for="item in secondOptionsArr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="formInline.thirdGroup" placeholder="类目三" size="small" style="width: 100px" @change="shangeSelect(3)">
          <el-option v-for="item in thirdOptionsArr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="上架时间">
        <el-date-picker
          v-model="upTime"
          size="small"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'ChooseHeader',
  props: [],
  data() {
    return {
      formInline: {
        goodsName: '',
        firstGroup: '',
        secondGroup: '',
        thirdGroup: ''
      },
      firstOptionsArr: [{
        value: '1',
        label: '11'
      }, {
        value: '2',
        label: '12'
      }, {
        value: '3',
        label: '13'
      }],
      secondOptionsArr: [{
        value: '1',
        label: '21'
      }, {
        value: '2',
        label: '22'
      }, {
        value: '3',
        label: '23'
      }],
      thirdOptionsArr: [{
        value: '1',
        label: '31'
      }, {
        value: '2',
        label: '32'
      }, {
        value: '3',
        label: '33'
      }],
      upTime: '',
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
<<<<<<< HEAD
  created() {
  },
=======
  created() {},
>>>>>>> e7272f719291844324c9c507429189061c8d206b
  methods: {
    onSubmit() {
      // alert('submit!')
      console.log(this.upTime)
    },
    shangeSelect(codeIndex) {
      console.log(codeIndex, 'codeIndex')
      const labelArr = ['', 'first', 'second', 'third']
      for (let i = codeIndex + 1; i < labelArr.length; i++) {
        console.log(i, 'iiiiiiiiiiii', labelArr[i])
        this.formInline[`${labelArr[i]}Group`] = this.$data[`${labelArr[i]}OptionsArr`][0] && this.$data[`${labelArr[i]}OptionsArr`][0].value
      }
      console.log(JSON.stringify(this.formInline), 'this.formInlinethis.formInline')
    }
  }
<<<<<<< HEAD

=======
>>>>>>> e7272f719291844324c9c507429189061c8d206b
}
</script>
