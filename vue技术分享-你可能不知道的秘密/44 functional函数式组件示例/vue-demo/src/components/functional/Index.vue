<template>
  <div>
    <smart-item :data="data">
      <template v-slot:default>
        <p>默认插槽：函数式组件切换不同类型组件-示例</p>
      </template>
      <template v-slot:bbb>
        <p>具名插槽：函数式组件切换不同类型组件-示例</p>
      </template>
    </smart-item>
    <button @click="change('img')">切换为图片组件</button>
    <button @click="change('video')">切换为视频组件</button>
    <button @click="change('text')">切换为纯文本组件</button>
  </div>
</template>

<script>
import SmartItem from './SmartItem.js';
export default {
  components: {
    SmartItem
  },
  data () {
    return {
      data: {}
    };
  },
  created () {
    this.change('img');
  },
  mounted () {
    this.$nextTick(() => {
      console.info(this.$slots);
    });
  },
  methods: {
    change (type) {
      if (type === 'img') {
        this.data = {
          type: 'img',
          url: 'https://www.baidu.com/img/bd_logo1.png'
        };
      } else if (type === 'video') {
        this.data = {
          type: 'video',
          text: '这是一个视频'
        };
      } else if (type === 'text') {
        this.data = {
          type: 'text',
          text: '这是一段纯文本'
        };
      }
    }
  }
};
</script>

<style>
</style>
