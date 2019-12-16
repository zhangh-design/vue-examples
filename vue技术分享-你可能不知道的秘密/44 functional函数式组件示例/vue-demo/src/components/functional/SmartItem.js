// 图片组件选项
var imgVNode = {
  props: ['data'],
  render: function (createElement) {
    return createElement('div', [
      // 接收函数式组件传递的插槽
      this.$slots.default,
      this.$slots.bbb,
      createElement('p', '图片组件'),
      createElement('img', {
        style: {
          width: '100px',
          height: '100px'
        },
        attrs: {
          src: this.data.url
        }
      })
    ])
  }
}

// 视频组件选项
var videoVNode = {
  props: ['data'],
  render: function (createElement) {
    return createElement('div', [
      createElement('p', '视频组件'),
      createElement('p', this.data.text)
    ])
  }
}
// 纯文本组件
var textVNode = {
  props: ['data'],
  render: function (createElement) {
    return createElement('div', [
      createElement('p', '纯文本组件'),
      createElement('p', this.data.text)
    ])
  }
}

// 暴露一个函数化组件，这样它就是一个无data状态、无上下文的一个函数化组件
export default {
  functional: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  render: function (createElement, context) {
    // eslint-disable-next-line no-unused-vars
    function getComponent () {
      var data = context.props.data
      if (data.type === 'img') return imgVNode
      if (data.type === 'video') return videoVNode
      return textVNode
    }
    console.info(context.slots().default);
    return createElement(
      getComponent(),
      {
        props: {
          data: context.props.data
        }
      },
      // context.default 相当于 context.slots().default
      /* 区别：<smart-item :data="data"><p v-slot:foo>first</p><p>second</p></smart-item>
       children 会给你两个段落标签，而 slots().default 只会传递第二个匿名段落标签 */
      [context.slots().bbb, context.slots().default]
    )
  }
}
