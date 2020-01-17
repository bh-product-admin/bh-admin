<template>
  <div class="index">
    <el-dialog title="我有货" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="商品标题：">
          <span>{{ form.title }}</span>
        </el-form-item>
        <el-form-item label="商品图：">
          <img :src="form.src" width="100" height="100" alt="">
        </el-form-item>
        <el-form-item label="采购单价：">
          <el-input v-model="form.price" placeholder="元/件" />
        </el-form-item>
        <el-form-item label="库存量：">
          <el-input v-model="form.inventory" />
        </el-form-item>
        <el-form-item label="日发货：">
          <el-input v-model="form.daySendNum" placeholder="件/天" />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.remark" type="textarea" />
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
        title: 'titletitletitle',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        price: '',
        inventory: '',
        daySendNum: '',
        remark: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入采购单价', trigger: 'blur' }
        ],
        inventory: [
          { required: true, message: '请输入库存量', trigger: 'blur' }
        ],
        daySendNum: [
          { required: true, message: '请输入日发货', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      isAdd: false
    }
  },
  created() {},
  methods: {
    onSubmit() {
      alert('submit!')
    },
    showDialog(item, isDialogFormVisible, type) {
      this.dialogFormVisible = isDialogFormVisible
      this.form = item
      this.isAdd = type === 'add'
    },
    submitHandle() {
      this.$refs['formName'].validate((valid) => {
        if (valid) {
          alert('submit!')
          const params = this.form
          if (this.isAdd) this.goodsAdd(params)
          else this.goodsEdit(params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goodsAdd(params) {
      waresGoodsAdd(params).then((res = {}) => {
        console.log(res, 'ressss')
        this.dialogFormVisible = false
      }).catch(err => {
        console.log(err, 'errrr')
      })
    },
    goodsEdit(params) {
      waresGoodsEdit(params).then((res = {}) => {
        console.log(res, 'ressss')
        this.dialogFormVisible = false
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
</style>
