## 为什么需要Vuex

> 前言：那从这节课开始我们就进入到`Vue`的生态篇的一个内容那相较于`react`来说`Vue`的一个生态就是可能并没有那么丰富但是它也有它的一个优势就是`Vue`很多的周边技术都是我们官方提供的你不用去纠结于这个技术的选型也不用担心一个彩蛋的问题。

那第一个的话就是我们的`Vuex`我们做一个状态管理的，那在讲解如何使用我们的`Vuex`之前我们先了解一下为什么需要`Vuex`它的应用场景有哪些，好那这里又要说回我们单向数据流的一个问题了就像下面图中看到的那整个系统的运行
它是一个单向的就是我们的数据去驱动我们视图的一个更新
用户在这个视图上面去进行一些操作然后触发我们的`Actions`通过`Actions`的一个方式在去更改我们的一个`state`而不是视图`View`直接更改我们的一个`state`。

![image](http://a4.qpic.cn/psb?/V12UXEll2JjLTU/4ZZMbWhYq4jFpHadKle21CPCjqnQMuC2Rw6VbNGPLPc!/m/dL8AAAAAAAAAnull&bo=WgItAQAAAAARB0Q!&rf=photolist&t=5)

对那这时候就带来了一个问题那我们的系统中经常会出现一份数据在多个组件中

![image](http://a4.qpic.cn/psb?/V12UXEll2JjLTU/8ThBA113niljgBsv2WpRIku7WdBPT6qIuGatY0ORZwE!/m/dFMBAAAAAAAAnull&bo=NwJIAQAAAAARB0w!&rf=photolist&t=5)

