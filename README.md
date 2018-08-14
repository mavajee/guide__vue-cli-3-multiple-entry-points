# Vue-cli 3 and multiple entry points (pages)

For example we need build three different app instances:
- index     - `/`;
- manage    - `/manage`;
- dashboard - `/manage`.

For do it we have edit webpack entry points and html-webpack-plugin. This can be possibly modify **vue.config.js** file. The internal config is maintained using [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

Full config you can see [here](vue.config.js).

## Simple guide to configure **vue.config.js**

First remove the standard entry point:

```js
config.entryPoints.delete('app').end();
```

Next add needed entry points:

```js
config
    .entry('index')
    .add(path.resolve(__dirname, 'src/index/main.js'))
    .end()
    .entry('manage')
    .add(path.resolve(__dirname, 'src/manage/main.js'))
    .end()
    .entry('dashboard')
    .add(path.resolve(__dirname, 'src/dashboard/main.js'))
    .end();
```
And each entry points require html-webpack-plugin.

For example we can edit existing:
```js
config.plugin('html').tap(args => {
    return [
    {
        filename: 'index.html',
        template: 'public/index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    ]
})
```

And add new like this:

```js
config.plugin('manage-html').use(require('html-webpack-plugin'), [
    {
    filename: 'manage/index.html',
    template: 'public/index.html',
    chunks: ['chunk-vendors', 'chunk-common', 'manage']
    }
])
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

## Nginx configure

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


