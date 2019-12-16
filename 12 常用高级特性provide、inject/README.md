## 常用高级特性 provide/inject

> 前言：这节课我们来聊一聊`Vue`中的高级特性`provide` 和 `inject`，这个在平常我们业务开发中可能会很少用到但是如果说你去开发一些底层的通用组件的话这是一个使用频率相当高的特性。

它主要解决的问题还是我们组件间通信的一个问题，我们看这样一个树形结构非常简单的一个树形结构，`A`节点下面有`B` 、 `C` 、`D`节点，通常我们如果说节点之间的一个通信就假如我们`A`节点要和`B`节点进行通信基本上是通过属性的一个传递进行通信的`A`节点通过一个属性传递给`B`节点，`B`节点如果要和`A`节点进行通信那也是通过我们的事件`this.$emit`的一个方式去和`A`节点进行通信，那如果说我们`A`节点要和`E`节点进行通信的话以我们目前所掌握的知识点的话那我们可能就需要一个属性之间的层层传递，那`A`节点和`C`节点进行通信`C`节点在和`E`节点进行通信间接的达到了一个这个我们`A`和`E`节点进行通信的一个方式，那如果说我们的`E`节点要和`I`节点进行通信的话那我们除了属性之间的一个层层传递我们的事件也要通过一个层层的传递这样的一个冒泡去进行通信，这样成本是非常高的而且没有什么健壮性可言非常的脆弱。

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/12%20%E5%B8%B8%E7%94%A8%E9%AB%98%E7%BA%A7%E7%89%B9%E6%80%A7provide%E3%80%81inject/1.jpg)

那有没有什么方式去解决这个问题呢？那`provide`和`inject`就是为了解决这个问题诞生的。

那`provide`就是说我们提供数据就是`A`节点提供数据`E`节点通过`inject`方式注入数据`E`节点它去和`A`节点进行通信的时候或者说是去`A`节点取数据的时候它是通过一个层层冒泡的形式到`A`节点上面去取数据。

我们通过一个demo来看一下，这个示例的话它和我们的刚才ppt上面看到的树形结构是一样的，分别是`A`节点下面有`B`、`C`、`D`，`C`节点下面有`E`、`F`是一模一样一致的结构，我们看下`C`节点下面的`E`节点和`F`节点还有`I`节点它们分别是蓝色的一个节点那这时候我们看一下代码，我们的代码是`A`节点通过`provide`提供了一个`theme`属性这个`them`下面有我们的`color`颜色就是我们现在要的蓝色，那我们的`E`和`F`节点通过`inject`方式注入我们的一个`them`主题然后去上面找到了我们的一个颜色所以说我们的`E`节点时蓝色的，同样我们的`F`节点也是但是这里你会看到我用的是`them1`这是因为`Vue`它在当前的很多东西都是挂载到了`this`下面这时候你可能注入的这个`theme`和你本身的组件的一些`theme`有冲突相同的名称那这时候的话你就可以通过`from`这样的一个特性来去起一个别名然后用现在用的是`theme1`这样的一个方式对这样`F`节点，那`I`节点的话我这样是一个`函数式`的组件它取`inject`的一个`theme`的方式可能就有所区别直接通过`injections.theme.color`通过这样的一个方式去取到我们的一个颜色，在回到我们的示例我们现在页面上有一个`改变color`这个`button`就是改变我们颜色的一个按钮我现在点击它我发现我的`E`、`F`、`I`节点并没有一个任何的变化，这是为什么呢？我们看一下我们的`A`节点这里是怎么写的我`provide`是直接提供了一个`color`这个`color`是一个字符串它并不是一个响应式也就是说当我的`color`改变的时候它并没有实时的反应到我这个`provide`提供的数据上面因为它本身并不是响应式的，那如果想要改变这样一个现状改变这一个问题那我们就要提供一个响应式的数据，那这时候我可以直接提供简单的一点就是说我们就直接提供`this`好了，this下面会挂载了我们的`data`我们的`props`我们的`methods`这些所有的属性你都可以取的到因为`data`和`props`都是响应式的那这时候我再去点击你会发现颜色变化了，我点击`改变color为green`颜色改变成了绿色的这说明我们的一个响应式生效了，我们在看我们的`C`节点，假如我们在`C`节点同样提供了一个`provide`的一个数据那这时候你看我改变颜色改变之后只有`D`节点下面的`I`节点在变化，`C`节点下面的`E`节点和`F`节点它始终是一个绿色它并不在改变了这是因为我们的`E`、`F`节点向上层去这个颜色的时候它到了`C`节点发现`theme`的这样一个数据它就不再去往上去找了这有点类似我们事件的一个冒泡机制很类似。

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/12%20%E5%B8%B8%E7%94%A8%E9%AB%98%E7%BA%A7%E7%89%B9%E6%80%A7provide%E3%80%81inject/2.jpg)

A节点：

```
<template>
  <div class="border">
    <h1>A 结点</h1>
    <button @click="() => changeColor()">改变color</button>
    <ChildrenB />
    <ChildrenC />
    <ChildrenD />
  </div>
</template>
<script>
import ChildrenB from './ChildrenB'
import ChildrenC from './ChildrenC'
import ChildrenD from './ChildrenD'
export default {
  components: {
    ChildrenB,
    ChildrenC,
    ChildrenD
  },
  provide () {
    return {
      theme: {
        // 并不是一个响应式属性
        color: this.color
      }
    }
  },
  /* provide() {
     return {
       可以返回this来达到响应式监听
       theme: this
     };
   },*/
  /*
  provide () {
    // 可以通过 Vue.observable 生成一个可响应的对象来传递，这样可以不用传递 this
    this.theme = Vue.observable({
      color: 'blue'
    });
    return {
      theme: this.theme
    };
  },
  */
  data () {
    return {
      color: 'blue'
    }
  },
  methods: {
    changeColor (color) {
      if (color) {
        this.color = color
      } else {
        this.color = this.color === 'blue' ? 'red' : 'blue'
      }
    }
  }
}
</script>
```


E节点：
```
<template>
  <div>
    <h3 :style="{ color: theme.color }">E 结点</h3>
  </div>
</template>
export default {
  components: {},
  inject: {
    // theme
    theme: {
      default: () => ({})
    }
  }
}
```
F节点：

```
<template>
  <div class="border2">
    <h3 :style="{ color: theme1.color }">F 结点</h3>
  </div>
</template>
<script>
export default {
  components: {},
  inject: {
    // theme1
    theme1: {
      from: 'theme',
      default: () => ({})
    }
  }
}
</script>
```
I节点（函数式节点）：

```
<template functional>
  <div class="border2">
    <!--函数式组件取 inject 和普通组件有所区别，这里请注意下-->
    <h3 :style="{ color: injections.theme.color }">I 结点</h3>
  </div>
</template>
<script>
export default {
  inject: {
    theme: {
      default: () => ({})
    }
  }
}
</script>
```

C节点：

```
<template>
  <div class="border1">
    <h2>C 结点</h2>
    <ChildrenE />
    <ChildrenF />
  </div>
</template>
<script>
import ChildrenE from './ChildrenE'
import ChildrenF from './ChildrenF'
export default {
  components: {
    ChildrenE,
    ChildrenF
  }
  // provide() {
  //   return {
  //     theme: {
  //       color: "green"
  //     }
  //   };
  // }
}
</script>

```

#### 结语：

好通过这种方式我们就解决了我们跨组件的一个通信的方式。
