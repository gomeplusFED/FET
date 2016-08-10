Note
-----------------

### electron  的安装

* 全局安装 electron-download

* 执行

	```bash
	ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/" electron-download --version=1.3.2
	```

	开始下载

* 解压安装

	下载好的文件包在 `~/.electon` 目录下，解压后得到 `electron.app` ，拷贝到应用程序文件夹下。

	解压命令：`unzip electron-v1.3.2-darwin-x64.zip`

	应用程序路径：`/Applications`

* 做软链

	```bash
	ln -s /Applications/Electron.app/Contents/MacOS/Electron /usr/local/bin/electron
	```

	这样，`electron` 命令就可以全局使用了，如果提示 `electron` 文件已存在，需删除。 `rm -rf /usr/local/bin/electron` 再做软链操作。


### vue 开发者工具的引入

[在这](http://electron.atom.io/docs/tutorial/devtools-extension/) 找到你的 vue tool 路径，然后在 `/src/main/app.js` 的 `ready` 回调中执行 `BrowserWindow.addDevToolsExtension(dev tool path);`

拓展引入只需执行一次，执行完毕后相关删除代码即可。



