<template>
  <div class="index">
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="120px">
        <el-form-item label="商品标题：">
          <span>{{ form.title }}</span>
        </el-form-item>
        <el-form-item label="商品图：">
          <img :src="form.goodsImg" width="100" height="100" alt="">
        </el-form-item>
        <el-form-item label="采购单价：">
          <span>{{ form.price }}</span>
        </el-form-item>
        <el-form-item label="销售单价：">
          <span>{{ form.saleprice }}</span>
        </el-form-item>
        <el-form-item label="物流账户：">
          <span>{{ form.logistics }}</span>
        </el-form-item>
        <el-form-item label="物流单号：">
          <span>{{ form.logisticsNO }}</span>
        </el-form-item>
        <el-form-item label="物流状态：">
          <span>{{ form.logisticsStatus }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" />
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
        title: 'titletitletitle',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577718746219&di=86de817649061d34f4fe193d290e1c11&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F46%2F79%2F01300000921826131812790368314.jpg',
        price: '',
        saleprice: '',
        logistics: '',
        logisticsNO: '',
        logisticsStatus: ''
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
      this.form = item
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
