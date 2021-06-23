module.exports={
    devServer:{
        port:'9000',
        proxy: {
            '/api': {
              target: 'https://api.persion.cn',  // 是接口所在的服务器地址
              ws: true,
              changeOrigin: true
            },
        }
    },
}