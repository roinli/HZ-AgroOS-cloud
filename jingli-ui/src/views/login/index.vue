<template>
  <div class="login-container">
    <div class="login-con">
      <img src="../../assets/login-tit.png">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
        style="overflow: visible"
      >

        <div class="title-container" style="width: 356px;">用户登录
        </div>
        <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
        </el-form-item>
        <div class="login-pass">
          <span><el-checkbox label="记住密码" v-model="intopass" name="fruit"></el-checkbox></span>
          <span><span><img src="../../assets/login-android.png">下载安卓端版</span><img src="../../assets/a_d.png" /></span>
        </div>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >登录</el-button>

      </el-form>
    </div>

  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate'
  // import { login } from '@/api/user'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码最少为6位'))
        } else {
          callback()
        }
      }
      return {
        intopass:true,
        loginForm: {
          username: '15378972980',
          password: '912670'
//          username: '',
//          password: ''
        },
        loginRules: {
          username: [
            { required: true, trigger: 'blur', validator: validateUsername }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePassword }
          ]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    mounted() {
        if(localStorage.getItem("password") && localStorage.getItem("username") ){
          this.loginForm.password = localStorage.getItem("password");
          this.loginForm.username = localStorage.getItem("username");
          this.handleLogin();
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
        this.$refs.loginForm.validate(valid => {
          if (valid) {

            if(this.intopass){
              localStorage.setItem("password",this.loginForm.password);
              localStorage.setItem("username",this.loginForm.username);
            }else{
              localStorage.removeItem("password");
              localStorage.removeItem("username");
            }

            this.loading = true
            this.$store
              .dispatch('user/login', this.loginForm)
              .then(() => {
                //this.$router.push({ path: this.redirect || '/' });
                this.$router.push({ path:  '/' });
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
            // login(this.loginForm).then(() => {
            //   alert(1)
            //   this.$router.push({ path: this.redirect || '/' })
            //   this.loading = false
            // }).catch(() => {
            //   this.loading = false
            // })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  body{min-height: 700px}
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("../../assets/bg.jpg");
  .login-con > img {
    margin-bottom:30px;
    width: 626px;
    }
  .login-form {
    position: relative;
    width: 626px;
    height: 477px;
    padding:73px 131px 0  139px;
    overflow: hidden;
    background-image: url('../../assets/login.png');
    background-size: 100% 100%;
    .login-pass {
      display: flex;
      justify-content:space-between;
      width: 100%;
      height: 42px;
      line-height: 42px;
      margin-bottom: 22px;
      font-size: 14px;
      color: #1970a9;
    span .el-checkbox {
      color: #1970a9;
    }
      img {
        vertical-align: middle;
        margin-right: 5px;
      }
    }
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
    width: 350px;
    height: 35px;
    color: #6bdeff;
    text-align: center;
    font-size: 26px;
   /* background-image: url('../../assets/tou2@3x.png');
    background-size: 100% 100%;*/
    margin: auto;
    margin-bottom: 20px;
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


  /*添加*/
  .login-pass span:last-child {
    display: inline-block;
    position: relative;
    > img {
      position:absolute;
      top: -250px;
      left: 180px;
      width: 200px;
      opacity:0;
      transition: opacity .5s ease-in;
      border-radius: 5px;
    }
  }
  .login-pass span:last-child span:hover {
    cursor: pointer;
  }
  .login-pass span:last-child span:hover + img{
    opacity:1;
  }
</style>
