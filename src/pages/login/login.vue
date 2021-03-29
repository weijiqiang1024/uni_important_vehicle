<template>
  <view class="content">
    <view
      class="sys-title-area"
      :style="{backgroundImage:`url(${systemTitleImage});height:${windowHeight}px`}"
    >
      <view class="title-name">
        <span class="sys-name">周口市</span>
        <span class="sys-name">重点车辆登记系统</span>
      </view>
      <view class="input-group">
        <view class="input-row border first-input">
          <span class="conut-span">
            <img src="../../static/img/count.png" alt class="count-image" />
          </span>

          <m-input
            class="m-input"
            type="text"
            clearable
            focus
            v-model="username"
            placeholder="请输入警员账号"
          ></m-input>
        </view>
        <view class="input-row">
          <span class="conut-span">
            <img src="../../static/img/pwd.png" alt class="count-image" />
          </span>
          <m-input type="password" displayable v-model="password" placeholder="请输入警员密码"></m-input>
        </view>
        <view class="btn-row">
          <button type="primary" class="primary primary-btn" @tap="bindLogin">警员登录</button>
        </view>
        <!-- <view class="btn-row btn-row2">
          <button
            class="driver-btn driver-enter"
            open-type="getUserInfo"
            lang="zh_CN"
            @getuserinfo="guestLogin"
            withCredentials="true"
          >驾驶员登记入口</button>
        </view> -->
      </view>
      <view class="private">
        <view class="private-content" @tap="bindLogin">
          ©2021 安徽蓝盾光电子股份有限公司
          <!-- <span class="span-heightlingt">用户协议</span>和
          <span class="span-heightlingt">隐私条款</span>-->
        </view>
      </view>
      <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}"></view>
    </view>
  </view>
</template>

<script>
// import Vue from "vue";
import service from "../../service.js";
import { mapState, mapMutations } from "vuex";
import mInput from "../../components/m-input.vue";
import MinSocket from "../../base/websocke";
import config from "../../base/config";

export default {
  components: {
    mInput,
  },
  data() {
    return {
      providerList: [],
      hasProvider: false,
      username: "",
      password: "",
      positionTop: 0,
      windowHeight: 0,
      isDevtools: false,
      systemTitleImage: config.backImageUrl + "/sys_title_bak.jpg",
      // systemTitleImage: "../../static/img/sys_title_bak.jpg",
    };
  },
  computed: mapState({ forcedLogi: "user/forcedLogin" }),
  methods: {
    ...mapMutations({ login: "user/login" }),
    initProvider() {
      const filters = ["weixin", "qq", "sinaweibo"];
      uni.getProvider({
        service: "oauth",
        success: (res) => {
          if (res.provider && res.provider.length) {
            for (let i = 0; i < res.provider.length; i++) {
              if (~filters.indexOf(res.provider[i])) {
                this.providerList.push({
                  value: res.provider[i],
                  image: "../../static/img/" + res.provider[i] + ".png",
                });
              }
            }
            this.hasProvider = true;
          }
        },
        fail: (err) => {
          console.error("获取服务供应商失败：" + JSON.stringify(err));
        },
      });
    },
    initPosition() {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
      const { windowWidth, windowHeight } = uni.getSystemInfoSync();
      this.windowHeight = windowHeight;
    },
    async bindLogin() {
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 实际开发中，根据业务需要进行处理，这里仅做示例。
       */
      if (this.username.length < 2) {
        uni.showToast({
          icon: "none",
          title: "账号最短为 2 个字符",
        });
        return;
      }
      if (this.password.length < 6) {
        uni.showToast({
          icon: "none",
          title: "密码最短为 6 个字符",
        });
        return;
      }
      /**
       * 下面简单模拟下服务端的处理
       * 检测用户账号密码是否在已注册的用户列表中
       * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
       */

      const data = {
        username: this.username,
        password: this.password,
      };
      let _self = this;

      try {
        uni.showLoading({ title: "登录中..." });
        let res = await this.$minApi.login(data);
        // console.log(res, 999999);

        if (res.status) {
          uni.setStorageSync("uniIdToken", res.result.token);
          uni.setStorageSync("username", res.result.username);
          uni.setStorageSync("userInfo", JSON.stringify(res.result));

          //若用到websocket 在这里订阅
          // let ws = new MinSocket({ wsuri: config.wsuri });
          //挂载ws为全局对象 便于退出时 销毁
          // this.$ws = ws;

          _self.toMain(_self.username);
          uni.showToast({
            icon: "none",
            title: res.msg,
          });
          uni.hideLoading();
        } else {
          uni.showToast({
            icon: "none",
            title: res.msg,
          });
          uni.hideLoading();
        }
      } catch (error) {
        uni.showToast({
          icon: "none",
          title: "登录失败",
        });
        uni.hideLoading();
      }
    },

    guestLogin() {
      uni.getProvider({
        service: "oauth",
        success: function (res) {
          if (~res.provider.indexOf("weixin")) {
            uni.login({
              provider: "weixin",
              success: (res2) => {
                uni.getUserInfo({
                  provider: "weixin",
                  success: (info) => {
                    //这里请求接口
                    // console.log(res2);
                    console.log(info);
                    console.log(info.userInfo.nickName);
                    // debugger;
                    if (info && info.userInfo) {
                      uni.setStorageSync("nick-name", info.userInfo.nickName);
                    }
                    uni.navigateTo({
                      url: `/pages/main/main`,
                    });
                  },
                  fail: () => {
                    uni.showToast({ title: "微信登录授权失败", icon: "none" });
                  },
                });
              },
              fail: () => {
                uni.showToast({ title: "微信登录授权失败", icon: "none" });
              },
            });
          } else {
            uni.showToast({
              title: "请先安装微信或升级版本",
              icon: "none",
            });
          }
        },
      });
    },
    oauth(value) {
      uni.login({
        provider: value,
        success: (res) => {
          uni.getUserInfo({
            provider: value,
            success: (infoRes) => {
              /**
               * 实际开发中，获取用户信息后，需要将信息上报至服务端。
               * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
               */
              this.toMain(infoRes.userInfo.nickName);
            },
            fail() {
              uni.showToast({
                icon: "none",
                title: "登陆失败",
              });
            },
          });
        },
        fail: (err) => {
          console.error("授权登录失败：" + JSON.stringify(err));
        },
      });
    },
    getUserInfo({ detail }) {
      if (detail.userInfo) {
        this.toMain(detail.userInfo.nickName);
      } else {
        uni.showToast({
          icon: "none",
          title: "登陆失败",
        });
      }
    },
    toMain(userName) {
      // debugger;
      this.login(userName);
      /**
       * 强制登录时使用reLaunch方式跳转过来
       * 返回首页也使用reLaunch方式
       */
      //   if (this.forcedLogin) {
      // uni.reLaunch({
      //   url: "../user/user",
      // });
      uni.navigateTo({
        url: `/pages/user/user`,
      });
      //   } else {
      //     uni.navigateBack();
      //   }
    },
  },
  onReady() {
    this.initPosition();
    this.initProvider();
    // #ifdef MP-WEIXIN
    this.isDevtools = uni.getSystemInfoSync().platform === "devtools";
    // #endif
  },
};
</script>

<style>
.content {
  background-color: #f5f5f5;
}
.action-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.action-row navigator {
  color: #06f;
  padding: 0 10px;
}

.oauth-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.oauth-image {
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid #dddddd;
  border-radius: 50px;
  margin: 0 20px;
  background-color: #ffffff;
}

.oauth-image image {
  width: 30px;
  height: 30px;
  margin: 10px;
}

.oauth-image button {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.login-button {
  font-size: 14px !important;
  letter-spacing: 10px !important;
}

.sys-title-area {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-size: 100% 100%;
}

.sys-name {
  display: inline-block;
  padding-bottom: 4px;
  color: #fff;
  font-size: 22px;
  /* font-weight: 700; */
  letter-spacing: 2px;
  text-shadow: rgb(64, 64, 64) 0px 2px 6px;
}

.conut-span {
  width: 50px;
  line-height: 50px;
  height: 50px;
  display: inline-block;
  display: flex;
  align-items: center;
  padding-left: 15px;
  /* border-bottom: 1px solid #dbdbe0; */
}

.count-image {
  width: 24px;
  height: 24px;
  padding-left: 20px;
}

.first-input {
  margin-bottom: 24px;
}

.primary-btn {
  background: linear-gradient(to bottom, #0a98fe 0%, #346cfa 100%);
  font-size: 20px !important;
  letter-spacing: 1px !important;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
}

.driver-btn {
  background: transparent;
  font-size: 20px !important;
  letter-spacing: 1px !important;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
}

.btn-row2>.button-hover{
  background: transparent !important;
  opacity: 0.8;
}
.title-name {
  margin-top: 170rpx;
}

.input-group {
  width: 90%;
  /* margin-top: 150rpx; */
  margin-top: 246rpx;
}

.btn-row {
  margin-top: 24px;
  padding: 0 !important;
}

.a-row {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.driver-enter {
  color: #c9c9ce;
  font-size: 20px;
  border: 1px solid #c9c9ce;
  width: 100%;
  text-align: center;
}

.driver-btn:active {
  color: #c9c9ce;
  background: transparent;
}

.private {
  position: absolute;
  bottom: 6px;
  color: #c9c9ce;
}

.span-heightlingt {
  color: #ffffff;
}

.private-content {
  font-size: 24rpx;
}
</style>
