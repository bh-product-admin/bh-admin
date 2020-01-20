<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        ref="loginForm"
        auto-complete="on"
        :model="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <svg-icon
            icon-class="login-mall"
            style="width: 56px;height: 56px;color: #409EFF"
          />
        </div>
        <!-- <h2 class="login-title color-main">爆货后台管理系统</h2> -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.phone"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main" />
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="flex">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:50%;" />
          <el-button v-if="disabled==false" type="primary" :disabled="disabled" @click="sendcode">发送验证码
          </el-button>
          <el-button v-if="disabled==true" type="button" :disabled="disabled" @click="sendcode">{{ btntxt }}
          </el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
          <el-button
            style="width: 100%;margin: 5px 0px;"
            type="primary"
            @click="$router.push({path:'/register'})"
          >
            厂家申请
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
import login_center_bg from '@/assets/images/login_center_bg.png'
import { sendCode } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      disabled: false,
      btntxt: '重新发送',
      loginForm: {
        phone: '18667000223',
        password: '111111'
      },
      login_center_bg,

      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    async sendcode() {
      const reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/
      if (this.loginForm.phone === '') {
        this.$message({
          message: '手机号不能为空',
          center: true
        })
        return
      }
      if (!reg.test(this.loginForm.phone)) {
        this.$message({
          message: '请输入正确的手机号',
          center: true
        })
        return
      } else {
        const res = await sendCode({ phone: this.loginForm.phone, type: 1 })
        console.log(res)
        if (res.success) {
          this.$message.success({
            message: '发送成功',
            center: true
          })
          this.time = 60
          this.disabled = true
          this.timer()
        } else {
          this.$message.error(res.message)
        }
      }
    },
    // 60S倒计时
    timer() {
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = '获取验证码'
        this.disabled = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // this.$router.push({ path: this.redirect || '/' })
      this.loading = true
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          location.reload()
          this.$router.push({ path: '/' || this.redirect })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}
.flex{
  display: flex
}
.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

}
</style>
