<template>
  <div class="index">
    <el-dialog title="我有货" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="120px">
        <el-form-item label="">
          <el-radio-group v-model="form.resource" class="sku-box">
            <el-radio label="我有相同sku" />
            <el-radio label="我有相似相同sku" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品标题：">
          <span>{{ form.title }}</span>
        </el-form-item>
        <el-form-item label="商品图：">
          <img :src="form.goodsImg" width="100" height="100" alt="">
        </el-form-item>
        <el-form-item label="采购单价：">
          <el-input v-model="form.price" placeholder="元/件" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="库存量：">
              <el-input v-model="form.kucun" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日生产力：">
              <el-input v-model="form.shengchan" placeholder="日/天" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="日发货：">
              <el-input v-model="form.fahuo" placeholder="件/天" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退货比例：">
              <el-input v-model="form.bili" placeholder="0-100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="最长销售周期：">
          <el-input v-model="form.zhouqi" placeholder="" />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.remark" type="textarea" />
          <p class="cred p0">您还不是认证厂家，点击前往认证，买家购买更放心！</p>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'HasGoodsDialog',
  props: [],
  data() {
    return {
      form: {
        resource: '',
        title: 'titletitletitle',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        price: '',
        kucun: '',
        shengchan: '',
        rifahuo: '',
        bili: '',
        zhouqi: '',
        remark: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  created() {},
  methods: {
    onSubmit() {
      alert('submit!')
    },
    showDialog(item, isDialogFormVisible) {
      this.dialogFormVisible = isDialogFormVisible
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
