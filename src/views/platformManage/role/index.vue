<template>
  <div>
    <el-card>
      <div class="content">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            v-for="(item, index) in columnData"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row[item.prop] }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template>
              <el-button
                size="mini"
                @click="dialogVisible = true"
              >权限管理</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routes"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getCertificationIng, certification } from '@/api/user'
import path from 'path'
import { constantRoutes } from '@/router'
export default {
  data() {
    return {
      // constantRoutes: constantRoutes,
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      sortColumns: ['price'],
      currentPage: 1,
      tableData: [
        {
          name: '厂家'
        },
        {
          name: '买家'
        },
        {
          name: '超级管理员'
        }
      ],
      columnData: [
        {
          label: '角色名称',
          type: 'text',
          prop: 'name'
        }
      ]
    }
  },
  computed: {
  },
  async created() {
    this.routes = this.generateRoutes(constantRoutes)
  },
  methods: {
    confirmRole() {},
    generateRoutes(routes, basePath = '/') {
      const res = []
      for (let route of routes) {
        if (route.hidden) { continue }
        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }
        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }
      return false
    }

  }
}
</script>

<style>
</style>
