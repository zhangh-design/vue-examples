## template和JSX的对比以及它们的本质

> 前言：这节课我们来聊一聊`template`和`JSX`它们之间的一些区别以及它们之间的本质，当我们提到`JSX`的时候很多同学的第一反应可能就是`react`也没错`JSX`可以说和`react`是有很大的一个关系，`JSX`是伴随着`react`产生的但是呢从某种程度上来说它俩又是一个独立的个体，通过一些插件的形式在`Vue`中我们依然可以使用`JSX`。


我们先来看一下`tempalte`：

`template`它实际呢是一个模板语法它是`HTML`的一个扩展它的数据的绑定使用的是 `Mustache`语法就是双大括号，`Mustache`的话它是`JQuery`的时候它是被广泛使用的一个模板引擎，在这里的话我们`Vue`是使用`Mustache`这样的一种双大括号的语法进行数据的一个绑定。

##### template
- 模板语法（HTML的扩展）
- 数据绑定使用 Mustache 语法（双大括号）


```
<span>Message: {{msg}}</span>
```

##### JSX
那`JSX`的话我们一眼看上去它和`template`没有特别大的差别通过我们这一个简单的说明上我们来看它只是一个简单的单括号和双括号的一个差别，但是`JSX`的话它并不是模板语法它更多的是一个javascript的一个语法扩展我们可以在`JSX`中写我们的各种js逻辑都是没有问题的所以说它相对于`template`来说它会更加的灵活。

- javaScript的语法扩展
- 数据绑定使用单引号


```
<span>Message: {this.msg}</span>
```

我们在来详细的对比一下`template`和`JSX`它们之间的一个区别：

`template`的话算是`Vue`的一个特点和优点吧每一款一个框架的推出想要获得一定的用户市场势必有它的一个特点在那`template`的话就是`Vue`的一个特点所在它的一个优点的话就是说我们的学习成本很低因为它是`HTML`的一个语法扩展你只要拥有一个`HTML`的基础知识那你就可以很快的可以使用我们的一个模板语法`template`还有它大量内置了一些指令然后简化我们的一个开发这些都是一个语法糖的作用包括我们组件作用域的一个`CSS`它也会帮助我们去处理这都是在模板语法中去做到的，但是它有一个很致命的缺点就是说灵活性低。

`JSX`的话它相对于`template`的优点它就很明显了就是灵活、灵活、灵活，它就是灵活对因为我们在`JSX`中写各种的一个逻辑不需要一些指令的支持我们就可以去书写这种逻辑，因为`Vue`官方有一些话是说我们推荐大多数情况下大家使用`template`并没有说推荐`JSX`但是有的时候我们一些业务复杂的逻辑的时候我们不得不去写我们的`render`函数这样的话成本是非常高的但是`Vue`的官方还有另外一句话隐藏的比较深在我们下面的图片上有说到：

更抽象一点来看，我们可以把组件区分为两类：

一类是偏视图表现的，一类是偏逻辑的。我们推荐在前者中使用模板，在后者中使用 JSX 或渲染函数。这两类组件的比例会更具应用类型的不同有所变化，但整体来说我们发现表现类的组件远远多于逻辑类组件。

所以说`Vue`它首先推荐你使用`remplate`但是随着我们的系统越来越复杂你难免会碰到一些逻辑复杂的一个情况这时候简单的使用`template`会很吃力去写我们的一些逻辑这时候我们就可以选择使用我们的`JSX`或者是我们的一个存`render`函数。

![image](http://i2.tiimg.com/717460/d9ada62a6796cd3c.jpg)


我们通过一个demo来看一下：

这个demo很简单就是我们的一个`hello world`，`hello world`就是通过我们的一个可以看下浏览器控制台我们最终生成的HTML就是`h1`、`h2`、`h3`、`h4`不同层级的标签。

![image](http://i2.tiimg.com/717460/1eff70d192990ff1.jpg)

看下我们的代码：

index.vue
```
<template>
  <div>
    <span>Message: {{ msg }}</span>
    <br />
    <VNodes :vnodes="getJSXSpan()" />
    <anchored-heading1 :level="1">Hello world!</anchored-heading1>
    <anchored-heading2 :level="2">Hello world!</anchored-heading2>
    <anchored-heading3 :level="3">Hello world!</anchored-heading3>
    <VNodes :vnodes="getAnchoredHeading(4)" />
  </div>
</template>
<script>
import AnchoredHeading1 from './AnchoredHeading.vue';
import AnchoredHeading2 from './AnchoredHeading.js';
import AnchoredHeading3 from './AnchoredHeading.jsx';
export default {
  components: {
    AnchoredHeading1,
    AnchoredHeading2,
    AnchoredHeading3,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  data () {
    return {
      msg: 'hello vue'
    };
  },
  methods: {
    getJSXSpan () {
      return <span>Message: {this.msg}</span>;
    },
    getAnchoredHeading (level) {
      const Tag = `h${level}`;
      return <Tag>Hello world!</Tag>;
    }
  }
};
</script>

```

AnchoredHeading.vue：

这个就是通过我们的属性传递一个`level`的属性来去控制我们到底是`h1`还是`h2`还是`h3`这样的一个标签，如果说我们是用我们的一个模板语法的话那我们就要这样写每一个对于`h1`都要去做一个判断就会显得非常的冗余每次都是`else -if`这样子。


```
<template>
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</template>
<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  }
};
</script>

```

那如果说我们用`JSX`的话就看的一个非常的简洁我们在`render`函数中写`JSX`我们只需要知道我们传的这个`level`然后我们获取到这个`tag`然后直接输出渲染就可以了这样只是算两行代码的一个，这样相对于我们的模板语法简洁了很多，因为模板和`JSX`之所以能完成相同的功能其实它们最终是转换编译成`createElement`的一个形式。

AnchoredHeading.jsx：
```
export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  render: function (h) {
    const Tag = `h${this.level}`;
    return <Tag>{this.$slots.default}</Tag>;
  }
}
```

AnchoredHeading.js：

那如果你不用`JSX`的话你可以这么去写（最终模板和`JSX`都会被编译成render函数），那简单的来说简单的组件像这样的情况只有一个标签你可以这么写没问题但当你复杂的时候可能会出现层层嵌套的时候那你还是用`createElement`那就成本就比较高了。


```
export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  render: function (createElement) {
    return createElement(
      'h' + this.level, // 标签名称
      this.$slots.default // 子元素数组
    );
  }
};

```


但是我们平常开发的时候我们更多的还是选用了`template`但等我们遇到逻辑复杂的一个情况的时候其实大家也不用去慌也不用着急去切换我们的`JSX`，只要我们是可以混合着使用的我们还是刚才的demo我们通过函数式组件去渲染我们的`JSX`的一个标签对这样就达到了一个混合使用的方式我们在我们的`template`语法中混合着使用我们的`JSX`包括我们这个`span`标签它都是一个`JSX`的一个形式这样是没问题的。


```
<template>
<VNodes :vnodes="getJSXSpan()" />
<VNodes :vnodes="getAnchoredHeading(4)" />
</template>
components: {
    // 体现出使用函数式组件去切换不同类型的组件
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
},
methods: {
    getJSXSpan () {
      return <span>Message: {this.msg}</span>;
    },
    getAnchoredHeading (level) {
      const Tag = `h${level}`;
      return <Tag>Hello world!</Tag>;
    }
  }
```

#### 结语：

好我们在看一下为什么他们说不管你是`template`也好`JSX`也好都能满足我们的一个需求实际上它们最终都是会被编译成我们的`createElement`它们只是语法糖而已像我们这个`span`标签我们可以看下我们下面图中的`span`标签你用`template`还是你用`JSX`那最终编译成的都是`createElement`这样的一个标签当你这个层级比较深的时候它依然也是`createElement`的一个层层的嵌套对所以说它只是语法糖而已。


![image](http://i2.tiimg.com/717460/485a65369736e43f.jpg)
