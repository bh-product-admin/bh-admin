<template>
  <div>
    <el-card>
      <div class="flex jsb aic">
        <h4>抖音优质渠道，求服饰类靠谱供应厂家，详细要求里面看~</h4>
        <div class="flex jsb aic f12">
          <div class="flex aic">
            <img :src="img" class="head-img">
            <span class="m10">188****6636</span>
          </div>
          <span class="ml10">2019.11.11 18:00:00</span>
        </div>
      </div>
      <div class="divider" />
      <div>
        <div class="taj">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
        </div>
        <span class="el-link" @click="postReply">评论（1）</span>
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
              <img :src="item.headImg" class="head-img">
              <span class="m10">{{ item.tel }}</span>
            </div>
            <span class="ml10">{{ item.time }}</span>
          </div>
          <div>
            <div class="comment-item taj">
              {{ item.comment }}
            </div>
            <span class="el-link" @click="postReply">回复</span>
          </div>
          <div class="divider" />
        </li>
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </ul>
      <PostOrReplyDialog ref="PostOrReplyDialog" />
    </el-card>
  </div>
</template>
<script>
import {
  getBlogDetail // 根据帖子ID，查询帖子详情
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
      comments: [
        {
          headImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          tel: '188****6636',
          time: '2019.11.11 18:00:00',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.'
        },
        {
          headImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          tel: '188****6636',
          time: '2019.11.11 18:00:00',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.'
        },
        {
          headImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          tel: '188****6636',
          time: '2019.11.11 18:00:00',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.'
        },
        {
          headImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
          tel: '188****6636',
          time: '2019.11.11 18:00:00',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.'
        }
      ],
      currentPage: 1
    }
  },
  created() {
    console.log(this.$route)
    const { id = '' } = this.$route.query
    this.blogId = id
    if (!this.blogId) {
      this.$router.push({
        path: '/bbs-module/bbsMain'
      })
    } else this.fetchBlogDetail()
  },
  methods: {
    fetchBlogDetail() { // 查看博客详情
      const params = {
        id: this.blogId
      }
      getBlogDetail(params).then((res = {}) => {
        console.log(res, 'res')
      }).catch((err = {}) => {
        console.log(err, 'err')
      })
    },
    setAddReply() {
      // blogAddReply()
    },
    postReply() {
      this.$refs.PostOrReplyDialog.showDialog(true)
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
