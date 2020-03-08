<template>
  <div class="index">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="total-frame">
            <div class="total-title">
              绑定手机
            </div>
            <div class="total-value">
              {{ countPhone }}
              <span class="handle-span" @click="handleEditPhone">换绑</span>
            </div>
          </div>
        </el-col>
        <el-col :span="16" style="min-width: 300px">
          <div class="total-frame">
            <div class="total-title">提现账户</div>
            <div class="total-value">
              1233 31232 31231 3123
              <span class="handle-span" @click="handleEditBank">更换</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <editPhone ref="editPhoneDialog" @handleSuccess="handleSuccess" />
    <editBankNumber ref="editBankDialog" @handleSuccess="handleSuccess" />
  </div>
</template>
<script>
import {
  moneyById // 根据用户ID查询账户信息
} from '@/api/property'
import {
  getCookieByCode
} from '@/utils/index'
import editPhone from './editPhone'
import editBankNumber from './editBankNumber'
export default {
  name: 'MyAccount',
  components: {
    editPhone,
    editBankNumber
  },
  props: [],
  data() {
    return {
      countPhone: getCookieByCode('phone')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEditPhone() {
      this.$refs.editPhoneDialog.showDialog(true)
    },
    handleEditBank() {
      this.$refs.editBankDialog.showDialog(true)
    },
    handleSuccess() {
      this.fetchData()
    },
    fetchData() {
      const id = getCookieByCode('id')
      const params = {
        id,
        userType: 1
      }
      moneyById(params).then((res = {}) => {
        console.log(res, 'resss')
      }).catch((err = {}) => {
        console.log(err, 'eeee')
      })
    }
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
