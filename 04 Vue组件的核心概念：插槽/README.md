## Vue组件的核心概念：插槽

> 前言：对于大多数的同学来说插槽可能是一个比较新的概念但实际上他解决的问题也很简单其实就是分发内容，他是Vue从 `Web Components 规范草案`中获得的一个灵感来去设计了这样一套API


那我们现在继续拿我们的这个todo-list来举例，
那现在我们的todo-item是直接写在了todo-list这个组件里面但实际上它并不是很合理我们希望使用这个组件开发的同学可以自行的传入需要渲染的todo-item而不是直接将todo-item写死在了todo-list当中，那这个时候我们要把这个todo-item把它拿出来放到我们外层的这个todo-list里面。


```
<todo-list>
	<todo-item @delete="handlerDelete" v-for="item in list" :title="item.title" :del="item.del"></todo-item>
</todo-list>

Vue.component('todo-list',{
    // 把 `todo-item` 组件拿到外部 template 中
	template: `<ul></ul>`,
	data: function(){
		return {}
	},
	methods: {
		handlerDelete(val, flag){
		    console.log('handlerDelete ',val,' 状态 ',flag);
		}
	}
})
var vm = new Vue({
	el: '#app',
	data: {
		message: 'hello world',
		// list放到最外层
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
	},
	methods: {
		handlerDelete(val, flag){
		    console.log('handlerDelete ',val,' 状态 ',flag);
		}
	}
})
```
那这时候实际上我们刷新页面的话我们是看不到这个 todo-list 是被挂载到我们的这个Dom上的，那是因为我们在 todo-list 里面仅仅只有一个 `ul` 标签它并不知道我们这个 todo-list
下面嵌套的这一堆东西要挂载到什么地方，那我们现在这个插槽就是为了解决这个问题我们可以通过 `slot` 这样一个标签来去指定它我们需要挂载我们传递进来的这个内容就是我们的这个 `todo-item` 实际上这个就是我们的 `默认插槽`那这时候我们在去刷新浏览器可以看到和之前没有任何的区别。

```
Vue.component('todo-list',{
	template: `
	<ul>
		<slot></slot>
	</ul>
	`,
	data: function(){
		return {}
	},
	methods: {}
})
```

那现在我们使用了我们的默认插槽，现在我们产品经理给我们提了一个新的需求是在我们的 `todo-item` 这里
需要一个前置的图标和一个后置的图标，就是两个图标，正常来说我们可能第一反应最简单的方式是起一个图标的 `iconType: String` 让用户去传递这个图标的类型然后我们根据这个图标的类型去渲染我们的这个图标

```
<todo-list>
	<todo-item @delete="handlerDelete" v-for="item in list" :title="item.title" :del="item.del" pre-icon-type="前置图标" suf-icon-type="后置图标"></todo-item>
</todo-list>

Vue.component('todo-item',{
	props: {
		title: String,
		del: {
			type: Boolean,
			default: false
		},
		preIconType: String,
		sufIconType: String
	},
	template: `
	<li>
		<span>{{preIconType}}</span>
		<span v-if="!del">{{title}}</span>
		<span v-else style="text-decoration: line-through;">{{title}}</span>
		<button v-show="del" @click="handlerClick">删除</button>
		<span>{{sufIconType}}</span>
	</li>
	`,
	data: function(){
		return {}
	},
	mounted() {},
	methods: {
		handlerClick(e){
			e.stopPropagation();
			console.log('点击删除按钮');
			this.$emit('delete', this.title, 0)
		}
	}
})
```
那这样有一个问题就是它不够灵活那现在只是传递了类型有时候我们可能还需要配置不同的颜色不同的图标大小那这个时候我们不可能一直在叠加这个属性这样就显得不够灵活，这时候我们希望能够让用户他想传什么就传什么传带什么颜色图标就传带什么颜色的图标而这个图标的权限放到了这个 `todo-item` 使用的这个地方，那这个时候我们在 `todo-item` 组件内部写一个span，同样我们也是通过 `slot` 的一个方式，那简单的使用 `slot` 它并不知道我们到底加载前置还是后置这里我们需要给我们的图标起一个名字通过 `slot="pre-icon"`起一个名称，那同样我们在 `todo-item` 里面去挂载我们传递进来的图标的时候我们也给它指定名称我们这时候刷新浏览器我们可以看到我们的前置图标和后置图标都出现在该有的位置


```
// 模板
<todo-list>
	<todo-item @delete="handlerDelete" v-for="item in list" :title="item.title" :del="item.del">
		<span slot="pre-icon">前置图标</span>
		<span slot="suf-icon">后置图标</span>
	</todo-item>
</todo-list>

// 组件
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
		<slot name="pre-icon"></slot>
		<span v-if="!del">{{title}}</span>
		<span v-else style="text-decoration: line-through;">{{title}}</span>
		<slot name="suf-icon"></slot>
		<button v-show="del" @click="handlerClick">删除</button>
	</li>
	`,
	data: function(){
		return {}
	},
	mounted() {},
	methods: {
		handlerClick(e){
			e.stopPropagation();
			console.log('点击删除按钮');
			this.$emit('delete', this.title, 0)
		}
	}
})

```

`<span slot="pre-icon">前置图标</span>` 那这个是 `Vue2.5` 的语法那 `2.6` 之后的语法有所更改提供了一个 `v-slot` 的指令来去标识它我们需要一个 `template` 这个特殊的标签然后在 `tempalte` 中写入 `v-slot` 指令，那不管是新语法还是老语法都需要掌握因为现在很多的老系统依然使用的是 `2.5` 的老语法那刷新浏览器我们看到的效果依然是一样的。

```
<todo-list>
	<todo-item @delete="handlerDelete" v-for="item in list" :title="item.title" :del="item.del">
		<template v-slot:pre-icon>
			<span>前置图标</span>
		</template>
		<template v-slot:suf-icon>
			<span>后置图标</span>
		</template>
	</todo-item>
</todo-list>
```

那实际上我们这个 `todo-list` 传递的这个 `todo-item` 这个我们刚才所谓的`默认插槽`它其实是把 `template` 这个省略掉简写掉了因为它没有名称就不用写了只是一种简写的方式那这个带名称的插槽我们也有一个比较直观的概念叫 `具名插槽` 实际上就是有名称的插槽。 

那除了我们现在讲到的默认插槽、具名插槽之外还有一个概念叫做`作用域插槽`，它和我们这个插槽的作用实际上是一样的，他们都是用来分发内容的那不同的是呢 ==作用域插槽它可以接收子组件传递的值== ，简单来说就是根据子组件传递不同的值然后我们返回不同的内容。

那我们现在依然使用这个 `todo-item` 来看一下这个效果，`todo-item` 里面我们维护了一个 `value` 值那这个值的话我们就简单的使用随机值，那我们要把这个随机值传递出去也就是说我们使用这个 `todo-item` 的时候我们想要拿到这个 `data` 里面的 `value` 值，我们想根据这个 `value` 值的不同来去传递相应的内容，我们如何拿到那就是要通过 `:value="value_v"` 这种方式我们可以把这个 `value` 传出去那这时候我们是可以在上面模板的 `todo-item` 里面去拿到这个  `value` 值的那这个 `value` 传递出来的是个对象这个对象里面有个值就是 `value` 那我们可以把这个值给打印出来，==这样就可以在我们的父组件里面拿到子组件的值==然后我们根据这个值来选择去传递不同的内容。假如说我们根据这个随机值如果大于0.5我传递一个红色图标如果小于0.5我们传递一个蓝色图标它主要是解决的这样一个问题


```
<todo-list>
	<todo-item @delete="handlerDelete" v-for="item in list" :title="item.title" :del="item.del">
		<template v-slot:pre-icon="{value}">
			<span>前置图标 {{value}}</span>
		</template>
		<template v-slot:suf-icon>
			<span>后置图标</span>
		</template>
	</todo-item>
</todo-list>

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
		<slot name="pre-icon" :value="value_v"></slot>
		<span v-if="!del">{{title}}</span>
		<span v-else style="text-decoration: line-through;">{{title}}</span>
		<slot name="suf-icon"></slot>
		<button v-show="del" @click="handlerClick">删除</button>
	</li>
	`,
	data: function(){
		return {
			value_v: Math.random()
		}
	},
	mounted() {},
	methods: {
		handlerClick(e){
			e.stopPropagation();
			console.log('点击删除按钮');
			this.$emit('delete', this.title, 0)
		}
	}
})
```
那这里的 `:value="value_v"` 我们也可以不叫做 `value` 只要保持和模板中名称统一即可。


那除此之外我们还有一个默认值的功能就是说如果你没有传递这个插槽可以给它一个默认的，然后我们把这个后置图标给它删除掉看下效果：

那如果你传递的话它就走我们这个默认的图标。
```
<todo-item @delete="handlerDelete" v-for="item in list" :title="item.title" :del="item.del">
	<template v-slot:pre-icon="{value}">
		<span>前置图标 {{value}}</span>
	</template>
	<!-- <template v-slot:suf-icon>
		<span>后置图标</span>
	</template> -->
</todo-item>

template: `
<li>
	<slot name="pre-icon" :value="value_v"></slot>
	<span v-if="!del">{{title}}</span>
	<span v-else style="text-decoration: line-through;">{{title}}</span>
	<slot name="suf-icon"><(*￣▽￣*)/</slot>
	<button v-show="del" @click="handlerClick">删除</button>
</li>
`,
```


#### 结语：
到这里大家可以感受下插槽你完全可以把它当做复杂的属性来看待如果我们通过属性来传递这些复杂的内容 `假如说我们要传递一个 span、标签、图标` 那我们是没办法直接写在模板的组件上的如果这样写 `<todo-item :icon="<span></span>">...</todo-item>` 模板是编译不通过的因为这些左尖括号`<`和右尖括号`>`不是这么好处理的，所以说才换了这么一种形式来去传递我们的这些复杂的内容，那作用域插槽也是一样本质上传递的是一个`返回组件的函数`这句话大家可以好好理解下`返回组件的函数` 你可以把这个 `<template v-slot:pre-icon="{value}"><span>前置图标 {{value}}</span></template>`当成是一个函数而在这个内部 `<slot name="pre-icon" :value="value_v"></slot>` 传递了一个函数然后我通过这个 `slot` 的形式去调用了这个函数并且给这个函数传递了一个 `value` 值去返回的是一个 `<span>前置图标 {{value}}</span>` 标签，==本质上是一个返回组件的函数==。

那用一句话来总结我们这节课的内容： 那插槽是一种传递复杂内容的方式，仅仅是因为我们在模板语法中没有办法使用简单的属性去传递这些复杂的内容所以说才设计了这样一种API用来传递这些复杂的内容。


