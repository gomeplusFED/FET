<script>
import {
	remote,
	ipcRenderer
} from 'electron';

import fs from 'fs';
import path from 'path';

ipcRenderer.send('download-plugin', 'https://github.com/luoye-fe/amp-fet/archive/fet.zip');

const app = remote.app;
const win = remote.getCurrentWindow();

</script>
