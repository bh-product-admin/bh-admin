<template>
  <div class="index">
    <el-card>
      <Header />
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
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.orderReturnStatus == 1"
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'agree')"
              >取消退款</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
import Header from '@/views/orderModule/chooseHeader'
import {
  buyerList
} from '@/api/orderModule'
export default {
  name: 'OrderList',
  components: {
    Header
  },
  data() {
    return {
      sortColumns: ['price'],
      currentPage: 1,
      tableData: [],
      columnData: [
        {
          label: '订单编号',
          type: 'text',
          prop: 'orderId'
        },
        {
          label: '退款单编号',
          type: 'text',
          prop: 'orderReturnId'
        },
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
          label: '采购单价',
          type: 'text',
          prop: 'price'
        },
        {
          label: '采购数量',
          type: 'text',
          prop: 'number'
        },
        {
          label: '采购总价',
          type: 'text',
          prop: 'amount'
        },
        {
          label: '厂家ID',
          type: 'text',
          prop: 'merchantId'
        },
        {
          label: '采购时间',
          type: 'date',
          prop: 'startCreatedTime'
        },
        {
          label: '剩余库存',
          type: 'text',
          prop: 'date'
        },
        {
          label: '退款状态',
          type: 'text',
          prop: 'orderReturnStatus'
        }
      ]
    }
  },
  created() {
    this.fetchOrderList()
  },
  methods: {
    fetchOrderList() {
      buyerList({ orderBy: 'desc', sortField: 'created' }).then(res => {
        const { data = {}, data: { list = [] }} = res
        this.pageData = data
        this.tableData = list && list instanceof Array && list.length >= 0 ? list : []
        console.log(res, 'ressgetGoodsLists')
      }).catch(err => {
        console.log(err, 'errrrgetGoodsList')
      })
    },
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleConfirm(index, row, codeKey) { // 操作
      const handleObj = {
        agree: {
          text: '是否取消退款？',
          type: 'warning'
        },
        refuse: {
          text: '拒绝退款',
          type: 'error',
          isEditText: true
        },
        remark: {
          text: '查看留言',
          type: ''
        },
        cause: {
          text: '拒绝原因',
          type: ''
        }
      }
      const handleItem = handleObj[codeKey]
      if (handleItem && handleItem.isEditText) {
        this.$prompt('拒绝退款', '请输入拒绝原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '请输入拒绝原因'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          })
        }).catch(() => {
        })
      } else {
        this.$confirm(`${handleItem.text}`, `${handleItem.text}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          showCancelButton: false,
          type: `${handleItem.type}`
        }).then(() => {
          
        }).catch(() => {
          console.log('quxiao')
        })
      }
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
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
