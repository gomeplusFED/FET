import path from 'path';

export default {
	renderPath: {
		dev: 'http://localhost:5757/main.html',
		production: 'file://' + path.join(__dirname, '../../render/view/main.html')
	}
};
