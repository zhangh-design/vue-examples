## 提升开发效率和体验的常用工具：ESLint、Prettier、vue-devtools

> 前言：那这节课我们开始来讲一下我们`Vue`开发中经常使用到的一些开发工具用于提升我们的开发效率，那主要的话是四个。

1. Vetur
2. ESLint
3. Prettier
4. Vue DevTools

#### 1. Vetur

我们先来看第一个`Vetur`，它是`VSCode`的一个插件主要是提供了我们:

- 语法高亮
- 标签补全、模板生成（快速生成我们的单文件模板）
- Lint 检查
- 格式化

这里我只列举了一部分，它还有很多一个强大的功能大家自己去探索一下，包括现在我们的一个`VSCode`的插件都是建立在`Vetur`的这个基础上的。

这里我们体验一下你可以随便在你的这样安装好我们的一个插件之后这个插件我们可以通过我们`VSCode`的这样的一个应用商店你可以自己去搜索之后然后你去安装。


![image](http://i2.tiimg.com/717460/964f285f27c54dba.jpg)

我这边的一个配置可以给大家看一下 settings.json ：

那我这边的`Vetur`主要是做了一个`ESlint`的配置，然后包括我这里是把`template`模板的这个校验给关掉了是因为它可能会和我的本地的这个`ESLint`怕会有冲突，所以说我把这个模板校验给关掉了。

```
{
    ......
    "editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	},
    "vetur.validation.template": false
}
```

#### 2. ESlint

- 代码规范
- 错误检查

那第二个是我们的`ESLint`，那这个主要是我们用来做我们一个代码规范的检查和我们的一个错误检查，那它可以帮助我们及时发现我们不合规范的一个代码以及我们错误的一个代码，那使用方式也很简单我们安装我们`ESlint`的相关包之后啊添加我们的一个配置文件就可以了不需要我们做过多的一个事情。

我们打开我们的代码看一下`package.json`，我们这里和`ESLint`相关的然后就是下面的这些包，那如果说你是使用的我们的`Cli脚手架`去创建的自定义创建的然后你都可以去勾选我们的这个`ESLint`的一个规则，如果说你是使用我们的`Cli`去创建的那在`ESLint`的一个规则这些包啊应该已经是默认安装好了的。

```
"devDependencies": {
    "babel-eslint": "^10.0.3",
    "eslint": "^6.7.2",
    "eslint-config-standard": "^14.1.0",
    "eslint-plugin-html": "^6.0.0",
    "eslint-plugin-import": "^2.19.1",
    "eslint-plugin-node": "^10.0.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.1"
}
```

那如果说我们要去对我们的这个`ESLint`规则做一个自定义的一个配置啊我们可以在单独的这个文件里面`.eslintrc.js`去选择去配置，看到这里我有一个`extends`Vue啊给我们提供了多种这样的一个规格的校验方式你可以根据你项目的需要自行选择，这里是最必要的应该算是一个最低级别的一个配置吧。

.eslintrc.js
```
module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': ['plugin:vue/essential','@vue/standard'],
    // 强链规格
    // 'extends': ['plugin:vue/strongly-recommended','@vue/standard'],
    rules: {
        'generator-star-spacing': 'off',
    	'semi': "off",
    	'no-debugger': "off",
    	'quotes': ["error", "single"],
    	'object-curly-spacing': ["error", "always"],
    	"indent": ["error", 2]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    overrides: [
        {
          files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/unit/**/*.spec.{j,t}s?(x)'
          ],
          env: {
            jest: true
          }
        }
    ],
    "globals": {
        "$ns": true,
        "fastUI": true
    }
}
```

我们可以在我们这个刚才新建的`Hello.vue`里面去写一个属性`message`，但是我们前面啊基础篇的时候有讲过我们在声明我们属性的时候尽量给它一个类型，那这时候我想强制开启那我们可以通过这样一个强链推荐的这样的一个规格你在返回`Hello.vue`页面你会看到这里就会给我们有一个黄色的提示‘我们的message没有定义类型，你至少要给它定义一个类型’。

Hello.vue

```
<template>
  <div></div>
</template>
<script>
  export default {
    props: ['message']
    props: {
      message: {
          type: String,
          default: ''
      }
    }
  }
</script>
```

强链推荐:

.eslintrc.js
```
// 强链规格 strongly-recommended
'extends': ['plugin:vue/strongly-recommended','@vue/standard'],
```

![image](http://i2.tiimg.com/717460/4b202c408322dea1.jpg)


那我还是建议大家在开发中啊使用这样的一个 强链 推荐的一个方式，虽然说你写代码的时候可能会多写几行代码但是对你后期的维护啊是非常有利的。

#### 3. Prettier

- 格式化

那接下来我们看我们另外一个`Prettier`，那`Prettier`的话它主要是做我们的一个代码格式化它的功能和`Eslint`有一些部分的重贴但它们的一个专注点不太一样，`ESLint`主要专注于代码的一个校验那`Prettier`的话更加专注于我们代码的一个格式美化，但它们两个在一起使用的时候啊你需要做一些配置防止它们的一个格式的一个冲突
，那这也是我们刚才在我们`ESLint`的配置文件`.eslintrc.js`里面看到我们这个`extends`里面还有一个`@vue/prettier`的配置那这个就是为了防止我们这样的一个格式的冲突吧，我们还是回到我们的这个组件，你会发现我们现在都是使用的双引号，有些人啊他喜欢使用单引号这样的一个规则，那我们可以在我们的`.prettierrc.js`这个配置文件里面去更改。


.prettierrc.js

```
module.exports = {
	"singleQuote": true, // 单引号
	"semi": false,
	"trailingComma": "none" //对象结尾不添加逗号
}
```

可能有些同学看到的这个`.prettierrc.js`配置啊不在单独的一个文件里面可能是在这个`package.json`里面去配置的那这个都是可选的这个后面我们讲实战环节的时候会讲到我们这样通过单文件的一个配置的一个形式。


#### 4. vue-devtools

- 集成 Vuex
- 可远程调试
- 性能分析

那最后一个的话就是我们的`vue-devtools`，那`vue-devtools`它这个是我们的`Vue`官方提供给我们的一个`Vue调试工具`，最近也是刚刚发布了新版本它的功能也是丰富了很多建议更新到我们的一个最新版。

它主要是可以给我们提供了集成了我们的`Vuex`的一个调试功能还有我们的一个远程调试包括我们的性能分析，那性能分析的话是我们最近刚刚发布的一个新版本然后提供的，这个`vue-devtools`啊它本身是`Chrome`的一个插件
应该也不止`Chrome`。

![image](http://i2.tiimg.com/717460/b8dcef56aef011c2.jpg)


好那这节课我们的工具就先简单的介绍到这，那后续的话还希望大家把这个整个的工具链啊去体验一番包括我现在介绍的可能还只是有限的几个，我个人常用的也是社区比较推荐的，那个还有很多有意思的小工具大家可以自己去探索。
