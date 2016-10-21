Contribute plugin to FET
--------------------------------------------------
#### Create a new repo in your github


#### Complete functions in your plugin

your plugin can be **pure web app** or **electron app**.

#### Configure `package.json`

* add `fet` field to `package.json`

* all options

	#### type

	* Type: String

	* Default: null

	* Required: **true**

	* Description: plugin type. Can be list of `app` `web`

		`app`: If your plugin is an electron app, you should set type to be `app`, and ensure that `package.json->main` is right. Then you don't have to set other options include `entry` `size` `position`.

		`web`: If your plugin is a pure web app, you should set other options as follow.

	#### name

	* Type: String

	* Default Value: ''

	* Required: false

	* Description: Plugin name, if empty, will use `package.json->name`

	#### desc

	* Type: String

	* Default Value: ''

	* Required: false

	* Description: Plugin desc, if empty, will ues `package.json->description`

	#### entry (only `web`)

	* Type: String

	* Default Value: ''

	* Required: **true**

	* Description: Plugin entry. Can be `http://` or relative path.

	#### icon

	* Type: String

	* Default Value: ''

	* Required: false

	* Description: Plugin icon. Can be `http://` or relative path. If empty, will use first character of plugin name.

	#### size (only `web`)

	* Type: String

	* Default Value: 'default'

	* Required: false

	* Description: Plugin main window size. Can be list of `default`, `full`, `custom`

		`default`: Electron defaule size, 800 width, 600 height.

		`full`: Full screen.

		`custom`: Custom. You should set `width` and `height`.

	#### width (only `web`)

	* Type: Number

	* Default Value: 800

	* Required: false

	* Description: Plugin main window width. It will work while `size` is `custom`.

	#### height (only `web`)

	* Type: Number

	* Default Value: 600

	* Required: false

	* Description: Plugin main window height. It will work while `size` is `custom`.

	#### position (only `web`)

	* Type: String

	* Default Value: 'default'

	* Required: false

	* Description: Plugin main window position. Can be list of `default`, `custom`

		`default`: Center.

		`custom`: Custom. You should set `X` and `Y`.

	#### X (only `web`)

	* Type: Number

	* Default Value: ''

	* Required: false

	* Description: Plugin main window position of X. It will work while `position` is `custom`.

	#### Y (only `web`)

	* Type: Number

	* Default Value: ''

	* Required: false

	* Description: Plugin main window position of Y. It will work while `position` is `custom`.

#### Create new branch named `fet` fro FET to download your plugin.

#### Example: [amp-fet](https://github.com/luoye-fe/amp-fet)
