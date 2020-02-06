## 自定义组件添加click等事件不生效

- 场景一 : 一些自定义组件，需要额外添加一些事件来实现一些特定需求。

`click`事件不生效

```
<template>
    <div>
        <el-progress type="circle" :percentage="0" @click="stopProgress"></elprogress>
    </div>
</template>
<script>
export default {
    data(){
        return {
        }
    },
    methods:{
        stopProgress() {
            console.log('停止')
        }
    }
}
</script>
```

解决方法: 使用`.native`修饰符



```
<template>
    <div>
        <el-progress type="circle" :percentage="0" @click.native="stopProgress"></elprogress>
    </div>
</template>
<script>
export default {
    data(){
        return {
        }
    },
    methods:{
        stopProgress() {
            console.log('停止')
        }
    }
}
</script>
```
