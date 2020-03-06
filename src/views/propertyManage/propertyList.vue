<template>
  <div class="index">
    <el-card>
      <Header @search="searchList" @outPut="outPut" />
    </el-card>
    <el-card>
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%"
          @sort-change="sortChange"
        >
          <el-table-column
            v-for="(item, index) in columnData"
            :key="index"
            :width="item.width"
            :label="item.label"
            :prop="item.prop"
            align="center"
            :sortable="sortColumns.includes(item.prop) ? true : false"
          >
            <template slot-scope="scope">
              <img v-if="item.type=='img'" :src="scope.row.img" width="100" height="100">
              <span v-else-if="item.filters == 'money'">{{ monetType[scope.row[item.prop]] }}</span>
              <font v-else-if="item.type=='date'">{{ scope.row[item.prop] | dateDot }}</font>
              <span v-else>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row)"
              >查看物流单详情</el-button>
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
  </div>
</template>
<script>
import {
  moneyDetailBuyerList // 资金明细列表
} from '@/api/property.js'
import Header from '@/views/propertyManage/propertyHeader'
import hasGoodsDialog from './hasGodsDialog'
export default {
  name: 'PropertyList',
  components: {
    Header,
    hasGoodsDialog
  },
  data() {
    return {
      monetType: ['', '采购', '收入', '支出', '退款', '提现'],
      sortColumns: ['totalNum', 'totalMoney'],
      currentPage: 1,
      pageData: {
        pageSize: 10,
        total: 0,
        pageNum: 1
      },
      tableData: [],
      columnData: [
        {
          label: '流水类型',
          type: 'text',
          width: 100,
          prop: 'type',
          filters: 'money'
        },
        {
          label: '时间',
          type: 'date',
          width: 100,
          prop: 'created'
        },
        {
          label: '商品图片',
          type: 'img',
          width: 120,
          prop: 'src'
        },
        {
          label: '商品标题',
          type: 'text',
          prop: 'title'
        },
        {
          label: '商品数量',
          type: 'text',
          width: 100,
          prop: 'number'
        },
        {
          label: '金额',
          type: 'text',
          width: 100,
          prop: 'amount'
        }
      ]
    }
  },
  created() {
    this.fetchMoneyList()
  },
  methods: {
    fetchMoneyList(params = {}) {
      moneyDetailBuyerList(params).then((res = {}) => {
        const { data: {
          list = [],
          total = 0,
          pageSize = 10,
          pageNum = 1
        }} = res
        if (list && list instanceof Array && list.length) {
          this.tableData = list
          this.pageData = {
            pageSize,
            total,
            pageNum
          }
        } else {
          this.tableData = []
        }
      }).catch((err = {}) => {
        this.tableData = []
        console.log(err, 'errr')
      })
    },
    outPut() {
      alert('outPut')
    },
    searchList(formLine, value2) {
      console.log(formLine, 'formLineformLineformLine', value2)
      const params = formLine
      this.formLine = formLine
      this.fetchMoneyList(params)
    },
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleConfirm(index, row) {
      console.log(index, row)
      this.$refs.hasGodsDialog.showDialog(row, true)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageData.pageSize = val
      this.fetchMoneyList(this.formLine)
    },
    handleCurrentChange(val) {
      this.pageData.pageNum = val
      this.fetchMoneyList(this.formLine)
      console.log(`当前页: ${val}`)
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
