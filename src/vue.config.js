module.exports = {
    devServer: {
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888',
          changeOrigin: true
        },
        '/ws': {
            target: 'http://81.70.9.203:8800',
            ws: true,
            changeOrigin: true
        }
      }
    }
  }