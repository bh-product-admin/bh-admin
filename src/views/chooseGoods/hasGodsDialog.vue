<template>
  <div class="index">
    <el-dialog title="我有货" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="">
          <el-radio-group v-model="form.skuType" class="sku-box">
            <el-radio label="1">我有相同sku</el-radio>
            <el-radio label="2">我有相似相同sku</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品标题：" prop="title">
          <el-input v-model="form.title" placeholder="商品标题" />
        </el-form-item>
        <el-form-item label="商品图：">
          <img :src="form.img" width="100" height="100" alt="">
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
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  hasGoodAdd
} from '@/api/chooseGoods'
export default {
  name: 'HasGoodsDialog',
  props: [],
  data() {
    return {
      form: {
        skuType: '1',
        title: '',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        price: '',
        inventory: '',
        dayProductionNum: '',
        daySendNum: '',
        returnNum: '',
        maxSaleCycle: '',
        note: '',
        id: ''
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
        dayProductionNum: [
          { required: true, message: '请输入日发货', trigger: 'blur' }
        ],
        daySendNum: [
          { required: true, message: '请输入日发货', trigger: 'blur' }
        ],
        returnNum: [
          { required: true, message: '请输入日发货', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ],
        maxSaleCycle: [
          { required: true, message: '请输入日发货', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  created() {},
  methods: {
    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log('验证通过！')
          this.dialogFormVisible = false
          const params = this.form
          console.log(params)
          hasGoodAdd(this.form).then(res => {
            console.log(res, 'resdsdsd-has')
          }).catch(err => {
            console.log(err, 'errhas')
          })
        } else {
          this.$message.error('请检查页面必填项')
          return false
        }
      })
    },
    showDialog(item, isDialogFormVisible) {
      console.log(item, 'indedsds')
      this.dialogFormVisible = isDialogFormVisible
      this.form.id = item && item.id
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
