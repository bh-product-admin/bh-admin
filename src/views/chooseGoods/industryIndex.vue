<template>
  <div class="index">
    <el-card>
      <Header />
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column type="selection" align="center" />
        <el-table-column label="商品图" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.src"></template>
        </el-table-column>
        <el-table-column label="商品标题" align="center" prop="title" />
        <el-table-column label="上架时间" align="center" prop="date" />
        <el-table-column label="类目" align="center" prop="colName" />
        <el-table-column label="价格" align="center" prop="price" />
        <el-table-column label="一日销量" align="center" prop="seleNum" />
        <el-table-column label="三日销量" align="center" prop="seleNumThree" />
        <el-table-column label="七日销量" align="center" prop="seleNumWeek" />
        <el-table-column label="总销量" align="center" prop="seleNumTotal" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleShowProduct(scope.$index, scope.row)"
            >查看
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import Header from '@/components/chooseHeader/index'
export default {
  name: 'IndustryIndex',
  components: {
    Header
  },
  data() {
    return {
      tableData: [{
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        title: 'xxxxxxxxx',
        date: '2016-05-04',
        colName: '日用家居-音箱-无线音箱',
        price: '¥34',
        seleNum: '2,000',
        seleNumThree: '5,424',
        seleNumWeek: '12,003',
        seleNumTotal: '242,531'
      }, {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        title: 'xxxxxxxxx',
        date: '2016-05-04',
        colName: '日用家居-音箱-无线音箱2',
        price: '¥34',
        seleNum: '2,000',
        seleNumThree: '5,424',
        seleNumWeek: '12,003',
        seleNumTotal: '242,531'
      }, {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        title: 'xxxxxxxxx',
        date: '2016-05-04',
        colName: '日用家居-音箱-无线音箱3',
        price: '¥34',
        seleNum: '2,000',
        seleNumThree: '5,424',
        seleNumWeek: '12,003',
        seleNumTotal: '242,531'
      }, {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        title: 'xxxxxxxxx',
        date: '2016-05-04',
        colName: '日用家居-音箱-无线音箱4',
        price: '¥34',
        seleNum: '2,000',
        seleNumThree: '5,424',
        seleNumWeek: '12,003',
        seleNumTotal: '242,531'
      }],
      columnData: [
        {
          label: '商品图',
          type: 'img',
          code: 'src'
        }, {
          label: '商品标题',
          type: 'text',
          code: 'title'
        }, {
          label: '上架时间',
          type: 'text',
          code: 'date'
        }, {
          label: '类目',
          type: 'text',
          code: 'colName'
        }, {
          label: '价格',
          type: 'text',
          code: 'price'
        }, {
          label: '一日销量',
          type: 'text',
          code: 'seleNum'
        }, {
          label: '三日销量',
          type: 'text',
          code: 'seleNumThree'
        }, {
          label: '七日销量',
          type: 'text',
          code: 'seleNumWeek'
        }, {
          label: '总销量',
          type: 'text',
          code: 'seleNumTotal'
        }
      ]

    }
  },
  created() {

  },
  methods: {
    handleEdit(index, row) {
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
<style scoped>
  .index{
    padding: 10px;
  }
  .el-card{
    margin-bottom: 10px;
  }
</style>
