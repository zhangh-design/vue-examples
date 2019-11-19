# Vue中 几个常用的命名规范

##### 1. 组件名
官方推荐的组件名是 每个单词首字母大写（PascalCase） 或者 全小写用 - 连接（kebab-case） 。 在DOM中使用的时候， 改为全小写， 单词之间用 - 连接。

```
Vue.component('MyComponent', {});    
或者
Vue.component('my-component', {});

import MyComponent from 'MyComponent.vue';
export default {
    name: 'MyComponent'
}

在DOM中使用的时候:
<my-component></my-component>
```

##### 2. props
声明 prop的时候， 使用驼峰命名（myProps）， 模板中使用的时候， 用 - 连接（my-props）

```
props: {
    myProps: {}
}

<my-component :my-props="abc"></my-component>
```

##### 3. 自定义事件名
因为html对大小写不敏感，所以大写的都会被转为小写的。 所以推荐 都用 `-` 连接来命名。

```
this.$emit（'my-event'）;

<my-component @my-event="abc"></my-component>
```




