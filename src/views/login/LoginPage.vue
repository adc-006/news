<template>
  <div class="login-container">
    <van-nav-bar
      title="登录"
      class="pageNavBar"
    />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
    <!-- 手机号 -->
      <van-field
        v-model="loginForm.tel"
        name="mobile"
        placeholder="请输入手机号"
        :rules="loginFormRlues.tel"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model.number="loginForm.checkCode"
        name="sms"
        placeholder="请输入验证码"
        :rules="loginFormRlues.checkCode"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-count-down v-if="isCountDownShow" :time="time" format="ss秒后重新发送" @finish="isCountDownShow = false"/>
            <van-button v-if="!isCountDownShow" class="send-sms-btn" size="small" type="default" native-type="button" @click="onSendSms">发送验证码</van-button>
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
import { login, sms } from '@/api/user.js'

export default {
  data () {
    return {
      loginForm: {
        tel: 13046811953,
        checkCode: ''
      },
      time: 5 * 1000,
      isCountDownShow: false,
      sms: '',
      token: '',
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
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: res } = await login()
        if (this.loginForm.checkCode === res.user.sms) {
          this.$toast.success('登录成功')
        }
      } catch (err) {
        console.log('进入err')
        if (err.response.status === 400) {
          console.log('手机号或者验证码错误')
          this.$toast.error('登录失败')
        } else {
          console.log('登录失败')
          this.$toast.fail('登录失败')
        }
      }
    },
    async onSendSms () {
      /* 验证 */
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('表单失败', err)
      }
      this.isCountDownShow = true
      /* 请求 */
      try {
        const { data: res } = await sms()
        this.sms = res.user.sms
        this.$toast('验证码已发送')
        this.$store.commit('setUser', res.user.token)
      } catch (err) {
        this.isCountDownShow = false
        console.log('验证码请求失败')
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
