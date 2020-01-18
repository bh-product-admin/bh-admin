<template>
  <div>
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
              >驳回</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCertificationIng } from '@/api/user'
export default {
  data() {
    return {
      sortColumns: ['price'],
      currentPage: 1,
      tableData: [],
      columnData: [
        {
          label: '用户账号',
          type: 'text',
          prop: 'phone'
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
  },
  async created() {
    try {
      const res = await getCertificationIng()
      const { data = {}} = res
      this.tableData = data
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
        const res = await getCertificationIng()
        this.tableData = res.data
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
