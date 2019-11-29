<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    v-model <input v-model="message"/>
    <input :value="message" @input="handlerChange"/>
    {{message}} {{message+message}}
    <br/>
    .sync <text-document v-bind:title.sync="doc.title"></text-document>
    {{doc.title}}
    <div :id="message"></div>
    <!-- <ul>
      <todo-item v-for="item in list" :title="item.title" :del="item.del"></todo-item>
    </ul> -->
    <todo-list>
        <todo-item @delete="handlerDelete" v-for="item in list" :key="item.id" :title="item.title" :del="item.del">
          <template v-slot:pre-icon="{value}">
            <span>前置图标 {{value}}</span>
          </template>
          <!-- <template v-slot:suf-icon>
            <span>后置图标</span>
          </template> -->
        </todo-item>
    </todo-list>
  </div>
</template>

<script>
// import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue'
import TextDocument from './components/TextDocument.vue'

export default {
  name: 'app',
  components: {
    // TodoList,
    TodoItem,
    TextDocument
  },
  data () {
    return {
      message: 'hello world',
      preIconType: 'aaaaa',
      doc: {
        title: '课程安排表'
      },
      list: [
        {
          id: 1,
          title: '课程1',
          del: false
        },
        {
          id: 2,
          title: '课程2',
          del: true
        }
      ]
    }
  },
  methods: {
    handlerChange (e) {
      // 在这里去改变我们的message
      this.message = e.target.value
    },
    handlerDelete (val, flag) {
      console.log('handlerDelete ', val, ' 状态 ', flag)
    }
  }
}
</script>

<style>

</style>
