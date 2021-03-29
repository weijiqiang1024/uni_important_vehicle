<template>
  <view class="content">
    <view>
      <image
        src="../../static/img/head_image.jpg"
        mode=""
        :style="{ width: '100%', height: parseInt(windowWidth / 2.2) + 'px' }"
      />
    </view>
    <form
      @submit="formSubmit"
      @reset="formReset"
      :class="[
        paramData.vehicleType > 0
          ? 'vehicle-type-info'
          : 'vehicle-type-default',
      ]"
    >
      <view class="uni-form-item uni-row area-top border-bottom">
        <view class="title">车辆类型</view>
        <view class="wrapper select-wrapper">
          <picker
            @change="vehicleTypeChange"
            :value="paramData.vehicleType"
            :range-key="'codeName'"
            :range="vehicleArray"
            name="vehicleType"
          >
            <view class="uni-input">{{
              vehicleArray[paramData.vehicleType].codeName
            }}</view>
          </picker>
          <img src="../../static/img/expand.png" alt class="input-icon" />
        </view>
      </view>
      <view v-if="paramData.vehicleType == 3">
        <view class="uni-form-item uni-row area-top">
          <view class="title">号牌号码</view>
          <view class="wrapper">
            <input
              id="plateNbr"
              :value="paramData.plateNbr"
              class="uni-input"
              name="plateNbr"
              placeholder="输入车牌号显示最近登记信息"
              placeholder-class="placeholder-style"
              @blur="writeComplete"
            />
          </view>
        </view>

        <view class="uni-form-item uni-row area-top">
          <view class="title">实时位置</view>
          <view class="wrapper" style="position: relative">
            <input
              id="currentPosition"
              :value="paramData.currentPosition"
              class="uni-input"
              name="currentPosition"
              placeholder="实时位置"
              placeholder-class="placeholder-style"
            />
            <img
              src="../../static/img/location.png"
              alt
              class="input-location-icon"
              @click="getLocation"
            />
          </view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">驾驶员姓名</view>
          <view class="wrapper">
            <input
              id="driverName"
              :value="paramData.driverName"
              class="uni-input"
              name="driverName"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">身份证号</view>
          <view class="wrapper">
            <input
              id="driverIdCard"
              :value="paramData.driverIdCard"
              class="uni-input"
              name="driverIdCard"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">手机号</view>
          <view class="wrapper">
            <input
              :value="paramData.driverPhone"
              class="uni-input"
              name="driverPhone"
              placeholder="若是固话请以' - '分隔"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">安全员姓名</view>
          <view class="wrapper">
            <input
              :value="paramData.securityerName"
              class="uni-input"
              name="securityerName"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <!-- <view class="uni-form-item uni-row border-bottom">
          <view class="title">身份证号</view>
          <view class="wrapper">
            <input
              :value="paramData.securityerIdCard"
              class="uni-input"
              name="securityerIdCard"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view> -->
        <view class="uni-form-item uni-row">
          <view class="title">手机号</view>
          <view class="wrapper">
            <input
              :value="paramData.securityerPhone"
              class="uni-input"
              name="securityerPhone"
              placeholder="若是固话请以' - '分隔"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">公司名称</view>
          <view class="wrapper">
            <input
              :value="paramData.companyName"
              class="uni-input"
              name="companyName"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">公司电话</view>
          <view class="wrapper">
            <input
              :value="paramData.companyPhone"
              class="uni-input"
              name="companyPhone"
              placeholder="若是固话请以' - '分隔"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">公司地址</view>
          <view class="wrapper">
            <input
              :value="paramData.companyAddr"
              class="uni-input"
              name="companyAddr"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">货物类别</view>
          <view class="wrapper select-wrapper">
            <picker
              @change="chmclsTypeChange"
              :value="paramData.chmclsType"
              :range-key="'codeName'"
              :range="chmclsArray"
              name="chmclsType"
            >
              <view class="uni-input">{{
                chmclsArray[paramData.chmclsType].codeName
              }}</view>
            </picker>
            <img src="../../static/img/expand.png" alt class="input-icon" />
          </view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">出发地</view>
          <view class="wrapper select-wrapper">
            <picker mode="region" @change="cityOrginChange" name="originCity">
              <view class="uni-input">{{ paramData.originCity }}</view>
            </picker>
            <img
              src="../../static/img/location.png"
              alt
              class="input-location-icon"
            />
          </view>
        </view>
        <!-- <view class="uni-form-item uni-row border-bottom">
          <view class="title">详细地址</view>
          <view class="wrapper">
            <input
              :value="paramData.originAddr"
              class="uni-input"
              name="originAddr"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view> -->
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">目的地</view>
          <view class="wrapper select-wrapper">
            <picker
              mode="region"
              @change="cityDestinationChange"
              name="destinationCity"
            >
              <view class="uni-input">{{ paramData.destinationCity }}</view>
            </picker>
            <img
              src="../../static/img/location.png"
              alt
              class="input-location-icon"
            />
          </view>
        </view>
        <!-- <view class="uni-form-item uni-row">
          <view class="title">详细地址</view>
          <view class="wrapper">
            <input
              :value="paramData.destinationAddr"
              class="uni-input"
              name="destinationAddr"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view> -->

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">运输起始时间</view>
          <view class="wrapper select-wrapper">
            <picker mode="date" @change="cityStartTimeChange" name="startTime">
              <view class="uni-input">{{
                moment(paramData.startTime).format("YYYY-MM-DD")
              }}</view>
            </picker>
            <img src="../../static/img/expand.png" alt class="input-icon" />
          </view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">运输截止时间</view>
          <view class="wrapper select-wrapper">
            <picker mode="date" @change="cityEndTimeChange" name="endTime">
              <view class="uni-input">{{
                moment(paramData.endTime).format("YYYY-MM-DD")
              }}</view>
            </picker>
            <img src="../../static/img/expand.png" alt class="input-icon" />
          </view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">车辆图片</view>
          <view class="wrapper select-wrapper">
            <view
              class="solids"
              @tap="chooseImage('car')"
              v-if="!uploadImageUrl"
            >
              <img
                src="../../static/img/upload_temp.png"
                alt
                class="upload_image"
              />
            </view>
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
            <view class="delete-view">
              <img
                src="../../static/img/delete.png"
                alt
                class="delete-image"
                @click="deleteUploadImage('car')"
              />
            </view>
          </view>
        </view>
      </view>
      <view v-if="paramData.vehicleType == 1 || paramData.vehicleType == 2">
        <view class="uni-form-item uni-row area-top">
          <view class="title">号牌号码</view>
          <view class="wrapper">
            <input
              id="plateNbr"
              :value="paramData.plateNbr"
              class="uni-input"
              name="plateNbr"
              placeholder="输入车牌号显示最近登记信息"
              placeholder-class="placeholder-style"
              @blur="writeComplete"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row area-top">
          <view class="title">实时位置</view>
          <view class="wrapper" style="position: relative">
            <input
              id="currentPosition"
              :value="paramData.currentPosition"
              class="uni-input"
              name="currentPosition"
              placeholder="实时位置"
              placeholder-class="placeholder-style"
            />
            <img
              src="../../static/img/location.png"
              alt
              class="input-location-icon"
              @click="getLocation"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">车辆目的地</view>
          <view class="wrapper select-wrapper">
            <picker
              mode="region"
              @change="cityDestinationChange"
              name="destinationCity"
            >
              <view class="uni-input">{{ paramData.destinationCity }}</view>
            </picker>
            <img
              src="../../static/img/location.png"
              alt
              class="input-location-icon"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">客车实载人数</view>
          <view class="wrapper">
            <input
              id="passengersNumber"
              :value="paramData.passengersNumber"
              class="uni-input"
              name="passengersNumber"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>

        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">驾驶员姓名</view>
          <view class="wrapper">
            <input
              id="driverName"
              :value="paramData.driverName"
              class="uni-input"
              name="driverName"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">驾驶员身份证号</view>
          <view class="wrapper">
            <input
              id="driverIdCard"
              :value="paramData.driverIdCard"
              class="uni-input"
              name="driverIdCard"
              placeholder="请输入"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">驾驶员电话</view>
          <view class="wrapper">
            <input
              :value="paramData.driverPhone"
              class="uni-input"
              name="driverPhone"
              placeholder="若是固话请以' - '分隔"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title" style="flex: 7">车辆照片</view>
          <view class="wrapper select-wrapper">
            <view
              class="solids"
              @tap="chooseImage('card')"
              v-if="!uploadCardImageUrl"
            >
              <img
                src="../../static/img/upload_temp.png"
                alt
                class="upload_image"
              />
            </view>
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
            <view class="delete-view">
              <img
                src="../../static/img/delete.png"
                alt
                class="delete-image"
                @click="deleteUploadImage('card')"
              />
            </view>
          </view>
        </view>
        <view class="uni-form-item uni-row area-top">
          <view class="title" style="flex: 7"
            >证件照片(驾驶证和行驶证上下并排)</view
          >
          <view class="wrapper select-wrapper">
            <view
              class="solids"
              @tap="chooseImage('car')"
              v-if="!uploadImageUrl"
            >
              <img
                src="../../static/img/upload_temp.png"
                alt
                class="upload_image"
              />
            </view>
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
            <view class="delete-view">
              <img
                src="../../static/img/delete.png"
                alt
                class="delete-image"
                @click="deleteUploadImage('car')"
              />
            </view>
          </view>
        </view>
      </view>
      <view
        style="display: flex; padding: 10px 10px 0px 10px"
        v-if="paramData.vehicleType > 0"
      >
        <view>
          <checkbox
            :value="real_info"
            size="small"
            style="transform: scale(0.7)"
            :checked="real_info"
            color="#0a98fe"
            @click="checkRealInfo"
          />
        </view>
        <view
          style="
            font-size: 14px;
            text-align: center;
            transform: translateY(4px);
            letter-spacing: 1px;
          "
        >
          本人承诺：以上填报信息属实，如有虚假，本人自愿承担相关法律责任。
        </view>
      </view>

      <view class="btn-row btn-row2" v-if="!auth_status">
        <button
          class="driver-btn driver-enter"
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="guestLogin"
          withCredentials="true"
        >
          获取微信授权
        </button>
      </view>

      <view v-else class="uni-btn-v">
        <!-- <button type="primary" class="primary primary-btn" @click="open">弹出</button> -->
        <!-- <button form-type="submit" :class="[(!real_info)?'primary primary-btn':'gray-btn']"> 提 交</button> -->

        <view v-if="real_info" style="width: 100%">
          <button form-type="submit" type="primary" class="primary primary-btn">
            提 交
          </button>
        </view>
        <view v-else style="width: 100%">
          <button form-type="submit" type="primary" class="gray-btn">
            提 交
          </button>
        </view>
      </view>
    </form>

    <uni-popup
      ref="popup"
      type="dialog"
      :maskClick="maskClick"
      class="popup-panel"
    >
      <view>
        <view
          :class="['pop-box', showQr ? 'show-qr' : 'hide-qr']"
          :style="{ backgroundImage: `url(${popBoxImg})` }"
        >
          <view class="box-title">登记成功</view>
          <view class="box-qrcode" v-if="recordId">
            <img :src="recordIdQr" alt class="qr-image" />
          </view>
          <view class="box-tip">
            <view class="plan-title">提示</view>
            <view class="plan-conetnet conetnet-1">警员扫码可查看登记信息</view>
          </view>
          <view class="deal-button">
            <!-- <button type="primary" class="primary primary-return plane-buton" @click="viewPanel">预案</button> -->
            <button
              type="primary"
              class="primary primary-return"
              @click="closePanel"
            >
              关闭
            </button>
          </view>
        </view>
        <!-- <view :class="['pop-box',!showQr?'show-qr':'hide-qr']">
          <view class="plan-title-1">预案推荐</view>
          <view class="plan-conetnet-area">
            <view class="plan-conetnet-1" v-for="p in planList" :key="p.planId">
              <view class="plane-detail">{{p.planContent}}</view>
            </view>
          </view>
          <view class="plan-deal-button">
            <button type="primary" class="primary primary-return" @click="backToQr">返回</button>
          </view>
        </view>-->
      </view>
    </uni-popup>

    <uni-popup
      ref="popupQR"
      type="dialog"
      :maskClick="maskClick"
      class="popup-panel"
    >
      <view>
        <view
          :class="['pop-box', showQr ? 'show-qr' : 'hide-qr']"
          :style="{ backgroundImage: `url(${popBoxImg})` }"
        >
          <view class="box-title">登记信息二维码</view>
          <view class="box-qrcode" v-if="recordId">
            <img :src="recordIdQr" alt class="qr-image" />
          </view>
          <view class="box-tip">
            <view class="plan-title">提示</view>
            <view class="plan-conetnet conetnet-1">警员扫码可查看登记信息</view>
          </view>
          <view class="deal-button">
            <!-- <button type="primary" class="primary primary-return plane-buton" @click="viewPanel">预案</button> -->
            <button
              type="primary"
              class="primary primary-return"
              @click="closeQrCodepanel"
            >
              关闭
            </button>
          </view>
        </view>
      </view>
    </uni-popup>

    <view v-if="hasRigster" class="qrcode-image-view">
      <img
        src="../../static/img/qrcode.png"
        alt
        class="qrcode-image"
        @click="showQrCode"
      />
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
import moment from "moment";
import config from "../../base/config";
import { uniPopup } from "@dcloudio/uni-ui";

import qrCode from "../../utils/wxqrcode/wxqrcode.js";

import amap from "../../utils/SDK/amap-wx.130";

import verify from "./verify";

export default {
  components: {
    uniPopup,
  },
  data() {
    return {
      systemArray: [],
      total: 0,
      searchVal: "",
      windowWidth: 0,
      titleImageHeight: 0,
      popBoxImg: config.backImageUrl + "/pop_box_img.png",
      paramData: {
        plateNbr: "",
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
        vehicleType: "0",
        startTime: moment(new Date()).format("YYYY-MM-DD"),
        endTime: moment(new Date()).format("YYYY-MM-DD"),
        chmclsType: "0", //货物类别
        currentPosition: "", //实时位置
      }, //危化品车表单数据
      busParamData: {
        currentPosition: "", //实时位置
      }, //客车表单信息
      chmclsArray: [], //货物类别数组
      vehicleArray: [], //类别数组
      recordId: "", //登记信息返回id
      recordIdQr: "", //登记信息返回id
      uploadImageUrl: "", //临时地址
      // certificateAddr:"",//真实地址
      uploadCardImageUrl: "", //临时地址
      loadMake: true,
      size: "200",
      unit: "px",
      background: "#000000",
      foreground: "#ffffff",
      pdground: "#ffffff",
      src: "",
      maskClick: false,
      showQr: true,
      planList: [],
      hasRigster: false, //已登记过信息
      real_info: false,
      auth_status: false,
    };
  },
  computed: mapState({
    forcedLogin: "user/forcedLogin",
    hasLogin: "user/hasLogin",
    userName: "user/userName",
  }),
  onLoad() {
    let uniIdToken = uni.getStorageSync("uniIdToken");
    this.login(uni.getStorageSync("username"));
    if (uniIdToken) {
    } else {
      // this.guideToLogin();
    }

    this.amapPlugin = new amap.AMapWX({
      key: "25ad357d6ee98eb2d6a675532179276f", //高德地图KEY
    });
  },
  mounted() {
    //获取授权信息
    // this.guestLogin();
    // debugger;
    // this.$refs.autherBtn.click();
    //默认数据查询
    this.handleSearch();
    // setTimeout(() => {
    //   this.qrR();
    // }, 500);
  },
  methods: {
    moment,
    ...mapMutations({ login: "user/login" }),
    guestLogin() {
      let that = this;
      // debugger;
      uni.getProvider({
        service: "oauth",
        success: function (res) {
          if (~res.provider.indexOf("weixin")) {
            uni.login({
              provider: "weixin",
              success: (res2) => {
                uni.getUserInfo({
                  provider: "weixin",
                  withCredentials: true,
                  success: (info) => {
                    //这里请求接口
                    // console.log(res2);
                    console.log(info);
                    console.log(info.userInfo.nickName);
                    // debugger;
                    if (info && info.userInfo) {
                      that.auth_status = true;
                      uni.setStorageSync("nick-name", info.userInfo.nickName);
                    }
                    // uni.navigateTo({
                    //   url: `/pages/main/main`,
                    // });
                  },
                  fail: (err) => {
                    // debugger;
                    uni.showToast({ title: "微信登录授权失败", icon: "none" });
                  },
                });
              },
              fail: (err) => {
                // debugger;
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
    qrR() {
      // debugger;
      this.recordIdQr = qrCode.createQrCodeImg(this.recordId);
      let code = this.recordIdQr.split(",")[1];
      this.getSaveImg(code);
    },
    // 获取授权判断是否授权相册
    getSaveImg(qrcode) {
      let that = this;
      uni.getSetting({
        success: (res) => {
          console.log(res);
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            uni.showModal({
              title: "警告",
              content: "检测到您没您未授权相册权限,点击确定获取授权。",
              success: function (res) {
                if (res.confirm) {
                  uni.authorize({
                    scope: "scope.writePhotosAlbum",
                    success() {
                      // 用户已经同意
                      that.saveImgToAlbum(qrcode);
                    },
                    fail(err) {
                      console.log("用户拒绝授权相册");
                    },
                  });
                }
              },
            });
          } else {
            that.saveImgToAlbum(qrcode);
          }
        },
        fail: () => {
          console.log("点击了拒绝");
        },
      });
    },
    // 保存二维码图片到相册
    saveImgToAlbum(qrcode) {
      var fileManager = uni.getFileSystemManager();
      fileManager.writeFile({
        filePath: wx.env.USER_DATA_PATH + "/img.jpg", // 指定图片的临时路径
        data: qrcode, // 要写入的文本或二进制数据
        encoding: "base64", // 指定写入文件的字符编码
        success: (res) => {
          console.log("写入文件成功", res);
          console.log(wx.env.USER_DATA_PATH + "/img.jpg");
          uni.saveImageToPhotosAlbum({
            // 保存图片到相册
            filePath: wx.env.USER_DATA_PATH + "/img.jpg",
            success: function (res) {
              console.log("保存成功", res);
              uni.showToast({
                title: "保存成功",
              });
            },
            fail: function (err) {
              console.log("保存失败", err);
            },
          });
        },
        file: (err) => {
          console.log("写入文件失败", err);
        },
      });
    },
    showQrCode() {
      this.recordIdQr = qrCode.createQrCodeImg(this.recordId);
      // this.open();
      this.$refs.popup.open();
    },
    closeQrCodepanel() {
      this.$refs.popupQR.close();
    },
    initPosition() {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
      const { windowWidth, windowHeight } = uni.getSystemInfoSync();
      this.windowWidth = windowWidth;
    },
    getLocation() {
      this.amapPlugin.getRegeo({
        success: (data) => {
          console.log("data", data);
          if (data[0].regeocodeData) {
            this.paramData.currentPosition =
              data[0].regeocodeData.formatted_address;
          }
        },
        fail: (data) => {
          uni.showToast({
            icon: "none",
            title: "获取位置失败请,请手动填写位置信息",
          });
        },
      });
    },
    async handleSearch() {
      // let queryDate = { codeTypeNo: "010", pageSize: 10, pageNumber: 1 };
      try {
        // let res = await this.$minApi.querySystemCode(queryDate);
        let res = await this.$minApi.querySystemCode();
        if (res.status) {
          let chmclsTemp = [];
          let vehicleTypeTemp = [];
          res.result.rows.map((o) => {
            o.codeTypeNo == "010" ? chmclsTemp.push(o) : "";
            o.codeTypeNo == "011" ? vehicleTypeTemp.push(o) : "";
          });
          // this.chmclsArray = _.map(chmclsTemp, "codeName");
          // this.vehicleArray = _.map(vehicleTypeTemp, "codeName");
          chmclsTemp.unshift({
            codeTypeNo: "010",
            codeNo: "-1",
            codeName: "请选择",
          });
          vehicleTypeTemp.unshift({
            codeTypeNo: "011",
            codeNo: "-1",
            codeName: "请选择",
          });
          this.chmclsArray = chmclsTemp;
          this.vehicleArray = vehicleTypeTemp;
        }
      } catch (error) {}
    },
    async formSubmit(e) {
      // console.log(
      //   "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value)
      // );
      if (!this.real_info) {
        uni.showToast({ icon: "none", title: "请确认并勾选本人承诺信息！" });
        return;
      }
      let formdata = e.detail.value;

      // debugger;

      //区分车辆类型
      if (this.paramData.vehicleType == "3") {
        formdata.originCity = this.paramData.originCity;
        formdata.originProvince = this.paramData.originProvince;
        formdata.destinationCity = this.paramData.destinationCity;
        formdata.destinationProvince = this.paramData.destinationProvince;
        formdata.startTime = this.paramData.startTime;
        formdata.endTime = this.paramData.endTime;
        formdata.vehicleType = this.paramData.vehicleType;
        formdata.chmclsType = this.paramData.chmclsType;
        formdata.qrCodeAddr = uni.getStorageSync("nick-name"); //微信绑定标识
        // formdata.certificateAddr = this.urlTobase64(this.uploadImageUrl); //上传图片
        formdata.certificateAddr = this.uploadImageUrl; //上传图片
        // formdata.certificateAddr = '' //上传图片
        // debugger;
        //方法校验
        let temp = verify(this.paramData.vehicleType, formdata);

        if (!temp.ok) {
          uni.showToast({ icon: "none", title: temp.msg });
          return;
        }
      } else if (
        this.paramData.vehicleType == "1" ||
        this.paramData.vehicleType == "2"
      ) {
        // debugger;
        formdata.destinationCity = this.paramData.destinationCity;
        formdata.destinationProvince = this.paramData.destinationProvince;
        formdata.vehicleType = this.paramData.vehicleType;
        formdata.qrCodeAddr = uni.getStorageSync("nick-name"); //微信绑定标识
        formdata.certificateAddr = this.uploadImageUrl; //上传图片
      }

      debugger;
      //方法校验
      let temp = verify(this.paramData.vehicleType, formdata);

      if (!temp.ok) {
        uni.showToast({ icon: "none", title: temp.msg });
        return;
      }

      uni.showLoading({ title: "提交中..." });
      // debugger;
      if (
        this.uploadImageUrl == "" ||
        this.uploadImageUrl.indexOf(config.imgUrl) > -1
      ) {
        try {
          //无图片提交方式
          let res = await this.$minApi.addRecord(formdata);
          if (res.status) {
            // console.log(res);
            this.recordId = res.result;
            this.hasRigster = true;
            this.qrR();
            setTimeout(() => {
              this.open();
            }, 500);
            uni.hideLoading();
          } else {
            uni.showToast({
              icon: "none",
              title: "登记失败",
            });
            uni.hideLoading();
          }
        } catch (error) {
          uni.showToast({
            icon: "none",
            title: "登记失败",
          });
        }
      } else {
        // debugger;
        //有图片提交方式
        let that = this;
        uni.uploadFile({
          url:
            "https://whpcl.zhzhy.online/CaseManage/transportRecord/addRecord", //仅为示例，非真实的接口地址
          // url:
          // "https://whpcl.zhzhy.online/CaseManage/transportRecord/addRecord", //仅为示例，非真实的接口地址
          filePath: this.uploadImageUrl,
          name: "imageFile",
          formData: formdata,
          success: (uploadFileRes) => {
            // console.log(uploadFileRes.data, 99999);
            let res = JSON.parse(uploadFileRes.data);
            if (!res.status) {
              uni.showToast({
                icon: "none",
                title: "登记失败",
              });
              return;
            }
            uni.showToast({
              icon: "none",
              title: "登记成功",
            });
            
            that.recordId = res.result;

            if (
              this.paramData.vehicleType == "1" ||
              this.paramData.vehicleType == "2"
            ) {
              // debugger;
              let formdata1 = {};
              formdata1.recordId = that.recordId;
              formdata1.plateNbr = formdata.plateNbr;
              formdata1.driverLicenseFile = that.uploadCardImageUrl;
              uni.uploadFile({
                url:
                  "https://zkwhptest.zhzhy.online/CaseManage/transportRecord/updateById", //仅为示例，非真实的接口地址
                filePath: that.uploadCardImageUrl,
                name: "driverLicenseFile",
                formData: formdata1,
                success: (uploadFileRes) => {
                  console.log(uploadFileRes.data, 9999);
                },
              });
            }

            that.hasRigster = true;
            that.qrR();
            setTimeout(() => {
              that.open();
            }, 500);
            uni.hideLoading();
          },
          fail: (err) => {
            console.log(err);
            uni.showToast({
              icon: "none",
              title: "登记失败",
            });
            uni.hideLoading();
          },
        });
      }

      // }
    },
    async writeComplete(e) {
      //获取表单信息
      if (!e) return;
      this.paramData[e.currentTarget.id] = e.detail.value;
      if (
        this.paramData.plateNbr
        // &&
        // this.paramData.driverName &&
        // this.paramData.driverIdCard
      ) {
        //获取信息
        let params = {
          plateNbr: this.paramData.plateNbr,
          vehicleType: this.paramData.vehicleType,
          qrCodeAddr: uni.getStorageSync("nick-name"), //微信绑定标识
          // driverName: this.paramData.driverName,
          // driverIdCard: this.paramData.driverIdCard,
          pageSize: 10,
          pageNumber: 1,
        };
        uni.showLoading({ title: "信息查找中..." });
        try {
          let res = await this.$minApi.queryRecordFirst(params);
          if (res.status && res.result) {
            this.recordId = res.result.recordId;
            this.hasRigster = true;
            let temp = res.result;
            temp.startTime = moment(temp.startTime).format("YYYY-MM-DD");
            temp.endTime = moment(temp.endTime).format("YYYY-MM-DD");
            this.paramData = temp;
            this.uploadImageUrl = temp.certificateAddr || "";
            this.uploadCardImageUrl = temp.driverLicenseAddr || "";
            // this.certificateAddr == temp.certificateAddr || "";
          }
        } catch (error) {
          console.log(error);
        } finally {
          uni.hideLoading();
        }
      }
    },
    // async viewPanel() {
    //   //判断信息是否被确认
    //   let res = await this.$minApi.queryRecordFirst({
    //     recordId: this.recordId,
    //   });
    //   if (res.status && res.result.verifyResult == 1) {
    //     let planRes = await this.$minApi.getPlanList({});
    //     if (planRes.status) {
    //       this.planList = planRes.result.rows;
    //       this.showQr = false;
    //     }
    //   } else {
    //     uni.showToast({ icon: "none", title: "信息未确认" });
    //   }
    // },
    backToQr() {
      this.showQr = true;
    },
    gotoPage(page) {
      console.log(page, 9999);
      uni.navigateTo({
        url: `/pagesA/${page}/${page}`,
      });
    },
    open() {
      // this.qrR();
      this.$refs.popup.open();
    },
    clear() {
      this.searchVal = "";
    },
    //选择图片
    chooseImage(type) {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], //从相册选择
        success: (res) => {
          // debugger;
          if (res) {
            if (type == "car") {
              this.uploadImageUrl = res.tempFilePaths[0];
            } else if (type == "card") {
              this.uploadCardImageUrl = res.tempFilePaths[0];
            }
          }
        },
      });
    },
    deleteUploadImage(type) {
      if (type == "car") {
        this.uploadImageUrl = "";
      } else if (type == "card") {
        this.uploadCardImageUrl = "";
      }
    },
    //图片base64转换
    urlTobase64(url) {
      if (!url) return "";
      //若已是base64格式，则直接返回
      if (url.indexOf("base64") > -1) return url;
      let res = uni.getFileSystemManager().readFileSync(url, "base64");
      let base64 = "data:image/jpeg;base64," + res;
      return base64;
    },
    vehicleTypeChange(e) {
      // debugger;
      if (e.detail && e.detail.value) {
        this.paramData.vehicleType = e.detail.value;
      }
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
      // debugger;
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
    checkRealInfo(e) {
      this.real_info = !this.real_info;
      // console.log(this.real_info, 9999);
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

.gray-btn {
  font-size: 20px !important;
  letter-spacing: 1px !important;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  width: 94%;
  background: linear-gradient(to bottom, #ccc 0%, gray 100%);
  box-shadow: 0px 2px 4px 0px gray;
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
  padding: 0 4px;
  right: 10px;
  top: 14px;
}

.card-contnet {
  position: relative;
  perspective: 500;
  -webkit-perspective: 500;
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

.pop-box-back {
  position: relative;
  transform: rotateY(-180deg);
  -webkit-transform: rotateY(-180deg);
}

.card-contnet:hover .pop-box-front {
  transform: rotateY(-180deg);
  -webkit-transform: rotateY(-180deg);
}

.card-contnet:hover .pop-box-back {
  transform: rotateY(-360deg);
  -webkit-transform: rotateY(-360deg);
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
  margin-top: 30rpx;
}
.plan-title {
  text-align: center;
  font-size: 14px;
}

.plan-conetnet {
  font-size: 12px;
}

.conetnet-1 {
  margin-top: 10rpx;
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

.qr-image {
  width: 240rpx;
  height: 240rpx;
  padding: 20rpx;
}

.deal-button {
  position: absolute;
  display: flex;
  flex-direction: row;
  bottom: 30rpx;
}

.plane-buton {
  margin-right: 30rpx;
}

.show-qr {
  display: flex;
}

.hide-qr {
  display: none;
}

.popup-panel {
  display: flex;
  flex-direction: row;
}

.qrcode-image-view {
  position: fixed;
  right: 20rpx;
  bottom: 140rpx;
  background: transparent;
  width: 60rpx;
  height: 60rpx;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-radius: 50px;
  padding: 20rpx;
  outline: none;
  z-index: 2;
  animation: qrcodeImageAnimation 1s ease-in-out;
}

.qrcode-image {
  width: 60rpx;
  height: 60rpx;
}

@keyframes qrcodeImageAnimation {
  0% {
    bottom: 0;
    opacity: 0;
  }
  /* 50% { bottom: 0; }
  50% { top: 10px; } */
  100% {
    bottom: 140rpx;
    opacity: 1;
  }
}

.upload_image {
  width: 48rpx;
  height: 48rpx;
}

.solids {
  text-align: right;
}

.solids-ready {
  position: relative;
  display: flex;
  justify-content: center;
}

.delete-view {
  position: absolute;
  right: 36rpx;
  top: 24rpx;
}

.delete-image {
  width: 48rpx;
  height: 48rpx;
}

/* .submit-btn-width{
  width: 100%;
} */

.title {
  font-weight: 700;
}

.vehicle-type-default {
  /* transform:translateY(50%); */
  animation: 0.5s linear 0.1s move forwards;
}

.driver-btn {
  background: transparent;
  font-size: 18px !important;
  letter-spacing: 1px !important;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  border: 1px solid #08f;
  color: #08f;
}

.btn-row2 > .button-hover {
  background: transparent !important;
  opacity: 0.8;
}

@keyframes move {
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: 30%;
  }
}

.vehicle-type-info {
  /* transform:translateY(50%); */
  animation: 0.5s linear move-info forwards;
}

@keyframes move-info {
  0% {
    margin-top: 30%;
  }
  100% {
    margin-top: 0%;
  }
}
</style>
