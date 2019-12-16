## Vue数组、对象更新 视图不更新

很多时候，我们习惯于这样操作数组和对象：

我们看到我们这样子去操作数组，数组的数据是发生了变化但视图上却没有更新（这其实佐证了`Vue`其实还是单向数据流，至于双向是通过底层对语法约束操作来达到的），那我们看下有什么方法或者方式能解决这个问题呢？
```
<template>
  <div>
    {{arr}}
    <ul>
      <!--这里的key属性应该用index下标，此处使用只是为满足示例效果-->
      <li v-for="(item, index) in obj" :key="index">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      arr: [1, 2, 3],
      obj: {
        a: 1,
        b: 2
      }
    }
  },
  mounted () {
    setTimeout(() => {
      // 数组更新视图不更新
      this.arr[0] = 'OBKoro1';
      this.arr.length = 1;
      console.log(this.arr);// ['OBKoro1'];
      // 数据更新，对象视图不更新
      this.obj.c = 'OBKoro1';
      delete this.obj.a;
      console.log(this.obj); // {b:2,c:'OBKoro1'}
    }, 2000);
  }
}
</script>

```

解决方式：

1. this.$set(你要改变的数组、对象，你要改变的位置、key，你要改成什么value)

```
mounted(){
    setTimeout(() => {
      this.$set(this.arr, [0], 4)
      this.$set(this.obj, 'c', '3')
    }, 2000);
}
```

2. 直接重新赋值数组、对象
```
mounted(){
    setTimeout(() => {
      this.arr = [4, 5, 6]
      this.obj = { d: 4, e: 5, f: 6 }
    }, 2000);
}
```

3. 数组原生方法触发视图更新

`Vue`可以监测到数组的变化，数组原生方法：
- splice()
- push()
- pop()
- shift()
- unshift()
- sort()
- reverse()

```
setTimeout(() => {
    this.arr.push(7)
    // this.arr.splice(0, 1)
}, 2000);
```

意思是使用这些方法不用我们在进行额外的操作，视图自动进行更新。

推荐使用`splice`方法会比较好定义，因为`splice`可以在数组的任何位置进行删除/添加操作。


4. 小技巧

当数据已经更新了 但是视图没有更新的时候 比如 这里 视图并没有更新

```
<template>
  <div>
    {{arr}}
    <ul>
      <li v-for="(item, index) in obj" :key="index">
        {{item}}
      </li>
    </ul>
    <!-- 模板中一定要输出这个属性，不然就不是响应式 -->
    {{msg}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr: [1, 2, 3],
      obj: {
        a: 1,
        b: 2
      },
      msg: 1
    }
  },
  updated () {
    console.info('视图更新了');
  },
  mounted () {
    setTimeout(() => {
      // 数组更新视图不更新
      this.arr[0] = 'OBKoro1';
      this.arr.length = 1;
      console.log(this.arr);// ['OBKoro1'];
      // 数据更新，对象视图不更新
      this.obj.c = 'OBKoro1';
      delete this.obj.a;
      console.log(this.obj); // {b:2,c:'OBKoro1'}
      // 增加了一个响应式属性
      this.msg = 2
    }, 2000);
  }
}
</script>

```

说明`mounted`钩子函数中的这个定时器方法中没有触发视图更新 只要这里面随便一个对象能触发更新 则所有的视图更新都会生效

在data中写一个msg对象 执行定时器方法让msg自增一 这样所有的数据都会更新到视图中

注意：msg一定要在页面中展示出来 如果不想让他显示 可以用v-show隐藏掉 不能用v-if

#### 结语：
前三种解决方式我觉得都是比较符合开发规范的，最后的`小技巧`在开发中还是不可取的这样会导致不可预知的`bug`产生也不利于后期代码的`review`。


