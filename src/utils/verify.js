/* 
 * @Title: 正则
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2020-08-19 18:05:20 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2020-08-19 20:35:00
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

/* 身份证 */
 export function validateIDCard(str) {
       const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
       return reg.test(str)
    
}

/* 固定电话 */
export function validateTelephone(str) {
    const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
    return reg.test(str)
}

/* 手机号码 */
export function validatePhoneNumber(str) {
    const reg = /^[1][3|4|5|6|7|8|9][0-9]{9}$/
    return reg.test(str)

}

/* 手机号码和固定电话 */
export function validatePhTelNumber(str) {
    // const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
    // let phone = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))[0-9]{8}$/;
    // let ring = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    // return phone.test(str) || ring.test(str);
    let reg = /(^0\d{2,3}\-\d{7,8}$)|(^1[3|4|5|6|7|8][0-9]{9}$)/;
    return reg.test(str);

}