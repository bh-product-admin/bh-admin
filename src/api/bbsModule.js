import request from '@/utils/request'

// 获取帖子列表
export function getBlogList(data) {
  return request({
    url: '/blog/list',
    method: 'post',
    data
  })
}

// 根据帖子ID，查询帖子详情
export function getBlogDetail(data) {
  return request({
    url: '/blog/getById',
    method: 'post',
    data
  })
}

// 帖子中的评论，添加回复内容
export function blogAddReply(data) {
  return request({
    url: '/comments/addReply',
    method: 'post',
    data
  })
}

// 获取帖子类型
export function getBlogType(data) {
  return request({
    url: '/config/getByKeyword',
    method: 'post',
    data
  })
}

// 添加一条评论
export function addBlogComment(data) {
  return request({
    url: '/comments/add',
    method: 'post',
    data
  })
}

// 添加一条帖子
export function aadBlogAdd(data) {
  return request({
    url: '/blog/add',
    method: 'post',
    data
  })
}

// 根据帖子ID，查询评论列表
export function getByBlogIdById(data) {
  return request({
    url: '/comments/getByBlogId',
    method: 'post',
    data
  })
}
