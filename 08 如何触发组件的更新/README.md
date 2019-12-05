## 如何触发主键的更新

> 前言 

这节课我们来聊一聊`Vue`是如何触发主键更新的我们知道`Vue`是数据驱动的一个视图框架，所谓数据驱动其实就是我们的`DOM`是通过数据来映射的我们只有在数据改变的时候我们的视图才会改变，这个概念在前面或多或少已经提到过了在这里我在啰嗦一遍后面可能还会时不时的去提起这一个概念因为它太重要了可以说它是`Vue`的一个核心思想没有特殊情况我们不要去操作`DOM`可能你认为的特殊情况或许只是你认为的特殊情况遇到这种情况我们静下来在想想是不是特殊情况。

那我们所谓的数据其实是有3个部分：
1. 来自父元素的属性 `prop`
2. 来自组件自身的状态 `data`
3. 来自状态管理器 如：`vuex`、`Vue.observable`

在这里我们主要讲解下前面两个部分一个是属性还有一个是状态，后面的状态管理器部分后面我们会有专门的章节来去讲解。

那状态和属性它们两之间有什么区别和有什么相同点：
状态 data vs 属性 props
1. 状态是组件自身的数据
2. 属性是来自父组件的数据
3. 状态的改变未必会触发更新
4. 属性的改变未必会触发更新

它是什么时候更新什么时候不更新的呢？如何决定的呢？我们通过一个Demo来看一下：
这是一个Demo然后我在页面上有三个按钮一个是`change this.name` 一个是 `change this.info` 一个是`change this.list`。

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/08%20%E5%A6%82%E4%BD%95%E8%A7%A6%E5%8F%91%E7%BB%84%E4%BB%B6%E7%9A%84%E6%9B%B4%E6%96%B0/3.jpg)

现在点击第一个按钮你会发现没有任何的响应：

```
<template>
  <div>
    <button @click="handleNameChange">change this.name</button>
  </div>
</template>
<script>
  let name = 'world';
  export default {
    data () {
      this.name = name;
      return {
          
      }
    },
    methods: {
        handleNameChange () {
            this.name = 'vue' + Date.now();
            console.log('this.name 发生了变化，但是并没有触发子组件更新', this.name);
        }
    }
  }
</script>
```
在控制台我们看到控制台这里我打出了一个`log` `this.name 发生了变化，但是并没有触发子组件更新 vue1575458242737`。

我同时在去点击第二个按钮：

```
<template>
  <div>
   <button @click="handleInfoChange">change this.info</button>
  </div>
</template>
<script>
  export default {
    data () {
        return {
            info: {}
        }
    },
    methods: {
        handleInfoChange () {
          this.info.number = 1;
          console.log('this.info 发生了变化，但是并没有触发子组件更新', this.info);
        }
    }
  }
</script>
```
同样在控制台我们看到控制台这里我打出了一个`log` `this.info 发生了变化，但是并没有触发子组件更新 {number: 1, __ob__: Observer}`。

上面两个示例都没有触发视图的更新，我们看一下代码是怎么写的：
我们`change this.name`的按钮事件是`handleNameChange`我们在这里改变了`this.name`这个`name`我们是申明在了`data(){this.name=name;}`里面，在看这个`info`是怎么写的，`info`这里我们是直接改变了`this.info.number=1`这个`info`是在`data(){return {info: {}}}`里面的一个字段它是一个空对象但我改变的时候只是改变了`number`这时候这两种情况它是并不会触发我们组件的一个更新的，那为什么呢？第一个是因为我们的`name`并没有做响应式，第二个`this.info.number`这个响应式只是存在在了`info`上面我们`info`下面的在进一步的一个数据字段是没有去做的，我们如何去把它变成是响应式的呢？很简单可以直接把`name`把它放到我们的`return {name: name}`里面，那`info`的话我们只需要把我们的`number`提前声明然后我们`data`实例化的时候就会对`name`和`info.numner`下面的这些字段进行响应式的一个设置。

修改后的示例：
```
data(){
    return {
        name: name,
        info: {
            number: undefined
        }
    }
}
```
那这时候我们再看我们的demo，我点击 `change this.name`我们屏幕上面这个`name`已经做了一些变化对的每次点击都会进行响应式的变化，点击`change this.info`的时候也是同样。

还有第三个按钮是改变我们的`list`你会看到它每次都会去改变，而这个`list`我们直接是`push`了而正常情况下我们的`list`是一个数组嘛你push并不会改变原数组的这时候它是怎么去做更新的呢这一块我们留给大家去思考。

```
<template>
    <div>
        <button @click="handleListChange">change this.list</button>
        <p>props.list: {{ list }}</p>
    </div>
</template>
<script>
    data(){
        return {
            list: []
        }
    },
    methods: {
        handleListChange () {
          this.list.push(1, 2, 3)
          console.log('this.list 并没有发生变化，但是触发了子组件更新', this.list)
        }
    }
</script>
```

我们这里还有这样一个按钮`changedata.b`我们现在点击这个按钮我们发现控制台输出`data.b发生了变化，但是并没有触发组件更新 vue1575473185843`，我们看下代码是怎么写的事件`handleBChange`我点击这个按钮的时候触发这个方法在这个方法内我改变了`this.b`而这个`b`是在`data`里面的但是它并没有出发我组件的一个更新







