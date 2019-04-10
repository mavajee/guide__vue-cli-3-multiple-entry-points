const path = require('path')

const PORT = 8550
const DEV_HOST = 'vmep.com'

/**
 * https://cli.vuejs.org/config/#pages
 */
module.exports = {
  pages: {
    index: {
      entry: 'src/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    manage: {
      entry: 'src/manage/main.js',
      template: 'public/index.html',
      filename: 'manage/index.html',
      title: 'Manage Page',
      chunks: ['chunk-vendors', 'chunk-common', 'manage']
    },
    dashboard: {
      entry: 'src/dashboard/main.js',
      template: 'public/index.html',
      filename: 'dashboard/index.html',
      title: 'Dashboard Page',
      chunks: ['chunk-vendors', 'chunk-common', 'dashboard']
    }
  },

  devServer: {
    port: PORT,
    historyApiFallback: {
      rewrites: [
        { from: /^\/manage\/?.*/, to: path.posix.join('/', 'manage/index.html') },
        { from: /./, to: path.posix.join('/', 'index.html') }
      ]
    },
    allowedHosts: [DEV_HOST]
  }
}
