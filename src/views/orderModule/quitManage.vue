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
              <img v-if="item.type=='img'" :src="scope.row.src" width="100" height="100">
              <span v-else>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'agree')"
              >同意退款</el-button>
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'refuse')"
              >拒绝退款</el-button>
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'remark')"
              >查看留言</el-button>
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'cause')"
              >拒绝原因</el-button>
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
export default {
  name: 'OrderList',
  components: {
    Header
  },
  data() {
    return {
      sortColumns: ['price'],
      currentPage: 1,
      tableData: [
        {
          userId: '211',
          ids: '111',
          quitIds: '211',
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
          quitIds: '211',
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
          quitIds: '211',
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
          quitIds: '211',
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
          label: '退款单编号',
          type: 'text',
          prop: 'quitIds'
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
          prop: 'seleNum'
        },
        {
          label: '采购总价',
          type: 'text',
          prop: 'priceTotal'
        },
        {
          label: '退款状态',
          type: 'text',
          prop: 'status'
        },
        {
          label: '买家ID',
          type: 'text',
          prop: 'userId'
        },
        {
          label: '申请时间',
          type: 'text',
          prop: 'date'
        }
      ]
    }
  },
  created() {},
  methods: {
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleConfirm(index, row, codeKey) { // 操作
      const handleObj = {
        agree: {
          text: '是否同意退款？',
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
          console.log('queding')
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
