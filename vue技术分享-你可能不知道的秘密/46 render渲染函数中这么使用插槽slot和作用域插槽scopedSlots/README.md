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
