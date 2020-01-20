<template>
  <div class="index">
    <el-card>
      <Header @search="search" />
    </el-card>
    <el-card>
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          :default-sort="{prop: 'date', order: 'descending'}"
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
                @click="handleEdit(scope.$index, scope.row)"
              >我有货</el-button>
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
    <div><hasGoodsDialog ref="hasGodsDialog" @handleEdit="handleEdit" /></div>
    <!-- 我有货 -->
  </div>
</template>
<script>
import {
  getGoodsList // 行业策略列表数据 goods/list?type=2 类型：1.平台自营，2.鲁班
} from '@/api/chooseGoods'
import Header from '@/components/chooseHeader/index'
import hasGoodsDialog from '@/views/chooseGoods/hasGodsDialog'
import {
} from '@/api/user'
export default {
  name: 'IndustryNew',
  components: {
    Header,
    hasGoodsDialog
  },
  data() {
    return {
      sortColumns: ['date', 'seleNumThree', 'seleNumWeek', 'seleNumTotal', 'seleNum'],
      currentPage: 1,
      tableData: [],
      searchValue: {
        keywords: '',
        type: '',
        startTime: '',
        endTime: ''
      },
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
          prop: 'category'
        },
        {
          label: '价格',
          type: 'text',
          prop: 'price'
        },
        {
          label: '一日销量',
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
  created() {
    this.fetchGodList()
  },
  methods: {
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$refs.hasGodsDialog.showDialog(row, true)
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
    fetchGodList() {
      const params = {
        ...this.searchValue,
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
    search(val = {}) {
      console.log('search--', val)
      const { time, keywords, type, title, firstId, secondId, thirdId } = val
      let showTime = ''
      if (time) {
        showTime = new Date(time).getTime()
        console.log(showTime)
      }
      this.searchValue = {
        keywords,
        type,
        showTime,
        firstId, secondId, thirdId, title
      }
      this.pageData['pageNum'] = 1
      this.fetchGodList()
    }
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
