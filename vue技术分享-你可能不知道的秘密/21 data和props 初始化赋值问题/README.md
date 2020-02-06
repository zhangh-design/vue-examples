## data 和 props 初始化赋值问题

因为`props`要比`data`先完成初始化，所以我们可以利用这一点给`data`初始化一些数据进去。

看代码：

```
export default {
    props: {
        size: String
    },
    data(){
        return {
            buttonSize: this.size
        }
    }
}
```
