## 合理应用计算属性和侦听器

> 前言 

这节课我们来聊一聊`Vue`的计算属性和侦听器以及来聊一聊它们两之间的一个合理应用。

**计算属性 `computed`：**
1. 减少模板中计算逻辑
2. 数据缓存
3. 依赖固定的数据类型（响应式数据）


好计算属性是什么？计算属性说白一点你可以认为它就是我们可以在里面写一些计算逻辑的一个属性，我们通常用来可以帮助我们减少我们在模板中写一些逻辑的一个计算它而且还可以帮助我们做一些数据的缓存当我们的数据没有变化的时候它不会在去再次执行这个计算的过程但是它有一个依赖就是说这个计算属性依赖的数据必须是我们的一个响应式的数据类型你不能说是一个普通的我们传入的一个全局的一个数据这样的话你是没有办法当你这个全局的数据变化的时候这个计算属性是不会重新帮你去计算的，那计算属性的话它可以帮助我们尤其是你的数据量特别大的时候它是能够帮助我们提高我们的性能因为它只会在你数据变化的时候计算。

> 这块我们来看一个`Demo`：

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/09%20%E5%90%88%E7%90%86%E5%BA%94%E7%94%A8%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%92%8C%E4%BE%A6%E5%90%AC%E5%99%A8/1.jpg)

我们现在是有一个反转字符串的一个`Demo`，我们这个`message`实际上它是一个`hello vue`在初始化的过程中我们已经把它反转看下代码我们用两种方式，一个是计算属性的方式、然后一个是用的是普通的一个方法，那计算属性的话我们只需要把它写在这个`computed` 这个`key`下面去写就可以了，那我们模板中去调用的时候也是直接去引用这个计算属性key`reversedMessage1`值，这个`message`在没有变化的时候它是不会在去执行`reversedMessage1`这个计算属性方法的，然后我们还有一个`reversedMessage2`这个是通过方法然后我们每次数据更新模板更新的时候它都会再次的执行这个方法。

计算属性：
```
<p>Reversed message1: "{{ reversedMessage1 }}"</p>
computed: {
    // 计算属性的 getter
    reversedMessage1: function () {
      console.log('执行reversedMessage1');
      return this.message
        .split('')
        .reverse()
        .join('');
    }
}
```
方法：
```
<p>Reversed message2: "{{ reversedMessage2() }}"</p>

methods: {
    reversedMessage2: function () {
      console.log('执行reversedMessage2');
      return this.message
        .split('')
        .reverse()
        .join('');
    }
}
```
我们这里有个`button`，这个button就是我们要强制我们的去刷新我们的这个模板，我们来看一下这个效果：

```
<button @click="() => $forceUpdate()">forceUpdate</button>
```
我们点击这个按钮的时候我们看到浏览器控制台有输出了再次`执行reversedMessage2`执行了这个方法，但是这个`reversedMessage1`并没有再次去执行，为什么？因为我们的响应式变量 `message`没有变化，所以说如果我们大数据量计算完我们在我们的计算属性里面去计算好当你数据没在变化的时候你的模板即便是多次的一个渲染它也不会再次的去计算这样大幅提高我们的性能，那当我们的`message`变化的时候，那我们这里有个`input`框这个`input`框就是我们用来改变我们的`message`，我们现在随便输入看到我们的`reversedMessage1`和`reversedMessage2`都在同时的执行这就是我们的一个计算属性。



我们再来看一下侦听器 `watch`：

1. 更加灵活、通用
2. watch中可以执行任何逻辑，如函数节流、Ajax异步获取数据、甚至操作`Dom`（但是不建议你这么去做）。

侦听器 `watch`它就是我们用来监听数据变化的，我们可以分别去监听我们某一个数据是否发生了改变，我们直接看我们的一个示例，里面我们是有一个按钮，这个按钮就是用来操作`a+1`的一个操作但是我在组件中有一个`watch`我监听了`a`当`a`变化的时候它就会执行到我们这里面的一个逻辑，这里我又在`a`变化的时候我又执行了`b.c`的一个变化那我这里还有一个`b.c`的监听器这是不同的一个写法对于我们这样的一个嵌套更新一个多层级的嵌套更新我们可以用这种方式`b.c`然后可以独立的监听我们这个`c`的内容变化然后我们这里又执行了`b.d`的一个变化同样`e.f.g`的一个变化会触发我们这个`e`的变化，为什么会触发`e`的变化因为`e`我们这里是有用到了一个`deep: true`深度的一个监听就是`e`对象下面的所有的属性我们都会对它执行一个监听任何一个变化`f`变化还是`g`变化都会导致这个`e`的这个`handler`我们绑定的这个方法里面的逻辑的一个执行，如果你把这个`deep: true`给去掉这个`e.f.g的加1操作`并不会触发这个`e`的执行我们在这个`e`的`handler`里面又触发了这个`h`的一个`push`的操作然后也导致了`h`这个侦听器的一个执行。


```
<template>
  <div>
    <button @click="() => (a += 1)">a+1</button>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
          a: 1,
          b: { c: 2, d: 3 },
          e: {
            f: {
              g: 4
            }
          },
          h: []
        }
  },
  watch: {
    a: function (val, oldVal) {
      this.b.c += 1;
      console.log('new: %s, old: %s', val, oldVal);
    },
    'b.c': function (val, oldVal) {
      this.b.d += 1;
      console.log('new: %s, old: %s', val, oldVal);
    },
    'b.d': function (val, oldVal) {
      this.e.f.g += 1;
      console.log('new: %s, old: %s', val, oldVal);
    },
    e: {
      handler: function (val, oldVal) {
        this.h.push('😄');
        console.log('new: %s, old: %s', val, oldVal);
      },
      deep: true
    },
    h (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal);
    }
  }
}
</script>
```
好了整体的我们的浏览器基本上就是这样一个效果，每次我点一个按钮都会同步触发一系列的更新这就是我们的一个侦听器，它是一个非常灵活非常通用的`api`，我们在`watcher`中可以执行任何的一个逻辑包括我们的`函数节流`、`Ajax异步的获取数据`、`甚至我们可以去操作一些dom（但是不建议你这么去做）`
![image](https://github.com/zhangh-design/vue-examples/raw/master/09%20%E5%90%88%E7%90%86%E5%BA%94%E7%94%A8%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%92%8C%E4%BE%A6%E5%90%AC%E5%99%A8/2.jpg)


那我们的计算属性`computed`和我们的侦听器`watcher`之间有什么区别呢？从字面上看它们两之间并没有一个太大的关系，实际上我们这个计算属性能做到的我们的侦听器`watcher`都能做但是反过来我们的侦听器能做的但是`计算属性`就不可以了。


**computed VS watcher**
1. computed能做的，watch都能做，反之则不行。
2. 能用`computed`的较量用`computed`。

但是我们什么时候用侦听器什么时候用计算属性那我们通过一个`demo`来给大家演示一下：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/09%20%E5%90%88%E7%90%86%E5%BA%94%E7%94%A8%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%92%8C%E4%BE%A6%E5%90%AC%E5%99%A8/3.jpg)

好我们这个`demo`是我们有一个`firstName`和`lastName`其实这也是官方的一个`demo`看我们直接输入会导致整个的变化它俩的上下一个功能是一样的但是它俩唯一的却别就是我一个是用计算属性实现的一个是用侦听器来实现的我们看一下我们的代码：

那计算属性实现的就很简单，我只要直接`computed`然后
监听这个 `fullName`然后里面执行`firstName`和`lastName`的相加的一个操作就可以了。

```
<template>
  <div>
    {{ fullName }}
  </div>
</template>
<script>
 data: function () {
    return {
      firstName: 'Foo',
      lastName: 'Bar'
    }
 },
 computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    }
 },
 watch: {
    fullName: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal);
    }
 }
</script>
```

但是如果说我用侦听器来做，那我就要分别监听我们的`firstName`和`lastName`任何一个`firstName`变化的时候执行我们的`firstName`的一个加的逻辑的操作，`lastName`变化的时候同样也要执行一段逻辑的操作，这样显得比较冗余，相对于计算属性来说就看的没有这么清爽。


```
<template>
  <div>
    {{ fullName }}
  </div>
</template>
<script>
  data: function () {
    return {
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    };
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName;
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val;
    }
  }
</script>
```

#### 结语：

所以说我们在开发的过程中如果说你能用`计算属性`去完成的功能尽量去用`计算属性`，那如果说你不能用计算属性那我们`watch`提供了一个我们更底层的api更加通用，但是大家也不用去执着于一定要用`computed`计算属性去做有的时候你很难第一时间想到这个事情，我们用`watch`也是可以接受的这样一件事情，等你项目做多了它们之间的一个选择是水到渠成的一件事情。








