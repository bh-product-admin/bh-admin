<template>
  <div class="index">
    <el-card>
      <Header />
    </el-card>
    <el-card>
      <div class="content">
        <el-table :data="tableData"
                  style="width: 100%"
                  @sort-change="sortChange">
          <el-table-column v-for="(item, index) in columnData"
                           :key="index"
                           :label="item.label"
                           :prop="item.prop"
                           :sortable="sortColumns.includes(item.prop) ? true : false">
            <template slot-scope="scope">
              <img v-if="item.type=='img'"
                   :src="scope.row.src"
                   width="100"
                   height="100">
              <span v-else>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="200">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleConfirm(scope.$index, scope.row, 'Confirm')">通知厂家发货</el-button>
              <el-button size="mini">退款</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination :current-page="pageData.pageNum"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageData.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pageData.total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </el-card>
  </div>
</template>
<script>
import {
  orderBuy // 商家订单列表
} from '@/api/orderModule'
import Header from '@/views/orderModule/chooseHeader'
export default {
  name: 'OrderList',
  components: {
    Header
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
      tableData: [
        {
          userId: '211',
          ids: '111',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-04',
          price: '¥34',
          seleNum: '2,000',
          priceTotal: '5,424',
          status: 0,
          seleNumTotal: 4444
        },
        {
          userId: '212',
          ids: '222',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-07',
          price: '¥33',
          seleNum: '2,000',
          priceTotal: 111,
          status: 1,
          seleNumTotal: 3333
        },
        {
          userId: '213',
          ids: '333',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-04',
          price: '¥31',
          seleNum: '2,000',
          priceTotal: '5,424',
          status: 2,
          seleNumTotal: 1111
        },
        {
          userId: '214',
          ids: '444',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-04',
          price: '¥1122',
          seleNum: '2,000',
          priceTotal: '5,424',
          status: 2,
          seleNumTotal: 5555
        }
      ],
      columnData: [
        {
          label: '订单编号',
          type: 'text',
          prop: 'ids'
        },
        {
          label: '商品图片',
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
          prop: 'seleNum'
        },
        {
          label: '采购总价',
          type: 'text',
          prop: 'priceTotal'
        },
        {
          label: '厂家ID',
          type: 'text',
          prop: 'status'
        },
        {
          label: '采购时间',
          type: 'text',
          prop: 'userId'
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
      orderBuy().then(res => {
        const { data = {}, data: { list = [] } } = res
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
    handleConfirm(index, row, codeIndex) { // 操作
      const handleObj = {
        Confirm: {
          text: '确认订单',
          type: 'warning'
        },
        Cancel: {
          text: '取消订单',
          type: 'error'
        },
        Remind: {
          text: '催一下',
          type: 'info'
        }
      }
      const handleItem = handleObj[codeIndex]
      this.$confirm(`是否${handleItem.text}？`, `${handleItem.text}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: `${handleItem.type}`
      }).then(() => {
        console.log('queding')
      }).catch(() => {
        console.log('quxiao')
      })
      console.log(index, row)
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
