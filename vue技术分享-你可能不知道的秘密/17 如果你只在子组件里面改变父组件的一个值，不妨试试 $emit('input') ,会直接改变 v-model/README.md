## 如果你只在子组件里面改变父组件的一个值，不妨试试`$emit('input')`会直接改变`v-model`

我们正常的父子组件通信是父组件通过`props`传给子组件，子组件通过 `this.$emit('eventName',value)`通知父组件绑定在`@eventName`上的方法来做相应的处理。


但是这边有个特例，`vue`默认会监听组件的`input`事件，而且会把子组件里面传出来的值赋给当前绑定到`v-model`上的值。


正常做法 - 父组件

```
template>
    <subComponent :data="param" @dataChange="dataChangeHandler"></subComponent>
</template>

<script >
export default {
    data () {
        return {
            param:'xxxxxx'
        }
    },
    methods:{
        dataChangeHandler (newParam) {
            this.param = newParam
        }
    }
}
</script>
```

正常用法 - 子组件

```
<script >
export default {
    methods:{
        updateData (newParam) {
            // 触发事件修改父组件中的值
            this.$emit('dataChange',newParam)
        }
    }
}
</script>
```

利用默认 input 事件 - 父组件

```
<template>
    <subComponent v-model="param"></subComponent>
</template>
```

利用默认 input 事件 - 子组件

```
<script >
export default {
    methods:{
        updateData (newParam) {
            this.$emit('input',newParam)
        }
    }
}
</script>
```

这样，我们就能省掉父组件上的一系列处理代码，`vue`会自动帮你处理好。

##### 注意：

这种方法只适用于改变单个值的情况，且子组件对父组件只需简单的传值，不需要其他附加操作(如更新列表)的情况。
