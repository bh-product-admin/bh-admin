<template>
  <div class="index">
    <el-card>
      <Header @search="searchList" />
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
            :width="item.width"
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
          <el-table-column label="操作" width="240" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status == 0"
                size="mini"
                @click="$router.push({path:'/logistics-module-market/logisticsDetail',query:{id:scope.row.ids}})"
              >物流单录入</el-button>
              <el-button
                v-if="scope.row.status == 1|| scope.row.status == 0"
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'cancel')"
              >取消发货</el-button>
              <el-button
                v-if="scope.row.status == 2"
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'reason')"
              >查看取消原因</el-button>
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
  logisticsManufacturersList, // 卖家物流列表
  logisticsManufacturersCancel // 卖家取消发货单
} from '@/api/logisticsModule'
import Header from '@/views/logisticsModule/logisticsHeader'
export default {
  name: 'LogisticsList',
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
          logisticsStatus: 0,
          logisticsAccount: 1,
          date: '2016-05-04',
          price: '¥34',
          goodsNum: '2,000',
          personInfo: '5,424',
          status: 0,
          address: 4444
        },
        {
          userId: '212',
          ids: '222',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          logisticsStatus: 0,
          logisticsAccount: 1,
          date: '2016-05-07',
          price: '¥33',
          goodsNum: '2,000',
          personInfo: 111,
          status: 1,
          address: 3333
        },
        {
          userId: '213',
          ids: '333',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          logisticsStatus: 0,
          logisticsAccount: 1,
          date: '2016-05-04',
          price: '¥31',
          goodsNum: '2,000',
          personInfo: '5,424',
          status: 2,
          address: 1111
        },
        {
          userId: '214',
          ids: '444',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          logisticsStatus: 0,
          logisticsAccount: 1,
          date: '2016-05-04',
          price: '¥1122',
          goodsNum: '2,000',
          personInfo: '5,424',
          status: 2,
          address: 5555
        }
      ],
      columnData: [
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
          label: '物流状态',
          type: 'text',
          prop: 'logisticsStatus'
        },
        {
          label: '物流账户',
          type: 'text',
          prop: 'logisticsAccount'
        },
        {
          label: '商品数量',
          type: 'text',
          prop: 'goodsNum'
        },
        {
          label: '收件人信息',
          type: 'text',
          prop: 'personInfo'
        },
        {
          label: '寄送地址',
          type: 'text',
          prop: 'address'
        }
      ]
    }
  },
  created() {
    this.getlogisticsList()
  },
  methods: {
    getlogisticsList(formLine) {
      logisticsManufacturersList(formLine).then((res = {}) => {
        console.log(res, 'ressss--getlogisticsList')
        const { data = [] } = res
        if (data && data instanceof Array && data.length) {
          this.tableData = data
        } else {
          this.tableData = []
        }
      }).catch((err = {}) => {
        this.tableData = []
        console.log(err, 'errr--getlogisticsList')
      })
    },
    searchList(formLine) {
      console.log(formLine, 'formLineformLineformLine')
      formLine = {
        ...formLine,
        ...this.pageData
      }
      this.getlogisticsList(formLine)
    },
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleConfirm(index, row, codeKey) { // 操作
      const handleObj = {
        confirm: {
          text: '请输入物流单号',
          type: 'warning',
          title: '录入物流单号',
          isEditText: true
        },
        cancel: {
          text: '取消发货/拒签原因',
          title: '',
          type: 'error',
          isEditText: true
        },
        reason: {
          text: '查看取消原因',
          type: ''
        }
      }
      const handleItem = handleObj[codeKey]
      if (handleItem && handleItem.isEditText) {
        this.$prompt(handleItem.title, handleItem.text, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: handleItem.text
        }).then(({ value }) => {
          const params = {
            id: row.id,
            content: value
          }
          logisticsManufacturersCancel(params).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '操作失败，请重试'
            })
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
