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
      sortColumns: ['totalNum', 'totalMoney'],
      currentPage: 1,
      pageData: {
        pageSize: 10,
        total: 0,
        pageNum: 1
      },
      tableData: [
        {
          capitalFlow: 1,
          totalNum: '111',
          totalMoney: '2232',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-04',
          colName: '日用家居-音箱-无线音箱',
          price: '¥34',
          stockNum: '333',
          seleNum: '2,000',
          seleNumThree: '5,424',
          seleNumWeek: '12,003',
          seleNumTotal: 4444
        },
        {
          capitalFlow: 1,
          totalNum: '111',
          totalMoney: '2232',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-07',
          colName: '日用家居-音箱-无线音箱2',
          price: '¥34',
          stockNum: '333',
          seleNum: '2,000',
          seleNumThree: 111,
          seleNumWeek: 444,
          seleNumTotal: 3333
        },
        {
          capitalFlow: 1,
          totalNum: '111',
          totalMoney: '2232',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-04',
          colName: '日用家居-音箱-无线音箱3',
          price: '¥34',
          stockNum: '333',
          seleNum: '2,000',
          seleNumThree: '5,424',
          seleNumWeek: '12,003',
          seleNumTotal: 1111
        },
        {
          capitalFlow: 1,
          totalNum: '111',
          totalMoney: '2232',
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-04',
          colName: '日用家居-音箱-无线音箱4',
          price: '¥34',
          stockNum: '333',
          seleNum: '2,000',
          seleNumThree: '5,424',
          seleNumWeek: '12,003',
          seleNumTotal: 5555
        }
      ],
      columnData: [
        {
          label: '流水类型',
          type: 'text',
          width: 100,
          prop: 'capitalFlow'
        },
        {
          label: '时间',
          type: 'text',
          width: 100,
          prop: 'date'
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
          prop: 'totalNum'
        },
        {
          label: '金额',
          type: 'text',
          width: 100,
          prop: 'totalMoney'
        }
      ]
    }
  },
  created() {
    this.fetchMoneyList({type:1,startCreatedTime:1599877776665,endCreatedTime:1599877776667})
  },
  methods: {
    fetchMoneyList(params = {}) {
      moneyDetailBuyerList(params).then((res = {}) => {
        console.log(res, 'res')
        const { data = [] } = res
        if (data && data instanceof Array && data.length) {
          this.tableData = data
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
