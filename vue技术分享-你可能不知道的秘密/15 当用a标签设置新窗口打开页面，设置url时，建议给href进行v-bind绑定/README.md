## 当用a标签设置新窗口打开页面，设置url时，建议给href进行v-bind绑定

当用`a`标签设置新窗口打开页面，设置`url`时建议给`href`进行`v-bind`绑定，然后写相对路径即可，它默认会继续走`router-link`相对路由那一套，没必要在调用`location`的`api`获取`hostname`，然后拼接字符串。


```
<template>
  <div id="consoleEntry" class="consoleEntry">
    <a :href="url" target="_blanl">工作台</a>
    <router-link :to="{path: '/platform'}"><span>工作台</span></router-link>
  </div>
</template>
export default {
    name: 'consoleEntry',
    data(){
        return {
            url: '/#/platform/myWork'
        }
    }
}
```
