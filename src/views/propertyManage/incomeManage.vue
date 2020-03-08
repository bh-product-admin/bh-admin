<template>
  <div class="index">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="total-frame">
            <span class="total-title">我的收入：</span>
            <span class="total-value">￥{{ income }}</span>
            <div class="ml20">
              <el-button type="primary" size="small" @click="handleOutMoney">提现</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <span class="total-title">货款余额：</span>
            <span class="total-value">￥{{ goodsBalance }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <moneyOutDialog ref="moneyOutDialog" @handleSuccess="handleSuccess" />
  </div>
</template>
<script>
import {
  moneyById // 根据用户ID查询账户信息
} from '@/api/property'
import {
  getCookieByCode
} from '@/utils/index'
import moneyOutDialog from './moneyOutDialog'
export default {
  name: 'IncomeManage',
  components: {
    moneyOutDialog
  },
  props: [],
  data() {
    return {
      income: 0,
      goodsBalance: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSuccess() {
      this.fetchData()
    },
    handleOutMoney() {
      this.$refs.moneyOutDialog.showDialog(true, this.income)
    },
    fetchData() {
      const id = getCookieByCode('id')
      const params = {
        id,
        userType: 1
      }
      moneyById(params).then((res = {}) => {
        console.log(res, 'resss')
        const {
          data: {
            goodsBalance = 0,
            income = 0
          }
        } = res
        this.income = income
        this.goodsBalance = goodsBalance
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
