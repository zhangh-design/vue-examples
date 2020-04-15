## 事件参数$event

$event 是事件对象的特殊变量，在一些场景能给我们实现复杂功能提供更多可用的参数

#### 原生事件

在原生事件中表现和默认的事件对象相同

```
<template>
    <div>
        <input type="text" @input="inputHandler('hello', $event)" />
    </div>
</template>
export default {
    methods: {
        inputHandler(msg, e) {
            console.log(e.target.value)
        }
    }
}
```

自定义事件

在自定义事件中表现为捕获从子组件抛出的值

my-item.vue :

```
export default {
    methods: {
        customEvent() {
            this.$emit('custom-event', 'some value')
        }
    }
}
```

App.vue

```
<template>
    <div>
        <my-item v-for="(item, index) in list" @custom-event="customEvent(index, $event)">
            </my-list>
    </div>
</template>
export default {
    methods: {
        customEvent(index, e) {
            console.log(e) // 'some value'
        }
    }
}
```





