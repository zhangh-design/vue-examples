## 阻止 <el-form> 默认提交行为

有时候我们在用饿了么组件`<el-form>`组件在文本框中键入`enter`快捷键的时候会默认触发页面刷新。


我们可以加入如下代码解决其默认行为：


```
<el-form @submit.native.prevent>...</el-form>
```
