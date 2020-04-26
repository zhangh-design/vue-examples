## 理解单文件组件

> 前言：我们这节课来学习 Vue 的单文件组件，那前面几个章节呢我们一直使用的 `Vue.component` 来去注册组件但是它有一些缺点那官方文档中也给我们列出了这4个大的缺点：

4个大的缺点：
1. **全局定义** - 也就是说我们的 `Vue.component` 的第一个参数我们组件的名称必须是全局唯一的当你的系统足够庞大的时候对于我们的起名会非常的困难。
2. **字符串模板** - 缺乏语法高亮我们现在使用的这个 `template` 这个语法是缺乏语法高亮的而且我们现在使用的是这种反引号 ` `` `，  这个反引号实际上是只有在 `ES6` 里面才开始新增的功能对于一些低版本的浏览器还是不支持的。
3. **不支持 `CSS` 的模块化和组件化** - 我们现在还没有用到 `CSS` 等下我们去把我们的这个组件改造成单文件之后我们会看到我们还要使用 `CSS` 的模块化这一个功能那现在的话我们要写`CSS`的话还是传统的在`<head><style>...</style></head>`这种方式。
4. **没有构建步骤** - 也就是说我们现在只能使用我们的这些如果说你的项目需要支持低版本的浏览器那你就必须使用这些低版本的语法那如果说你想使用 `ES6` 或者最新版本的语法那你就必须使用一些构建的步骤来帮助去处理把它编译成我们的 `ES5` 来去处理我们浏览器的兼容性问题。

那 `ES6` 的话我建议大家现在是可以去学习一下，因为我们后面的课程会很多使用到 `ES6` 的相关知识 那这里推荐一下 `阮一峰老师` 的 [`ES6入门`](http://es6.ruanyifeng.com/#README)

所以说针对这4个大的缺点`Vue`给我们提供了一种方式就是使用 `.vue` 的这样一个文件来去开发我们的组件然后使用我们的这些构件工具例如我们的 `webpack` 来去帮助我们去处理我们用 `.vue` 文件去声明的组件但通过这种方式的话我们就不能够在简单的引入一个 `vue.js` 来进行开发的了，然后我们需要一系列的工具来去配套好在 `Vue` 给我们提供了脚手架帮我们简化了这个脚手架的搭建的这个过程。

那我们现在通过 [Vue Cli](https://cli.vuejs.org/) 的官网我们现在的话需要我们的一个 `Node.js` 的安装那 `Node.js` 的话建议大家使用最新版本吧官方要求的话是需要 `8.9` 推荐的是 `8.11.0+` 安装完 `Node.js` 之后我们会有一个 `npm` 的命令 那`npm`会随着 `Node.js`然后一起安装我们通过这样的一个命令行`npm install -g @vue/cli` 打开我们的 
命令行终端然后直接输入我们这个命令然后回车键会帮助我们全局安装我们的 `vue/cli`。

安装完成之后可以用这个命令来检查其版本是否正确：
`vue --version`

安装完成之后我们就可以通过 `vue/cli` 提供给我们的一个命令来去创建我们的一个最基础的工程。

```
vue create hello-world
```

我们的环境一旦安装完成之后后续基本上不会有大的改动了，那现在我们安装完成之后 `vue-demo` 的一个目录基本上是这样的一个形式：

![image](http://i2.tiimg.com/717460/4ad7e1a7756900d8.png)

```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }
```
我们现在可以通过 `npm run serve` 去启动这样的一个服务，那接下来我们把 `todo-list` 然后改成单文件组件的形式。

那 `main.js` 的话是我们的一个入口文件那这里的话和我们 `CDN` 的这种方式写的 new 这个实例的时候我们用的是 `el` 这种形式和它这里用的是这种 链式 的形式除了写法不一样外本质上是一样的这个我们不用在意。

```
new Vue({
  render: h => h(App),
}).$mount('#app')

var vm = new Vue({
	el: '#app',
	data: {
		message: 'hello world'
	}
})

```
那接下来就是我们的这个 `App` 组件接下来我们就是直接改我们的 `APP` 里面的东西，那 `APP.vue` 实际上就是第一个单文件组件了它就是一个单个的文件这个文件就是我们的组件。

那我们把之前在HTML中写的 Vue实例中的 data 和 methods 放到 App.vue 中。
这里有一个区别是原来我们的 data 只是一个对象但现在变成了一个方法返回一个对象那这也是我们之前讲到的因为 `App.vue` 已经不是我们的根实例了那根实例是在我们的 main.js 的new Vue里面，那这个`App.vue`有可能会被复用所以必须使用方法的形式来去返回它。

分别建立我们的 `todo-item`、`todo-list` 的单文件组件，
那我们在App.vue中去引入我们的 `TodoList.vue`和`TodoItem.vue`组件，那同样我们现在也需要去注册那注册的方式的话不再需要`Vue.component(name, {})`的形式注册了而是我们直接在这个`export default`的对象里面有一个`components`的 key 在这里去注册我们的 `TodoLitem`和`TodoItem`这个时候这个`TodoLitem`和`TodoItem`它就不是全局的了而是只在当前的 `App.vue`这个作用域里面可以使用。

```
import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue'

export default {
    components: {
        TodoList,
        TodoItem
    }
   data(){
       return {
           //...
       }
   } 
}

```
运行后看网页那我们现在看到我们的代码就已经和我们原来使用`CDN`方式创建的效果是一样了：
![image](http://i2.tiimg.com/717460/b740a2605fe8077c.png)

每次改动代码也不用刷新浏览器了这也是我们`Cli`提供给我们的功能，我们现在的这些组建都是局部作用域的它们只在当前的`App.vue`中生效那如果你还是想把这个`TodoItem`做为是全局的那也没关系你依然可以使用我们的全局注册`Vue.component(name, {})`也可以的，我们在`main.js`中把`TodoList`组建给`import`进来我们依然可以全局注册我们的组件

```
import TodoList from './components/TodoList.vue'

Vue.component('todo-list', TodoList)
```

我们前面还提到了我们`Css`的一个组件化问题，那组件化的话可以给我们的当前的组建写样式它并不会污染我们其它的组件，需要加一个 `scoped`


```
<style scoped>
.red{
    color: red;
}
</style>
```
我们可以看到这个`class`是`red`但是这个生成的样式它后面还带了`data-v-hash`值也就是我们通过 `scope` 来写的样式它会帮助我们生成一个`hash`它只会对当前的这个组件生效而不会去污染我们其它的样式。

![image](http://i2.tiimg.com/717460/bb0b96e54194e308.png)

### 结语
那这就是我们的单文件组件相较于我们通过 `CDN`的方式引入直接在HTML里面去书写组件它的确是给我们带来了很大的一个便利程度除了我们在搭建开发环境的时候所花费一点时间之外其它的给我们带来的便利程度绝对是超值的所以说推荐大家在真实的项目中还去使用我们的单文件组件去进行真实的项目开发。

