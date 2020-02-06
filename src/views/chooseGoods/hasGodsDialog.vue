<template>
  <div class="index">
    <el-dialog title="我有货"
               :visible.sync="dialogFormVisible"
               :before-close="handleClose">
      <el-form ref="ruleForm"
               :model="form"
               label-width="120px"
               :rules="rules">
        <el-form-item label="">
          <el-radio-group v-model="form.skuType"
                          class="sku-box">
            <el-radio label="1">我有相同sku</el-radio>
            <el-radio label="2">我有相似相同sku</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品标题：">
          <span v-if="form.skuType==='1'">{{ title }}</span>
          <el-input v-else
                    v-model="form.title"
                    placeholder="商品标题" />
        </el-form-item>
        <el-form-item label="商品图：">
          <img v-if="form.skuType==='1'"
               :src="img"
               width="100"
               height="100"
               alt="">
          <el-upload v-else
                     class="avatar-uploader"
                     :action="action"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="采购单价："
                      prop="price">
          <el-input v-model="form.price"
                    placeholder="元/件" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="库存量："
                          prop="inventory">
              <el-input v-model="form.inventory" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日生产力："
                          prop="dayProductionNum">
              <el-input v-model="form.dayProductionNum"
                        placeholder="日/天" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="日发货："
                          prop="daySendNum">
              <el-input v-model="form.daySendNum"
                        placeholder="件/天" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退货比例："
                          prop="returnNum">
              <el-input v-model="form.returnNum"
                        placeholder="0-100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="最长销售周期："
                      prop="maxSaleCycle">
          <el-input v-model="form.maxSaleCycle"
                    placeholder="" />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.note"
                    type="textarea" />
          <p v-if="showNoAuth"
             class="cred p0 cur"
             @click="toRegist">您还不是认证厂家，点击前往认证，买家购买更放心！</p>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  hasGoodAdd
} from '@/api/chooseGoods'
import {
  getManufacturerCertifiedIng
} from '@/api/user'
import {
  getCookieByCode
} from '@/utils/index'
export default {
  name: 'HasGoodsDialog',
  props: [],
  data() {
    return {
      imageUrl: '',
      action: process.env.VUE_APP_BASE_API + '/oss/upload',
      form: {
        skuType: '1',
        // title: '',
        // img: 'dsdad',
        // img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        price: '',
        inventory: '',
        dayProductionNum: '',
        daySendNum: '',
        returnNum: '',
        maxSaleCycle: '',
        note: '',
        goodsId: ''
      },
      showNoAuth: false,
      phone: getCookieByCode('phone'),
      title: '',
      img: '',
      rules: {
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
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchManufacturerCertifiedIng()
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = 'https://zm-hot.oss-cn-hangzhou.aliyuncs.com/' + res.data
    },
    toRegist() {
      this.$router.push({
        path: '/register'
      })
    },
    fetchManufacturerCertifiedIng() {
      getManufacturerCertifiedIng({ phone: this.phone }).then((res = {}) => {
        console.log(res, 'ressssfetchManufacturerCertifiedIng')
        const { data = [] } = res
        // if ((!data || !data.length) || (data && data[0] && data[0].manufacturerCertified != 1)) {
        if (!data || !data.length) {
          this.showNoAuth = true
        } else {
          this.showNoAuth = false
        }
      })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log('验证通过！')
          const params = this.form
          const patrn = /^\d+(\.\d+)?$/
          if (!patrn.exec(params.returnNum)) {
            this.$message.error('请您输入正确的退货比例（不带百分号）')
            return
          }
          if (params.skuType === '2' && this.imageUrl) {
            params.img = this.imageUrl
          } else {
            delete params.title
            delete params.img
          }
          console.log(params)
          hasGoodAdd(this.form).then(res => {
            console.log(res, 'resdsdsd-has')
            const { data = false, msg = '操作成功' } = res
            if (data) {
              this.$message.success(msg)
              this.initForm()
              this.dialogFormVisible = false
            } else {
              this.$message.error(msg)
            }
          }).catch(err => {
            console.log(err, 'errhas')
          })
        } else {
          this.$message.error('请检查页面必填项')
          return false
        }
      })
    },
    showDialog(item = {}, isDialogFormVisible) {
      console.log(item, 'indedsds')
      const { title = '', img = '' } = item
      this.title = title
      this.img = img
      this.dialogFormVisible = isDialogFormVisible
      this.form.goodsId = item && item.id
    },
    initForm() {
      this.form = {
        skuType: '1',
        price: '',
        inventory: '',
        dayProductionNum: '',
        daySendNum: '',
        returnNum: '',
        maxSaleCycle: '',
        note: '',
        goodsId: ''
      }
      this.title = ''
      this.img = ''
    },
    handleClose() {
      this.initForm()
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}
.cred {
  color: red;
}
.p0 {
  padding: 0;
}
.sku-box {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.cur {
  cursor: pointer;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
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
