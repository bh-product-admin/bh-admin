<template>
  <div>
    <el-card>
      <el-form
        :model="form"
        :inline="true"
      >
        <el-form-item label="申请账户:">
          <el-input v-model="form.phone" />
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
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >拉黑</el-button>
              <el-button
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
import { getManufacturerCertifiedIng } from '@/api/user'
import moment from 'moment'
export default {
  data() {
    return {
      sortColumns: ['price'],
      currentPage: 1,
      tableData: [],
      columnData: [
        {
          label: '申请账号',
          type: 'text',
          prop: 'phone'
        },
        {
          label: '状态',
          type: 'text',
          prop: 'id'
        },
        {
          label: '申请时间',
          type: 'time',
          prop: 'created'
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
          label: '待审核'
        },
        {
          type: 2,
          label: '已通过'
        },
        {
          type: 3,
          label: '已拒绝'
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
      const res = await getManufacturerCertifiedIng()
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
