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

![image](http://i1.fuimg.com/717460/c71f473f4f59d930.jpg)

现在点击第一个按钮你会发现没有任何的响应：

```
<template>
  <div>
	  {{name}} <!--仍然可以在视图上输出这个值-->
    <button @click="handleNameChange">change this.name</button>
  </div>
</template>
<script>
  let name = 'world';
  export default {
    data () {
			// 建议：如果你的值不想被 Vue 初始化成响应式的，就定义在 return {} 的外面，然后通过 props 在传入到子组件中。
      this.name = name;
      return {}
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

我们这里还有这样一个按钮`changedata.b`我们现在点击这个按钮我们发现控制台输出`data.b发生了变化，但是并没有触发组件更新 vue1575473185843`，我们看下代码是怎么写的事件`handleBChange`我点击这个按钮的时候触发这个方法在这个方法内我改变了`this.b`而这个`b`是在`data`里面的但是它并没有触发我组件的一个更新，这是为什么呢？这是因为模板中并没有用到，它并没有用到这个`b`所以说这个`b`并没有被当更改的时候并不会去通知组件去更新。


好让我们来看一下，`Vue`是如何做响应式更新的，它如何把我们的数据哪些数据来做依赖收集哪些数据不需要，那这时候我们`Vue`在实例化的时候会对`data`下面的数据做一些`getter`和`setter`的转换所谓的转化我们可以说的直白一点其实就是我们对这个数据做了一个中间的代理层不管你是取数据也好还是设置数据重新赋值也好它都会经过我们这个代理层然后再去执行它相应的操作我们在这代理层中可以做任何的这个事情这就是实例化对我们的数据做了这样的一个转化，那我们的组件在渲染的时候也就是说在`render`的时候我们会需要一些`data`里的数据它对于我们需要的数据如果这个数据我用到了就会把这个数据放到这个`Watcher`里面，如果没有用到它就不会进入到这个`Watcher`里面，那也就是说刚才我们看到的如果你用到了它才会我们下次更新数据的时候我们就是说我们的`setter`更新的时候它才会去通知这个`Watcher`然后它才会去更新，那如果说你更新了一个你没有`Watcher`的在`render`里没有用到的数据你改变它的时候它并不会去通知这个`Watcher`也就是说并不会去触发我们组建的一个更新这就是为什么属性还有数据改变了而组件没有触发更新的一个原因。

![image](http://i1.fuimg.com/717460/62ef736e4d0a6a17.jpg)







