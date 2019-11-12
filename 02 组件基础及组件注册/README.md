## 组件基础及组件注册

> **前言**：组件系统是Vue的另一个重要概念，因为它是一种抽象、允许我们使用小型、独立和通常可复用的组件构建大型应用，仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/02%20%E7%BB%84%E4%BB%B6%E5%9F%BA%E7%A1%80%E5%8F%8A%E7%BB%84%E4%BB%B6%E6%B3%A8%E5%86%8C/1.png)

我们的前端页面基本上都可以把它抽象成一个组件树的结构。

其实说白了组件就是为了解决一个问题：复用

---

我们直接看我们的这一个代码：
```
<ul>
			<li v-for="item in list">
				<span v-if="!item.del">{{item.title}}</span>
				<span v-else style="text-decoration: line-through;">{{item.title}}</span>
				<button v-show="!item.del">删除</button>
			</li>
		</ul>
```
如果说没有组件我们一直在我们的Hml中去扩展我们的功能，不停的扩展功能我们现在只是一个简单的todo-list，这时候我可能在一个页面中不仅仅只有一个todo-list，有很多地方都需要这个todo-list所以说我希望把这一个todo-list甚至说包括这个todo-item把它变成一个可以复用的如果我还有其它的需求可以直接复用这一段代码。

> **那么我们现在就去开始把这个todo-item编译成一个组件**

1. 在Vue中我们是通过Vue.component这样的一个方法来定义组件，它接收两个参数第一个是组件的一个名称，第二个参数是这个组件的一个配置，那这个组件的配置它和我们new Vue({})实例的时候接收的参数基本上是一样的`el: '#app'`我们是不在需要了的，那这里我们需要data那这里的data的话就不像是new Vue({})实例的时候简单的传入一个对象，它需要的是一个方法，而这个方法返回这样一个对象，那原因呢，原因是因为我们的这个todo-item可能会被复用，而这个new Vue({})是一个实例，这个实例它是一个根实例它不会出现复用的一个情况，所有说仅仅是一个对象没问题，那如果说出现复用的依然是一个对象那这个对象它在js当中是一个引用类型，这就会出现在一个地方改动会影响到其它地方的使用，所以说我们希望每一个使用这个to-item组件的我们给它返回的对象都是独一无二的一份。

> **注册一个todo-item的组件**

```
Vue.component('todo-item',{
    // 我们需要这个del和我们的title是直接使用这个组件的时候直接传递过来，如果说我们希望能够接受到我们的title和del，我们需要给它定义一个属性声明，就是我们的props
	props: {
		title: String,
		del: {
			type: Boolean,
			default: false
		}
	},
	// 这里有一点就是我们的template，就是模板字符串，简单来说就是我们要复用的Html模板，它仅仅只是一个todo-item我们的v-for它是不需要的
	template: `
	<li>
		<span v-if="!del">{{title}}</span>
		<span v-else style="text-decoration: line-through;">{{title}}</span>
		<button v-show="del">删除</button>
	</li>
	`,
	// 这里有数据，我们希望使用一个function来去返回这样的一个对象
	data: function(){
		return {}
	},
	// 在methods这个对象里面定义一些方法
	methods: {}
})
```
**我们通过Vue.component注册完之后我们就可以在Html中开始使用我们的todo-item**

同样也是v-for，那我们刚才声明了title和del我们需要这两个属性它是动态的我们需要从这个v-for的item里面中去取出来。

我们现在看我们的这个todo-item这个传属性还有这个声明属性的方式它有点和我们定义一个方法，调用方法传递参数的一个形式很类似，假如把我们的这个大段的Html想象成一个大的函数，在函数里面我们调用了todo-item这个函数，在函数里面给这个函数申明了我要接受申明样的参数，那就是通过我们的这个props来进行申明的，我们申明了一个title、del各个参数我们需要什么样的类型虽然我们在js当中没有类型这样一个概念，如果我们使用了ts那我们就完全可以申明我们的这个title要这个string类型，通过es6还可以使用这个默认值，那传参的时候我们通过调用这个方法传递我们的这个title和del,体现化到我们的这个组件里面就非常的类似，但是这里有一点还是需要注意的是。

==注意：我们现在通过这种申明props的通过这种传递了,如果说你传递了一个没有申明的例如你传递了一个你没有的props中定义的参数`<todo-item data-set-abc="dd"></todo-item>`，那这个时候它这个参数是被默认的Vue会把它挂载到template这个根节点的<li>上面包括我们的这个id、class、style同样也是这个逻辑你不需要给它声明它会默认的给你挂载到这个template第一个根节点上面，这是和我们刚才说的形象话比喻成函数里面的一个大的区别==
```
<ul>
<todo-item v-for="item in list" :title="item.title" :del="item.del"></todo-item>
</ul>
```

刷新浏览器后我们可以看到这个渲染效果使用todo-item和之前是一样的，那现在我们的这个todo-item就可以在任何地方去使用了而不用去写一推的li。

> **我们在进一步的把这个todo-list也定义成一个组件**


```
Vue.component('todo-list',{
	template: `
	<ul>
		<todo-item v-for="item in list" :title="item.title" :del="item.del"></todo-item>
	</ul>
	`,
	// 这里同样是一个对象
	data: function(){
		return {
		    // 声明list
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
	}
})
```
这时候我们就可以在Html中直接写一个todo-list了。


==这里还有一点需要注意的是，通过Vue.component来去注册的时候第一个参数name值必须保证全局唯一的我们这里全局定义了一个todo-item和todo-list如果你以后还要定义一个其它的组件不能和这个名称重复的==

我们通过定义了todo-item和todo-list两个组件，目前来看的话它并没有减少我们的一个工作量但它只是一个简单的示例那长远来看的话我们的项目需求一般都会非常的复杂，我们的这个组件现在定义好了之后在未来在以后可以直接拿来复用，它会减少我们很大的一个工作量。