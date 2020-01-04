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
          :default-sort="{prop: 'date', order: 'descending'}"
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >我有货</el-button>
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
    <div><hasGoodsDialog ref="hasGodsDialog" @handleEdit="handleEdit" /></div>
    <!-- 我有货 -->
  </div>
</template>
<script>
import Header from '@/components/chooseHeader/index'
import hasGoodsDialog from '@/views/chooseGoods/hasGodsDialog'
import {
} from '@/api/user'
export default {
  name: 'IndustryNew',
  components: {
    Header,
    hasGoodsDialog
  },
  data() {
    return {
      sortColumns: ['date', 'seleNumThree', 'seleNumWeek', 'seleNumTotal', 'seleNum'],
      currentPage: 1,
      tableData: [
        {
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-04',
          colName: '日用家居-音箱-无线音箱',
          price: '¥34',
          seleNum: '2,000',
          seleNumThree: '5,424',
          seleNumWeek: '12,003',
          seleNumTotal: 4444
        },
        {
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-07',
          colName: '日用家居-音箱-无线音箱2',
          price: '¥34',
          seleNum: '2,000',
          seleNumThree: 111,
          seleNumWeek: 444,
          seleNumTotal: 3333
        },
        {
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-04',
          colName: '日用家居-音箱-无线音箱3',
          price: '¥34',
          seleNum: '2,000',
          seleNumThree: '5,424',
          seleNumWeek: '12,003',
          seleNumTotal: 1111
        },
        {
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          title: 'xxxxxxxxx',
          date: '2016-05-04',
          colName: '日用家居-音箱-无线音箱4',
          price: '¥34',
          seleNum: '2,000',
          seleNumThree: '5,424',
          seleNumWeek: '12,003',
          seleNumTotal: 5555
        }
      ],
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
          type: 'text',
          prop: 'date'
        },
        {
          label: '类目',
          type: 'text',
          prop: 'colName'
        },
        {
          label: '价格',
          type: 'text',
          prop: 'price'
        },
        {
          label: '一日销量',
          type: 'text',
          prop: 'seleNum'
        },
        {
          label: '三日销量',
          type: 'text',
          prop: 'seleNumThree'
        },
        {
          label: '七日销量',
          type: 'text',
          prop: 'seleNumWeek'
        },
        {
          label: '总销量',
          type: 'text',
          prop: 'seleNumTotal'
        }
      ]
    }
  },
  created() {},
  methods: {
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$refs.hasGodsDialog.showDialog(row, true)
      // loginByCode({ phone: 18668051021, code: '1111' }).then((res) => {
      //   console.log(res, 'resssss2')
      // }).then((err) => {
      //   console.log(err, 'errr33')
      // })
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
