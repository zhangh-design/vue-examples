## 手动操控自定义组件 （ref属性）

场景：一些自定义组件，需要去获取组件对象进行一些其它的 dom 操作。

解决方法：使用 `ref` 属性暴露组件获取句柄。


```
<template>
  <div>
    <el-progress type="circle" :percentage="O" ref="progress"></el-progress>
  </div>
</template>

mounted(){
  this.$refs.progress //组件对象实例， 可以手动调用组件的内置方法和属性
  this.$refs.progress.$el //组件 对象的最外层dom元素
}

```

this.$refs.progress  （组件对象实例， 可以手动调用组件的内置方法和属性）

this.$refs.progress.$el  （组件对象的最外层dom元素）

