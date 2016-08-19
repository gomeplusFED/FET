import path from 'path';

export default {
	renderPath: {
		dev: 'http://localhost:5757',
		production: 'file://' + path.join(__dirname, '../../render/index.html')
	}
};
