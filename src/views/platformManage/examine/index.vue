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
            v-model="form.manufacturerCertified"
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
        <el-button type="primary" @click="search">查询</el-button>
      </el-form>
    </el-card>
    <el-card>
      <div class="content">
        <el-table
          :data="tableData"
          border
          align="center"
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
              <span v-if="item.type === 'time'">
                {{ scope.row[item.prop] | datetimeDot }}
              </span>
              <span v-else-if="item.type === 'status'">
                {{ filterStatus(scope.row[item.prop]) }}
              </span>
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
              <!-- <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >拉黑</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >释放</el-button> -->
              <el-button
                size="mini"
                v-if="scope.row.manufacturerCertified == 2||scope.row.manufacturerCertified == 3"
                @click="handleLookDetail(scope.$index, scope.row)"
              >查看资料</el-button>
              <el-button
                size="mini"
                v-if="scope.row.manufacturerCertified == 1"
                @click="handleLookDetail(scope.$index, scope.row)"
              >查看资料</el-button>
              <el-button
                size="mini"
                v-if="scope.row.manufacturerCertified == 4"
                @click="handleLookDetail(scope.$index, scope.row)"
              >拒绝理由</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <el-pagination
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /> -->
    </el-card>
    <examineDialog ref="examineDialog" @handleSuccess="getManufacturerCertifiedIng" />
  </div>
</template>

<script>
import { getManufacturerCertifiedIng } from '@/api/user'
import examineDialog from './examineDialog'
export default {
  components: {
    examineDialog
  },
  data() {
    return {
      sortColumns: ['price'],
      currentPage: 1,
      tableData: [],
      rowData: {},
      columnData: [
        {
          label: '申请账号',
          type: 'text',
          prop: 'phone'
        },
        {
          label: '状态',
          type: 'status',
          prop: 'manufacturerCertified'
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
          type: 1,
          label: '已认证'
        },
        {
          type: 2,
          label: '未认证'
        },
        {
          type: 3,
          label: '待审核'
        },
        {
          type: 4,
          label: '认证失败'
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
  },
  async created() {
    try {
      const res = await getManufacturerCertifiedIng()
      const { data = [] } = res
      this.tableData = data
      // this.pagination = {
      //   total: (data && data.total) || 0,
      //   pageSize: (data && data.pageSize) || 10,
      //   currentPage: (data && data.pageNum) || 1
      // }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    search(){
      this.updatePageData()
    },
    handleLookDetail(index, row) {
      console.log(index, row, 'index, row')
      this.$refs.examineDialog.showDialog(row, true)
    },
    filterStatus(code) {
      const selectArr = this.selectArr.filter(item => item.type === code)
      return selectArr && selectArr.length ? selectArr[0].label : '--'
    },
    async updatePageData() {
      try {
        const res = await getManufacturerCertifiedIng(this.form)
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
