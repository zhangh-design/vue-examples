## 长列表性能优化

我们应该都知道`vue`会通过`object.defineProperty`对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示不会有任何改变，我们就不需要`vue`来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 `vue`劫持我们的数据呢？可以通过`object.freeze`方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

- object.freeze方法冻结users值

```
export default {
    data(){
        return {
            users: {}
        }
    },
    async created() {
        const users = await axios.get("/api/users")
        this.users = Object.freeze(users)
    }
}
```

##### 注意：object.freeze方法冻结的只是users的值，其引用并未被冻结。

如果改变的是整个引用那么依然会出发视图层。

```
export default {
    data(){
        return {
            users: {}
        }
    },
    async created() {
        const users = await axios.get("/api/users");
        this.users = Object.freeze(users);
    },
    methods:{
        // 改变值不会触发视图响应
        // this.data.users[0] = newValue
        // 改变引用依然会触发视图响应
        // this.data.users = newArray
    }
}
```
