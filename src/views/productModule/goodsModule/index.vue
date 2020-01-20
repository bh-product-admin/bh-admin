<template>
  <div class="index">
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="formInline.goodsName" size="small" placeholder="请输入商品名称" style="width: 150px" />
        </el-form-item>
        <el-form-item label="类目">
          <el-select v-model="formInline.firstGroup" placeholder="类目一" size="small" style="width: 100px" @change="shangeOneSelect(formInline.firstGroup)">
            <el-option v-for="item in firstOptionsArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-select v-model="formInline.secondGroup" placeholder="类目二" size="small" style="width: 100px" @change="shangeTwoSelect(formInline.secondGroup)">
            <el-option v-for="item in secondOptionsArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-select v-model="formInline.thirdGroup" placeholder="类目三" size="small" style="width: 100px">
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
    </el-card>
    <el-card>
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          @sort-change="sortChange"
        >
          <el-table-column
            v-for="(item, index) in columnData"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
            :sortable="sortColumns.includes(item.prop) ? true : false"
          >
            <template slot-scope="scope">
              <img v-if="item.type=='img'" :src="scope.row.img" width="100" height="100">
              <span v-else>
                <font v-if="item.type=='date'">{{ scope.row[item.prop] | dateDot }}</font>
                <font v-else>{{ scope.row[item.prop] }}</font>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleConfirm(scope.row)"
              >一件代发</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        :current-page="pageData.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- <div><hasGoodsDialog ref="hasGodsDialog" @handleEdit="handleEdit" /></div> -->
  </div>
</template>
<script>
// import Header from '@/components/chooseHeader/index'
// import hasGoodsDialog from './hasGodsDialog'
import {
  getGoodsList // 我的商品列表 userId=2&orderBy=desc&sortField=threeSale
} from '@/api/chooseGoods'
import { classify, certification } from '@/api/user'
export default {
  name: 'GoodsList',
  components: {
    //  hasGoodsDialog
  },
  data() {
    return {
      formInline: {
        goodsName: '',
        firstGroup: '',
        secondGroup: '',
        thirdGroup: '',
        time: ''
      },
      firstOptionsArr: [],
      secondOptionsArr: [],
      thirdOptionsArr: [],
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
      },
      userId: '',
      sortColumns: ['date', 'seleNumThree', 'seleNumWeek', 'seleNumTotal', 'seleNum'],
      currentPage: 1,
      tableData: [],
      pageData: {
        pageSize: 10,
        total: 0,
        pageNum: 1
      },
      columnData: [
        {
          label: '商品图',
          type: 'img',
          prop: 'img'
        },
        {
          label: '商品标题',
          type: 'text',
          prop: 'title'
        },
        {
          label: '上架时间',
          type: 'date',
          prop: 'showTime'
        },
        {
          label: '类目',
          type: 'text',
          prop: 'skuType'
        },
        {
          label: '价格',
          type: 'text',
          prop: 'price'
        },
        {
          label: '库存',
          type: 'text',
          prop: 'stockNum'
        },
        {
          label: '昨日销量',
          type: 'text',
          prop: 'yesterdaySale'
        },
        {
          label: '三日销量',
          type: 'text',
          prop: 'threeSale'
        },
        {
          label: '七日销量',
          type: 'text',
          prop: 'sevenSale'
        },
        {
          label: '总销量',
          type: 'text',
          prop: 'totalSale'
        }
      ]
    }
  },
  async created() {
    this.fetchGodList()
    const res = await classify({ level: 1 })
    if (res.success) {
      this.firstOptionsArr = res.data.list
    }
    console.log(res)
  },
  methods: {
    async shangeOneSelect(id) {
      this.secondOptionsArr = []
      this.thirdOptionsArr = []
      this.formInline.secondGroup = ''
      this.formInline.thirdGroup = ''
      const res = await classify({ level: 2, parent_id: id })
      if (res.success) {
        this.secondOptionsArr = res.data.list
      }
    },
    async shangeTwoSelect(id) {
      this.thirdOptionsArr = []
      this.formInline.thirdGroup = ''
      const res = await classify({ level: 3, parent_id: id })
      if (res.success) {
        this.thirdOptionsArr = res.data.list
      }
    },
    fetchGoodsList() {
      this.fetchGodList()
    },
    handleAddGoods() {
      console.log('新增')
      this.$refs.hasGodsDialog.showDialog({}, true, 'add')
    },
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleConfirm(data) { // 操作
      this.$router.push({
        path: '/productModule/supplier',
        query: {
          id: data.id
        }
      })
    },
    fetchGodList() {
      const params = {
        // ...this.searchValue,
        type: '2',
        pageSize: this.pageData.pageSize,
        pageNum: this.pageData.pageNum
      }
      getGoodsList(params).then(res => {
        const { data = {}, data: { list = [] }} = res
        this.pageData = data
        this.tableData = list && list instanceof Array && list.length >= 0 ? list : []
        console.log(res, 'ressgetGoodsLists')
      }).catch(err => {
        console.log(err, 'errrrgetGoodsList')
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`, this.pageData)
      this.pageData['pageNum'] = 1
      this.pageData['pageSize'] = val
      this.fetchGodList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageData['pageNum'] = val
      this.fetchGodList()
    },
    handleEdit() {}
  }
}
</script>
<style lang="scss" scoped>
.ptb10 {
  padding-top: 10px;
  padding-bottom: 10px;
}
::v-deep .el-pagination{
  margin: 10px;
}
</style>
