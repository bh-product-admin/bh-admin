<template>
  <div class="index">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <div class="total-title">
              绑定手机
            </div>
            <div class="total-value">
              13665880424
              <span class="handle-span">换绑</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <div class="total-title">提现账户</div>
            <div class="total-value">
              1233 31232 31231 3123
              <span class="handle-span">更换</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'MyAccount',
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
  flex-direction: column;
  align-items: flex-start;
}
.ml20{
  margin-left: 20px;
}
.total-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
.total-value{
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  color: #333;
}
.handle-span{
  font-size: 14px;
  font-weight: 400;
  color: #409EFF;
  cursor: pointer;
}
</style>
