# Vue-cli 3 and multiple entry points (pages)

> UPD.1: I found reference for multiple pages in the vue-cli source code. I think it's not yet documented.

> UPD.2: See config [documentation](https://cli.vuejs.org/config/#pages) for create multiple pages.

***

For example we need build three different app instances:
- index     - `/`;
- manage    - `/manage`;
- dashboard - `/dashboard`.

Simple way add **pages** config reference to **vue.config.js**.

Full config you can see [here](vue.config.js).

> Old example using [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) is [here](https://github.com/mavajee/guide__vue-cli-3-multiple-entry-points/tree/chain-usage).

## Configure **vue.config.js**

With **pages** api you don't need manually edit entry points. You just define each your page like this:

```js
module.exports = {
  pages: {
    manage: {
      entry: 'src/manage/main.js',
      template: 'public/index.html',
      filename: 'manage/index.html',
      title: 'Manage Page',
      chunks: ['chunk-vendors', 'chunk-common', 'manage']
    }
}
```

### Vue router

Using vue router you will see error, for fix configure [historyApiFallback](https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback) for **webpack-dev-server**:

```js
devServer: {
    historyApiFallback: {
        rewrites: [
            { from: /^\/manage\/?.*/, to: path.posix.join('/', 'manage/index.html') },
            { from: /./, to: path.posix.join('/', 'index.html') }
        ]
    },
}
```

## Configure Nginx

For more, if you need configure nginx you can make something like this:

```
server {
    listen 80;

    location ~ ^/manage(.*)$ {
        proxy_pass http://127.0.0.1:8550/manage/$1;
    }
}
```

Best way if on a each entry point configure own location. See full config [here](configs/nginx.dev.conf).

Using non "localhost" host HMR can not be working. And for it add [allowedHosts](https://webpack.js.org/configuration/dev-server/#devserver-allowedhosts) to `webpack-dev-server` or edit server headers.

