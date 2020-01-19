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
            align="center"
          >
          <template slot-scope="scope">
              <div v-if="item.type=='rodio'">
                <el-radio-group v-model="scope.row[item.prop]" @change="handleChange($event,scope.row)">
                  <el-radio :label="1">认证成功</el-radio>
                  <el-radio :label="2">未认证</el-radio>
                </el-radio-group>
                </div>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center"
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
                @click="handleCancelShield(scope.row)"
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
import { getUserList, addBlack, certification } from '@/api/user'
import moment from 'moment'
export default {
  data() {
    return {
      radio: '1',
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
          type: 'rodio',
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
    async handleChange(e, data) {
      console.log(data)
      const res = await certification({ userId: data.id, certification: e })
      if (res.success) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
      console.log(res)
    },
    async updatePageData() {
      try {
        const res = await getUserList()
        this.tableData = res.data.list
        const { data = {}} = res
        this.pagination = {
          total: (data && data.total) || 0,
          pageSize: (data && data.pageSize) || 10,
          currentPage: (data && data.pageNum) || 1
        }
      } catch (error) {
        console.log(error)
      }
    },
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    async handleEdit(index, row) {
      this.$confirm('确认拉黑？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(async() => {
        try {
          const res = await addBlack({ userId: row.id, status: 2 })
          if (res.success) {
            this.updatePageData()
            this.$message.success(res.msg)
          } else {
            res.$message.error(res.msg)
          }
        } catch (error) {
          console.log(error)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleCancelShield(data) {
      this.$confirm('确认释放？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(async() => {
        try {
          const res = await addBlack({ userId: data.id, status: 1 })
          if (res.success) {
            this.updatePageData()
            this.$message.success(res.msg)
          } else {
            res.$message.error(res.msg)
          }
        } catch (error) {
          console.log(error)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
