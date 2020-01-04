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
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'confirm')"
              >确认发货</el-button>
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'cancel')"
              >取消发货</el-button>
              <el-button
                size="mini"
                @click="handleConfirm(scope.$index, scope.row, 'reason')"
              >查看取消原因</el-button>
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
  created() {},
  methods: {
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleConfirm(index, row, codeKey) { // 操作
      const handleObj = {
        confirm: {
          text: '是否确认发货？',
          type: 'warning'
        },
        cancel: {
          text: '取消发货',
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
        this.$prompt('取消发货', '请输入取消发货', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '请输入取消发货'
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
