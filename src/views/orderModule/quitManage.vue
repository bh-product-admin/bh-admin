<template>
  <div class="index">
    <el-card>
      <Header @search="" />
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
              <span v-if="item.filters === 'arrayStatus'">{{ orderReturnStatusOptions[scope.row[item.prop]] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.orderReturnStatus == 1"
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'agree')"
              >同意退款</el-button>
              <el-button
                v-if="scope.row.orderReturnStatus == 1"
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'refuse')"
              >拒绝退款</el-button>
              <el-button
                v-if="scope.row.content"
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'remark')"
              >查看留言</el-button>
              <el-button
                v-if="scope.row.refuseNote"
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'cause')"
              >拒绝原因</el-button>
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
  </div>
</template>
<script>
import {
  orderReturnBuyerList, // 资金明细列表
  orderConfirmPayCancel // 厂家同意退款
} from '@/api/property.js'
import {
  orderRefusedPayCancel // 厂家拒绝退款
} from '@/api/orderModule.js'
import Header from '@/views/orderModule/chooseHeader'
export default {
  name: 'OrderList',
  components: {
    Header
  },
  data() {
    return {
      orderReturnStatusOptions: ['', '待确认', '已确认', '无需确认', '已取消', '已拒绝'],
      // 1.待确认，2.已确认，3.无需确认，5.已取消,6.已拒绝
      sortColumns: ['price'],
      currentPage: 1,
      pageData: {
        pageSize: 10,
        total: 0,
        pageNum: 1
      },
      formLine: {},
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
          prop: 'src'
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
          label: '退款状态',
          type: 'array',
          prop: 'orderReturnStatus',
          filters: 'arrayStatus'
        },
        {
          label: '买家ID',
          type: 'text',
          prop: 'userId'
        },
        {
          label: '申请时间',
          type: 'text',
          prop: 'created',
          filters: 'date'
        }
      ]
    }
  },
  created() {
    this.fetList()
  },
  methods: {
    fetList(formLine = {}) {
      formLine['pageSize'] = this.pageData.pageSize
      formLine['pageNum'] = this.pageData.pageNum
      orderReturnBuyerList(formLine).then((res = {}) => {
        console.log(res, 'resss')
        const { data = {}, data: { list = [] }} = res
        this.pageData = data
        this.tableData = list && list instanceof Array && list.length >= 0 ? list : []
      }).catch((err = {}) => {
        console.log(err, 'errr')
      })
    },
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleConfirm(index, row, codeKey) { // 操作
      const handleObj = {
        agree: {
          text: '是否同意退款？',
          type: 'warning',
          isLook: false
        },
        refuse: {
          text: '拒绝退款',
          type: 'error',
          isEditText: true
        },
        remark: {
          text: '查看留言',
          type: '',
          isLook: true
        },
        cause: {
          text: '拒绝原因',
          type: '',
          isLook: true
        }
      }
      const handleItem = handleObj[codeKey]
      if (handleItem && handleItem.isEditText) { // 拒绝
        this.$prompt('拒绝退款', '请输入拒绝原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '请输入拒绝原因'
        }).then(({ value }) => {
          // 拒绝退款
          const params = {
            orderReturnId: row.orderReturnId,
            content: value
          }
          console.log(params, 'jujeueudue')
          orderRefusedPayCancel(params).then((res = {}) => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.fetList()
          }).catch((err = {}) => {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          })
        }).catch(() => {
        })
      } else { // 同意
        console.log(111, row)
        let handleItemText = handleItem.text
        if (codeKey == 'remark') handleItemText = row.content
        if (codeKey == 'cause') handleItemText = row.refuseNote
        this.$confirm(`${handleItemText}`, `${handleItem.text}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          showCancelButton: false,
          type: `${handleItem.type}`
        }).then(() => {
          if (handleItem && handleItem.isLook === false) {
            const params = {
              orderReturnId: row.orderReturnId
            }
            orderConfirmPayCancel(params).then((res = {}) => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.fetList()
            }).catch((err = {}) => {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
            console.log('queding')
          }
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
