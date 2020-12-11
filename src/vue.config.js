module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://81.70.9.203:8800',
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