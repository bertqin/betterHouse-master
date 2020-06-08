# betterHouse

## 初始化项目

```
npx @tarojs/cli init betterHouse
```

## 集成 dva

```
npm i  dva-core dva-loading
```

## 异步编程

```
npm i babel-plugin-transform-runtime --dev
npm i babel-runtime
```

随后修改项目 babel 配置 `config/index.js`，增加插件 babel-plugin-transform-runtime

```js
babel: {
  sourceMap: true,
  presets: [
    [
      'env',
      {
        modules: false
      }
    ]
  ],
  plugins: [
    'transform-decorators-legacy',
    'transform-class-properties',
    'transform-object-rest-spread',
    ['transform-runtime', {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": 'babel-runtime'
    }]
  ]
}
```
