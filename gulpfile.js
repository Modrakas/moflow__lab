// ─────────────────────────────────────────────────────────────────
// ◈ MoFlow Lab - Gulp 4 Build Pipline
// Phase 1: Environment & Tooling
// Gulp → file-level transforms (SCSS → CSS, autoprefixer, PurgeCSS)
// webpack → module graph + JS bundle
// ─────────────────────────────────────────────────────────────────

const { src, dest, watch, series, parallel } = require ('gulp');

// - SCSS
const sass				 		= require('gulp-sass')(require('sass'));
const autoprefixer		= require('gulp-autoprefixer');
const PurgeCSS				= require('gulp-purgecss');

// - JS (webpack via Gulp stream)
const webpack					= require('webpack-stream');
const TerserPlugin		= require('terser-webpack-plugin');

// ─────────────────────────────────────────────────────────────────
// Paths
// ─────────────────────────────────────────────────────────────────

const paths = {
	scss: {
		src:		'sass/index.scss',
		watch: 	'sass/**/*.scss',
		dest:		'css/',
	},
	js: {
		entry:	'./js/app.js',
		watch: 'js/**/*.js',
		dest: 'dist/',
	},
	html: 'index.html',
}

// ──────────────────────────────────────────────────────────────────────
// webpack configuration
// ──────────────────────────────────────────────────────────────────────
//
//GSAP, ScrollTrigger, and Leni are declared as externals:
//they are loaded via <script> CDN rags in index.html and
//exist as globals at runtime. webpack must not bundle them.
//This keeps the output bundle smaller and rebuild times faster.

const webpackConfig = {
	mode: 'production',
	entry: paths.js.entry,
	output: {
		filename: 'main.min.js',
	},

	// ──────────────────────────────────────────────────────────────────────
	// ── Externals - CDN globals; Don't want it to bundle ──────────────────
	// ──────────────────────────────────────────────────────────────────────

	externals: {
		gsap:							'gsap',
		ScrollTrigger:		'ScrollTrigger',
		lenis:						'Lenis',
	},

	// ──────────────────────────────────────────────────────────────────────
	// ── Babel transplantation - ES6 modules → ES5 ─────────────────────────
	// ──────────────────────────────────────────────────────────────────────

	module: {
		rules: [
			{
				test:			/\.js$/,
				exclude:	/node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: '>0.5%, last 2 variations, not dead',
									modules: false, //to preserveES modules for webpack tree-shaking
								},
							],
						],
					},
				},
			},
		],
	},

	// ──────────────────────────────────────────────────────────────────────
	// ── Minification ──────────────────────────────────────────────────────
	// ──────────────────────────────────────────────────────────────────────

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: { drop_console: true },
					format: { comments: false },
				},
				extraComments: false,
			}),
		],
	},
};

// ───────────────────────────────────────────────────────────────────────────
// Task: styles
// SCSS →  autoprefixer → PurgeCSS → css/index.css
// ───────────────────────────────────────────────────────────────────────────
//
//PurgeCSS scans index.html for class names present in the static markup.
//classes that only exist inside JavaScript strings (DataManager template
//literals, CursorManager toggles, etc.) must be safelisted here - PurgeCSS
//will never see them in a static scan and would strip them from the output.

function styles() {
	return src(paths.scss.src, { sourcemaps,aps: true })
	.pipe(
		sass({ outputStyle: 'compressed' }).on('error', sass.logError)
	)
	.pipe(
		autoprefixer({ cascade: false })
	)
	.pipe(
		purgecss({
			content: [paths.html],

			// ── Safelist ──────────────────────────────────────────────────────────
			// Any class toggled by JS at runtime that never appears in
			//index.html must be here or it will be purged.
			safelist: {
				standard: [

				],
				deep: [

				],
				greedy: [

				], 
			},
		})
	)
	.pipe(dest(paths.scss.dest, { sourcemaps: '.' }));
}

// ─────────────────────────────────────────────
// Task: scripts
// js/app.js + modules → webpack → dist/main.min.js
// ─────────────────────────────────────────────

function scripts() {
	return src(paths.js.entry)
	.pipe(webpack(webpackConfig))
	.pipe(dest(paths.js.dest));
}

// ─────────────────────────────────────────────
// Task: watchFiles
// Watches SCSS and JS separately; runs only the relevant task on change to avoid full rebuilds.
// ─────────────────────────────────────────────

function watchFiles() {
	watch(paths.scss.watch, styles);
	watch(paths.js.watch, 	scripts);
}

// ─────────────────────────────────────────────
// Exported tasks
// ─────────────────────────────────────────────

// npx gulp						→ default: build then watch
// npx gulp build			→ one-off production build (styles + scripts in parallel)
// npx gulp styles		→ SCSS only
// npx gulp scripts		→ JS bundle only
// npx gulp watch			→ watch only (assumes a prior build)

exports.styles		= styles;
exports.scripts		= scripts;
exports.watch			= watchFiles;
exports.build			= parallel(styles, scripts);
exports.default		= series(parallel(styles, scripts), watchFiles);

