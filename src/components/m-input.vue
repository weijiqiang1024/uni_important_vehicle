<template>
  <view class="m-input-view">
    <input
      :focus="focus"
      :type="inputType"
      :value="value"
      @input="onInput"
      class="m-input-input"
      :placeholder="placeholder"
	    placeholder-class="placeholder-style"
      :password="type==='password'&&!showPassword"
      @focus="onFocus"
      @blur="onBlur"
    />
    <!-- 优先显示密码可见按钮 -->
    <view v-if="clearable&&!displayable&&value.length" class="m-input-icon">
      <m-icon style="color:#ccc" type="iconclear" @click="clear"></m-icon>
      <!-- <uni-icons style="color:#ccc" type="clear" @click="clear"></uni-icons> -->
    </view>
    <view v-if="displayable" class="m-input-icon">
      <m-icon :style="{color:showPassword?'#666666':'#ccc'}" type="iconeye" @click="display"></m-icon>
      <!-- <uni-icons :style="{color:showPassword?'#666666':'#ccc'}" type="eye" @click="display"></uni-icons> -->
    </view>
  </view>
</template>

<script>
import mIcon from "./m-icon/m-icon.vue";
// import uniIcons from "@/components/uni-icons/uni-icons.vue"
// export default {
//     components: {uniIcons}
// }

export default {
  components: {
    mIcon,
    // uniIcons
  },
  props: {
    /**
     * 输入类型
     */
    type: String,
    /**
     * 值
     */
    value: String,
    /**
     * 占位符
     */
    placeholder: String,
    /**
     * 是否显示清除按钮
     */
    clearable: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * 是否显示密码可见按钮
     */
    displayable: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * 自动获取焦点
     */
    focus: {
      type: [Boolean, String],
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "input",
  },
  data() {
    return {
      /**
       * 显示密码明文
       */
      showPassword: false,
      /**
       * 是否获取焦点
       */
      isFocus: false,
    };
  },
  computed: {
    inputType() {
      const type = this.type;
      return type === "password" ? "text" : type;
    },
  },
  methods: {
    clear() {
      this.$emit("input", "");
    },
    display() {
      this.showPassword = !this.showPassword;
    },
    onFocus() {
      this.isFocus = true;
    },
    onBlur() {
      this.$nextTick(() => {
        this.isFocus = false;
      });
    },
    onInput(e) {
      this.$emit("input", e.detail.value);
    },
  },
};
</script>

<style>
.m-input-view {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  /* width: 100%; */
  flex: 1;
  padding: 0 10px;
}

.m-input-input {
  flex: 1;
  width: 100%;
  min-height: 100%;
  line-height: inherit;
  background-color: rgba(0, 0, 0, 0);
}

.placeholder-style {
  color: #ddd;
  font-size: 16px;
  /* font-weight: 700; */
  letter-spacing: 1px;
}

.m-input-icon {
  width: 20px;
  font-size: 20px;
  line-height: 20px;
  color: #666666;
  margin-right: 10px;
}
</style>
