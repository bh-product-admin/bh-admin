<template>
  <div>
    <el-card>
      <div class="flex jsb aic">
        <h4>{{ PostDetail.blog.title }}</h4>
        <div class="flex jsb aic f12">
          <div class="flex aic">
            <img :src="img" class="head-img">
            <span class="m10">{{ PostDetail.phone }}</span>
          </div>
          <span class="ml10">{{ PostDetail.blog.created | datetimeDot }}</span>
        </div>
      </div>
      <div class="divider" />
      <div>
        <div class="taj">
          {{ PostDetail.blog.content }}
        </div>
        <span class="el-link" @click="postReply('comment')">评论（{{ PostDetail.blog.commentNum }}）</span>
      </div>
    </el-card>
    <el-card class="comment-box">
      <ul>
        <li
          v-for="(item, index) in comments"
          :key="index"
        >
          <div class="flex jfs aic f12">
            <div class="flex aic">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="head-img">
              <span class="m10">{{ item.phone }}</span>
            </div>
            <span class="ml10">{{ item.comments.created | datetimeDot }}</span>
          </div>
          <div>
            <div class="comment-item taj">
              {{ item.comments.content }}
            </div>

            <span class="el-link" @click="postReply('reply', item.comments.id)">回复</span>
            <div v-if="item.comments.replyJson">
              <el-divider content-position="right">回复（{{ item.phone }}）</el-divider>
              <div class="comment-item ">
                <div class="flex aic">
                  <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="head-img">
                  <span class="m10">{{ createContent(item.comments.replyJson, 'phone') }}</span>
                </div>
                <div class="comment-item taj">
                  <span class="mt10">{{ createContent(item.comments.replyJson, 'content') }}</span>
                </div>
                <span class="el-link" @click="postReply('reply', item.comments.id)">回复</span>
              </div>
            </div>
          </div>
          <div class="divider" />
        </li>
        <el-pagination
          :current-page="pageData.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </ul>
      <PostOrReplyDialog ref="PostOrReplyDialog" @blogReplayAddSuccess="blogReplayAddSuccess" />
    </el-card>
  </div>
</template>
<script>
import {
  getBlogDetail, // 根据帖子ID，查询帖子详情
  getByBlogIdById
} from '@/api/bbsModule'
import PostOrReplyDialog from './postOrReplyDialog'
export default {
  name: 'PostDetail',
  components: {
    PostOrReplyDialog
  },
  data() {
    return {
      img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
      comments: [],
      pageNum: 1,
      PostDetail: {
        blog: {}
      },
      pageData: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  created() {
    console.log(this.$route)
    const { id = '' } = this.$route.query
    this.blogId = id
    if (!this.blogId) {
      this.$router.push({
        path: '/bbsMain'
      })
    } else this.fetchBlogDetail()
  },
  methods: {
    createContent(content, code) {
      const obj = eval(`(${content})`)
      console.log(obj, 'sdsadasda', code)
      return obj[code]
    },
    blogReplayAddSuccess() {
      this.fetchBlogDetail()
    },
    fetchBlogDetail() { // 查看博客详情
      const params = {
        id: this.blogId,
        pageSize: this.pageData.pageSize,
        pageNum: this.pageData.pageNum
      }
      getBlogDetail(params).then((res = {}) => {
        console.log(res, 'res')
        const { data = {}} = res
        this.PostDetail = data
        this.pageData = {
          total: (data && data.blog && data.blog.commentNum) || 0,
          pageSize: (data && data.blog && data.blog.pageSize) || 10,
          pageNum: (data && data.blog && data.blog.pageNum) || 1
        }
        this.setAddReply()
      }).catch((err = {}) => {
        console.log(err, 'err')
      })
    },
    setAddReply() {
      const params = {
        id: this.blogId,
        pageSize: this.pageData.pageSize,
        pageNum: this.pageData.pageNum
      }
      getByBlogIdById(params).then((res) => {
        console.log(res, 'ressetAddReply')
        const { data = [] } = res
        this.comments = data
      }).catch((err) => {
        console.log(err, 'errsetAddReply')
      })
    },
    postReply(replyOrComment, id = -1) {
      console.log(id, 'idididiid')
      this.$refs.PostOrReplyDialog.showDialog(true, replyOrComment, this.blogId, id)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`, this.pageData)
      this.pageData['pageNum'] = 1
      this.pageData['pageSize'] = val
      this.fetchBlogDetail()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageData['pageNum'] = val
      this.fetchBlogDetail()
    }
  }
}
</script>
<style lang="scss" scoped>
.flex{
  display: flex;
}
.jsb{
  justify-content: space-between
}
.jsf{
  justify-content: flex-start
}
.aic{
  align-items: center
}
.m10{
  margin: 0 10px
}
.ml10{
  margin-left: 10px
}
.mt10{
  margin-top: 10px
}
.head-img{
  border-radius: 100%;
   width: 40px;
   height: 40px;
   border: 1px solid #cdcdcd
}
.f12{
  font-size: 12px
}
.taj{
  text-align: justify
}
.divider{
  width: 100%;
  height: 1px;
  background: #dcdfe6;
  margin: 20px auto
}
.el-link{
  display: flex;
  justify-content: flex-end;
  color: #409EFF;
  font-size: 12px;
  margin-top: 10px;
  cursor: pointer;
}
.comment-box{
  margin-top: 10px;
  ul li{
    list-style: none;
    .comment-item{
      padding-left: 50px
    }
  }
}
</style>
