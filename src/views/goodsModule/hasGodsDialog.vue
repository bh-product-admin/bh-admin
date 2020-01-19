<template>
  <div class="index">
    <el-dialog
      :title="isAdd ? '新增商品' : '编辑商品'"
      :visible.sync="dialogFormVisible"
      top="50px"
    >
      <el-form ref="ruleForm" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="商品标题：" prop="title">
          <!-- <el-input v-model="form.title" placeholder="商品标题" /> -->
          <span>{{ title }}</span>
        </el-form-item>
        <el-form-item label="商品图：">
          <!-- <el-upload
            class="avatar-uploader"
            action="/dev-api/oss/upload"
            :headers="{ token }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.img" :src="form.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload> -->
          <img :src="img" class="avatar">
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
          <p class="cred p0">您还不是认证厂家，点击前往认证，买家购买更放心！</p>
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
  waresGoodsEdit, // 修改我的商品 id=1&inventory=190&dayProductionNum=123&returnNum=456
  waresGoodsAdd // 添加我的商品（非平台商品） goodsId=1&skuType=1&price=99&inventory=1000&dayProductionNum=189&daySendNum=169&returnNum=20&maxSaleCycle=60
} from '@/api/goodsModule'
export default {
  name: 'HasGoodsDialog',
  props: [],
  data() {
    return {
      form: {
        // skuType: '1',
        // title: '',
        // img: '',
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
      },
      title: '',
      img: '',
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
      isAdd: false
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
  methods: {
    // 重置表单
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
      waresGoodsAdd(params).then((res = {}) => {
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
      this.form.img = `${this.$imgBase}${res.data}`
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
