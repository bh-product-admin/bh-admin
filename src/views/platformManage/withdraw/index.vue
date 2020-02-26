<template>
  <div>
    <el-card>
      <el-form
        :model="form"
        :inline="true"
      >
        <el-form-item label="用户账号:">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="流水ID:">
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
        <el-form-item label="状态:">
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
        <el-form-item label="发起时间：">
        <el-date-picker
          v-model="form.time"
          size="small"
          type="datetimerange"
          align="right"
          placeholder="选择发起时间"
        />
      </el-form-item>
        <el-button type="primary" @click="updatePageData">查询</el-button>
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
            :width="item.width"
            align="center"
          >
            <template slot-scope="scope">
              <img v-if="item.type=='img'" :src="scope.row.img" width="100" height="100">
              <span v-else>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >拒绝</el-button>
              <el-button
                size="mini"
                @click="handelRefuse(scope.row)"
              >录入汇款单</el-button>
              <el-button
                size="mini"
                @click="handleCancelShield(scope.row)"
              >查看拒绝理由</el-button>
              <el-button
                size="mini"
                @click="handleCancelShield(scope.row)"
              >查看汇款详情</el-button>
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
export default {
  data() {
    return {
      radio: '1',
      sortColumns: ['price'],
      currentPage: 1,
      dataList: [
        {
          id: '123',
          tid: '345',
          img: '1123123',
          title: '测试',
          price: '123',
          number: '1',
          total: 555,
          status: '退款中',
          buyId: 18667000223,
          marketId: 44455,
          created: '2015-04-03'
        }
      ],
      columnData: [
        {
          label: '流水ID',
          type: 'text',
          prop: 'id'
        },
        {
          label: '用户账号',
          type: 'text',
          prop: 'tid'
        },
        {
          label: '用户类型',
          type: 'text',
          prop: 'img'
        },
        {
          label: '提现金额',
          type: 'text',
          prop: 'title'
        },
        {
          label: '申请时间',
          type: 'text',
          prop: 'price'
        },
        {
          label: '状态',
          type: 'text',
          prop: 'number'
        }
      ],
      form: {

      },
      selectArr: [
        {
          type: '',
          label: '待确认'
        },
        {
          type: 1,
          label: '已确认'
        },
        {
          type: 2,
          label: '已退款'
        }
      ],
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  async created() {
    this.updatePageData()
  },
  methods: {
    async handleSuccess() {
      try {
        const res = await getUserList({ certified: 1 })
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
    async handleBlack() {
      try {
        const res = await getUserList({ status: 2 })
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
        const res = await getUserList(this.form)
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
      this.$confirm(``, `是否同意退款？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        showCancelButton: false,
        type: 'waring'
      }).then(() => {
        console.log('queding')
      }).catch(() => {
        console.log('quxiao')
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
    handelRefuse(data) {
      this.$prompt('请输入拒绝理由', '拒绝退款', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '请输入拒绝理由'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          })
        }).catch(() => {
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
