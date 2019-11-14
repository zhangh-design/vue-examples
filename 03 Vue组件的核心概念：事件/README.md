## Vue组件的核心概念：事件

> 前言：在Vue中我们通过v-on指令来监听我们的事件由于事件使用的频率也是非常的高所以说Vue也给我们提供了一个简写的方式那就是使用我们的@符号。

那这里是Vue官方文档中提供的一个示例：

> 我们给一个 Button 绑定了一个 click 的事件，当点击 click 的时候它会执行这个 `counter+1` 语句的操作。

这里官方文档中是有一个可以直接在线点击的示例，我们看一下我们这样点击后这里会出现一个点击的次数。
```
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```
 **结果**：
> ![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/03%20Vue%E7%BB%84%E4%BB%B6%E7%9A%84%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%EF%BC%9A%E4%BA%8B%E4%BB%B6/1.png)


那这里的话我们通过v-on绑定的 click 事件它是一个语句`"counter += 1"` ，那实际上我们大部分情况下更多的是要处理一些复杂的操作，那这时候我们要给这个 click 绑定的是一个方法。

## 绑定事件

那我们现在知道我们原来的 todo-item 这里有个删除来给它绑定一个方法我们使用简写的形式：

```
Vue.component('todo-item',{
	props: {
		title: String,
		del: {
			type: Boolean,
			default: false
		}
	},
	template: `
	<li>
		<span v-if="!del">{{title}}</span>
		<span v-else style="text-decoration: line-through;">{{title}}</span>
		<button v-show="del" @click="handlerClick">删除</button>
	</li>
	`,
	data: function(){
		return {}
	},
	methods: {
		handlerClick(){
			console.log('点击删除按钮');
		}
	}
})
```
这是给原生 Dom 绑定事件的方式。

那对于我们自定义的组件我们给它绑定事件同样也是通过@的一个形式那我们 todo-item 这里是点击了删除，那我们给 todo-item起一个删除的自定义事件叫 @delete="handlerDelete"同样我们要把它写在 todo-list的 methods 里面，那这个时候我们点击我们的删除按钮的时候它还不能触发我们的这个 delete 的事件，那这时候我们需要自己手动的去把这个事件给抛出来我们通过 this.$emit 那这个$emit('delete', this.title) 的第一个参数这个名称的话就是对应的我们这个todo-item上面绑定的这个 delete 事件，那第二个参数的话就是我们要传递的参数(这里我们把 title 给传出去)，这里如果你有其它的参数可以在后面持续的加入它是一个可变参，那这个时候我们就可以在 handlerDelete 里面拿到传出来的事件参数。

```
Vue.component('todo-item',{
	props: {
		title: String,
		del: {
			type: Boolean,
			default: false
		}
	},
	template: `
	<li>
		<span v-if="!del">{{title}}</span>
		<span v-else style="text-decoration: line-through;">{{title}}</span>
		<button v-show="del" @click="handlerClick">删除</button>
	</li>
	`,
	data: function(){
		return {}
	},
	methods: {
		handlerClick(){
			console.log('点击删除按钮');
			this.$emit('delete', this.title)
		}
	}
})
Vue.component('todo-list',{
	template: `
	<ul>
		<todo-item @delete="handlerDelete" v-for="item in list" :title="item.title" :del="item.del"></todo-item>
	</ul>
	`,
	data: function(){
		return {
			list: [
				{
					title: '课程1',
					del: false
				},
				{
					title: '课程2',
					del: true
				}
			]
		}
	},
	methods: {
		handlerDelete(val){
			console.log('handlerDelete ',val);
		}
	}
})
```
点击删除按钮触发了 handlerClick 这个方法然后通过 this.$emit 的形式抛出了一个 delete 的自定义事件并且往外传递了一个 this.title 这个参数
，然后使用这个 todo-item 的时候给它绑定了这个delete的事件我们就可以在 handlerDelete 这个方法中去获取到我们传递出来的这个值 比如 val 就是 this.title 。

---
那除此之外的话我知道在 Dom 事件中还有一些阻止冒泡啊键盘事件这些特殊的处理，那Vue中同样给我们提供了一些简写的方法。

## 事件修饰符

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。

- .stop
- .prevent
- .capture
- .self
- .once
- .passive

我们在 click 后面加一个 .stop 它就是自动的帮我们阻止冒泡，那如果你不加这个 .stop 的话就要自己在 handlerClick 里面获取 button 的Dom对象手动调用 stopPropagation 方法，那Vue中我们可以使用它提供的一些简写的形式直接 .stop 它会自动的帮我们阻止掉冒泡的这个行为。

```
handlerClick(e){
	e.stopPropagation();
	console.log('点击删除按钮');
	this.$emit('delete', this.title)
}
```



```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

**还有一些不常用的键盘的事件**：

```
<input v-on:keyup.enter="submit">
```
加一个 enter 的时候其实就是我们在按键盘回车键，只有按下 回车键 的时候才会触发 submit 事件。

==以上这些就是我们所谓的修饰符事件。==

## 结语：

那在这里的话我们仅仅只是使用了一个简单的 click 事件那实际上事件有很多种包括一些鼠标事件 mouseup、mousedown、keyup、click、doubleclick甚至还有我们移动端的 touch 手指触摸的事件，那这里的话我们就不把这些事件一一的罗列出来了，在官方文档中已经罗列了很多的事件大家有时间的话尽量一一的去看一遍。
