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
          <el-input v-model="form.number" />
        </el-form-item>
        <el-form-item
          label="销售价格："
          prop="price"
        >
          <el-input v-model="form.price" />
        </el-form-item>
        <el-form-item
          label="渠道成本："
          prop="price"
        >
          <el-input v-model="form.number" />
        </el-form-item>
        <el-form-item
          label="物流面单："
          prop="price"
        >
          <el-button>上传</el-button>
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
  bbsOrderAdd
} from '@/api/orderModule'
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
        waresId: '',
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
    this.fetchManufacturerCertifiedIng()
  },
  methods: {
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
      bbsOrderAdd(this.form).then(res => {
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
      const { title = '', img = '', price = '', inventory = '' } = item
      this.title = title
      this.img = img
      this.price = price
      this.inventory = inventory
      this.dialogFormVisible = isDialogFormVisible
      this.form.waresId = item && item.id
    },
    initForm() {
      this.form = {
        note: '',
        waresId: ''
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
