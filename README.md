# vue-cli4-ts-template

## 开发环境
  - Node.js       v12.16.3
  - Vue           v2.6.11
  - Vue-Cli       v4.3.1
  - axios         v0.19.2
  - qs            v6.9.4
  - typescript

## 安装依赖
 npm i

## 开发环境
  npm run serve

## 生产环境
  npm run build

## 测试环境
  npm run test:unit

## 配置包（已安装）
  npm i -D @gfx/zopfli compression-webpack-plugin brotli-webpack-plugin webpack-bundle-analyzer style-resources-loader

## 开发环境设计思想：支架式设计，配置式驱动
  - 把一个大体的架构划分成一个个子支架，子支架下管理着自己的子支架，例如：
    ```
    配置、错误处理、注册器、过滤器、接口请求响应、工具、通用组件封装等
    ```

## 开发约定

- 命名

  - 命名要见名知意，简洁明了，让代码会说话，减少不必要的注释，严禁出现 拼音数字 组合命名方式，统一使用有具体意义的英文单词命名，
    可参照 google 翻译，网址：https://translate.google.cn/

  - 类（文件或文件夹）统一使用 大驼峰命名法，例如：ProductDetail
      例如：.vue 结尾、封装的 js 类文件 等

  - 普通（文件或文件夹） 统一使用 横线命名法，例如：product-detail
      例如：.sass、.js、.html 等 结尾

  - 常量数据统一使用全大写，多个单词使用 _ 分割，例如：PRODUCT_DETAIL

  - 普通数据统一使用小驼峰，例如：productDetail

  - css 类名统一使用横线，例如：product-detail

  - 全局组件统一使用 g-组件名，例如：g-product-detail

  - 全局样式统一使用 g-类名，例如：g-color

- 数据类型定义

  - 常量数据（数据一经定义永不改变）类型 或 引用类型（json、array、date等）如果确定不会发生替换操作，统一使用 const 声明，例如：
    ```
    const json = {}
    const TOTAL_COUNT = 100
    const DOMAIN = 'https://www.baidu.com'
    ```

  - 统一使用 函数直接量 方式创建函数，例如:
    ```
    const foo = () => {} 或 const bar = { foo() {} }
    ```
- 文件存储位置

  - 公共组件统一存放在 src/components 目录中，组件命名为大驼峰，例如：User.vue

  - 公共 JS 组件统一存放在 src/mixins 目录中，组件命名为大驼峰，例如：User.vue
      注意：在导入 mixins 内部组件时，要在导入的组件名前加 Mixins_ 前缀，避免导入组件名冲突
        例如：import Mixins_User from '@/mixins/User.vue'

  - 页面组件统一存放在 src/views 目录中，每个页面以文件夹的方式命名，Index.vue 为该页面的入口

  - 图片资源文件统一存放在 src/assets/images 目录中，公共图片存放在根文件夹中

    注意：图片资源文件分类文件夹命名应同 src/views 目录中的 页面目录名一致，存放对应页面的图片

  - 公共样式文件统一存放在 src/assets/sass 目录中

  - 所有的过滤器函数统一存放在 src/filter 目录中，index.js 为该目录的入口

  - 所有的公共工具函数统一存放在 src/util 目录中，index.js 为该目录的入口

  - 错误处理 统一存放在 src/error 目录中，便于管理、维护、扩展

  - axios 请求响应拦截器统一存放在 src/http 目录中，index.js 为该目录的入口，
    拦截器会拦截错误的信息，以弹窗的形式显示错误信息，未知的错误会在接口错误配置文件中统一处理，
    只有当响应码正确时才返回响应数据给接口，接口只需要处理响应正确的数据即可，例如：
    ```
    API_USER.login()
      .then(data => {})
    ```

  - API 统一存放在 src/api 目录中

    注意：api 文件分类文件夹命名应同 src/views 目录中的 页面目录名一致，存放对应页面的 api

    在 api 文件中封装方便调用的 Promise，包含方法，接口名，外部调用接口函数时只需传递数据即可

  - 所有在 main.js 中要引入的文件或其它处理,统一存放在 src/register 目录中，以单一文件的方式分类处理，index.js 为该页面的入口

  - 所有的路由配置统一存放在 src/router 目录中，父路由已文件夹 + index.js 的方式定义，子路由存放在父路由下，

    注意：router 文件分类命名应同 src/views 目录中的 页面目录名一致，存放对应页面的 router

    例如:
    ```
    父路由：my 文件夹
      index.js 父路由入口目录
      info.js 子路由存放位置
    ```

  - 公共配置文件统一封装在 src/config 目录下的文件中，index.js 为该页面的入口

    注意：加上注释，严禁出现无法读取的配置（数字、字符串等描述性信息）

- z-index 使用约定

  - 底部轮播图 -100~0
  - 基本 0~100
  - 内容层 100~200
  - 头部、导航 200~300
  - 蒙版 300~400
  - 悬浮窗 500~600
  - 悬浮窗按钮 600~700

- 注意事项
  - 在进行条件判断时，使用全等(===)进行判断
  - 严禁出现 !user 这种判断，必须要判断到对应的数据类型，例如：user !== null
  - 尽量使用 continue, break, return 减少 if else 嵌套
  - 条件判断比较多时，使用 json 来添加 映射关系，使代码设计更清晰可读
  - 组件设计保持单一性，把使用组件的使用交给外部控制，减少组件内部逻辑，组件根元素类名前缀为：c-
  - 路由 path 使用小写单词，多个单词之间使用 - 分割
  - 每个路由配置项都要写 meta 元数据项，例如：
    ```
    {
      path: '/xxx',
      name: 'xxx',
      meta: {
        // 页签标题（必填）
        title: 'xxx',
        // 是否需要登录授权
        loginAuth: true
      }
    }
    ```
  - 除了要实时监听数据的变化，不要在模板层（template）写逻辑，保留单一性，模板只做渲染，逻辑放在 js 处理
  - 全局样式在 App.vue 中引入
  - 组件 name 属性 不能为保留字，因为 vue 内部会把 name 属性当前页面 id，例如：
    ```
    export default {
      // 控制台会报警告提示，[Vue warn]: Do not use built-in or reserved HTML elements as component id:
      name: 'form'
    }
    ```
