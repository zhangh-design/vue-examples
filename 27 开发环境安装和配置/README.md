0 开发环境安装和配置

1. 安装node.js

[->node.js（建议安装LTS的版本）](https://nodejs.org/zh-cn/)

注意：

下载完毕后，可以安装`node`，特别是`Win10`建议不要安装在系统盘（如C：）

测试是否安装成功（`npm`包管理器在`node.js`安装好了之后就会自动安装成功）：

```
C:\Users\zhangh>node -v
v12.16.1
```

```
C:\Users\zhangh>npm -v
6.13.4
```

2. 设置 node.js `prefix`（全局）和`cache`（缓存）路径

cmd命令下运行：

设置缓存文件夹

```
npm config set cache  "F:\Program Files\nodejs\node_cache"
```

设置全局模块存放路径

```
npm config set prefix "F:\Program Files\nodejs\node_global"
```

会自动生成下面的两个文件夹：

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/j5BRZUlgKbUG5yYXn162*Z*wcfodxEokbb3X.Qc2QBWiSBJi0ZTi4.KE7GqQxciIaHAqHZ9O*pDlXD19*1iFig!!/b&bo=wwADAQAAAAADB.M!&rf=viewer_4&t=5)

设置成功后，之后用命令`npm install XXX -g`安装以后模块就在`F:\Program Files\nodejs\node_global`里。

3. 基于 Node.js 安装cnpm（淘宝镜像）

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

这里是`-g`全局安装会把`cnpm`安装在`F:\Program Files\nodejs\node_global`目录下：

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/j5BRZUlgKbUG5yYXn162*TaWW9lE2ojUgbwS70vp4Qw3fIntG65DcJmvxndKYX2MQSlqsHNn76VcyVzXmahong!!/b&bo=oQGzAAAAAAARByM!&rf=viewer_4&t=5)

4. 设置环境变量（非常重要）

- 系统变量增加`NODE_PATH`值是`F:\Program Files\nodejs`
- 系统变量编辑`PATH`增加`;%NODE_PATH%`
- 系统变量编辑`PATH`增加`;F:\Program Files\nodejs\node_global`（这个是为`cnpm`配置的，不配置这个运行`cnpm -v`会出现` 'cnpm' 不是内部或外部的命令`）

5. 全局安装vue命令行工具，即vue-cli 脚手架

注意：`vue`的安装不建议全局而是安装在自己的项目内。

构建vue脚手架

```
C:\Users\zhangh>cnpm install -g @vue/cli
C:\Users\zhangh>cnpm install -g @vue/cli-init
```

卸载vue脚手架

```
npm uninstall vue-cli -g
```

测试是否安装成功：

```
C:\Users\zhangh>vue -V
@vue/cli 4.2.3
```

我们也可以使用：

```
// Vue cli 创建工程
vue create my-project
```

或者

（不推荐，这种形式安装出来的`Webpack`版本是`3`的版本，推荐使用上面的）

```
vue init webpack helloproject
```
