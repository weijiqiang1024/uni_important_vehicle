const vueConfig = {
    configureWebpack: {

    }
}

if (
    process.env.NODE_ENV !== 'production' &&
    (
        process.env.UNI_PLATFORM === 'mp-weixin' ||process.env.UNI_PLATFORM === 'mp-baidu' ||
        process.env.UNI_PLATFORM === 'mp-toutiao'
    )
) {
    vueConfig.configureWebpack.devtool = 'inline-source-map'
}

module.exports = vueConfig