<template>
  <div class="table-box">
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column v-for="(item, index) in columnData" :key="index" :label="item.label">
          <template slot-scope="scope">
            <img v-if="item.type=='img'" :src="scope.row.src" width="100" height="100">
            <span v-else>
              {{ scope.row[item.code] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >我有货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-index">
      <el-pagination
        :total="400"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndustryTable',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    columnData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      currentPage: 4
    }
  },
  created() {
  },
  methods: {
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
  .table-box{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .pagination-index{
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>
