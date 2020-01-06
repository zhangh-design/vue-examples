## Vue Router的使用场景

> 前言：这节课我们来讲一下我们`Vue Router`的使用场景和使用方式，那么我们为什么需要我们的`Router`，以前我们开发系统的时候好像也没需要过这个东西有的时候我们可能并不需要`Router`也不是说所有的场景都适合使用这个`Router`但不可否认我们现在大多数的一个系统开发都在使用它尤其是我们的一个中后台的管理系统，那主要解决了一个什么问题呢？

以前我们不用我们的`Router`的时候我们系统的一个运作流程大概是这样子的，我们的每个`url`都对应着一个 html 文件或者是其它的 jsp 文件每次访问的时候我们切换我们的 `url` 都需要我们页面的一个重新加载这样非常影响我们用户的一个体验，然后就诞生了我们单页面的一个形式就是我们所谓的一个`SPA`，那现在我们不管访问什么`url`都不再是定位到不同的一个 html 文件了它现在全部都定位到了一个相同的 index.html 文件，其实这样说也不是特别的严谨你依然可以定位到不同的文件但是已经没有这样做的必要了，我们现在只需要一个 index.html 就可以满足我们的一个需求了，用户在页面上切换 url 的时候不在是从新加载我们的页面而是根据我们 url 的变化然后执行我们的一个相应的逻辑数据啊都是通过接口的一个形式返回给我们，那`Vue Router`就是为了解决这样的一件事情就是为了监听我们的一个 url 的变化然后在变化的一个前后执行我们的一个相应的逻辑那不同的 url 呢会对应我们不同的组件并且提供了一个多种方式改变 url 的api。


#### 传统开发模式：

- `www.xxx.com`  ———— index.html
- `www.xxx.com/about` ———— about.html
- `www.xxx.com/xxx` ———— xxx.html

#### 解决的问题：

- 监听 URL 的变化，并在变化前后执行相应的逻辑
- 不同的 URL 对应不同的组件
- 提供多种方式改变 URL 的API（URL的改变不能导致浏览器的刷新）

那接着我们就看一下它的使用方式：

#### 使用方式
- 提供一个路由配置表，不同 URL 对应不同组件的配置
- 初始化路由实例 new VueRouter()
- 挂载到 Vue 实例上
- 提供一个路由占位，用来挂载 URL 匹配到的组件

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/S1G4*2hi*D5aPIJug2nMa2wwsMRr4CYIbvSwT4gjc.WbiIs3*tzKPpFfjeG96TwnbbZJsiIVUdTF5Ke8SLyvtfKyyNU8CKn.Tuy9rezrcZw!/b&bo=TQMDAQAAAAARB3w!&rf=viewer_4&t=5)

那我们通过这样的一个 demo 来去看一下刚才说的那四个步骤，那我们打开我们的 demo 如果说你本地是使用我们的 CLI 重新创建的一个默认配置的工程的话它是没有安装我们的 `Vue Router` 的那你需要自己重新 `cnpm i vue-router --S`。

我这个项目的话是已经安装好了的，我们的`main.js`是我们的入口我们第一步就是引入我们的`vue-router` ，引入完成之后我们可以配置我们的一个路由列表那我们的路由列表是在一个单文件里面因为我们的路由可能非常的大，我们配置完路由列表之后我们需要我们像`vuex`一样也需要`vue.use(VueRouter)`它是在里面也可以访问到我们的`Vue`而且是帮我们去注册我们里面的一个全局组件`<router-link/>`和`<router-view/>`，接下来就是我们使用我们的一个初始化`VueRouter`的实例，初始化完`VueRouter`实例以后我们同样也像`vuex`一样把它注册到我们的`vue`实例上面然后我们可以在我们各自的组件上面都可以访问到我们的`this.$router`了。

main.js

```
import VueRouter from 'vue-router'

const router = new VueRouter({
  mode: 'history',
  routes
})
```

那接下来我们就看我们这个根组件的文件`APP.vue`，那`APP.vue`你会发现我这里有一个`router-view`这样的一个组件，这个组件是我们`Vue Router`提供给我们的一个全局组件，那它是用来做什么用的呢那这时候就回到我们的一个路由配置列表了`routes.js`。

APP.vue

```
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
      
  }
</script>
```
我们的路由配置列表`routes.js`你会发现我们`import`进来了两个组件第一个就是我们的`RouterDemo`第二个就是我们的`RouterChildrenDemo`，我们这里的路由配置列表只是配置了两级，那第一个是我们的路径`path`的一个路径当匹配到这个`/foo`的时候我们去渲染我们的这个`RouterDemo`，那这个`RouterDemo`渲染到哪个地方呢那就是我们刚才看到的`APP.vue`里面的这个`<router-view></router-view>`这个地方这个`<router-view></router-view>`写在什么地方它这个组件就匹配到什么地方。

routes.js

```
import RouterDemo from './components/router/RouterDemo.vue'
import RouterChildrenDemo from './components/router/RouterChildrenDemo.vue'
import notFoundView from './components/router/404.vue'

const routes = [
  { path: '/foo', component: RouterDemo, name: '1' },
  { path: '/bar', component: RouterDemo, name: '2' },
  // 当 /user/:id 匹配成功，
  // RouterDemo 会被渲染在 App 的 <router-view /> 中
  { path: '/user/:id',
    component: RouterDemo,
    name: '3',
    props: true,
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // RouterChildrenDemo 会被渲染在 RouterDemo 的 <router-view/> 中
        path: 'profile',
        component: RouterChildrenDemo,
        name: '3-1'
      },
      {
        // 当 /user/:id/posts 匹配成功
        // RouterChildrenDemo 会被渲染在 RouterDemo 的 <router-view/> 中
        path: 'posts',
        component: RouterChildrenDemo
      }
    ]
  },
  { path: '/a', redirect: '/bar' },
  //{ path: '/', component: RouterDemo, name: '404' },
  { path: '*', component: RouterDemo, name: '404' }
  // { path: '*', component: notFoundView, name: '404' }
]

export default routes

```

我们看一下我们的`RouterDemo.vue`，那我们的`RouterDemo.vue`里面提供了你会看到我这里写了好几个`router-link`，那`router-link`呢它也是我们的`Vue Router`提供给我们的一个全局组件它是用来做我们的路由跳转的它的底层也就是一个`a`链接你可以这样认为，除了我们的`router-link`来可以作为我们的一个路由跳转，`vue-router`它也给我们提供了一个 api 的方式做路由跳转，那我们这里有这样一个`button`我们点击的时候会直接`push`一个也就是把我们路由改变成了我们的`/foo`。

RouterDemo.vue

```
<template>
  <div>
    <router-link to="/foo">Go to Foo</router-link>
    <br/>
    <router-link to="/user/12">Go to /user/12</router-link>
    <br/>
    <router-link to="/user/12/profile">Go to /user/12/profile</router-link>
    <br/>
    <router-link to="/other">Go to 404</router-link>
    <br/>
    <router-link to="/a">Go to a 重定向到 bar</router-link>
    <br/>
    <a href="#/foo">Go to Foo</a>
    <br/>
    <button @click="$router.push('foo')">Go to Foo</button>
    <p>id: {{id}}</p>
    <p>{{routerInfo}}</p>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    routerInfo () {
      const { fullPath, path, name, params, query, meta } = this.$route
      return {
        fullPath, path, name, params, query, meta
      }
    }
  }
}
</script>

```


这时候我们打开我们的浏览器，会看到我们的这个demo上面会有几个链接，我每次点击的时候我们会看到上面的 url 是变化了的，这下面我的一个输出的一个信息也是变化的这里面的信息呢就是我们的`this.$router`提供给我们的一些比较重要的信息那我们业务开发中可能会根据这里面的信息做一些我们业务逻辑的判断，还是回到我们的这个配置列表我们刚才只讲了最简单的一个配置的情况那下面我们还有一个嵌套的配置情况我们这里的一个`path`它这里还有一个动态的 id （`path: '/user/:id'`）那这个 id 的话它是一个动态的你可以 123或者456 都是没问题的，它这个也是我们的`components`也是依然是`RouterDemo`，`RouterDemo`会被渲染在我们的App 的 `<router-view />` 中然后我们这里有一个和上面不同的是还加上了一个`props`，`props`的意思是什么就是说我这里有一个动态的 id 我想要把这个动态的 id 作为属性传给我的`RouterDemo.vue`组件，那这时候我的`RouterDemo`组件可以申明一个属性 id （`props: ['id']`）那这时候这个 id 就是变成了一个属性我们就可以通过属性的方式去访问到它，那接下来是我们还有一个`children: []`就是我们的路由啊有一个层级的关系它下面我们现在是写了两个分别是我们的`profile`和`posts`，同样这里我们的`component`也是定义了是我们的`RouterChildrenDemo`这个组件，那我们的`RouterChildrenDemo`这个组件会被渲染在什么地方呢它会被渲染在我们的`RouterDemo`组件中的`<router-view/>`中，那我们的`RouterChildrenDemo.vue`组件是没有任何信息的只是说做了一个路由信息的输出。


RouterChildrenDemo.vue

```
<template>
  <div>
    {{routerInfo}}
  </div>
</template>
<script>
export default {
  computed: {
    routerInfo () {
      const { fullPath, path, name, params, query, meta } = this.$route
      return {
        fullPath, path, name, params, query, meta
      }
    }
  }
}
</script>

```


好我们接下来在看下面一个我们的路由配置，那这个的话是我们的一个路由重定向`redirect`，就是说当我们的路由匹配到`/a`的时候我们把它重定向到我们的`/bar`，然后在接下来是我们的一个 `*` 就是我们任意的一个配置如果说我们上面的都没有匹配到（一般情况下我们会把它匹配到我们的404页面）那这里的话我还是把它匹配到了`RouterDemo`组件上面给它起了一个`name`是`404`而已主要方便大家去理解去看一下它的一个匹配到我们的一个路由的输出信息。

那这时候大家就可以去点一下这几个链接了，看我们这几个链接到底点完之后我们的 url 会发生什么变化以及我们下面的一个输出的信息有什么变化会进一步加深我们的理解。


#### 结语
我们的`vue-router`的使用方式就介绍完了，我们前面只是讲了我们单页面`SPA`的一个优点那同样它也会有一些缺点那我们可以思考一下它都有哪些缺点，我们应该通过哪些方式去解决那这也是一些面试官喜欢问到的一些问题。
