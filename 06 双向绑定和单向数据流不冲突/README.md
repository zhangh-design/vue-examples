## 双向绑定和单项数据流不冲突

> 前言：那这节课我们来讲解 `Vue` 的双向绑定那双向绑定的话一直是作为`Vue`的卖点做为宣传那什么是双向绑定那双向绑定就是说我们数据在变化之后我们的视图同步的更新那我们视图更新之后我们的数据也会更新那在`Vue`中的话我们是通过`v-model`这样的一个指令来创建双向绑定。

那我们现在写一个输入框，那我们现在开始在这个输入框里做一些操作我们看到当我们去改变这个输入框的值的时候外面的我们的`message`也在同步的变化但是`v-model`它的本质仅仅只是语法糖换句话说就是`v-model`它只是一种简写的形式如果说我们不用`v-model`我们同样可以使用`value`和`input`组合来完成那我们现在把它改成非简写的形式那我们现在第二个是我们的非简写的形式那我们看到现在的效果和`v-model`是一样的，所以说`v-model`仅仅只是`value`属性和`input`事件两个简写起来的形式所以说`Vue`的双向绑定它的本质上还是==单向数据流==只是说`Vue`通过`v-model`这个指令来帮助我们简化了我们的代码让我们不用在去写绑定一个`value`值然后在通过事件的形式去改变这个`message`那`v-model`只是帮助我们简化了代码。

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/06%20%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E5%92%8C%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E4%B8%8D%E5%86%B2%E7%AA%81/1.png)

`v-model`：
```
<template>
    <input v-model="message"/>{{message}}
</template>
export default{
    data(){
        return {
            message: 'hello world'
        }
    }
}
```
`value`和`input`：

```
<template>
    <input :value="message" @input="handlerChange"/>
</template>
export default {
    data(){
        return {
            message: 'hello world'
        }
    },
    methods: {
        handlerChange (e) {
          // 在这里去改变我们的message
          this.message = e.target.value
        }
    }
}
```
那对于`input`标签`v-model`是`value`属性和`input`事件的简写那还有我们常用的`checkbox`，`radio`和`select`那它们都有对应的属性和事件那这一块的话我们的官方文档中有详细的说明。

v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件； 
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

那除了原生事件之外那想要自定义组件支持我们的`v-model`我们需要配置一个`model`对象，那只有这样我们可以看下官方文档那它这个是把`input`在次封装成了一个`base-checkbox`。

我们要定义一个`model`对象来去指明一个属性和一个事件
来去告诉`Vue`底层我这个`v-model`是哪个属性和哪个事件的简写形式，那`v-model`的话现在仅仅只支持一个属性因为我们现在这个对象里面只能指定一个`prop`属性如果说你自定义的组件你想要同时支持多个属性的双向绑定那`Vue`也提供了另外一个修饰符叫做`.sync`。

Vue.component('base-checkbox',{
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    template: `
        <input
        type="checkbox"
        v-bind:checked="checked"
        v-on:change="$emit('change', $event.target.checked)"
    `
})
```

#### .sync修饰符
这个`.sync`修饰符它的原理和我们的`v-model`原理是一样的但是不需要制定一个`model`对象来去指明它是哪个属性和哪个事件的简写了那这个`.sync`修饰符的话我们看官方文档这里有一个我们对这个title来做了`.sync`形式的双向绑定它的一个简写形式实际上就是我们的`title`和我们的`update:title`的一个简写。

我们在自定义组件里面需要`this.$emit('update:title', '参数')`这样一个形式的缩写形式。


```
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>

<text-document v-bind:title.sync="doc.title"></text-document>
```


对于刚开始接触`Vue`的同学`.sync`使用的场景并不是很多因为不使用`.sync`通过其它的方式更好的理解方式来去书写我们的代码一样可以完成我们的功能，`.sync`仅仅只是给我们一个简写形式而已。


### 结语：
那我们总结一下`Vue`的双向绑定它的本质上还是单向数据流那`v-model`的话它仅仅只是一种简写形式它的目的只是让我们写更少的代码完成同样的功能。

