
import MinRequest from './request'
import baseConfig from "./config";

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
    return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
    return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
    config.baseURL = baseConfig.baseUrl
    return config
})


export default {
    apis: {
        //登录
        login(data) {
            return minRequest.post('/CaseManage/login/login', data)
        },//系统代码
        querySystemCode(data) {
            return minRequest.get('/CaseManage/sysCode/getByCondition', data)
        },
        queryRecord(data){
            return minRequest.get('/CaseManage/transportRecord/getByCondition', data)
        },
        queryRecordFirst(data) {
            return minRequest.get('/CaseManage/transportRecord/selectFirst', data)
        },
        //司危化品车登记
        addRecord(data) {
            return minRequest.post('/CaseManage/transportRecord/addRecord', data)
        },
        //登记确认
        recordVerify(data) {
            return minRequest.post('/CaseManage/transportRecordVerify/addRecord',data)
        },
        //获取预案信息
        getPlanList(data) {
            return minRequest.get('/CaseManage/disposalPlan/getByCondition',data)
        },
        getEmergencyList(data) {
            return minRequest.get('/CaseManage/emergencyPlan/getByCondition', data)
        },
        //获取雾灯列表
        getFrogList(data) {
            return minRequest.post('/api/d_frog_lights/list', data)
        },
        //获取能见度设备列表
        getMeteoList(data) {
            return minRequest.post('/api/d_visibility_meters/list', data)
        },

    }
}