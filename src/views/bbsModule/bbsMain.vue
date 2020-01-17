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
          :highlight-current-row="true"
          @sort-change="sortChange"
          @row-click="handleView"
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
              <span v-if="!item.filters">{{ scope.row[item.prop] }}</span>
              <span v-if="item.filters === 'date'">{{ scope.row[item.prop] | datetimeDot }}</span>
              <span v-if="item.filters === 'type'">{{ formatType(scope.row[item.prop]) }}</span>
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
    <PostingDialog ref="PostingDialog" @blogCreateSuccess="blogCreateSuccess" />
  </div>
</template>
<script>
import {
  getBlogList
} from '@/api/bbsModule'
import { formatTime } from '@/utils/index.js'
import bbsHeader from './bbsHeader'
import PostingDialog from './postingDialog'
// import { format } from ''
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
      tableData: [],
      pageData: {},
      columnData: [{
        label: '帖子类型',
        type: 'text',
        prop: 'typeId',
        filters: 'type'
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
        prop: 'created',
        filters: 'date'
      },
      {
        label: '评论数',
        type: 'text',
        prop: 'commentNum'
      }]
    }
  },
  mounted() {
    this.fetchBlogList()
    // console.log(this, 'thsi')
  },
  methods: {
    sortChange(column, prop, order) {
      console.log('sortChange--', column, prop, order)
    },
    formatDate(date) {
      console.log('------------142--------------', this)
      // const dateTime = new Date(date)
      // console.log(this.utils(dateTime), 'this.utils(dateTime)')
      return formatTime(new Date(date))
    },
    formatType(code) {
      const arr = ['111', '222', '333']
      return arr[code]
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
    },
    handleView(row) { // 跳转页面
      console.log(row, 'row')
      const { id = '' } = row
      console.log(id, 'commentNums')
      if (id) {
        this.$router.push({
          path: '/bbs-module/postDetail',
          query: {
            id
          }
        })
      }
    },
    blogCreateSuccess() {
      this.fetchBlogList()
    },
    fetchBlogList() { // 获取帖子列表
      const params = {
        sortField: 'created',
        orderBy: 'asc'
      }
      getBlogList(params).then((res = {}) => {
        console.log(res, 'resgetBlogList')
        const { data = {}, data: { list = [] }} = res
        this.pageData = data
        this.tableData = list && list instanceof Array && list.length >= 0 ? list : []
      }).catch((err) => {
        this.tableData = []
        console.log(err, 'err')
      })
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
::v-deep .el-table__row:hover{
  cursor: pointer;
}

</style>
