/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: vue-cli配置
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 15:25:59
 * @LastEditTime: 2020-03-14 18:02:46
 */

const path = require('path')

const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV)

/* gzip S */
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 还可以开启比 gzip 体验更好的 Zopfli
const zopfli = require('@gfx/zopfli')
const BrotliPlugin = require('brotli-webpack-plugin')

// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['ts', 'js', 'css', 'json', 'txt', 'html', 'ico', 'svg']
const productionGzipReg = new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$', 'i')
/* gzip E */

// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/* CDN S */
// 忽略要打包的模块
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  axios: 'axios',
  // 'element-ui': 'ELEMENT'
  // 'tinymce/tinymce': 'tinymce'
}

// 手动引入 cdn => 注意：指定版本
// 访问https://unpkg.com获取最新版本
const cdn = {
  css: [
    // 'https://cdn.bootcss.com/element-ui/2.13.0/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js'
    // 'https://cdn.bootcss.com/element-ui/2.13.0/index.js'
    // 'https://cdn.bootcss.com/tinymce/5.2.0/tinymce.min.js'
  ]
}
/* CND E */

// in the development, use own LAN ip to running or debug
const getLANIp = () => {
  const interfaces = require('os').networkInterfaces()

  for (let devName in interfaces) {
    let current_interface = interfaces[devName]

    for (let i = 0, len = current_interface.length; i < len; i++) {
      let alias = current_interface[i]

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }

  // 找不到使用本地测试 ip
  return '127.0.0.1'
}
/* const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/variables.sass'),
        path.resolve(__dirname, './src/assets/sass/mixin.sass')
      ]
    })
} */

module.exports = {
  // 默认 '/'，部署应用包时的基本 URL,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,

  // 默认 'dist', 生产环境构建文件的目录
  outputDir: process.env.VUE_OUTPUT_DIR,

  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: 'assets',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // indexPath: './',

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 页面模式，undefined 单页，object 多页
  pages: undefined,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader) !isProduction
  lintOnSave: !isProduction,

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],

  // 生产环境的 source map
  productionSourceMap: isProduction,

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  crossorigin: undefined,

  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,

  //是否为 Babel 或 TypeScript 使用 thread-loader。
  // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,

  css: {
    /**
     * 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
     * 设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
     * 如果你在 css.loaderOptions.css 里配置了自定义的 CSS Module 选项，
     * 则 css.requireModuleExtension 必须被显式地指定为 true 或者 false，
     * 否则我们无法确定你是否希望将这些自定义配置应用到所有 CSS 文件中
     */
    requireModuleExtension: false,

    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: isProduction,

    // 开启 CSS source maps，一般不建议开启
    sourceMap: isProduction,

    // css预设器配置项
    loaderOptions: {
      // 这里的选项会传递给 css-loader
      /* css: {
        modules: {
          localIdentName: '[name]-[hash]'
        },
        localsConvention: 'asIs'
      }, */
      // 这里的选项会传递给 sass-loader
      sass: {
        sourceMap: true
        // prependData: `@import "@/assets/sass/component.sass"`
      }
      // 这里的选项会传递给 sass-loader
      /* scss: {
        sourceMap: true,
        prependData: `@import "src/assets/scss/component.scss";`
      }, */
      // 这里的选项会传递给 postcss-loader
      /* postcss: {
        sourceMap: true,
        plugins: [
          require('postcss-plugin-px2rem')({
            //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // rootValue: 100,

            //允许REM单位增长到的十进制数字。
            // unitPrecision: 5,

            //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            //propWhiteList: [],

            //黑名单
            // propBlackList: [],

            //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            exclude: /(node_module)/,

            //要忽略并保留为px的选择器
            selectorBlackList: ['.dt-pc'],

            //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // ignoreIdentifier: false,

            // （布尔值）替换包含REM的规则，而不是添加回退。
            // replace: true,

            //（布尔值）允许在媒体查询中转换px。
            mediaQuery: false,

            //设置要替换的最小像素值(3px会被转rem)。 默认 0
            minPixelValue: 3
          })
        ]
      } */
      // 这里的选项会传递给 stylus-loader
      // stylus: { sourceMap: true}
    }
  },

  devServer: {
    // 是否自动打开浏览器页面
    open: true,

    // 是否热更新
    hot: true,

    // 指定使用一个 host。默认是 127.0.0.1
    host: getLANIp(),

    // 端口地址
    port: 8080,

    // 是否使用 https 提供服务
    https: false,

    // 是否压缩
    compress: false,

    // 是否显示进度条
    progress: true,

    // 让浏览器 显示 webpack 编译过程中 出现的警告和错误
    overlay: {
      warnings: true,
      errors: true
    }
    // 配置跨域处理
    /* proxy: {
      '/api': {
        // 目标 API 地址
        target: process.env.VUE_APP_API,
        //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true

        //这里重写路径
        // pathRewrite: {'^/api': '/'}

        // 如果要代理 websockets
        // ws: true,
        // secure: false
      }
    } */
  },

  // 向 PWA 插件传递选项
  // pwa: {},

  // 可以用来传递任何第三方插件选项
  // pluginOptions: {},

  // 对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: config => {
    // 添加 公共样式文件 到每个组件
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))

    // 传递给 html-webpack-plugin's 构造函数的新参数
    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'

      // 手动注入cdn
      args[0].cdn = isProduction ? cdn : { css: cdn.css }

      return args
    })

    // 生产环境配置
    if (isProduction) {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')

      // 移除 preload 插件
      config.plugins.delete('preload')

      // 忽略打包
      config.externals(externals)

      // 分割代码
      config.optimization.splitChunks({
        // async异步代码分割 initial同步代码分割 all同步异步分割都开启
        chunks: 'all',
        // 字节 引入的文件大于30kb才进行分割
        minSize: 30000,
        // 尝试将大于50kb的文件拆分成n个50kb的文件
        // maxSize: 50000,
        // 模块至少使用次数
        minChunks: 1,
        // 同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
        maxAsyncRequests: 5,
        // 首页加载的时候引入的文件最多3个
        maxInitialRequests: 3,
        // 缓存组和生成文件名称之间的连接符
        automaticNameDelimiter: '~',
        // 缓存组里面的filename生效，覆盖默认命名
        // name: true,
        cacheGroups: {
          //缓存组，将所有加载模块放在缓存里面一起分割打包
          vendors: {
            chunks: 'initial',
            // 提升权重，先抽离第三方模块，再抽离公共模块，要不然执行抽离公共模块就截止不会往下执行
            priority: 100,
            test: /[\\/]node_modules[\\/]/
          },
          common: {
            chunks: 'all',
            priority: 10,
            // 文件最小字节
            minSize: 0,
            // 引用次数
            minChunks: 2,
            //模块嵌套引入时，判断是否复用已经被打包的模块
            reuseExistingChunk: true
          }
        }
      })

      /**
       * 将包含chunks 映射关系的 list单独从 app.js里提取出来，
       * 因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，
       * 所以你每次改动都会影响它，如果不将它提取出来的话，
       * 等于app.js每次都会改变。缓存就失效了
       */
      config.optimization.runtimeChunk = {
        name: entrypoint => `manifest.${entrypoint.name}`
      }

      // 压缩图片
      /* config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: '65-90', speed: 4 },
          gifsicle: { interlaced: false },
          webp: { quality: 75 }
        }) */

      // 打包分析
      if (process.env.IS_ANALYZ) {
        config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }])
      }
    }
  },

  configureWebpack: config => {
    const plugins = []

    if (isProduction) {
      config.mode = 'production'

      plugins.push(
        // 开启 Gzip 压缩
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback)
          },
          compressionOptions: {
            numiterations: 15
          },
          test: productionGzipReg,
          threshold: 10240,
          minRatio: 0.8
        }),
        new BrotliPlugin({
          test: productionGzipReg,
          minRatio: 0.99
        })
      )
    } else {
      config.mode = 'development'
    }

    config.plugins = [...config.plugins, ...plugins]

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
        alias: {
          vue$: 'vue/dist/vue.js',
          '@': path.resolve(__dirname, './src')
        }
      }
    })
  }
}
