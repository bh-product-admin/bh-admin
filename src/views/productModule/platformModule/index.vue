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
          :default-sort="{prop: 'date', order: 'descending'}"
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
              <img v-if="item.type == 'img'" :src="scope.row.img" width="100" height="100">
              <span v-if="item.type === 'date'">{{ scope.row[item.prop] | datetimeDot }}</span>
              <span v-else>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)"
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
    <!-- 我有货 -->
  </div>
</template>
<script>
import {
  getGoodsList // 行业策略列表数据 goods/list?type=2 类型：1.平台自营，2.鲁班
} from '@/api/chooseGoods'
import Header from '@/components/chooseHeader/index'
export default {
  name: 'IndustryNew',
  components: {
    Header
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
          prop: 'colName'
        },
        {
          label: '价格',
          type: 'text',
          prop: 'price'
        },
        {
          label: '一日销量',
          type: 'text',
          prop: 'daySendNum'
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
    handleEdit(data) {
      this.$router.push({
        path: '/example/supplier',
        query: {
          id: data.id
        }
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
    fetchGodList() {
      const params = {
        // ...this.searchValue,
        type: 1,
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
      const { time, keywords, type } = val
      let startTime = ''
      let endTime = ''
      if (time && time instanceof Array) {
        startTime = this.$moment(new Date(time[0])).format('YYYY-MM-DD HH:mm:ss')
        endTime = this.$moment(new Date(time[1])).format('YYYY-MM-DD HH:mm:ss')
        console.log(startTime, endTime)
      }
      this.searchValue = {
        keywords,
        type,
        startTime,
        endTime
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
