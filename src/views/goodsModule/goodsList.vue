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
          @sort-change="sortChange"
        >
          <el-table-column
            v-for="(item, index) in columnData"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :sortable="sortColumns.includes(item.prop) ? true : false"
          >
            <template slot-scope="scope">
              <img v-if="item.type=='img'" :src="scope.row.src" width="100" height="100">
              <span v-else>
                <font v-if="item.type=='date'">{{ scope.row[item.prop] | dateDot }}</font>
                <font v-else>{{ scope.row[item.prop] }}</font>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'edit')"
              >编辑</el-button>
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'showStatus')"
              >{{ scope.row['showStatus'] === 1 ? '上架' : '下架' }}</el-button>
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'delete')"
              >删除</el-button>
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
import Header from '@/views/goodsModule/goodsHeader'
import hasGoodsDialog from './hasGodsDialog'
import {
  getWaresListByUser, // 我的商品列表 userId=2&orderBy=desc&sortField=threeSale
  setWaresStatus, // 我的商品。上下架功能 id=1&showStatus=1
  deleteWares // 我的商品。删除功能
} from '@/api/goodsModule'
export default {
  name: 'GoodsList',
  components: {
    Header,
    hasGoodsDialog
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
    fetchGoodsList(formInline) {
      this.fetchWaresList(formInline)
    },
    handleAddGoods() {
      console.log('新增')
      this.$refs.hasGodsDialog.showDialog({}, true, 'add')
    },
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleConfirm(index, row, codeKey) { // 操作
      const handleObj = {
        edit: {
          text: '是否确认发货？',
          type: 'warning',
          isEditText: true
        },
        showStatus: {
          text: `是否${row.showStatus === 1 ? '上架' : '下架'}？`,
          type: 'warning'
        },
        delete: {
          text: '是否删除？',
          type: 'warning'
        }
      }
      const handleItem = handleObj[codeKey]
      if (handleItem && handleItem.isEditText) {
        this.$refs.hasGodsDialog.showDialog(row, true, 'edit')
      } else {
        this.$confirm(`${handleItem.text}`, `${handleItem.text}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          showCancelButton: false,
          type: `${handleItem.type}`
        }).then(() => {
          if (codeKey === 'showStatus') { // 上、下架
            const params = {
              id: row.id,
              showStatus: row.showStatus === 1 ? 2 : 1
            }
            setWaresStatus(params).then(res => {
              this.$message.success('操作成功')
              this.fetchWaresList()
            })
          } else { // 删除
            deleteWares({ id: row.id }).then(res => {
              this.$message.success('操作成功')
              this.fetchWaresList()
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },
    fetchWaresList(formLine = {}) {
      const params = {
        ...formLine,
        userId: this.userId,
        orderBy: 'desc'
        // sortField: 'threeSale'
      }
      getWaresListByUser(params).then((res = {}) => {
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
