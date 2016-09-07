Develop Document
-----------------

##### Install `electron-download` global

```bash
npm install electron-download -g -d
```

##### Download electron(f**k GFW)

* set `ELECTRON_MIRROR` path to `https://npm.taobao.org/mirrors/electron/`

* exec `electron-download --version=1.3.2`

##### Unzip electron

Downloaded `electron.zip` in `~/.electon`, unzip it and open, get your `electron.app` path like `/Users/test/.electron/Electron.app/Contents/MacOS/Electron`

##### Custom electron path

* Copy `./config/custom.config.js.sample` to `./config/custom.config.js`.

* Set some custom params, like electron path, debugport, qiniu token and so on.

	Note: you should replace `\` to `/` on window while setting electron app path

##### Install node_modules

* `npm i -d`

##### Develop

* `npm run dev:render`

* `npm run dev:main`
