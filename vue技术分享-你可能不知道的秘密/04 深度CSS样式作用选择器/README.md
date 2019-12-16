## css的/deep/及>>>用法（深度CSS样式作用选择器）

> /deep/ 深度选择器

在`Vue`中，我们为了避免父组件的样式影响到子组件的样式，会在`style`中加`<style scoped>`，这样父组件中如果有跟子组件相同的`class`名称或者使用选择器的时候，就不会影响到子组件的样式。

父组件Index.vue：

```
<template>
  <div class="a">
    <h1 class="title">{{ name }}</h1>
    <input type="text" v-model.lazy="name" />
    <Child/>
  </div>
</template>

<script>
import Child from './Child.vue';

export default {
  components: {
    Child
  },
  data () {
    return {
      name: ''
    }
  }
};
</script>

<style scoped>
.a .title {
  color: #ff0;
}
</style>

```

子组件Child.vue：

```
<template>
  <div>
    <h1 class="title">child</h1>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {};
  }
};
</script>

<style scoped>
.title {
  color: #f00;
}
</style>

```

我们在加了 scoped之后样式会自动添加一个hash值，如下：

![image](https://github.com/zhangh-design/vue-examples/blob/master/vue%E6%8A%80%E6%9C%AF%E5%88%86%E4%BA%AB-%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%E7%A7%98%E5%AF%86/04%20%E6%B7%B1%E5%BA%A6CSS%E6%A0%B7%E5%BC%8F%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8/3.jpg)

我们看到两个组件的同一个标签`h1`是输出不同颜色的，上面的`Index.vue`的`style`样式中并没有添加`/deep/`关键字，所以输出如下：

![image](https://github.com/zhangh-design/vue-examples/blob/master/vue%E6%8A%80%E6%9C%AF%E5%88%86%E4%BA%AB-%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%E7%A7%98%E5%AF%86/04%20%E6%B7%B1%E5%BA%A6CSS%E6%A0%B7%E5%BC%8F%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8/1.jpg)



> 但是这样也存在着一个问题，比如你使用了别人的组件或者自己开发一个组件，有时候你修改一处就可能影响到别的地方，这个时候你要么不用别人的组件，自己重新封装一个，但很多时候是不太现实的，所以就需要有一个方法或者方式，即不影响到别的地方，又能修改子组件在当前的样式。


那我们就需要 `/deep/`，使用方式也很简单在父组件`Index.vue`中添加`/deep/`关键字就可以了：

```
<style scoped>
    /deep/ .title{
        color: #ff0;
    }
</style>
```

![image](https://github.com/zhangh-design/vue-examples/blob/master/vue%E6%8A%80%E6%9C%AF%E5%88%86%E4%BA%AB-%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%E7%A7%98%E5%AF%86/04%20%E6%B7%B1%E5%BA%A6CSS%E6%A0%B7%E5%BC%8F%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8/2.jpg)

![image](https://github.com/zhangh-design/vue-examples/blob/master/vue%E6%8A%80%E6%9C%AF%E5%88%86%E4%BA%AB-%E4%BD%A0%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%E7%A7%98%E5%AF%86/04%20%E6%B7%B1%E5%BA%A6CSS%E6%A0%B7%E5%BC%8F%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8/4.jpg)

#### 注意：
当然`/deep/`换成`>>>`，也可以达到同样的效果但是有些像Sass之类的预处理器无法正确解析>>>。这种情况下你可以使用/deep/操作符取而代之- - - -这是一个>>>的别名，同样可以正常工作。
