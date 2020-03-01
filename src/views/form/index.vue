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
              <span v-if="!item.filters&&item.type!=='img'">{{ scope.row[item.prop] }}</span>
              <span v-if="item.filters === 'date'">{{ scope.row[item.prop] | datetimeDot }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleNoticeDialog(scope.row)"
              >通知厂家发货121</el-button>
              <el-button size="mini" @click="handleAlipayTradeReturn(scope.row)">退款</el-button>

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
    <div><hasNoticeDialog ref="hasNoticeDialog" @handleEdit="handleEdit" /></div>

  </div>
</template>
<script>
import {
  orderBuy // 商家订单列表
} from '@/api/orderModule'
import Header from '@/views/orderModule/chooseHeader'
import hasNoticeDialog from './hasNoticeDialog'
export default {
  name: 'OrderList',
  components: {
    Header, hasNoticeDialog
  },
  data() {
    return {
      sortColumns: ['price'],
      currentPage: 1,
      pageData: {
        pageSize: 10,
        total: 0,
        pageNum: 1
      },
      tableData: [],
      columnData: [
        {
          label: '订单编号',
          type: 'text',
          prop: 'id'
        },
        {
          label: '商品图片',
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
          prop: 'userId'
        },
        {
          label: '采购时间',
          type: 'text',
          prop: 'confirmTime',
          filters: 'date'
        },
        {
          label: '剩余库存',
          type: 'text',
          prop: 'date'
        },
        {
          label: '签收率',
          type: 'text',
          prop: 'date'
        }
      ]
    }
  },
  created() {
    this.fetchOrderList()
  },
  methods: {
    fetchOrderList() {
      orderBuy({ orderBy: 'desc', sortField: 'confirmTime' }).then(res => {
        const { data = {}, data: { list = [] }} = res
        this.pageData = data
        this.tableData = list && list instanceof Array && list.length >= 0 ? list : []
        console.log(res, 'ressgetGoodsLists')
      }).catch(err => {
        console.log(err, 'errrrgetGoodsList')
      })
    },
    sortChange(column, prop, order) { // 排序
      console.log('sortChange--', column, prop, order)
    },
    handleNoticeDialog(row) {
      this.$refs.hasNoticeDialog.showDialog(row, true)
    },
    handleEdit() {},
    // handleConfirm(index, row, codeIndex) { // 操作
    //   const handleObj = {
    //     Confirm: {
    //       text: '确认订单',
    //       type: 'warning'
    //     },
    //     Cancel: {
    //       text: '取消订单',
    //       type: 'error'
    //     },
    //     Remind: {
    //       text: '催一下',
    //       type: 'info'
    //     }
    //   }
    //   const handleItem = handleObj[codeIndex]
    //   this.$confirm(`是否${handleItem.text}？`, `${handleItem.text}`, {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: `${handleItem.type}`
    //   }).then(() => {
    //     console.log('queding')
    //   }).catch(() => {
    //     console.log('quxiao')
    //   })
    //   console.log(index, row)
    // },
    handleAlipayTradeReturn() {

    },
    handleSizeChange(val) { // 每页条数改变
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) { // 页码改变
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
::v-deep .el-pagination {
  margin: 10px;
}
</style>
