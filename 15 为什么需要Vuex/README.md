## 为什么需要Vuex

> 前言：那从这节课开始我们就进入到`Vue`的生态篇的一个内容那相较于`react`来说`Vue`的一个生态就是可能并没有那么丰富但是它也有它的一个优势就是`Vue`很多的周边技术都是我们官方提供的你不用去纠结于这个技术的选型也不用担心一个彩蛋的问题。

那第一个的话就是我们的`Vuex`我们做一个状态管理的，那在讲解如何使用我们的`Vuex`之前我们先了解一下为什么需要`Vuex`它的应用场景有哪些，好那这里又要说回我们单向数据流的一个问题了就像下面图中看到的那整个系统的运行
它是一个单向的就是我们的数据去驱动我们视图的一个更新
用户在这个视图上面去进行一些操作然后触发我们的`Actions`通过`Actions`的一个方式在去更改我们的一个`state`而不是视图`View`直接更改我们的一个`state`。

![image](http://a4.qpic.cn/psb?/V12UXEll2JjLTU/4ZZMbWhYq4jFpHadKle21CPCjqnQMuC2Rw6VbNGPLPc!/m/dL8AAAAAAAAAnull&bo=WgItAQAAAAARB0Q!&rf=photolist&t=5)

对那这时候就带来了一个问题那我们的系统中经常会出现一份数据在多个组件中的一个使用就像图中看到的分别有`E`、`F`、`I`三个组件同时都需要展示我们的这个`userName`这个`userName`它还有可能被用户修改那修改之后呢其它组件我们要同步的去也要修改那问题来了那我们这个`userName`是如何管理。

![image](http://a4.qpic.cn/psb?/V12UXEll2JjLTU/8ThBA113niljgBsv2WpRIku7WdBPT6qIuGatY0ORZwE!/m/dFMBAAAAAAAAnull&bo=NwJIAQAAAAARB0w!&rf=photolist&t=5)

那最简单的一个方案呢就是说我们在它们共同的一个父节点上面去管理这份数据比如我们在它们共同的`A`节点上面提供这个`userInfo`然后里面有什么的`userName`或者是其它的一些东西好但是这种方式的话肯定是不行的我们前面也讲到了通过这个属性的层层传递的方式非常的脆弱而且成本还是非常高的。


![image](http://a3.qpic.cn/psb?/V12UXEll2JjLTU/e*qpw*4.xj8efDZdhT0miKZ4pAz2CPWHuDFBh.YbQ5A!/m/dLYAAAAAAAAAnull&bo=OwJNAQAAAAARB0U!&rf=photolist&t=5)

那要么就是我们前面章节提到过的我们的一个`provide`和`inject`来去做这样的一个数据管理，那这种方式它避免了我们层层传递的一个繁琐对于做一个小型的状态管理来说还是不错的一个方案但是当我们的一个状态树比较大的时候那我们就需要一个更加系统化的一个状态管理工具那我们要的也不在是仅仅能够提供响应式数据那么简单的事情了那我们需要动态的注册响应式数据那我们需要命名空间来管理我们的一个数据来组织我们的数据那我们还需要能够通过插件还记录我们数据的一个更改并方便我们的一个调试总总这么功能都是我们`Vuex`要做的一个事情。


![image](http://a4.qpic.cn/psb?/V12UXEll2JjLTU/J87FLzuCBc5frJ0QXDshn2rG.nnW7QtOKvRXkX.nICQ!/m/dLsAAAAAAAAAnull&bo=IAJEAQAAAAARB1c!&rf=photolist&t=5)


那我们看到下面这张图使我们官方网站一张非常精简的`Vuex`的一个运行机制，那`Vuex`不在和我们组件强相关了我们看到绿色虚线框里面就是我们`Vuex`要做的事情它已经和我们的组件你可以认为它已经没有一个强相关的一个关系不想`provide`一样你要在组件中去提供数据那`Vuex`它是可以独立的提供响应式数据的那整个的运行机制当然也是一个单向的数据流我们的`Vuex`提供数据来驱动我们的视图（驱动我们的`Vue Component`）视图通过我们的`Dispatch`  派发我们的`Actions`我们的`Actions`中可以进一步的做一些异步的操作就是我们可以去通过我们的 ajax 接口去 后端获取我们的一些想要的一些后端的数据然后我们通过我们的的一个`Commit`的形式提交给我们的`Mutations`由`Mutations`来去最终更改我们的`State`通过去更改`State`，那为什么要经过这一层`Mutations`呢这主要是我们需要在我们的`Devtools`里面去记录我们数据的一个变化就是在我们的插件中记录我们的数据变化这样的话我们通过插件可以进一步的去调试，所以说我们的`Mutations`它需要一个纯同步的一个操作那如果说你有异步的操作我们就需要在`Actions`中取处理。

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/S1G4*2hi*D5aPIJug2nMa0OZpBZ05B9RWhNFsigC8nLIi9uyZ.LWCaN8dgJcgA7I7wXVOI6lYiuDjiR98j4DTJrzl3MwE88STzF19lBHyys!/b&bo=EQJTAQAAAAARB3E!&rf=viewer_4&t=5)

如果说你没有异步的操作其实你是可以由组件`Vue Component`直接`Commit`到我们的`Mutations`的，那就是说其实这里中间还是有一条线的我们是可以直接`Commit`的。

![image](http://m.qpic.cn/psb?/V12UXEll2JjLTU/tDuggDm4einabIQto5O*G*3VF5g2SDWPNF6uCII2iJ8!/b/dLYAAAAAAAAA&bo=CAJTAQAAAAARB2g!&rf=viewer_4&t=5)


#### 结语：
那这就是我们整个的`Vuex`它的一个运行机制还有它要解决的一个场景。

好我们前面提到了我们`Vuex`的响应式数据并没有像我们的一个`Provide`一样挂载到我们的组件上面那`Vuex`是通过什么方式提供响应式数据的呢？

