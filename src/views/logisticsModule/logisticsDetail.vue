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
              <img v-if="item.type=='img'" :src="scope.row.img" width="100" height="100">
              <div v-else>
                <span v-if="item.type=='button'">
                  <el-button v-if="item.type=='button'&&(!scope.row.expressNo || scope.row.expressNo === '0')" @click="handleConfirm(scope.$index, scope.row, 'confirm')">单号录入</el-button>
                  <font v-else>{{ scope.row['expressNo'] }}</font>
                </span>

                <span v-else-if="item.type=='personInfo'">
                  {{ scope.row['name'] }}  {{ scope.row['phone'] }}
                </span>
                <span v-else-if="item.filters === 'expressOpts'">{{ expressOptions[scope.row[item.prop]] }}</span>
                <span v-else>
                  {{ scope.row[item.prop] }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.clientConfirmStatus"
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'reason')"
              >查看拒签原因</el-button>
              <span v-else>无</span>
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
  logisticsAddExpressNo, // id=2&expressNo=JD0011136488416&expressName=jd
  logisticsOrderSendDetailList
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
      tableData: [],
      expressOptions: {
        'jd': '京东'
      },
      formLine: {},
      pageData: {
        pageSize: 10,
        total: 0,
        pageNum: 1
      },
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
          label: '物流单号',
          type: 'button',
          prop: 'expressNo'
        },
        {
          label: '物流账户',
          type: 'text',
          prop: 'expressName',
          filters: 'expressOpts'
        },
        {
          label: '商品数量',
          type: 'text',
          prop: 'orderNumber'
        },
        {
          label: '收件人信息',
          type: 'personInfo',
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
    this.getDataList()
  },
  methods: {
    getDataList(formLine = {}) {
      formLine['pageSize'] = this.pageData.pageSize
      formLine['pageNum'] = this.pageData.pageNum
      logisticsOrderSendDetailList(formLine).then((res = {}) => {
        // console.log(res, 'resss')
        // const { data } = res
        // this.tableData = data
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
      })
    },
    searchList(formLine) {
      console.log(formLine, 'formLineformLineformLine')
      formLine = {
        ...formLine,
        ...this.pageData
      }
      this.formLine = formLine
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
            expressNo: value,
            expressName: row.expressName
          }
          // id=2&expressNo=JD0011136488416&expressName=jd
          logisticsAddExpressNo(params).then(() => {
            this.$message({
              type: 'success',
              message: '物流单号录入成功'
            })
            this.getDataList()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '请稍后再试'
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
