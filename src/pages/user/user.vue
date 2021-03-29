<template>
  <view class="content" style="background-color:#fff;">
    <view class="user-area">
      <view
        class="title-back"
        :style="{backgroundImage:`url(${userImage});height:${windowHeight}px`}"
      >
        <view class="title-info">我的</view>
        <img src="../../static/img/userHL.png" alt class="police-logo" />
      </view>
      <view class="user-info">
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">警员警号</view>
          <view class="wrapper">{{userInfo.username}}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">警员姓名</view>
          <view class="wrapper">{{userInfo.fullName}}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">所属部门</view>
          <view class="wrapper">{{userInfo.orgName}}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">所属高速</view>
          <view class="wrapper">{{userInfo.dutyRoadName}}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">执勤地点</view>
          <view class="wrapper">{{userInfo.dutyLocation || '--'}}</view>
        </view>
        <view class="uni-form-item" @click="$refs.popup.open()">
          <view class="title">预案信息</view>
          <view class="wrapper">详情 ❯</view>
        </view>
      </view>
    </view>
    <view class="logout-btn">
      <!-- <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button> -->
      <button @click="gotoSeacher" type="primary" class="primary primary-btn">
        <img src="../../static/img/search.png" alt class="btn-image" />
        查一查
      </button>
      <button @click="scanImage" type="primary" class="primary primary-btn scan-btn">
        <img src="../../static/img/scan_img.png" alt class="btn-image" />
        扫一扫
      </button>
    </view>
    <uni-popup ref="popup" type="dialog" :maskClick="maskClick" class="popup-panel">
      <view>
        <view class="pop-box">
          <view class="plan-title-1">预案推荐</view>
          <view class="plan-conetnet-area">
            <view class="plan-conetnet-1" v-for="p in planList" :key="p.planId">
              <view class="plane-detail">{{p.planContent}}</view>
            </view>
          </view>
          <view class="plan-deal-button">
            <button type="primary" class="primary primary-return" @click="$refs.popup.close();">关闭</button>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
import { uniPopup } from "@dcloudio/uni-ui";
import config from "../../base/config";
// import userImage from "../../static/img/user_title.png";
export default {
  components: {
    uniPopup,
  },
  data() {
    let userInfoString = uni.getStorageSync("userInfo");
    let userInfo = JSON.parse(userInfoString);
    // console.log(userImage);
    return {
      // userData: JSON.parse(uni.getStorageSync("userData")),
      userImage: config.backImageUrl + "user_title.png",
      moment: moment,
      windowHeight: 0,
      userInfo,
      planList: [],
    };
  },
  mounted() {
    this.initPosition();
    this.viewPanel();
  },
  computed: {
    ...mapState({ hasLogin: "user/hasLogin", forcedLogin: "user/forcedLogin" }),
  },
  methods: {
    ...mapMutations({ logout: "user/logout" }),
    initPosition() {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
      const { windowWidth, windowHeight } = uni.getSystemInfoSync();
      this.windowHeight = parseInt(windowHeight / 3);
    },
    scanImage() {
      let that = this;
      uni.scanCode({
        success: function (res) {
          // {"charSet":"utf-8","result":"6b0bd3413a9b45808f3d2fbd5b0ed387","codeVersion":4,"errMsg":"scanCode:ok","rawData":"NmIwYmQzNDEzYTliNDU4MDhmM2QyZmJkNWIwZWQzODc=","scanType":"QR_CODE"}
          console.log(res, 9999);
          let resData = res.result;
          console.log(resData, 9999);
          if (resData) {
            console.log(resData, 222222);
            that.getRegisterInfo(resData);
          }
        },
      });
    },
    async getRegisterInfo(id) {
      // console.log(id, 1111111);
      // let id = "f36e00f0bbdc480aad29e859abfcd6fa";
      let params = {
        recordId: id,
        pageSize: 10,
        pageNumber: 1,
      };
      console.log(params);
      try {
        let res = await this.$minApi.queryRecord(params);
        if (res.status && res.result.rows.length > 0) {
          console.log(res);
          let info = res.result.rows[0];
          uni.navigateTo({
            url: "../user/verify?info=" + JSON.stringify(info),
          });
        } else {
          uni.showToast({
            icon: "none",
            title: "查询失败",
          });
        }
      } catch (error) {
        uni.showToast({
          icon: "none",
          title: "查询失败",
        });
      }
    },
    async viewPanel() {
      let planRes = await this.$minApi.getPlanList({});
      if (planRes.status) {
        this.planList = planRes.result.rows;
      }
    },
    gotoSeacher() {
      uni.navigateTo({
        url: "../user/search",
      });
    },
    bindLogin() {
      uni.navigateTo({
        url: "../login/login",
      });
    },
    bindLogout() {
      //实际应该调后台登出接口 可惜后台服务没此接口
      this.logout();
      console.log(this, 9999);
      // debugger;
      // if (this.$ws) {
      //   this.$ws.ws.close();
      // }

      uni.removeStorageSync("uniIdToken");
      uni.removeStorageSync("username");
      // uni.removeStorageSync("userData");
      //若果用到websocket 在这里关闭

      uni.reLaunch({
        url: "../login/login",
      });
    },
  },
};
</script>

<style>
.contnet {
  position: relative;
  background-color: #fff !important;
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  align-items: center !important;
}
.user-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* padding: 10px 0; */
  background: #fff;
}

.title-back {
  width: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.title-info {
  position: absolute;
  top: 26px;
  font-size: 16px;
  color: #fff;
}

.police-logo {
  width: 80px;
  height: 80px;
  background-size: 100% 100%;
  background: #fff;
  border-radius: 80px;
}

.user-info {
  width: 92%;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  transform: translateY(-20%);
  padding: 2px;
  background: #fff;
}

.uni-form-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 3px 0px;
  background: #fff;
  align-items: center;
}

.area-top {
  margin-top: 4px;
}

.uni-form-item .title {
  flex: 1.5;
  padding: 20rpx 0;
  padding-left: 30rpx;
  color: #6b7072;
  font-size: 15px;
}

.uni-form-item .wrapper {
  flex: 3.5;
  padding: 20rpx 0;
  padding-right: 50rpx;
  text-align: right;
}

.border-bottom {
  /* border-bottom: 2px solid #f6f6f6; */
  position: relative;
}

.border-bottom:after {
  content: "";
  background: #f6f6f6;
  position: absolute;
  bottom: 0;
  left: 30rpx;
  height: 3rpx;
  width: calc(100% - 60rpx);
}

.logout-btn {
  position: absolute;
  margin-top: 10px;
  width: 100%;
  bottom: 2%;
}

.primary-btn {
  font-size: 20px !important;
  letter-spacing: 1px !important;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  width: 94%;
  background: linear-gradient(to bottom, #0a98fe 0%, #346cfa 100%);
  box-shadow: 0px 2px 4px 0px #543c94fb;
}

.btn-image {
  width: 20px;
  height: 20px;
  margin-right: 20px;
  background-size: 100% 100%;
  transform: translateY(2px);
}

.scan-btn {
  margin-top: 30rpx;
}

.popup-panel {
  display: flex;
  flex-direction: row;
}

.pop-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10rpx;
  width: 600rpx;
  height: 666rpx;
  background-size: 100% 100%;
  overflow: hidden;
  background-color: #fff;
}

.plan-title-1 {
  display: flex;
  /* flex-grow: 1; */
  background: #06f;
  width: 100%;
  height: 100rpx;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #fff;
}

.plan-conetnet-1 {
  /* flex-grow: 4; */
  width: 100%;
  /* display: flex; */
}

.plane-detail {
  padding: 20rpx;
  background: #eee;
  margin: 4rpx 10rpx;
  border-radius: 20rpx;
  text-align: left;
  text-justify: newspaper;
  word-break: break-all;
}

.plan-deal-button {
  position: absolute;
  bottom: 20rpx;
  flex-direction: row;
  /* flex-grow: 0.3; */
  width: 100%;
}

.primary-return {
  /* position: absolute; */

  width: 180rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 60rpx;
  background: linear-gradient(to bottom, #0a98fe 0%, #346cfa 100%);
  box-shadow: 0px 2px 4px 0px #543c94fb;
}

.plan-conetnet-area {
  height: 460rpx;
  width: 100%;
}
</style>
