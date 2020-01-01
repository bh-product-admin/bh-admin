<template>
  <div class="index">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="total-frame">
            <span class="total-title">我的收入：</span>
            <span class="total-value">￥200</span>
            <div class="ml20">
              <el-button type="primary" size="small" @click="onSubmit">提现</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <span class="total-title">货款余额：</span>
            <span class="total-value">￥5000.00</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'IncomeManage',
  props: [],
  data() {
    return {

    }
  },
  created() {},
  methods: {
  }
}
</script>
<style>
.total-frame{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.ml20{
  margin-left: 20px;
}
.total-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}
.total-value{
  font-size: 18px;
  font-weight: 700;
  color: #333;
}
</style>
