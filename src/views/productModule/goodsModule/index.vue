<template>
  <div class="index">
    <el-card>
      <Header @fetchGoodsList="fetchGoodsList" @handleAddGoods="handleAddGoods" />
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
import Header from '@/views/goodsModule/goodsHeader'
// import hasGoodsDialog from './hasGodsDialog'
import {
  getGoodsList // 我的商品列表 userId=2&orderBy=desc&sortField=threeSale
} from '@/api/chooseGoods'
export default {
  name: 'GoodsList',
  components: {
    Header
    //  hasGoodsDialog
  },
  data() {
    return {
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
  created() {
    this.fetchWaresList()
  },
  methods: {
    fetchGoodsList() {
      this.fetchWaresList()
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
        path: '/example/supplier',
        query: {
          id: data.id
        }
      })
    },
    fetchWaresList(formLine = {}) {
      // const params = {
      //   ...formLine,
      //   userId: this.userId,
      //   orderBy: 'desc'
      //   // sortField: 'threeSale'
      // }
      getGoodsList({ type: 2 }).then((res = {}) => {
        const { data = {}} = res
        const { list = [] } = data
        if (list && list instanceof Array) {
          this.tableData = list
        } else {
          this.tableData = []
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`, this.pageData)
      this.pageData['pageNum'] = 1
      this.pageData['pageSize'] = val
      this.fetchBlogList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageData['pageNum'] = val
      this.fetchBlogList()
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
