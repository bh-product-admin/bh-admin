<template>
  <div class="index">
    <el-dialog
      title="通知厂家发货"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      width="30%"
      center
    >
      <el-form
        ref="ruleForm"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="发货数量：">
          <el-input v-model="form.number" />
        </el-form-item>
        <el-form-item label="物流渠道：">
          <el-input v-model="form.expressType" />
        </el-form-item>
        <el-form-item
          label="销售价格："
          prop="price"
        >
          <el-input v-model="form.salePrice" />
        </el-form-item>
        <el-form-item
          label="渠道成本："
          prop="price"
        >
          <el-input v-model="form.channelCost" />
        </el-form-item>
        <el-form-item
          label="物流面单："
          prop="price"
        >
          <el-upload
            class="upload-demo"
            :action="action"
            :on-success="handleSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="给商家留言：">
          <el-input
            v-model="form.note"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  logisticsAddOrderSend
} from '@/api/logisticsModule'
import {
  getCookieByCode
} from '@/utils/index'
export default {
  name: 'HasGoodsDialog',
  props: [],
  data() {
    return {
      imageUrl: '',
      action: process.env.VUE_APP_BASE_API + '/oss/uploadFile',
      form: {
        orderId: '',
        number: 0,
        note: ''
      },
      price: 0,
      showNoAuth: false,
      phone: getCookieByCode('phone'),
      title: '',
      inventory: '',
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
    // this.fetchManufacturerCertifiedIng()
  },
  methods: {
    handleSuccess(response, file) {
      console.log(response)
      this.form.fileName = response.data
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isXLSX = file.type === 'application/vnd.ms-excel'
      console.log(isXLSX)
      if (!isXLSX) {
        this.$message.error('上传文件只能是 xlsx 格式!')
      }
      return isXLSX
    },
    toRegist() {
      this.$router.push({
        path: '/register'
      })
    },
    // fetchManufacturerCertifiedIng() {
    //   getManufacturerCertifiedIng({ phone: this.phone }).then((res = {}) => {
    //     console.log(res, 'ressssfetchManufacturerCertifiedIng')
    //     const { data = [] } = res
    //     // if ((!data || !data.length) || (data && data[0] && data[0].manufacturerCertified != 1)) {
    //     if (!data || !data.length) {
    //       this.showNoAuth = true
    //     } else {
    //       this.showNoAuth = false
    //     }
    //   })
    // },
    onSubmit() {
      logisticsAddOrderSend(this.form).then(res => {
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
    },
    showDialog(item = {}, isDialogFormVisible) {
      console.log(item, 'indedsds')
      const { title = '', img = '', price = 0, inventory = '', number = 0, id = '' } = item
      this.title = title
      this.img = img
      this.form.orderId = id
      this.form.number = number
      this.form.channelCost = price
      this.form.fileName = '%E4%BA%AC%E4%B8%9C%E6%A8%A1%E6%9D%BF-%E6%9C%89%E6%95%B0%E6%8D%AE.xls'
      this.inventory = inventory
      this.dialogFormVisible = isDialogFormVisible
    },
    initForm() {
      this.form = {
        note: '',
        prderId: ''
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
