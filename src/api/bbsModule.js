import request from '@/utils/request'

// 获取帖子列表 blog/list?sortField=created&orderBy=asc 排序字段 排序方式
export function getBlogList(data) {
  return request({
    url: '/blog/list',
    method: 'post',
    data
  })
}

// 根据帖子ID，查询帖子详情 blog/getById?id=1
export function getBlogDetail(data) {
  return request({
    url: '/blog/getById',
    method: 'post',
    data
  })
}

// 帖子中的评论，添加回复内容 comments/addReply?id=1&replyJson={'phone':'1866805****','content':'我是评论的回复'}"
// "key": "replyJson",
// 	"value": "{'phone':'1866805****','content':'我是评论的回复'}",
// 	"description": "当前用户的所有评论，前端封装成一条json，服务端存储，格式自己定义",
// 	"enabled": true
export function blogAddReply(data) {
  return request({
    url: '/comments/addReply',
    method: 'post',
    data
  })
}

// 获取帖子类型 config/getByKeyword?keyword=blogType
export function getBlogType(data) {
  return request({
    url: '/config/getByKeyword',
    method: 'post',
    data
  })
}

// 添加一条评论 comments/add?blogId=1&content=我有袜子&userId=1
export function blogAddComment(data) {
  return request({
    url: '/comments/add',
    method: 'post',
    data
  })
}

// 添加一条帖子 blog/add?title=MAC口红&content=我要口红&typeId=2&userId=1 帖子类型
export function aadBlogAdd(data) {
  return request({
    url: '/blog/add',
    method: 'post',
    data
  })
}

// 根据帖子ID，查询评论列表 comments/getByBlogId?id=1
export function getByBlogIdById(data) {
  return request({
    url: '/comments/getByBlogId',
    method: 'post',
    data
  })
}
