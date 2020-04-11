import { declare } from '@babel/helper-plugin-utils';

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

export default declare((api, options) => {
	const {
		modules = 'auto',
		wordpress = false,
		react = true,
		debug = false,
		removePropTypes = {},
		targets = {},
	} = options;

	const development =
		typeof options.development === 'boolean'
			? options.development
			: api.cache.using(() => process.env.NODE_ENV === 'development');

	const presets = [
		[
			require.resolve('@babel/preset-env'),
			{
				debug,
				useBuiltIns: 'usage',
				corejs: 3,
				bugfixes: true,
				modules,
				targets: {
					...defaultTargets,
					...targets,
				},
			},
		],
	];

	// preset-react should only be added if @wordpress/default is not being used.
	if (react && !wordpress) {
		presets.push([[require.resolve('@babel/preset-react'), { development }]]);
	}

	if (wordpress) {
		presets.push(require.resolve('@wordpress/default'));
	}

	return {
		presets,
		plugins: [
			[
				require.resolve('babel-plugin-transform-react-remove-prop-types'),
				{
					mode: 'remove',
					removeImport: true,
					ignoreFilenames: ['node_modules'],
					...removePropTypes,
				},
			],
			[
				[
					require.resolve('@babel/plugin-transform-runtime'),
					{ useESModules: !modules, corejs: 3 },
				],
			],
		],
	};
});
