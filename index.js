const { declare } = require('@babel/helper-plugin-utils');

const defaultTargets = [
	'> 1%',
	'ie >= 11',
	'last 1 Android versions',
	'last 1 ChromeAndroid versions',
	'last 2 Chrome versions',
	'last 2 Firefox versions',
	'last 2 Safari versions',
	'last 2 iOS versions',
	'last 2 Edge versions',
	'last 2 Opera versions',
];

module.exports = declare((api, options) => {
	const {
		modules = 'auto',
		wordpress = false,
		debug = false,
		removePropTypes = {},
		targets = defaultTargets,
	} = options;

	const development =
		typeof options.development === 'boolean' ? options.development : api.env(['development']);

	const presets = [
		[
			require.resolve('@babel/preset-env'),
			{
				debug,
				useBuiltIns: 'usage',
				corejs: 3,
				bugfixes: true,
				modules,
				targets,
			},
		],
	];

	presets.push([require.resolve('@babel/preset-react'), { development }]);

	if (wordpress) {
		presets.push(require.resolve('@wordpress/babel-preset-default'));
	}

	return {
		presets,
		plugins: [
			!development
				? [
						require.resolve('babel-plugin-transform-react-remove-prop-types'),
						{
							mode: 'remove',
							removeImport: true,
							...removePropTypes,
						},
				  ]
				: null,
			[
				require.resolve('@babel/plugin-transform-runtime'),
				{ useESModules: !modules, corejs: 3 },
			],
		].filter(Boolean),
	};
});
