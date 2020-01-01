<template>
  <div class="table-box">
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
<<<<<<< HEAD
        border
      >
        <el-table-column v-for="(item, index) in columnData" :key="index" :label="item.label" align="center">
          <template slot-scope="scope">
            <img v-if="item.type=='img'" :src="scope.row.src" width="100px" height="100px">
=======
      >
        <el-table-column v-for="(item, index) in columnData" :key="index" :label="item.label">
          <template slot-scope="scope">
            <img v-if="item.type=='img'" :src="scope.row.src" width="100" height="100">
>>>>>>> e7272f719291844324c9c507429189061c8d206b
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
<<<<<<< HEAD
=======
        :total="400"
>>>>>>> e7272f719291844324c9c507429189061c8d206b
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
<<<<<<< HEAD
        :total="400"
=======
>>>>>>> e7272f719291844324c9c507429189061c8d206b
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
<<<<<<< HEAD
      type: Object,
      default: () => {}
    },
    columnData: {
      type: Object,
      default: () => {}
=======
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
>>>>>>> e7272f719291844324c9c507429189061c8d206b
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
<<<<<<< HEAD

=======
>>>>>>> e7272f719291844324c9c507429189061c8d206b
}
</script>
<style>
</style>
