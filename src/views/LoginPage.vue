<template>
  <div class="login-container">
    <van-nav-bar
      title="登录"
      class="pageNavBar"
    />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
    <!-- 手机号 -->
      <van-field
        v-model="loginForm.tel"
        name="手机号"
        placeholder="请输入手机号"
        :rules="loginFormRlues.tel"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="loginForm.checkCode"
        type="checkcode"
        name="密码"
        placeholder="请输入验证码"
        :rules="loginFormRlues.checkCode"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-button class="send-sms-btn" size="small" type="default">发送验证码</van-button>
          </template>
      </van-field>
      <!--  -->
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '../api/user.js'
export default {
  data () {
    return {
      loginForm: {
        tel: '',
        checkcode: ''
      },
      loginFormRlues: {
        tel: [
          { required: true, message: '请输入手机号' }
        ],
        checkCode: [
          { required: true, message: '请填写验证码' }
        ]
      }
    }
  },
  methods: {
    // 登录
    async onSubmit () {
      const user = this.loginForm
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或者验证码错误')
          this.$toast.error('登录失败')
        } else {
          console.log('登录失败')
          this.$toast.fail('登录失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 190px;
    line-height: 46px;
    color: #666;
    font-size: 22px;
    background-color: #ededed;
  }
}
</style>
