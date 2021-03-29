<template>
  <view class="content">
    <view class="query-area">
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">号牌号码</view>
          <view class="wrapper">
            <input
              id="plateNbr"
              :value="paramData.plateNbr"
              class="uni-input"
              name="plateNbr"
              placeholder="请输入"
              placeholder-class="placeholder-style"
              @input="writeComplete"
              @blur="getPlateNbr"
            />
          </view>
        </view>

        <view class="query-row">
          <view
            :class="['primary-btn',buttonStatus=='disabled'?'primary-btn-disable':'primary-btn-enable']"
            @click="getInfoByPlateNumber"
          >搜 索</view>
        </view>
      </form>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      deviceIndex: 0, //气象设备
      deviceList: [],
      showPicker: false,
      rangetime: ["2020/08/01 14:00", "2020/08/02 13:59"],
      type: "rangetime",
      value: "",
      buttonStatus: "disabled",
      paramData: {
        plateNbr: "",
      },
    };
  },
  mounted() {
    // this.getInfoByPlateNumber();
  },
  methods: {
    moment,
    writeComplete(e) {
      if (!e.detail.value) {
        this.buttonStatus = "disabled";
      } else {
        this.buttonStatus = "enable";
      }
    },
    getPlateNbr(e){
        this.paramData.plateNbr = e.detail.value;
    },
    async getInfoByPlateNumber(e) {
    //   debugger;
      if (this.buttonStatus == "disabled") return false;
      let params = {
        plateNbr: this.paramData.plateNbr,
      };
      try {
        let res = await this.$minApi.queryRecordFirst(params);
        if (res.status && res.result) {
        //   console.log(res);
          let info = res.result;
          info._police = true;
          uni.navigateTo({
            url: "../user/verify?info=" + JSON.stringify(info),
          });
        }
      } catch (error) {
        uni.showToast({
          icon: "none",
          title: "查询失败",
        });
      }
    },
    deviceNameChange(e) {
      this.deviceIndex = e.detail.value;
    },
    onShowDatePicker(type) {
      //显示
      this.type = type;
      this.showPicker = true;
      this.value = this[type];
    },
    onSelected(e) {
      //选择
      this.showPicker = false;
      if (e) {
        let temp = (e.value + "").split(",");
        temp = temp.map((t) => t.substring(0, 16));
        this[this.type] = temp;
        this.buttonStatus = "enable";
        // //选择的值
        // console.log("value => " + e.value);
        // //原始的Date对象
        // console.log("date => " + e.date);
      }
    },
    async formSubmit(e) {
      if (this.buttonStatus == "disabled") return;
      let plateNbr = e.detail.value;

      let params = {
        plateNbr: plateNbr,
      };

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
  },
};
</script>

<style scoped>
.uni-form-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 6px 0px;
  background: #fff;
  align-items: center;
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

.select-wrapper {
  position: relative;
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
  font-weight: 700;
}

.uni-form-item .wrapper {
  flex: 3.5;
  padding: 20rpx 0;
  padding-right: 50rpx;
}

.input-icon {
  position: absolute;
  width: 10px;
  height: 14px;
  right: 10px;
  top: 14px;
}

.primary-btn {
  margin: 10px 4%;
  background-color: #ccc;
  font-size: 34rpx !important;
  letter-spacing: 4px;
  height: 80rpx;
  border-radius: 80rpx;
  line-height: 80rpx;
  cursor: pointer;
  border: 1px solid #ccc;
  text-align: center;
  color: #fff;
}

.primary-btn-disable {
  background-color: #ccc;
  border: 1px solid #ccc;
}

.primary-btn-enable {
  background-color: #06f;
  border: 1px solid #06f;
}

.query-row {
  padding: 20rpx;
}

.select-time-font {
  font-size: 26rpx;
}
</style>
