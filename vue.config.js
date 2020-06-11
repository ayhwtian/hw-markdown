module.exports = {
  //配置less
  css: {
    loaderOptions: {
      less: {
        // 定制主题
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true //启用后ant按需加载才能使用
      }
    }
  }
}