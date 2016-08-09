module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module'
	},
	extends: 'standard',
	env: {
		node: true,
		browser: true
	},
	rules: {
		indent: ['error', 'tab'],
		semi: ['error', 'always'],
		'space-before-function-paren': ['error', 'never'],
		'no-unused-vars': ['off'],
		'no-extend-native': ['error', {
			'exceptions': ['Object', 'Date', 'String', 'Array', 'Function']
		}],
		'no-unneeded-ternary': ['error', {
			'defaultAssignment': false
		}],
		'arrow-parens': 0
	}
}
