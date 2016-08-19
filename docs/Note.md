Note
-----------------

### electron  的安装

* 全局安装 electron-download

	```bash
	npm install electron-download -g -d
	```

* 下载 electron 包

	```bash
	(set )ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/" electron-download --version=1.3.2
	```

* 解压安装

	下载好的文件包在 `~/.electon` 目录下，解压后得到 `electron.app/electron.exe` ，打开 electron 应用后可以看到 electron 的安装路径。

* 配置 electron 路径

	将本项目 config 文件夹下的 custom.config.js.sample 拷贝一份，名为 custom.config.js，将 path 字段替换为你的 electron 安装路径。

	注意：win下需要把 \ 替换为 /

### vue 开发者工具的引入

[在这](http://electron.atom.io/docs/tutorial/devtools-extension/) 找到你的 vue tool 路径，然后在 `/src/main/app.js` 的 `ready` 回调中执行 `BrowserWindow.addDevToolsExtension(dev tool path);`

拓展引入只需执行一次，执行完毕后相关删除代码即可。



