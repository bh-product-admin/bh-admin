<template>
  <div>
    <el-card>
      <el-form
        :model="form"
        :inline="true"
      >
        <el-form-item label="手机号:">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="用户类型:">
          <el-select
            v-model="form.type"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in selectArr"
              :key="index"
              :value="item.type"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-button
          v-model="form.status"
          type="primary"
        >黑名单用户</el-button>
        <el-button
          v-model="form.certified"
          type="primary"
        >认证用户</el-button>
        <el-button type="primary">查询</el-button>
      </el-form>
    </el-card>
    <el-card>
      <div class="content">
        <el-table
          :data="dataList"
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
            <template slot-scope="scope">{{ scope.row[item.prop] }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status===1"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >拉黑</el-button>
              <el-button
                v-if="scope.row.status===2"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >释放</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { getUserList, addBlack } from '@/api/user'
import moment from 'moment'
export default {
  data() {
    return {
      sortColumns: ['price'],
      currentPage: 1,
      tableData: [],
      columnData: [
        {
          label: '用户手机号',
          type: 'text',
          prop: 'phone'
        },
        {
          label: 'id',
          type: 'text',
          prop: 'id'
        },
        {
          label: '类型',
          type: 'text',
          prop: 'typeName'
        },
        {
          label: '注册时间',
          type: 'time',
          prop: 'created'
        },
        {
          label: '最近一次登录',
          type: 'text',
          prop: 'updated'
        },
        {
          label: '认证用户',
          type: 'text',
          prop: 'certified'
        },
        {
          label: '总交易额',
          type: 'text',
          prop: 'totalMoney'
        },
        {
          label: '总收入',
          type: 'text',
          prop: 'totalTurnover'
        }

      ],
      form: {

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
      ],
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  computed: {
    dataList() {
      this.tableData.forEach(item => {
        switch (item.type) {
          case 1:
            item.typeName = '厂家'
            break
          case 2:
            item.typeName = '买家'
        }
        item.created = moment(item.created).format('YYYY-MM-DD hh:mm:ss')
        item.updated = moment(item.updated).format('YYYY-MM-DD hh:mm:ss')
      })
      return this.tableData
    }
  },
  async created() {
    try {
      const res = await getUserList()
      const { data = {}} = res
      this.tableData = data.list
      this.pagination = {
        total: (data && data.total) || 0,
        pageSize: (data && data.pageSize) || 10,
        currentPage: (data && data.pageNum) || 1
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async updatePageData() {
      try {
        const res = await getUserList()
        this.tableData = res.data.list
      } catch (error) {
        console.log(error)
      }
    },
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    async handleEdit(index, row) {
      console.log(index, row)
      try {
        const res = await addBlack({ userId: row.id })
        if (res.success) {
          this.$message.success(res.msg)
          this.updatePageData()
        } else {
          this.$message.error(res.msg)
        }
        console.log(res)
      } catch (error) {
        console.log(error)
      }
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
