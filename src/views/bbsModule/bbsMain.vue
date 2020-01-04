<template>
  <div class="index">
    <el-card>
      <bbsHeader
        @search="search"
        @posting="handleEdit"
      />
    </el-card>
    <el-alert
      title="线下交易有风险，请大家谨慎辨别信息真伪，鼓励大家进行平台交易。"
      type="warning"
      show-icon
    />
    <el-card>
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'time', order: 'descending'}"
          @sort-change="sortChange"
        >
          <el-table-column
            v-for="(item, index) in columnData"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :sortable="sortColumns.includes(item.prop) ? true : false"
          >
            <template slot-scope="scope">
              {{ scope.row[item.prop] }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 发帖弹窗 -->
    <PostingDialog ref="PostingDialog" />
  </div>
</template>
<script>
import bbsHeader from './bbsHeader'
import PostingDialog from './postingDialog'
export default {
  name: 'BbsMain',
  components: {
    bbsHeader,
    PostingDialog
  },
  data() {
    return {
      sortColumns: ['time', 'commentNums'],
      currentPage: 1,
      tableData: [
        {
          type: '找货源',
          title: '抖音优质渠道，求服饰类靠谱供应厂家，详细要求里面看~',
          time: '2016-05-04',
          commentNums: 4444
        },
        {
          type: '找货源',
          title: '抖音优质渠道，求服饰类靠谱供应厂家，详细要求里面看~',
          time: '2016-05-03',
          commentNums: 4444
        },
        {
          type: '找货源',
          title: '抖音优质渠道，求服饰类靠谱供应厂家，详细要求里面看~',
          time: '2016-05-07',
          commentNums: 9993
        },
        {
          type: '找货源',
          title: '抖音优质渠道，求服饰类靠谱供应厂家，详细要求里面看~',
          time: '2016-05-04',
          commentNums: 666
        },
        {
          type: '找货源',
          title: '抖音优质渠道，求服饰类靠谱供应厂家，详细要求里面看~',
          time: '2016-05-04',
          commentNums: 123
        },
        {
          type: '找货源',
          title: '抖音优质渠道，求服饰类靠谱供应厂家，详细要求里面看~',
          time: '2016-05-04',
          commentNums: 4444
        }
      ],
      columnData: [
        {
          label: '帖子类型',
          type: 'text',
          prop: 'type'
        },
        {
          label: '帖子标题',
          width: 600,
          type: 'text',
          prop: 'title'
        },
        {
          label: '发布时间',
          type: 'text',
          prop: 'time'
        },
        {
          label: '评论数',
          type: 'text',
          prop: 'commentNums'
        }
      ]
    }
  },
  created() {},
  methods: {
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    search(val) {
      console.log('search--', val)
    },
    handleEdit() {
      this.$refs.PostingDialog.showDialog(true)
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
<style lang="scss" scoped>
.ptb10 {
  padding-top: 10px;
  padding-bottom: 10px;
}
::v-deep .el-pagination{
  margin: 10px;
}
::v-deep .el-alert{
  margin: 10px auto
}

</style>
