<template>
  <div class="index">
    <Header />
    <div class="content">
      <div>
        <sortBotton :buttonArr="buttonArr" />
      </div>
      <industryTable :tableData="tableData" :columnData="columnData" />
    </div>
  </div>
</template>
<script>
import Header from '@/components/chooseHeader/index'
import sortBotton from '@/components/sortButton'
import industryTable from '@/components/industry/industryTable'
export default {
  name: 'IndustryIndex',
  components: {
    Header,
    sortBotton,
    industryTable
  },
  data() {
    return {
      buttonArr: [
        {
          text: '一日销量',
          code: 'oneDay'
        }, {
          text: '三日销量',
          code: 'threeDay'
        }, {
          text: '七日销量',
          code: 'weekDay'
        }, {
          text: '总销量',
          code: 'totalDay'
        }, {
          text: '上线日期',
          code: 'dateTime'
        }
      ],
      tableData: [{
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        title: 'xxxxxxxxx',
        date: '2016-05-04',
        colName: '日用家居-音箱-无线音箱',
        price: '¥34',
        seleNum: '2,000',
        seleNumThree: '5,424',
        seleNumWeek: '12,003',
        seleNumTotal: '242,531',
      }, {
       src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        title: 'xxxxxxxxx',
        date: '2016-05-04',
        colName: '日用家居-音箱-无线音箱2',
        price: '¥34',
        seleNum: '2,000',
        seleNumThree: '5,424',
        seleNumWeek: '12,003',
        seleNumTotal: '242,531',
      }, {
       src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        title: 'xxxxxxxxx',
        date: '2016-05-04',
        colName: '日用家居-音箱-无线音箱3',
        price: '¥34',
        seleNum: '2,000',
        seleNumThree: '5,424',
        seleNumWeek: '12,003',
        seleNumTotal: '242,531',
      }, {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        title: 'xxxxxxxxx',
        date: '2016-05-04',
        colName: '日用家居-音箱-无线音箱4',
        price: '¥34',
        seleNum: '2,000',
        seleNumThree: '5,424',
        seleNumWeek: '12,003',
        seleNumTotal: '242,531',
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
      ],
     
    }
  },
  created() {

  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }

}
</script>
<style>
  .sort-button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .icon-up-down{
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }
  .icon-up-down .active {
    color: red
  }
  .table-box{
    position: relative;
  }
  .pagination-index{
    position: fixed;
    left: 0;
    bottom: 0;
  }

</style>
