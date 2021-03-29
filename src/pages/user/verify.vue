<template>
  <view class="content">
    <view v-if="paramData.vehicleType == 3">
      <form @submit="formSubmit" @reset="formReset">
         <view class="uni-form-item uni-row">
          <view class="title">车辆类型</view>
          <view class="wrapper">{{getVehicleType(paramData.vehicleType)}}</view>
        </view>
        <view class="uni-form-item uni-row area-top">
          <view class="title">号牌号码</view>
          <view class="wrapper">{{ paramData.plateNbr }}</view>
        </view>
        <view class="uni-form-item uni-row area-top">
          <view class="title">实时位置</view>
          <view class="wrapper">{{ paramData.currentPosition }}</view>
        </view>
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">驾驶员姓名</view>
          <view class="wrapper">{{ paramData.driverName }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">身份证号</view>
          <view class="wrapper">{{ paramData.driverIdCard }}</view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">手机号</view>
          <view class="wrapper">{{ paramData.driverPhone }}</view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">安全员姓名</view>
          <view class="wrapper">{{ paramData.securityerName }}</view>
        </view>
        <!-- <view class="uni-form-item uni-row border-bottom">
          <view class="title">身份证号</view>
          <view class="wrapper">{{ paramData.securityerIdCard }}</view>
        </view> -->
        <view class="uni-form-item uni-row">
          <view class="title">手机号</view>
          <view class="wrapper">{{ paramData.securityerPhone }}</view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">公司名称</view>
          <view class="wrapper">{{ paramData.companyName }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">公司电话</view>
          <view class="wrapper">{{ paramData.companyPhone }}</view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">公司地址</view>
          <view class="wrapper">{{ paramData.companyAddr }}</view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">货物类别</view>
          <view class="wrapper select-wrapper">
            {{ chmclsArray[paramData.chmclsType] }}
            <!-- <img src="../../static/img/expand.png" alt class="input-icon" /> -->
          </view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">出发地</view>
          <view class="wrapper select-wrapper">
            {{ paramData.originCity }}
            <!-- <img src="../../static/img/location.png" alt class="input-location-icon" /> -->
          </view>
        </view>
        <!-- <view class="uni-form-item uni-row border-bottom">
          <view class="title">详细地址</view>
          <view class="wrapper">{{ paramData.originAddr }}</view>
        </view> -->
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">目的地</view>
          <view class="wrapper select-wrapper">
            {{ paramData.destinationCity }}
            <!-- <img src="../../static/img/location.png" alt class="input-location-icon" /> -->
          </view>
        </view>
        <!-- <view class="uni-form-item uni-row">
          <view class="title">详细地址</view>
          <view class="wrapper">{{ paramData.destinationAddr }}</view>
        </view> -->

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">运输起始时间</view>
          <view class="wrapper select-wrapper">
            {{ moment(paramData.startTime).format("YYYY-MM-DD") }}
            <!-- <img src="../../static/img/expand.png" alt class="input-icon" /> -->
          </view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">运输截止时间</view>
          <view class="wrapper select-wrapper">
            {{ moment(paramData.endTime).format("YYYY-MM-DD") }}
            <!-- <img src="../../static/img/expand.png" alt class="input-icon" /> -->
          </view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">登记时间</view>
          <view class="wrapper select-wrapper">
            {{ moment(paramData.createTime).format("YYYY-MM-DD HH:mm:ss") }}
            <!-- <img src="../../static/img/location.png" alt class="input-location-icon" /> -->
          </view>
        </view>

        <view class="uni-form-item uni-row">
          <view class="title">车辆图片</view>
          <view class="wrapper select-wrapper">
            <view v-if="!uploadImageUrl">无</view>
          </view>
        </view>
        <view class="uni-form-item uni-row" v-if="uploadImageUrl">
          <view
            class="solids-ready"
            :style="{
              width: `${parseInt(windowWidth)}px`,
              height: `${parseInt(windowWidth * 0.56)}px`,
            }"
          >
            <img
              :src="uploadImageUrl"
              alt
              class="upload-image-ready"
              :style="{
                width: `${parseInt(windowWidth) - 20}px`,
                height: `${parseInt(windowWidth * 0.56)}px`,
              }"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title" style="color: #03a9f4">应急处置方案</view>
          <view class="wrapper select-wrapper">{{ emergencyInfo }}</view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom border-top">
          <view class="title">警员警号</view>
          <view class="wrapper">{{ userInfo.username }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">警员姓名</view>
          <view class="wrapper">{{ userInfo.fullName }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">所属部门</view>
          <view class="wrapper">{{ userInfo.orgName }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">所属高速</view>
          <view class="wrapper">{{ userInfo.dutyRoadName }}</view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">执勤地点</view>
          <view class="wrapper">
            <input
              :value="userInfo.dutyLocation"
              class="uni-input"
              name="location"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <view class="uni-btn-v" v-if="!paramData._police">
          <!-- <button type="primary" class="primary primary-btn" @click="open">弹出</button> -->
          <button form-type="submit" type="primary" class="primary primary-btn">
            提 交
          </button>
        </view>
      </form>
    </view>
    <view v-else>
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item uni-row">
          <view class="title">车辆类型</view>
          <view class="wrapper">{{getVehicleType(paramData.vehicleType)}}</view>
        </view>
        <view class="uni-form-item uni-row area-top">
          <view class="title">号牌号码</view>
          <view class="wrapper">{{ paramData.plateNbr }}</view>
        </view>
        <view class="uni-form-item uni-row area-top">
          <view class="title">实时位置</view>
          <view class="wrapper">{{ paramData.currentPosition }}</view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">车辆目的地</view>
          <view class="wrapper">{{ paramData.destinationCity }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">客车实载人数</view>
          <view class="wrapper">{{ paramData.passengersNumber }}</view>
        </view>
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">驾驶员姓名</view>
          <view class="wrapper">{{ paramData.driverName }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">身份证号</view>
          <view class="wrapper">{{ paramData.driverIdCard }}</view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">手机号</view>
          <view class="wrapper">{{ paramData.driverPhone }}</view>
        </view>

        <view class="uni-form-item uni-row area-top">
          <view class="title">登记时间</view>
          <view class="wrapper select-wrapper">
            {{ moment(paramData.createTime).format("YYYY-MM-DD HH:mm:ss") }}
            <!-- <img src="../../static/img/location.png" alt class="input-location-icon" /> -->
          </view>
        </view>

        <view class="uni-form-item uni-row area-top">
          <view class="title">车辆照片</view>
          <view class="wrapper select-wrapper">
            <view v-if="!uploadImageUrl">无</view>
          </view>
        </view>
        <view class="uni-form-item uni-row" v-if="uploadImageUrl">
          <view
            class="solids-ready"
            :style="{
              width: `${parseInt(windowWidth)}px`,
              height: `${parseInt(windowWidth * 0.56)}px`,
            }"
          >
            <img
              :src="uploadImageUrl"
              alt
              class="upload-image-ready"
              :style="{
                width: `${parseInt(windowWidth) - 20}px`,
                height: `${parseInt(windowWidth * 0.56)}px`,
              }"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row area-top">
          <view class="title">证件照片</view>
          <view class="wrapper select-wrapper">
            <view v-if="!uploadCardImageUrl">无</view>
          </view>
        </view>
        <view class="uni-form-item uni-row" v-if="uploadCardImageUrl">
          <view
            class="solids-ready"
            :style="{
              width: `${parseInt(windowWidth)}px`,
              height: `${parseInt(windowWidth * 0.56)}px`,
            }"
          >
            <img
              :src="uploadCardImageUrl"
              alt
              class="upload-image-ready"
              :style="{
                width: `${parseInt(windowWidth) - 20}px`,
                height: `${parseInt(windowWidth * 0.56)}px`,
              }"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title" style="color: #03a9f4">应急处置方案</view>
          <view class="wrapper select-wrapper">{{ emergencyInfo }}</view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom border-top">
          <view class="title">警员警号</view>
          <view class="wrapper">{{ userInfo.username }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">警员姓名</view>
          <view class="wrapper">{{ userInfo.fullName }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">所属部门</view>
          <view class="wrapper">{{ userInfo.orgName }}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">所属高速</view>
          <view class="wrapper">{{ userInfo.dutyRoadName }}</view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">执勤地点</view>
          <view class="wrapper">
            <input
              :value="userInfo.dutyLocation"
              class="uni-input"
              name="location"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <view class="uni-btn-v" v-if="!paramData._police">
          <!-- <button type="primary" class="primary primary-btn" @click="open">弹出</button> -->
          <button form-type="submit" type="primary" class="primary primary-btn">
            提 交
          </button>
        </view>
      </form>
    </view>

    <uni-popup ref="popup" type="dialog">
      <view class="pop-box" :style="{ backgroundImage: `url(${popBoxImg});` }">
        <view class="box-title">确认成功</view>
        <!-- <view class="box-qrcode" v-if="recordId">
          
        </view>-->
        <view class="box-tip">{{ `预案信息：${planeInfo}` }}</view>
        <button
          type="primary"
          class="primary primary-return"
          @click="closePanel"
        >
          返回
        </button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
import moment from "moment";
import config from "../../base/config";
import { uniPopup } from "@dcloudio/uni-ui";

import popBoxImg from "../../static/img/pop_box_img.png";
// import tkiQrcode from "tki-qrcode";
import qrCode from "../../utils/wxqrcode/wxqrcode.js";
export default {
  components: {
    uniPopup,
    // qrCode,
  },
  data() {
    let userInfoString = uni.getStorageSync("userInfo");
    let userInfo = JSON.parse(userInfoString);
    console.log(userInfo, 88888);
    return {
      systemArray: [],
      total: 0,
      searchVal: "",
      windowWidth: 0,
      titleImageHeight: 0,
      innerBannerWidth: 0, //内部banner宽度
      innerBannerHeight: 0, //内部banner高度
      bannerItemWidth: 0,
      bannerItemHeight: 0,
      systemMainImage: config.backImageUrl + "/main_title_image.png",
      popBoxImg: popBoxImg,
      paramData: {
        plateNbr: "皖A12345",
        driverName: "",
        driverIdCard: "",
        driverPhone: "",
        securityerName: "",
        securityerIdCard: "",
        securityerPhone: "",
        companyName: "",
        companyAddr: "",
        companyPhone: "",
        originProvince: "",
        originCity: "*",
        originAddr: "",
        destinationProvince: "",
        destinationCity: "*",
        destinationAddr: "",
        startTime: moment(new Date()).format("YYYY-MM-DD"),
        endTime: moment(new Date()).format("YYYY-MM-DD"),
        chmclsType: 0, //货物类别
      }, //表单数据
      chmclsArray: [], //货物类别数组
      recordId: "6b0bd3413a9b45808f3d2fbd5b0ed387", //登记信息返回id
      loadMake: true,
      size: "200",
      unit: "px",
      background: "#000000",
      foreground: "#ffffff",
      pdground: "#ffffff",
      src: "",
      userInfo: userInfo,
      planeInfo: "",
      uploadImageUrl: "", //车辆照片
      uploadCardImageUrl:"",
      emergencyInfo: "--", //应急处置预案
    };
  },
  computed: mapState({
    forcedLogin: "user/forcedLogin",
    hasLogin: "user/hasLogin",
    userName: "user/userName",
  }),
  onLoad(option) {
    if (option.info) {
      //   console.log(option.info, 9999);
      this.paramData = JSON.parse(option.info);
      this.uploadImageUrl = this.paramData.certificateAddr || "";
      this.uploadCardImageUrl = this.paramData.driverLicenseAddr || "";
    }
  },
  mounted() {
    //默认数据查询
    this.handleSearch();
    let type = parseInt(this.paramData.chmclsType) + 1 + ""; //从0开始
    this.getEmergencyInfo(type);
    // setTimeout(() => {
    //   this.qrR();
    // }, 500);
  },
  methods: {
    moment,
    ...mapMutations({ login: "user/login" }),
    qrR() {
      this.recordId = qrCode.createQrCodeImg(this.recordId);
    },
    initPosition() {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
      const { windowWidth, windowHeight } = uni.getSystemInfoSync();
      this.windowWidth = windowWidth;
      this.titleImageHeight = parseInt(windowWidth / 1.68);
      this.bannerItemWidth = windowWidth - 20;
      this.bannerItemHeight = parseInt(this.bannerItemWidth / 3.06);
      this.innerBannerWidth = parseInt((this.bannerItemWidth - 10) / 2);
      this.innerBannerHeight = parseInt(this.innerBannerWidth / 1.48);
    },
    async handleSearch() {
      let queryDate = { codeTypeNo: "010", pageSize: 10, pageNumber: 1 };
      try {
        let res = await this.$minApi.querySystemCode(queryDate);
        if (res.status) {
          this.chmclsArray = _.map(res.result.rows, "codeName");
        }
      } catch (error) {}
    },
    async formSubmit(e) {
      console.log(
        "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value)
      );
      let formdata = e.detail.value;
      formdata.recordId = this.paramData.recordId;
      formdata.policeCode = this.userInfo.username || "";
      formdata.fullName = this.userInfo.fullName || "";
      formdata.orgId = this.userInfo.orgId || "";
      formdata.roadCode = this.userInfo.dutyRoadCode || "";
      formdata.location = e.detail.value.location || this.userInfo.dutyLocation;

      //方法校验

      uni.showLoading({ title: "提交中..." });
      try {
        let res = await this.$minApi.recordVerify(formdata);
        uni.hideLoading();
        if (res.status) {
          console.log(res);
          uni.showToast({
            icon: "none",
            title: "确认成功",
          });
          // this.getPlaneList();
        } else {
          uni.showToast({
            icon: "none",
            title: "确认失败",
          });
        }
      } catch (error) {
        uni.showToast({
          icon: "none",
          title: "确认失败",
        });
      }
    },
    async getPlaneList() {
      try {
        let res = await this.$minApi.getPlanList({});
        if (res.status) {
          let planArray = _.map(res.result.rows, "planContent");
          this.planeInfo = planArray.join(";");
          this.open();
        }
      } catch (error) {}
    },
    async getEmergencyInfo(type) {
      let that = this;
      let param = {
        emergencyType: type,
      };
      try {
        let res = await this.$minApi.getEmergencyList(param);
        if (res.status) {
          debugger;
          let planArray = _.map(res.result.rows, "emergencyContent");
          this.emergencyInfo = planArray.join(";");
          console.log(this.emergencyInfo, 33333);
          // this.open();
        }
      } catch (error) {}
    },
    gotoPage(page) {
      console.log(page, 9999);
      uni.navigateTo({
        url: `/pagesA/${page}/${page}`,
      });
    },
    open() {
      this.$refs.popup.open();
    },
    clear() {
      this.searchVal = "";
    },
    chmclsTypeChange(e) {
      if (e.detail) {
        this.paramData.chmclsType = e.detail.value;
      }
    },
    cityOrginChange(e) {
      if (e.detail) {
        this.paramData.originProvince = e.detail.code.join(",");
        this.paramData.originCity = e.detail.value.join(",");
      }
    },
    cityDestinationChange(e) {
      if (e.detail) {
        this.paramData.destinationProvince = e.detail.code.join(",");
        this.paramData.destinationCity = e.detail.value.join(",");
      }
    },
    cityStartTimeChange(e) {
      console.log(e.detail.value, 888);
      if (e.detail) {
        this.paramData.startTime = e.detail.value;
      }
    },
    cityEndTimeChange(e) {
      console.log(e.detail.value, 888);
      if (e.detail) {
        this.paramData.endTime = e.detail.value;
      }
    },
    closePanel() {
      this.$refs.popup.close();
    },
    getVehicleType(type) {
      let vt = "--";
      switch (type) {
        case "1":
          vt = "公路营运客运车辆";
          break;
        case "2":
          vt = "旅游客运车辆";
          break;
        case "3":
          vt = "危化品车辆";
          break;
        default:
          break;
      }
      return vt;
    },
  },
  onReady() {
    this.initPosition();
  },
};
</script>

<style>
.uni-form-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 6px 0px;
  background: #fff;
  align-items: center;
}

.area-top {
  margin-top: 4px;
}

.uni-form-item .title {
  flex: 1.8;
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

/* .border-top {
  position: relative;
}

.border-top:after {
  position: absolute;
  content: "";
  background: #06f;
  top: 0;
  left: 30rpx;
  height: 2rpx;
  width: calc(100% - 60rpx);
} */

.uni-input {
  font-size: 15px;
  text-align: right;
}

.placeholder-style {
  font-size: 15px;
  color: #c9c9ce;
  text-align: left;
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

.uni-btn-v {
  display: flex;
  justify-content: center;
  margin: 50rpx 0 30rpx;
  width: 100%;
}

.select-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  width: 10px;
  height: 14px;
  right: 10px;
  top: 14px;
}

.input-location-icon {
  position: absolute;
  width: 15px;
  height: 18px;
  right: 10px;
  top: 14px;
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
}

.box-title {
  margin-top: 50rpx;
  color: #fff;
  font-size: 32rpx;
}

.box-qrcode {
  width: 280rpx;
  height: 280rpx;
  background: #ffffff;
  margin-top: 30rpx;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
}

.box-tip {
  color: #c9c9ce;
  font-size: 26rpx;
  margin-top: 60rpx;
}

.primary-return {
  position: absolute;
  bottom: 20rpx;
  width: 220rpx;
  height: 64rpx;
  line-height: 64rpx;
  border-radius: 64rpx;
  background: linear-gradient(to bottom, #0a98fe 0%, #346cfa 100%);
  box-shadow: 0px 2px 4px 0px #543c94fb;
}

.qr-image {
  width: 240rpx;
  height: 240rpx;
  padding: 20rpx;
}

.solids-ready {
  position: relative;
  display: flex;
  justify-content: center;
}

.title {
  font-weight: 700;
}
</style>
