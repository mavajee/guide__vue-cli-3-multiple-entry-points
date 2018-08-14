const path = require('path')

const PORT = 8550
const DEV_HOST = 'vmep.com'

module.exports = {
  chainWebpack: config => {
    /**
     * Remove the standard entry point
     */
    config.entryPoints.delete('app').end()
    /**
     * Add new entry points
     */
    config
      .entry('index')
      .add(path.resolve(__dirname, 'src/index/main.js'))
      .end()
      .entry('manage')
      .add(path.resolve(__dirname, 'src/manage/main.js'))
      .end()
      .entry('dashboard')
      .add(path.resolve(__dirname, 'src/dashboard/main.js'))
      .end()

    /**
     * Edit existing html-webpack-plugin
     */
    config.plugin('html').tap(args => {
      return [
        {
          filename: 'index.html',
          template: 'public/index.html',
          chunks: ['chunk-vendors', 'chunk-common', 'index']
          // for prod use minify. https://github.com/kangax/html-minifier#options-quick-reference
        }
      ]
    })

    /**
     * Add new
     */
    config.plugin('manage-html').use(require('html-webpack-plugin'), [
      {
        filename: 'manage/index.html',
        template: 'public/index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'manage']
      }
    ])

    config.plugin('dashboard-html').use(require('html-webpack-plugin'), [
      {
        filename: 'dashboard/index.html',
        template: 'public/index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'dashboard']
      }
    ])
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
