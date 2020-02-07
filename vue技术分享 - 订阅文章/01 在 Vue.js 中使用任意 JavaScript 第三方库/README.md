## 在 Vue.js 中使用任意 JavaScript 第三方库 
Lodash, Moment, Axios, Async … 等等, 这些非常有用的 JavaScript 库。你可能会在你的很多 Vue.js 应用中使用它们。

但随着项目的不断增长，您通常会将代码拆分成多个组件文件或模块文件。您也可能希望在不同的环境中能够运行你的 APP ，包括服务器渲染。

除非你已经找到一个简单而强大的方法来将这些 JavaScript 库包含到你的组件和模块文件中，否则这将是一件非常麻烦的事情！

#### 1. 全局变量

将 JavaScript 第三方库 添加到项目中，最简单的办法是通过将其附加到 window 对象上，以使其成为全局变量：

JavaScript 代码:

```
// entry.js 文件
window._ = require('lodash');
```

JavaScript 代码:

```
// MyComponent.vue 文件
export default{
  created() {
    console.log(_.isEmpty() ? 'Lodash everywhere!': 'Uh oh..');
  }
}
```

这种情况会使`window`对象不断增长，==但是最关键的是，他们不能使用服务器渲染==。当应用程序在服务端运行时，`window`对象是`undefined`的，因此尝试访问 `window`下的属性将会抛出一个错误。


#### 2. 在每个文件中导入

另一种二流的方法是将库导入到每个文件中：

JavaScript 代码:

```
// MyComponent.vue 文件
import _ from 'lodash';
export default{
  created() {
    console.log(_.isEmpty() ? 'Lodash is available here!': 'Uh oh..');
  }
}
```

这是有效的，但是你需要重复手动导入和移除，这是一个痛点：你必须记住将这个库导入到每个文件中，然后当你的某个文件不用这个库的时候, 记得要将它从这个文件中移除。如果你没有正确地设置你的构建工具，则可能会最终导致在构建包中存在同一个库的多个副本。

#### 3. 一个更好的方式，挂载到`Vue`原型对象上

在`Vue`项目中使用`Javascript`库的最干净，最健壮的方法是将其代理为`Vue` 原型对象的属性。

我们用这种方式，将`Moment`日期和时间库添加到我们的项目中：

JavaScript 代码:

```
// entry.js 文件
import moment from 'moment';
Object.definePrototype(Vue.prototype, '$moment', { value: moment });
```

由于所有组件都会继承`Vue`原型对象上方法，这将使`Moment`自动可用于任何组件，没有全局变量或任何需要手动导入的组件。它可以在任何`实例/组件`中简单地通过 `this.$moment` 访问被访问：

JavaScript 代码:

```
// MyComponent.vue 文件
export default{
  created() {
    console.log('The time is '. this.$moment().format("HH:mm"));
  }
}
```

#### 注意：

我们通常会像这样设置一个对象属性：

```
Vue.prototype.$moment = moment;
```

你可以这么做，但是通过使用 `Object.defineProperty` ，我们可以使用 描述符 来定义我们的属性。描述符允许我们设置一些低级细节，例如我们的属性是否可写，以及在 for 循环中枚举期间是否显示。

我们通常不会在日常使用 Javascript 中使用到描述符，因为 99％ 的时间我们不需要这么细致的属性分配。但这里给我们一个明显的优势：默认情况下，使用描述符创建的属性是只读的。

这意味着，一些糊涂的开发人员（可能是你）不能在组件内去做一些很愚蠢的事情, 并且破坏一切.

JavaScript 代码:

```
this.$http = 'Assign some random thing to the instance method';
this.$http.get('/'); // TypeError: this.$http.get is not a function
```

相反, 我们的只读实例则能很好的保护我们的库, 因为如果有人试图去覆盖它, 将会获得一个错误: TypeError: Cannot assign to read only property.
