## template元素上使用v-if和v-for

我们在做`v-if`判断的时候，可以把判断条件放在`template`节点上，最终的渲染结果将不包含`template`节点元素。


```
<div class="box">
    <template v-if="isVal">
        <h2>...</h2>
    </template>
    <template v-else>
        <h2>...</h2>
    </template>
</div>
```
