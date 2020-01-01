<template>
  <div class="table-box">
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column v-for="(item, index) in columnData" :key="index" :label="item.label" align="center">
          <template slot-scope="scope">
            <img v-if="item.type=='img'" :src="scope.row.src" width="100px" height="100px">
            <span v-else>
              {{ scope.row[item.code] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
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
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
      type: Object,
      default: () => {}
    },
    columnData: {
      type: Object,
      default: () => {}
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
</style>
