const path = require('path');
const fs = require('fs');
const babel = require('@babel/core');
const babelPresetDefault = require('../index');

describe('Babel preset default', () => {
	test('transpiles ES6+ code properly', () => {
		const input = fs.readFileSync(path.join(__dirname, '../fixtures/es6+.js'));

		const output = babel.transform(input, {
			configFile: false,
			envName: 'production',
			presets: [babelPresetDefault],
		});

		expect(output.code).toMatchSnapshot();
	});

	test('transpiles react code properly', () => {
		const input = fs.readFileSync(path.join(__dirname, '../fixtures/react.js'));

		const output = babel.transform(input, {
			configFile: false,
			envName: 'production',
			presets: [[babelPresetDefault, { react: true }]],
		});

		expect(output.code).toMatchSnapshot();
	});

	test('transpiles wordpress code properly', () => {
		const input = fs.readFileSync(path.join(__dirname, '../fixtures/react.js'));

		const output = babel.transform(input, {
			configFile: false,
			envName: 'production',
			presets: [[babelPresetDefault, { wordpress: true }]],
		});

		expect(output.code).toMatchSnapshot();
	});
});
