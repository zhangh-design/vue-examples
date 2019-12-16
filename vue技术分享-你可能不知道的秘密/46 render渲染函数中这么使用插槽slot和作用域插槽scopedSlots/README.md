## render函数中怎么使用插槽slot和作用域插槽scopedSlots

#### 默认插槽

```
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

```
render: function(createElement){
    // `<div><slot></slot></div>`
    return createElement('div', this.$slots.default)
}
```

#### 具名插槽

```
<template>
  <div>
    <slot name="header"></slot>
  </div>
</template>
```

```
render: function(createElement){
    // `<div><slot name="header"></slot></div>`
    return createElement('div', this.$slots.header)
}
```

#### 作用域插槽

TodoList.vue
```
 render: function (createElement) {
    data(){
      return {
        user: { name: '小猫咪', status: false }
      }
    },
    return createElement('div',{
      this.$scopedSlots.preIcon(this.user)
    })
 }
```

Index.vue

```
<template>
  <todo-list>
    <template v-slot:preIcon="{name, status}">
      <h1 v-if="awesome">Vue is awesome!</h1>
      <span v-if="status">跑步</span>
      <span v-else>散步</span>
    </template>
  </todo-list>
</template>
```

---



#### 综合示例：

```
<template>
  <parent-node ref="parent-ref">
    <template v-slot:normal_name_slot>
      <p>子组件插槽</p>
    </template>
    <template v-slot:scope_slot="num">
      <p>作用域插槽{{num}}</p>
    </template>
    <template v-slot:default>
      <p>默认插槽</p>
    </template>
  </parent-node>
</template>
<script>
import { parentNode } from './RenderItem.js';
export default {
  components: {
    parentNode
  },
}
</script>
```

RenderItem.js
```
var grandsonNode = {
  mounted () {},
  render: function (createElement) {
    return createElement(
      'p',
      {
        attrs: {
          id: 'grandson'
        },
        // 给插槽得 default 起一个别名，后面就用 grandson_slot 来代替 default
        slot: 'grandson_slot'
      },
      [this.$slots.grandson_slot]
    );
  }
};

var childNode = {
  mounted () {},
  render: function (createElement) {
    return createElement(
      'div',
      {
        attrs: {
          id: 'child_id'
        }
      },
      [
        this.$scopedSlots.child_scope_slot(),
        createElement('ul', [
          createElement('li', ['列表组件1']),
          createElement('li', ['列表组件2'])
        ])
      ]
    );
  }
};

var parentNode = {
  data () {
    return {
      user: {
        name: '小明'
      }
    };
  },
  mounted () {},
  render: function (createElement) {
    return createElement(
      'div',
      {
        attrs: {
          id: 'parent_id'
        }
      },
      [
        createElement(grandsonNode, [
          createElement(
            'span',
            {
              slot: 'grandson_slot'
            },
            '子组件插槽'
          )
        ]),
        createElement(
          childNode,
          {
            scopedSlots: {
              child_scope_slot: function (props) {
                return createElement('h1', ['给子组件child传递作用域插槽']);
              }
            }
          },
          []
        ),
        this.$scopedSlots.scope_slot(10),
        this.$slots.normal_name_slot,
        this.$slots.default
      ]
    );
  }
};

export { grandsonNode, childNode, parentNode };

```



