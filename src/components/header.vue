<template>
  <div class="haila-header">
    <div class="container">
      <div class="haila-header-left">
        <span>海拉欢迎您！</span>
        <span class="navbar-link" v-text="nickname" v-if="userStatus"></span>
        <a href="javascript:void(0)" id="btn-signin" @click="signinModalFlag=true" v-if="!userStatus">登录</a>
        <a href="javascript:void(0)" id="btn-signup" @click="signupModalFlag=true" v-if="!userStatus">注册</a>
        <a href="javascript:void(0)" id="btn-logout" @click="logout" v-else>退出</a>
      </div>
      <div class="haila-header-right">
        <router-link :to="{path: 'order'}" id="btn-order">我的订单</router-link>
        <router-link :to="{path: 'introduction'}" id="btn-account">关于海拉</router-link>
        <router-link :to="{path: 'admin'}" id="btn-admin" v-if="isAdmin">后台管理</router-link>
        <router-link :to="{path: '/'}" id="btn-home" v-if="isAdmin">前台</router-link>
      </div>
    </div>
    <div class="modal" v-if="signupModalFlag">
      <div class="modal-inner">
        <div class="modal-top">
          <div class="modal-title">注册</div>
          <a class="modal-close" @click="signupModalFlag=false">关闭</a>
        </div>
        <div class="modal-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorShow">{{errorTip}}</span>
            </div>
            <div class="signup-box">
              <input type="text" name="signupname" v-model="userName" class="name" placeholder="用户名">
              <input type="password" name="password" v-model="userPwd" class="password" placeholder="密码">
              <input type="password" name="password" v-model="userPwdRep" class="password" placeholder="确认密码">
            </div>
          </div>
          <div class="signup-wrap">
            <a href="javascript:;" class="btn-signup" @click="signup">注  册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="signinModalFlag">
      <div class="modal-inner">
        <div class="modal-top">
          <div class="modal-title">登录</div>
          <a class="modal-close" @click="signinModalFlag=false">关闭</a>
        </div>
        <div class="modal-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorShow">{{errorTip}}</span>
            </div>
            <div class="signin-box">
              <input type="text" name="signinname" v-model="userName" class="name" placeholder="用户名">
              <input type="password" name="password" v-model="userPwd" class="password" placeholder="密码">
            </div>
          </div>
          <div class="signin-wrap">
            <a href="javascript:;" class="btn-signin" @click="signin">登  录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-overlay" v-if="signinModalFlag || signupModalFlag"></div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        signinModalFlag: false,
        signupModalFlag: false,
        userStatus: false,
        isAdmin: false,
        nickname: '',
        userName: '',
        userPwd: '',
        userPwdRep: '',
        errorTip: '用户名或者密码错误',
        errorShow: false
      }
    },
    mounted() {
      this.checkSignin();
    },
    methods: {
      checkSignin() {
        axios.get('/user/checkSignin').then((res) => {
          let response = res.data;
          if (response.status == '1') {
            this.nickname = response.result.name;
            this.isAdmin = response.result.isAdmin;
            this.userStatus = true;
          }
        });
      },
      signup() {
        if (!this.userName || !this.userPwd || !this.userPwdRep) {
          this.errorTip = '请输入用户名和密码';
          this.errorShow = true;
          return;
        }
        if (this.userPwd != this.userPwdRep) {
          this.errorTip = '两次密码输入不一致';
          this.errorShow = true;
          return;
        }
        axios.post("/user/signup", {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((res) => {
          let response = res.data;
          if (response.status == "0") {
            this.errorTip = response.msg;
            this.errorShow = true;
          }
          if (response.status == "1") {
            this.nickname = this.userName;
            this.isAdmin = response.result.isAdmin;
            this.signupModalFlag = false;
            this.userStatus = true;
            this.errorShow = false;
          }
        })
      },
      signin() {
        if (!this.userName || !this.userPwd) {
          this.errorTip = '请输入用户名和密码';
          this.errorShow = true;
          return;
        }
        axios.post("/user/signin", {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((res) => {
          let response = res.data;
          if (response.status == "0") {
            this.errorTip = response.msg;
            this.errorShow = true;
          }
          if (response.status == "1") {
            this.nickname = this.userName;
            this.signinModalFlag = false;
            this.userStatus = true;
            this.errorShow = false;
            this.isAdmin = response.result.isAdmin;
          }
        })
      },
      logout() {
        axios.post("/user/logout").then((res) => {
          let response = res.data;
          if(response.status == "0") {
            this.userStatus = false;
            this.nickname = '';
            this.$router.push('/');
          }
        })
      }
    }
  }
</script>