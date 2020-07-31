module.exports = {

    //webpack配置
	configureWebpack: {
    //关闭 webpack 的性能提示
    performance: {
      hints:false
    }

  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
