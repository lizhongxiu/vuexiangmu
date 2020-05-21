<template>
  <div class='login-container'>
    <div class="login-form-wrap">
      <!-- logo部分 -->
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!-- 表单部分 -->
      <el-form class="login-form" ref="form">
        <el-form-item>
          <!-- 手机号 -->
          <el-input v-model.trim="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 验证号 -->
          <el-input v-model.trim="user.code" placeholder="请输入验证号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="checked" >我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" :loading="loginLoading" type="primary" @click="hLogin">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// ajax名字是可以改的。它的格式与 axios()的格式是一样的

import ajax from '../../utils/request.js'
export default {
  name: 'Login',
  data () {
    return {
      // 设置数据项,双向绑定
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      checked: false,
      loginLoading: false
    }
  },
  methods: {
    // 实现登陆功能
    hLogin () {
      // 1. 收集用户信息，简单判空
      if (this.user.mobile === '') {
        return
      }

      if (this.user.code === '') {
        return
      }
      this.loginLoading = true
      // 2. 检测是否同意
      if (this.checked === false) {
        return
      }

      // 3. 发根据接口文档的要求，发出ajax请求
      //  https://gitee.com/fanyoufu2/hmpc/blob/master/doc/00-%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#%E7%94%A8%E6%88%B7%E8%AE%A4%E8%AF%81%E7%99%BB%E5%BD%95
      //  1) 引入request.js
      //  2) 发请求
      console.log(ajax)
      ajax({
        method: 'POST',
        url: 'mp/v1_0/authorizations',
        data: {
          mobile: this.user.mobile,
          code: this.user.code
        }
      }).then(res => {
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.loginLoading = false
        console.log(res.data)
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
// 铺满整屏
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
