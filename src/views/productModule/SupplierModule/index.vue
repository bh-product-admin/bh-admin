<template>
  <div class="index">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="商家ID">
          <el-input />
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary" @click="handleSku">看相似sku</el-button>
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
              <img
                v-if="item.type=='img'"
                :src="scope.row.img"
                width="100"
                height="100"
              >
              <span v-else>
                <font v-if="item.type=='date'">{{ scope.row[item.prop] | dateDot }}</font>
                <font v-else>{{ scope.row[item.prop] }}</font>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="240"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleConfirm(index,scope.row)"
              >发起采购</el-button>
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
    <div><hasSupplieDialog ref="hasSupplieDialog" @handleEdit="handleEdit" /></div>
  </div>
</template>
<script>
import Header from '@/views/goodsModule/goodsHeader'
import hasSupplieDialog from './hasSupplierDialog'
import {
  waresList // 我的商品列表 userId=2&orderBy=desc&sortField=threeSale
} from '@/api/user'
export default {
  name: 'GoodsList',
  components: {
    Header, hasSupplieDialog
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
          prop: 'src'
        },
        {
          label: '商品标题',
          type: 'text',
          prop: 'title'
        },
        {
          label: '厂家备注',
          type: 'text',
          prop: 'note'
        },
        {
          label: '采购单价',
          type: 'text',
          prop: 'skuType'
        },
        {
          label: '厂家ID',
          type: 'text',
          prop: 'price'
        },
        {
          label: '退货比例',
          type: 'text',
          prop: 'stockNum'
        },
        {
          label: '最长销售周期',
          type: 'text',
          prop: 'maxSaleCycle'
        },
        {
          label: '厂家库存',
          type: 'text',
          prop: 'threeSale'
        },
        {
          label: '日发货能力',
          type: 'text',
          prop: 'daySendNum'
        },
        {
          label: '已售数量',
          type: 'text',
          prop: 'returnNum'
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
    handleSku() {
      waresList({ goodsId: this.$route.query.id, skuType: 1 }).then((res = {}) => {
        const { data = {}} = res
        const { list = [] } = data
        if (list && list instanceof Array) {
          this.tableData = list
        } else {
          this.tableData = []
        }
      })
    },
    handleAddGoods() {
      console.log('新增')
      this.$refs.hasSupplieDialog.showDialog({}, true, 'add')
    },
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleConfirm(index, row, codeKey) { // 操作
      console.log(row)
      this.$refs.hasSupplieDialog.showDialog(row, true)
    },
    fetchWaresList(formLine = {}) {
      // const params = {
      //   ...formLine,
      //   userId: this.userId,
      //   orderBy: 'desc'
      //   // sortField: 'threeSale'
      // }
      waresList({ goodsId: this.$route.query.id }).then((res = {}) => {
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
    handleEdit() { }
  }
}
</script>
<style lang="scss" scoped>
.ptb10 {
  padding-top: 10px;
  padding-bottom: 10px;
}
::v-deep .el-pagination {
  margin: 10px;
}
</style>
