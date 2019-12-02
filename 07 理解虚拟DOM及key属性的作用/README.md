## 理解虚拟DOM及key属性的作用

> 前言：这节课我们来聊聊虚拟DOM和key属性，我们先来了解下`JQuery`在`React`，`Angular`，`Vue`之前基本上前端是`JQuery`统治的天下直到现在依然有很多的系统还在使用`JQuery`进行开发它帮助我们简化了操作DOM的api，我们可以很方便的通过`JQuery`绑定事件然后通过事件来操作我们的`DOM`，但是随着我们的系统越来越复杂那事件也会变的越来越多不同的事件操作不同的`DOM`或者是相同的`DOM`那变的越来越乱每一次开发迭代的时候越来越小心翼翼可以说是因为这个痛点造就了`React`
和`Vue`的诞生，虽然我们的课程是`Vue`的课程不过这块内容的话`Vue`和`React`没有太大的区别那它们都是通过引入一个 数据的中间层 `state`  来避免我们直接操作我们的`DOM`那在`Vue`中我们不再关注我们的`DOM`元素而我们需要关注的仅仅是我们的数据`state`所有的事件我们最后操作的对象都应该是我们的数据然后由`Vue`底层来将数据映射到我们的`DOM`上那数据的变化会导致`DOM`的更新而`DOM`的更新变动也会非常耗性能的，影响用户体验的而当数据变化后如何尽可能减少我们的`DOM`更新这就是形成了一个新的难题那这时候 `虚拟DOM` 的概念就被提了出来那我们的数据不是直接反应到真实的`DOM`节点上而是先通过数据和我们的模板生成一个类似`DOM`树的一个结构其实就是一个树结构一个body下面有div有span有p标签其实就是一个树结构但是这个树结构不是真实的`DOM`结构而是通过我们的一个类似`JSON`对象来去保留我们这样一个树形结构的信息那这个`DOM`树的话我们就称之为`虚拟DOM`然后我们经过一定的算法机制来计算出我们`老的DOM树`和我们即将要更新的`DOM树`也就是我们新的DOM树最终我们要改变哪些`DOM`然后我们通过算法来计算出来我们要改变的真实`DOM`通过算法尽可能的复用我们已有的`DOM`减少我们因为`DOM`而带来的性能消耗这样就涉及到了我们两棵DOM树的比对就是我们前一个老的`DOM树`和我们新的`DOM树`它们之间比对我们要查找出来它们之间的差异正常情况下如果按照我们一个正常的比对算法的话那时间复杂度就是`On3`的复杂度那这个复杂度的性能是低的但是考虑到我们前端页面的一个结构的特殊性那我们通常情况下不太会出现跨层级节点的一个移动例如：我们body下面一个div，div下面是一个span那我们这个span大部分的情况下不会说我就更新到了body下面和原来的div成了同一节点当然它也是有可能存在的当我们基于这种假设我们就做出了这样一种比对的算法就是我们只对同层级的节点进行比较就像我们下面（4）图里面画的一样同颜色区域内的进行比较那第一层的进行比较第二层的进行比较而同层中画的橙色的和橙色进行比较蓝色的和蓝色的进行比较那这样我们的时间复杂度就降到了我们的`On1`的复杂度那其实就是把我们所有的`DOM`节点遍历一遍基本上是这样的一种情况。

1.事件操作`DOM`：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/1.png)

2.系统越来越复杂后事件操作`DOM`:
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/2.png)

3.Vue事件，中间层state，DOM元素：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/4.png)

4.两棵DOM树的比对：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/5.png)


那接下来我们通过几个场景来进一步加深理解：

有下面这样两棵`DOM`树，A的子节点B、C、D那直接变成我们的C、D、B这样的一个节点那映射到我们的`DOM`树的话是这样一种结构就是我们的div代表着我们的A节点就我们图中画的div下面第一个是div第二个是p第三个是span，那p标签下面又有我们的i标签和span标签就是我们图中所画的E和F实际上表达的意思就是说我们同级节点没有相同类型的第一层节点就是我们的根节点只有一个div第二级节点一个div一个p一个span我们用B、C、D来表示就是代表着我们同级节点没有相同类型的节点第三层是我们的E、F一样是一个i和一个span最终我们要把它变成我们2图右侧的这种形式就是把我们的p和我们的这个div做一个交换，交换位置，那么又再次回到我们这个1的图形那我们的目标是把C放到了B前面但是具体怎么移动那我们是直接把我们的这个B节点直接移动到我们的D节点后面呢？这样移动完之后就变成了C、D、E那和我们要的一个结构是一样的还是说先移动C放到了B前面然后在移动我们的D放到了我们的B前面那同样也能达到我们的C、D、E这样的一个效果那具体是怎么移动的呢其实这个我们不用太多的关注这个移动的路径我们要关注的只是说它是移动的还是新建的还是删除的就可以了我们在这里就不在明确它具体的一个移动路径了。

1.场景1（dom树的理解图）：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/6.png)

2.映射到我们的`DOM`树的结构：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/7.png)

那我们看一个场景2：
那这里的代码结构我们就不贴了，其实意思是一样的就是指的我们B、C、D其实就是指的同层节点没有相同类型的简单来说就是原来的C节点和B节点是同层级的那我们现在更新完之后我们变成了C节点变成了B节点的一个子节点那对于这种情况我们并不是说直接把我们的C节点移动到了我们的B节点下面那并不是这样子的（理解为同层比较），而是原来的C节点直接被删除掉连带着C节点的子节点E、F都会被删除掉然后在去B节点下面新建了我们的C、E、F这个问题就是因为同层节点比较的结果在我们比较我们第二层的时候第一层是我们的A节点第二层是我们的B、C、D那就行比较的时候发现我们的C节点不见了那就直接删除，删除完之后直接开始比对我们的第三层直接往下递归去比较到了B节点之后我发现要新增了我们的C节点那我们就直接新增在持续往下就新增我们的E和F，那从这也能看出算法呢它并不能达到最优解，那如果说按照我们以前`JQuery`的话我们可能是直接通过操作`DOM`把C节点直接移动到了B节点下面但算法的话它考虑的是一个时间负责度和一个通用性所以说它并不能达到最优解那好在的话我们不用手动去操作我们的`DOM`了。

场景2：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/8.png)

场景2同层节点比较说明图：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/9.png)


> 我们在看下第三中场景：

那第三种场景的话我们依然是删除我们的C和E、F，然后新建G和E、F，那主要是因为我们比对我们的第二层节点时候发现的C节点不在了就是原来可能C节点时个div现在变成了span了，我在新的DOM树下面我不需要这个div了然后我就把这个C节点一起删除掉然后去新建了例外一个节点那同样E、F也是新建的它并不能达到合理的复用。


![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/10.png)



> 我们接下来看场景4：

那A组件下面有3个B组件那对应的代码结构如下图2，那div A下面有3个di vB1、B2、B3的意思实际上是指的我们是同类的都是div只是说他可能只是一些属性的区别现在我们是class不一样class01、class02、class03那我们最终把它变换成我们的class02、class01、class03那我们看到的是直接移动B2节点到我们的B1节点上面这是最理想的模式，算法认为是你把B1更改成了B2也就是说它在比较第二层的时候它现在还不管你第三层有什么东西它也不知道你第三层有什么东西它是直接把B1变成了B2那B2变成了B1那这样就导致了一个问题就是我们B2下面的E、F节点并没有得到合理的复用等到比对我们第三层节点的时候而是直接去新建了我们的E、F这两个节点，name如何让我们的E、F得到复用要优化这个问题关键就是让算法知道我们不是要更新节点而是要移动节点这就是我们`Key`要做的事情将我们节点加上`key`之后我们可以认为每一个节点都有了唯一的标识符这样就变成了我们节点的移动实际上这个场景就退化成了我们或者进化成了我们场景1，在算法里它就认为我们加了key之后它就认为我们这个3个节点原来我们是通过类型来判断它是唯一的现在我们通过key来判断它是唯一的就已经进化成了场景1这样一个情况，同样在看另外一个场景就是我们的插入的一个场景那这个场景的话也是和有key和没key的情况下它是不一样的同样也是我们的A节点下面有B1、B2、B3三个同类型的节点这三个类型它有一些属性的不一致那现在的话我想要的是多了一个B4的节点，那多了这一个节点到底是从B2变成了我们的B4，B3变成了我们的B2然后又新增一个B3还是说直接插入一个我们想要的B4这就是又key和无key它两个之间的区别，那没key的时候算法不知道它认为你就是要更新，那有key的时候我有一个唯一标识符原来这个key假如就是1、2、3我现在要加入一个key为4的值那原来的1、2、3就可以复用然后直接插入我们的B4。



场景4：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/11.png)

场景4对应的代码图：
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/12.png)


场景4模拟节点移动图：

![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/13.png)


场景5：移动（有key）
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/14.png)

场景6：插入（有key）
![image](https://raw.githubusercontent.com/zhangh-design/vue-examples/master/07%20%E7%90%86%E8%A7%A3%E8%99%9A%E6%8B%9FDOM%E5%8F%8Akey%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BD%9C%E7%94%A8/15.png)


那这里面就又回到了我们前面的`todo-list`里面使用到了一个`key`如果我们没有使用`key`的话我们浏览器看到会有一些提示或者报错那我们这里使用的是`item.title`实际上并不严谨因为这个`title`它是一个课程1、课程2
但是很有可能是由重复的key并不推荐这么做但是我们这个场景里面我们它是没有的我们暂且先用它，我们现在思考一个问题就是说我们如果说不用这个`title`我们正常情况下应该是有`id`类似我们真实数据中会有课程的id做为唯一标识符的那如果连id都没有很多同学喜欢用这个`v-for="(item, index) in list"` `index`做为key，index就是这个索引然后把这个`key`变成`index` `:key="index"`大家可以想想这样会有说明问题一般情况下我们如果说原生的`dom`节点div下面也都是div的结构到没有太大的问题那如果说是我们自定义的组件用`index`做为`key`如果只是简单的用来展示那也不会有什么问题那如果说你这个`list`会动态的变化一会删除一会添加一会排序那使用这个`index`就会有一些问题了那这个的话大家可以在课后思考一下。

```
<todo-item @delete="handlerDelete" v-for="item in list" :key="item.title" :title="item.title" :del="item.del">
  <template v-slot:pre-icon="{value}">
    <span>前置图标 {{value}}</span>
  </template>
  <!-- <template v-slot:suf-icon>
    <span>后置图标</span>
  </template> -->
</todo-item>

export default {
    data(){
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
    }
}
```

#### 结语
那我们做一个总结那这节课的话我们通过多个场景来去了解了`Vue`中我们`虚拟DOM`如何去移动、新建、删除的，但对于移动这个场景我们大可不必去纠结它具体如何移动的路径包括`React`、`Vue`它们之间的这个移动路径都是不一致的一个使用的是单边比对一个使用的是双边比对这并不太重要，我们只需要知道我们什么场景下是移动什么场景下新建什么场景下是删除的就ok了还有我们的key属性的作用。

