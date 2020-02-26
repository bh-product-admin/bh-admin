<template>
  <div class="index">
    <el-dialog
      :title="isAdd ? '新增商品' : '编辑商品'"
      :visible.sync="dialogFormVisible"
      top="50px"
    >
      <el-form ref="ruleForm" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="商品标题：" prop="title">
          <el-input v-if="isAdd" v-model="form.title" placeholder="商品标题" />
          <span v-else>{{ title }}</span>
        </el-form-item>
        <el-form-item label="商品图：">
          <el-upload
            v-if="isAdd"
            class="avatar-uploader"
            :action="action"
            :headers="{ token }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.img" :src="form.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <img v-if="!isAdd" :src="img" class="avatar">
        </el-form-item>
        <el-form-item label="类目">
          <el-select v-model="form.firstId" placeholder="类目一" size="small" style="width: 100px" @change="shangeSelect(1)">
            <el-option v-for="item in firstOptionsArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-select v-model="form.secondId" placeholder="类目二" size="small" style="width: 100px" @change="shangeSelect(2)">
            <el-option v-for="item in secondOptionsArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-select v-model="form.thirdId" placeholder="类目三" size="small" style="width: 100px" @change="shangeSelect(3)">
            <el-option v-for="item in thirdOptionsArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="采购单价：" prop="price">
          <el-input v-model="form.price" placeholder="元/件" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="库存量：" prop="inventory">
              <el-input v-model="form.inventory" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日生产力：" prop="dayProductionNum">
              <el-input v-model="form.dayProductionNum" placeholder="日/天" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="日发货：" prop="daySendNum">
              <el-input v-model="form.daySendNum" placeholder="件/天" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退货比例：" prop="returnNum">
              <el-input v-model="form.returnNum" placeholder="0-100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="最长销售周期：" prop="maxSaleCycle">
          <el-input v-model="form.maxSaleCycle" placeholder="" />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.note" type="textarea" />
          <p v-if="showNoAuth" class="cred p0" @click="toRegist">您还不是认证厂家，点击前往认证，买家购买更放心！</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCookieByCode } from '@/utils/index'
import {
  classify
} from '@/api/user'
import {
  waresGoodsEdit // 修改我的商品 id=1&inventory=190&dayProductionNum=123&returnNum=456
} from '@/api/goodsModule'
import {
  handleGoodsAdd
} from '@/api/chooseGoods'
import {
  getManufacturerCertifiedIng
} from '@/api/user'
export default {
  name: 'HasGoodsDialog',
  props: [],
  data() {
    return {
      form: {
        // skuType: '1',
        // title: '',
        img: '',
        price: '',
        inventory: '',
        dayProductionNum: '',
        daySendNum: '',
        returnNum: '',
        maxSaleCycle: '',
        note: '',
        id: '',
        skuType: 1,
        goodsId: '',
        firstId: '',
        secondId: '',
        thirdId: ''
      },
      title: '',
      img: '',
      action: process.env.VUE_APP_BASE_API + '/oss/upload',
      showNoAuth: false,
      phone: getCookieByCode('phone'),
      rules: {
        // title: [
        //   { required: true, message: '请输入商品标题', trigger: 'blur' }
        // ],
        price: [
          { required: true, message: '请输入采购单价', trigger: 'blur' }
        ],
        inventory: [
          { required: true, message: '请输入库存量', trigger: 'blur' }
        ],
        dayProductionNum: [
          { required: true, message: '请输入日发货', trigger: 'blur' }
        ],
        daySendNum: [
          { required: true, message: '请输入日发货', trigger: 'blur' }
        ],
        returnNum: [
          { required: true, message: '请输入日发货', trigger: 'blur' }
        ],
        // img: [
        //   { required: true, message: '请上传头像', trigger: 'blur' }
        // ],
        maxSaleCycle: [
          { required: true, message: '请输入日发货', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      isAdd: false,
      firstOptionsArr: [],
      secondOptionsArr: [],
      thirdOptionsArr: []
    }
  },
  computed: {
    token() {
      return getCookieByCode('vue_admin_template_token')
    }
  },
  watch: {
    dialogFormVisible(newVal) {
      if (!newVal) {
        this.resetForm()
      }
    }
  },
  created() {
    this.fetchOptions()
    this.fetchManufacturerCertifiedIng()
  },
  methods: {
    toRegist() {
      this.$router.push({
        path: '/register'
      })
    },
    // 重置表单
    fetchManufacturerCertifiedIng() {
      getManufacturerCertifiedIng({ phone: this.phone }).then((res = {}) => {
        console.log(res, 'ressssfetchManufacturerCertifiedIng')
        const { data = [] } = res
        // if ((!data || !data.length) || (data && data[0] && data[0].manufacturerCertified != 1)) {
        if (data && data[0] && data[0].manufacturerCertified === 1) {
          this.showNoAuth = false
        } else {
          this.showNoAuth = true
        }
      })
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
    },
    showDialog(item, isDialogFormVisible, type) {
      this.dialogFormVisible = isDialogFormVisible
      const { title = '', img = '' } = item
      this.title = title
      this.img = img
      if (type === 'edit') {
        this.form.id = item.id
        this.form.goodsId = item.goodsId
        // this.form.title = item.title
        // this.form.img = item.img
        this.form.price = item.price
        this.form.skuType = item.skuType || 1
        this.form.inventory = item.inventory
        this.form.dayProductionNum = item.dayProductionNum
        this.form.daySendNum = item.daySendNum
        this.form.returnNum = item.returnNum
        this.form.maxSaleCycle = item.maxSaleCycle
        this.form.note = item.note
      }
      this.isAdd = type === 'add'
    },
    // 提交表单
    submitHandle() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log('验证通过！')
          const params = this.form
          if (this.isAdd) {
            delete params.id
            this.goodsAdd(params)
          } else {
            this.goodsEdit(params)
          }
        } else {
          this.$message.error('请检查页面必填项')
          return false
        }
      })
    },
    goodsAdd(params) {
      delete this.form.goodsId
      handleGoodsAdd(params).then((res = {}) => {
        const { data = false, msg = '操作成功' } = res
        if (data) {
          this.$message.success(msg)
          this.initForm()
          this.dialogFormVisible = false
          this.$emit('fetchWaresList')
        } else {
          this.$message.error(msg)
        }
      }).catch(err => {
        console.log(err, 'errrr')
      })
    },
    goodsEdit(params) {
      waresGoodsEdit(params).then((res = {}) => {
        const { data = false, msg = '操作成功' } = res
        if (data) {
          this.$message.success(msg)
          this.initForm()
          this.dialogFormVisible = false
          this.$emit('fetchWaresList')
        } else {
          this.$message.error(msg)
        }
      }).catch(err => {
        console.log(err, 'errrr')
      })
    },
    checkoutIsNull(formLine = {}) {
      let isHasNull = true
      if (formLine && Object.prototype.toString.call(formLine) === '[object Object]') {
        const objValues = Object.values(formLine).filter(item => item)
        const objKeys = Object.values(formLine)
        isHasNull = objValues.length >= objKeys.legth
      }
      return isHasNull
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      console.log(this.$imgBase)
      this.form.img = `${this.$imgBase}${res.data}`
      debugger
      // console.log('this.form.img---', res, this.form.img)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    initForm() {
      this.form = {
        price: '',
        inventory: '',
        dayProductionNum: '',
        daySendNum: '',
        returnNum: '',
        maxSaleCycle: '',
        note: '',
        id: '',
        skuType: 1,
        goodsId: ''
      }
    },
    handleClose() {
      this.initForm()
      this.dialogFormVisible = false
    },
    fetchOptions(level = 1) {
      console.log(level, 'levellevel')
      const labelArr = ['', 'first', 'second', 'third']
      let parent_id = ''
      const params = {
        level
      }
      if (level && level > 1) {
        parent_id = this.form[`${labelArr[level - 1]}Id`]
        params['parent_id'] = parent_id
      }
      classify(params).then((res = {}) => {
        console.log(res, 'ressssclassify')
        const { data: { list = [] }} = res
        console.log(list, 'listressssclassify')
        if (list && list instanceof Array) this.$data[`${labelArr[level]}OptionsArr`] = list
        // this.shangeSelect(level, true)
      })
    },
    shangeSelect(codeIndex, isAuto) {
      console.log(codeIndex, 'codeIndex')
      const labelArr = ['', 'first', 'second', 'third']
      const startIndex = isAuto ? codeIndex : codeIndex + 1
      for (let i = startIndex; i < labelArr.length; i++) {
        this.form[`${labelArr[i]}Id`] = (this.$data[`${labelArr[i]}OptionsArr`][0] && this.$data[`${labelArr[i]}OptionsArr`][0].id) || ''
      }
      if (codeIndex < 3) {
        this.fetchOptions(codeIndex + 1)
      } else {
        this.$emit('search', this.form)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body{
  padding-top: 0;
  padding-bottom: 0;
}
.cred{
  color: red;
}
.p0{
  padding: 0;
}
.sku-box{
  display: flex;
  justify-content: center;
  flex-direction:row;
}
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
