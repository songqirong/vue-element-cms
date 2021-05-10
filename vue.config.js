module.exports={
    devServer:{
        port:'9000',
        proxy: {
            '/api': {
              target: 'http://localhost:3000 ',  // 是接口所在的服务器地址
              ws: true,
              changeOrigin: true
            },
        }
    },
}