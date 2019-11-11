## 第一个Vue程序

> 第一先进行环境安装

1.开发版本vue.js

> 官方网站给我们提供了多个版本的vue.js，一个是开发版本一个是生成版本，那开发版本的话是包含了一个完整的警告和还有调试模式，就是当我们写的一些代码有一些不合理的地方它会给我们一些提示

2. 生成版本vue.js

> 那生产版本的话它是把这个警告给删除了的

引用方式官方提供了cdn和npm两种方式，为了便于学习我们首先cdn的方式先来引入vue.js，那npm包的形式我们在后面讲解单文件组件的时候也会涉及到。
```
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
```
示例讲解：

1. 提供一个根节点id为app ==(vue中的输出必须是要放在这个被挂载的节点里面)==
2. 我们new一个Vue的实例 ==(因为我们是通过cdn的形式引入的vue.js所以Vue这个变量已经是一个全局变量了，所以我们可以直接拿来使用)==

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>第一个Vue程序</title>
</head>
<body>
	<div id="app">
		{{message}} {{message+message}}
		<div :id="message"></div>
		<ul>
			<li v-for="item in list">
				<span v-if="!item.del">{{item.title}}</span>
				<span v-else style="text-decoration: line-through;">{{item.title}}</span>
				<button v-show="!item.del">删除</button>
			</li>
		</ul>
	</div>
	<script src="https://cdn.jsdelivr.net/npm/vue"></script>
	<script>
		var vm = new Vue({
    		// 指定一个dom节点(因为app是id所以使用#号)为我们Vue实例的一个挂载目标
			el: '#app', 
			// 数据
			data: {
			    // 用{{}}双括号的形式把message挂载到div上
				message: 'hello world',
				list: [
					{
						title: '课程1',
						del: false
					},
					{
						title: '课程2',
						del: true
					}
				],
				/* item: {
					title: '课程1',
					del: false
				} */
			}
		})
	</script>
</body>
</html>
```

---
> 在控制台中的一些操作

vm.message = "hello Vue" ，hello world->hello Vue
可以直接修改页面上的数据，这就是vue的一个响应式机制

{{message+message}}在双大括号中也可以进行表达式==这里需要注意的是这里双大括号中仅仅支持表达式而不支持语句，{{var test = 1}} 这种它是不支持的==，hello worldhello world

vue提供了一个v-bind指令，指令我们可以把它当做是一个标志位`<div v-bind:id="message"></div>` 如果需要id是一个动态值的话就需要用到vue的v-bind形式来把它变成一个动态的，<div id="hello world"></div>

比较常用的指令 v-if、v-else、v-for，v-if、v-else其实就是在外面的模板中使用if、else，因为在双大括号中是不能使用语句的if和else我们是无法使用的，所以vue提供了v-if、v-else让我们在模板中使用这种条件判断，我们通过一个todo-list来演示下：

```
data: {
    // 定义一个对象item
    item: {
        title: '课程1',
		del: false
    }
}
<ul>
	<li>
	    <span v-if="!item.del">{{item.title}}</span>
	    <span v-else style="text-decoration: line-through;">{{item.title}}</span>
	</li>
</ul>
```
v-if：的作用是如果它没有满足条件那span那一条是不渲染的。

v-show：的话它是在页面上我们看到依然是不渲染，实际上它是被加载了只是说他不显示而已，在vue底层它是根据这个true和false就是v-show它绑定的这个值来去决定这个样式是否显示但它实际上已经是挂载到了dom节点上的，<button style="display: none;">删除</button>

v-for：的话也是对标了我们js中的for循环

```
data: {
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

<ul>
	<li v-for="item in list">
		<span v-if="!item.del">{{item.title}}</span>
		<span v-else style="text-decoration: line-through;">{{item.title}}</span>
		<button v-show="!item.del">删除</button>
	</li>
</ul>

```

#### 小结
通过这一课我们学习了Vue的基本模板语法，包括我们的插值就是{{}}双大括号mustache语法在双大括号中我们只能使用表达式而不能使用语句，我们还学习了指令通过v-bind来绑定一个动态的值，还有学习了v-if、v-else来去做条件渲染，还是用道路v-for来做一个列表的一个循环渲染，那除此之外的话vue还有很多的指令还有一些我们没有涉及到的语法。




