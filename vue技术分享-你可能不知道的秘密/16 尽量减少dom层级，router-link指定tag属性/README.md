## 尽量减少dom层级，router-link指定tag属性

尽量减少dom层级，比如我们在模板里写路由跳转时，虽说`router-link`默认为我们设置了一个`a`标签，但是在实际场景可能不太实用，我们不访使用`tag`这一属性。


```
<template>
  <router-link to="/mine" tag="li">
    <i class="icon-nav icon-nav5"></i><span>我的</span>
  </router-link>
</template>
```

渲染结果：


```
<li>
  <i class="icon-nav icon-nav5"></i>
  <span>我的</span>
</li>
```
