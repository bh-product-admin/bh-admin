<template>
  <div>
    <el-card>
      <el-form
        :model="form"
        :inline="true"
      >
        <el-form-item label="退款名称:">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="退款状态:">
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
        <el-form-item label="买家ID:">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="退款名称:">
          <el-input v-model="form.phone" />
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
      <el-form-item label="订单编号:">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="退款单编号:">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="厂家ID:">
          <el-input v-model="form.phone" />
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
              >同意退款</el-button>
              <el-button
                size="mini"
                @click="handelRefuse(scope.row)"
              >拒绝退款</el-button>
              <el-button
                size="mini"
                @click="handleCancelShield(scope.row)"
              >查看留言</el-button>
              <el-button
                size="mini"
                @click="handleCancelShield(scope.row)"
              >录入退款单信息</el-button>
              <el-button
                size="mini"
                @click="handleCancelShield(scope.row)"
              >查看退款详情
              </el-button>
              <el-button
                size="mini"
                @click="handleCancelShield(scope.row)"
              >查看拒绝原因</el-button>
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
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
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
          label: '订单编号',
          type: 'text',
          prop: 'id'
        },
        {
          label: '退款单编号',
          type: 'text',
          prop: 'tid'
        },
        {
          label: '商品图片',
          type: 'img',
          prop: 'img'
        },
        {
          label: '商品标题',
          type: 'text',
          prop: 'title'
        },
        {
          label: '采购单价',
          type: 'text',
          prop: 'price'
        },
        {
          label: '采购数量',
          type: 'text',
          prop: 'number'
        },
        {
          label: '采购总价',
          type: 'text',
          prop: 'total'
        },
        {
          label: '退款状态',
          type: 'text',
          prop: 'status'
        },
        {
          label: '买家ID',
          type: 'text',
          prop: 'buyId'
        },
        {
          label: '厂家ID',
          type: 'text',
          prop: 'marketId'
        },
        {
          label: '申请时间',
          type: 'text',
          prop: 'created'
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
