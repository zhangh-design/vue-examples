## `Vue`中传 `props` 时默认为`Boolean`的问题

在自定义一个组件时，发现若传来的`props`中定义了一个`type: Boolean`的值时。

1. 若定义`default: false`时

```
props: {
    show: {
        type: Boolean,
        default: false
    }
}
```

在渲染此组件时，不写`show`，如：<son></son>，则自定义组件的`show`被渲染为`false`。

在渲染此组件时，写`show`，如：<son show></son>，则自定义组件的`show`被渲染为`true`。

2. 若定义`default: true`时

```
props: {
    show: {
        type: Boolean,
        default: true
    }
}
```
在渲染此组件时，不写`show`，如：<son></son>，则自定义组件的`show`被渲染为`true`。

在渲染此组件时，写`show`，如：<son show></son>，则自定义组件的`show`被渲染为`true`。


