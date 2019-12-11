## 指令的本质是什么

> 前言

这节课我们来聊一聊`Vue`的指令，如果你经常使用`template`语法的话我相信你会经常使用到指令，但如果你使用的是`render函数`或者是`JSX`的话那指令的话就不会显的那么的常用。

我们`Vue`提供给了我们内置的指令大概是有14种这样子，就是我们这里罗列的这14种那我们分别通过我们的一个demo然后去查看这14种到底是做了什么东西。

内置指令：
1. v-text
2. v-html
3. v-show
4. v-if
5. v-else
6. v-else-if
7. v-for
8. v-on
9. v-bind
10. v-model
11. v-slot
12. v-pre
13. v-cloak
14. v-once

这个是我们的内置指令这14种然后罗列出来的我们看一下我们的代码：

![image](https://github.com/zhangh-design/vue-examples/raw/master/11%20%E6%8C%87%E4%BB%A4%E7%9A%84%E6%9C%AC%E8%B4%A8%E6%98%AF%E4%BB%80%E4%B9%88/1.jpg)

第一个就是`v-text`我们这里写了一个`hello vue`，但是我们下面包了一个子元素`hello world`但最终我们的页面上显示的还是`hello vue`，这是因为我们的这个指令会把我们子元素下面的所有的内容给替换掉。


```
<template>
  <div>
    <h2>v-text</h2>
    <div v-text="'hello vue'">hello world</div>
  </div>
</template>
```

好第二个是`v-html`，那`v-html`的话它会是帮助我们正常情况下我们用`v-text`的话里面是字符串那如果我们想要插入一个标签或者是你看我们这里是插入了一个`span`它有一个颜色是`color: red`这时候我们会把里面的`hello world`也给替换掉最终会变成了我们这个`span`标签也是会被解析的但是我们开发过程中是不建议去使用这样一个`v-html`的指令的，因为它存在着很大的一个风险就是说会有我们`xss`前台的一个风险存在。


```
<template>
  <div>
    <h2>v-html</h2>
    <div v-html="'<span style=&quot;color: red&quot;>hello vue</span>'">
      hello world
    </div>
  </div>
</template>
```


好第三个的话是我们经常用的`v-show`就是我们是否显示这里我们写了一个变量`show`这里是默认是显示的，这里我们是有一个按钮同时切换这个`show`的状态`true`和`false`之间切换，好我们现在点击这个按钮发现我们这个元素不见了，但是我们打开我们的控制台会看到其实这个元素还是在的它只是被隐藏了，好我们现在在切换回来它这个`style`就会把`display: none`给删除掉。


```
<template>
  <h2>v-show</h2>
  <div v-show="show">hello vue</div>
  <button @click="show = !show">change show</button>
</template>

<script>
  export default {
    data(){
        return {
            show: true
        }
    }  
  }
</script>
```

按钮切换：
```
<!--隐藏-->
<div style="display: none;">hello vue</div>
<!--显示-->
<div style="">hello vue</div>
```

那接下来是我们的`v-if`还有`v-else-if`和`v-else`这三个指令，这三个指令它们之间是相互配合的后面两种指令是不能单独存在的必须是和`v-if`是一起使用的，`v-if`就相当于我们`js`语言里面的`if`、`if-else`、`else`这样的基本的一个语法，这里我们这个是如果`if="number === 1"`的时候我们输出`hello vue`后面一个`number`的数值，那如果`number === 2`的时候我们输出`hello world`和`number`的值，那如果即不等于1也不等于2我们就输出`hello geektime`，这样的一个逻辑它和`v-show`的一个基本的最直观的区别就是它也是控制一个元素在页面上是否能看见，但是我们的`v-show`是只是隐藏，但是`v-if`和`v-else`它是把组件直接删掉了。

==注意：使用`v-if`指令时设置为`false`时会销毁组件，会调用该组件的`destory`的生命周期。==

我们看一下我们直接`number++`按钮就会看到我们这里`hello world`和`hello geektime`然后在去切换。

```
<template>
  <h2>v-if v-esle-if v-else</h2>
  <div v-if="number === 1">hello vue {{ number }}</div>
  <div v-else-if="number === 2">hello world {{ number }}</div>
  <div v-else>hello geektime {{ number }}</div>
  <button v-on:click="number = number + 1">number++</button>
</template>
<script>
  data(){
      return {
        number: 1
      }
  }
</script>

```

在往后就是我们的`v-for`还有`v-bind`，`v-for`的话其实就是我们的`for`循环，`for`循环一个数组，`v-bind`的话我们在前面应该已经一直在使用，好我们前面看到我们经常在使用一个冒号然后跟着一个变量还有一个名称这是它的简写实际上我们的一个全称的话应该是`v-bind`但是`v-bind`我们是经常使用到的，使用频率特别高所以说`Vue`它给我们提供了一个简写的形式那就是直接一个冒号`:`就可以了它就是绑定后面的一个变量或者是表达式。


```
<template>
  <h2>v-for v-bind</h2>
  <div v-for="num in [1, 2, 3]" v-bind:key="num">hello vue {{ num }}</div>
</template>
<script>
export default {
  data: function () {
    return {}      
  }
}
</script>
```
在往后就是我们的事件，事件我们也是`v-on`来表示的但是我们前面很多章节你会看到的是`@`符号，好`@`符号也是我们`v-on`的一个简写因为这个也是我们使用频率非常的高，每次点击的时候就会执行这里面`number+1`的一个操作。


```
<temaplte>
  <h2>v-on</h2>
  <button v-on:click="number = number + 1">number++</button>
</template>
<script>
export default{
  data(){
    return {
        number: 1
    }  
  }
}
</script>
```

`v-model`的话呢前面有一个单独的章节`双向绑定和单向数据流不冲突`给大家也讲过了，它是一个做我们双向绑定语法糖的一个指令这个我们就不在叙述。


```
<template>
  <h2>v-model</h2>
  <input v-model="message" />
</template>
export default{
  data(){
    return {
      message: 'hello'
    }  
  }
}
```

`v-pre`这个指令的话我们平常开发中可能会很少用到它主要做的是因为我们这个`{{}}`双括号在`Vue`模板中是有特殊的意义的它会走里面一个编译的过程那如果我们加了这样一个指令的话它会绕过这样一个编译的过程直接输出这里面的字符串，你会看到页面上是直接输出了字符串。


```
<template>
  <h2>v-pre</h2>
  <div v-pre>{{ this will not be compiled }}</div>
</template>
```
输出：

```
v-pre
{{ this will not be compiled }}
```


那`v-once`的话这个我们在业务中也很少用到，它的作用就是说我们这里绑定的这个变量`number`只会执行一次后面我们`number`不管如何变化，`v-one`中的变量都不会在重新去渲染，这样的话对我们的性能优化是有帮助的但是我们的业务开发中很少用到这是因为如果对这个指令不熟悉的人他并不知道这个是要干什么他以为是要变化的，那如果说我们一般情况下会在我们大篇的文章这种像是论坛似的这个文章它是一个静态的可能后面我们不会去变化了可能会去做一些性能优化的事情。


```
<template>
  <h2>v-once</h2>
  <div v-once>
    {{ number }}
  </div>
</template>
```

那还有一个指令是`v-cloak`这个的话我没有在我们的demo中去写，因为我们这个使用频率是最低的而且我们现在使用的这种模式，我们单文件的模式它在单文件模式中是没有任何作用的在`html`里面直接写模板的时候才会需要用到这个我们就不在展开讲了。


其实指令没有什么神秘的地方它更多的也是只是语法糖，说直白一点它其实就是一个标志位就是说当我们的编译阶段从我们的`template`编译到`render函数`的时候会把我们的这些语法糖编译成我们的`js`的代码这也是为什么我们的`render函数`和`JSX`并不支持我们内置指令的一个原因，因为指令确实帮助我们简化了很多的代码量然后慢慢的我们的`JSX`也正在逐渐的在支持部分的一个指令毕竟`JSX`它也是语法糖它最终也会通过我们的一个编译然后输出我们真正的一个`render函数`。

除了我们刚才说的内置指令之外，然后`Vue`还给我们提供了一个我们可以自定义指令的一个功能，自定义指令的话它并不是一个刚性的一个需求，什么意思呢就是说自定义指令能完成的功能我们完全可以通过其它的方式去完成，举个例子，就是我们前面讲到的`v-show`它就是控制一个元素的显示与隐藏的那如果没有这个指令我们完全也可以通过一个属性传递一个show然后在组件的内部来去判断是否显示还是隐藏写一段逻辑这样也是完全可以达到的，但是这样就带来一个成本的问题这样我所有的组件可能就需要每一个都要提供这样一个属性然后每一个组件里面都要提供这样一个显示隐藏的逻辑判断，那这样的话是非常冗余的我们的代码会显的非常的多而且成本非常的高，所以说这就是指令它起到的一个最大的作用，就是这样子。

`Vue`给我们暴露了这5个钩子函数：
1. bind
2. inserted
3. update
4. componentUpdated
5. unbind

这五个钩子函数分别在它的不同的生命周期中会在去执行这样的一个钩子函数里面绑定的我们的一些方法，这就是所谓的我们的自定义指令，然后实际上它和生命周期是有一个很大的关系的。

![image](https://github.com/zhangh-design/vue-examples/raw/master/11%20%E6%8C%87%E4%BB%A4%E7%9A%84%E6%9C%AC%E8%B4%A8%E6%98%AF%E4%BB%80%E4%B9%88/2.jpg)


我们通过一个demo来看一下，这是我们的一个自定义指令它起到的一个作用就是我们看到我们刚才有一个`v-text`它是把我们里面的元素直接全部删除替换掉了，那我们这个指令要做的事情就是我不删除我直接插入，插入一个新的文本节点，我们使用的时候就是`v-append-text`然后等于`"`hello ${number}`"`然后它会插入到我们的这个按钮后面的一个数字，这五个生命周期然后我都在写了打了一定的日志大家可以看一下控制台的输出的情况，打开控制台我们看到先是执行了`bind`然后执行了`inserted`，然后我点击按钮看到执行了`update`和`componentUpdated`的一个回调它的一个周期，我现在点击销毁按钮销毁之后它就执行了`unbind`的一个生命周期，然后我在点击销毁按钮让另一个button按钮挂载，挂载之后又重新执行了`bind`和`inserted`这样的一个情况，这就是我们的自定义指令。




```
<template>
  <div>
    <button @click="show = !show">
      销毁
    </button>
    <button v-if="show" v-append-text="`hello ${number}`" @click="number++">
      按钮
    </button>
  </div>
</template>
<script>
export default {
  directives: {
    appendText: {
      bind () {
        console.log('bind')
      },
      inserted (el, binding) {
        el.appendChild(document.createTextNode(binding.value))
        console.log('inserted', el, binding)
      },
      update () {
        console.log('update')
      },
      componentUpdated (el, binding) {
        el.removeChild(el.childNodes[el.childNodes.length - 1])
        el.appendChild(document.createTextNode(binding.value))
        console.log('componentUpdated')
      },
      unbind () {
        console.log('unbind')
      }
    }
  },
  data () {
    return {
      number: 1,
      show: true
    }
  }
}
</script>

```


![image](https://github.com/zhangh-design/vue-examples/raw/master/11%20%E6%8C%87%E4%BB%A4%E7%9A%84%E6%9C%AC%E8%B4%A8%E6%98%AF%E4%BB%80%E4%B9%88/3.jpg)

![image](https://github.com/zhangh-design/vue-examples/raw/master/11%20%E6%8C%87%E4%BB%A4%E7%9A%84%E6%9C%AC%E8%B4%A8%E6%98%AF%E4%BB%80%E4%B9%88/4.jpg)

![image](https://github.com/zhangh-design/vue-examples/raw/master/11%20%E6%8C%87%E4%BB%A4%E7%9A%84%E6%9C%AC%E8%B4%A8%E6%98%AF%E4%BB%80%E4%B9%88/6.jpg)


