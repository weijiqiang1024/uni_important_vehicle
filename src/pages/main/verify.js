/* 
 * @Title: 登记信息表单验证 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2020-08-19 17:33:30 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2020-09-19 14:34:03
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import { validateIDCard, validatePhTelNumber } from "../../utils/verify";

export default function (type, params) {
    debugger;
    //危化品车辆
    let testObj = {
        vehicleType: '车辆类型',
        plateNbr: '号牌号码',
        currentPosition: '实时位置',
        driverName: "驾驶员姓名",
        driverIdCard: "驾驶员身份证号",
        driverPhone: "驾驶员手机号",
        securityerName: "安全员姓名",
        // securityerIdCard: "安全员身份证号",
        securityerPhone: "安全员手机号",
        companyName: "公司名称",
        companyAddr: "公司地址",
        companyPhone: "公司电话",
        originProvince: "出发地",
        originCity: "出发地",
        // originAddr: "出发地详细地址",
        destinationProvince: "目的地",
        destinationCity: "目的地",
        // destinationAddr: "目的地详细地址",
        startTime: "运输起始时间",
        endTime: "运输截止时间",
        chmclsType: "货物类别", //货物类别
        certificateAddr: "车辆图片", //货物类别
    }

    //客运车辆
    let carObj = {
        vehicleType: '车辆类型',
        plateNbr: '号牌号码',
        currentPosition: '实时位置',
        destinationCity: "车辆目的地",
        passengersNumber: "客车实载人数",
        driverName: "驾驶员姓名",
        driverIdCard: "驾驶员身份证号",
        driverPhone: "驾驶员手机号",
    }

    let tempObj = type == '3' ? testObj : carObj;

    // console.log(params,'222');
    //空值校验
    for (let i in params) {
        if (params[i] === '' && i != 'certificateAddr') {
            debugger;
            return { ok: false, msg: tempObj[i] + '不能为空' };
        }

        //身份证校验
        if (['driverIdCard', 'securityerIdCard'].includes(i)) {
            if (!validateIDCard(params[i])) return { ok: false, msg: tempObj[i] + '不合法' }
        }
        //电话号码校验
        if (['driverPhone', 'securityerPhone', 'companyPhone'].includes(i)) {
            if (!validatePhTelNumber(params[i])) return { ok: false, msg: tempObj[i] + '不合法' }
        }
    }

    return { ok: true, msg: '校验完成' };

}