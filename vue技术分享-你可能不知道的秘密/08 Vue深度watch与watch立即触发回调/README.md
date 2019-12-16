## Vue深度watch与watch立即触发回调

场景一：在`watch`里面检测对象里面对应的值是检测不到的，可以用如下方法：

选项：deep
  
在选项参数中指定`deep: true`可以监听对象中子属性的变化。

选项：immediate

在选项参数中指定 `immediate: true`将立即以表达式的当前值触发回调也就是默认触发一次。


```
watch: {
    obj: {
        handler(val, oldVal) {
        	console.log('属性变化触发这个回调',val, oldVal);
        },
        deep: true // 监测这个对象中每一个属性的变化
    },
    step: { // 属性 //watch
    	handler(val, oldVal) {
        	console.log("默认触发一次", val, oldVal);
        },
        immediate: true // 默认触发一次
    }
}
```
