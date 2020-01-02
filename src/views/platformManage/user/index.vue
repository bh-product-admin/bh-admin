<template>
  <div>
    <el-card>
      <el-form :model="form" :inline="true">
        <el-form-item label="手机号:">
          <el-input v-model="form.mobile" />
        </el-form-item>
        <el-form-item label="用户类型:">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option v-for="(item,index) in selectArr" :key="index" :value="item.type" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-button type="primary">黑名单用户</el-button>
        <el-button type="primary">认证用户</el-button>
        <el-button type="primary">查询</el-button>
      </el-form>
    </el-card>
    <el-card>
      <div class="content">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @sort-change="sortChange"
        >
          <el-table-column
            v-for="(item, index) in columnData"
            :key="index"
            :label="item.label"
            :prop="item.prop"
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
                @click="handleEdit(scope.$index, scope.row)"
              >拉黑</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >删除</el-button>
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
export default {
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
          label: '用户手机号',
          type: 'text',
          prop: 'ids'
        },
        {
          label: 'id',
          type: 'img',
          prop: 'src'
        },
        {
          label: '类型',
          type: 'text',
          prop: 'title'
        },
        {
          label: '注册时间',
          type: 'text',
          prop: 'price'
        },
        {
          label: '最近一次登录',
          type: 'text',
          prop: 'seleNum'
        },
        {
          label: '认证用户',
          type: 'text',
          prop: 'priceTotal'
        },
        {
          label: '总交易额',
          type: 'text',
          prop: 'status'
        },
        {
          label: '总收入',
          type: 'text',
          prop: 'userId'
        }

      ],
      form: {
        mobile: 13511111111

      },
      selectArr: [
        {
          type: 0,
          label: '全部'
        },
        {
          type: 1,
          label: '厂家'
        },
        {
          type: 2,
          label: '卖家'
        }
      ]
    }
  },
  methods: {
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
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

<style>

</style>
