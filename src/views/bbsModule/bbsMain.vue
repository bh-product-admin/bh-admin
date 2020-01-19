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
          border
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
            align="center"
            :sortable="sortColumns.includes(item.prop) ? true : false"
          >
            <template slot-scope="scope">
              <span v-if="!item.filters">{{ scope.row[item.prop] }}</span>
              <span v-if="item.filters === 'date'">{{ scope.row[item.prop] | datetimeDot }}</span>
              <span v-if="item.filters === 'type'">{{ formatType(scope.row[item.prop]) }}</span>
              <span v-if="item.filters === 'blogType'">{{ formatBlogType(scope.row[item.prop]) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        :current-page="pageData.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
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
      searchValue: {
        keywords: '',
        type: '',
        startTime: '',
        endTime: ''
      },
      sortColumns: ['time', 'commentNums'],
      currentPage: 1,
      tableData: [],
      pageData: {
        pageSize: 10,
        total: 0,
        pageNum: 1
      },
      columnData: [{
        label: '帖子类型',
        type: 'text',
        prop: 'typeId',
        filters: 'blogType'
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
  computed: {
    options() {
      return this.$store.state.bbsModule.options || []
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
      return formatTime(new Date(date))
    },
    formatType(code) {
      const arr = ['111', '222', '333']
      return arr[code]
    },
    formatBlogType(typeId) {
      const options = this.options
      const thisCheckedOption = options.filter(item => Number(item.value) === Number(typeId))
      return (thisCheckedOption && thisCheckedOption[0] && thisCheckedOption[0].label) || '全部'
    },
    search(val = {}) {
      console.log('search--', val)
      const { time, keywords, type } = val
      let startTime = ''
      let endTime = ''
      if (time && time instanceof Array) {
        startTime = this.$moment(new Date(time[0])).format('YYYY-MM-DD HH:mm:ss')
        endTime = this.$moment(new Date(time[1])).format('YYYY-MM-DD HH:mm:ss')
        console.log(startTime, endTime)
      }
      this.searchValue = {
        keywords,
        type,
        startTime,
        endTime
      }
      this.pageData['pageNum'] = 1
      this.fetchBlogList()
    },
    handleEdit() {
      this.$refs.PostingDialog.showDialog(true)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`, this.pageData)
      this.pageData['pageNum'] = 1
      this.pageData['pageSize'] = val
      this.fetchBlogList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageData['pageNum'] = val
      this.fetchBlogList()
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
      this.pageData['pageNum'] = 1
      this.fetchBlogList()
    },
    fetchBlogList() { // 获取帖子列表
      const params = {
        // ...this.searchValue,
        sortField: 'created',
        orderBy: 'asc',
        pageSize: this.pageData.pageSize,
        pageNum: this.pageData.pageNum
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
