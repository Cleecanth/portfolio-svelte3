const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const preprocess = require('svelte-preprocess');
const glob = require('fast-glob');

const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');
const configUtils = require('./config/utils.js');
const alias = require('./config/aliases.js');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const inlineFileSizeLimit = 4096;
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

const sassLoader = () => ({
    test: /\.(s?css)(\?.*)?$/,
    use: [
        dev
            ? // CSS HMR
              { loader: 'style-loader', options: { sourceMap: dev } }
            : // extract CSS in production builds
              MiniCssExtractPlugin.loader,

        { loader: 'css-loader', options: { sourceMap: dev } },

        'sass-loader',

        {
            loader: 'postcss-loader',
        },
    ],
});

const mediaLoader = () => ({
    test: /\.(jpe?g|png|gif|mp[34]|webm|ogg|wav|flac|aac)(\?.*)?$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: inlineFileSizeLimit,
                fallback: {
                    loader: 'file-loader',
                    options: {
                        name: `[hash]/[name].[ext]`,
                    },
                },
            },
        },
    ],
});

const svgLoader = () => ({
    test: /\.(svg)(\?.*)?$/,
    oneOf: [
        {
            resourceQuery: /inline/,
            use: {
                loader: 'svg-inline-loader',
            },
        },
        {
            loader: 'file-loader',
            options: {
                name: `[hash]/[name].svg`,
            },
        },
    ],
});

const fontLoader = () => ({
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: inlineFileSizeLimit,
                fallback: {
                    loader: 'file-loader',
                    options: {
                        name: `[hash]/[name].[ext]`,
                    },
                },
            },
        },
    ],
});

module.exports = {
    client: {
        entry: config.client.entry(),
        output: config.client.output(),
        resolve: { alias, extensions, mainFields },
        module: {
            rules: [
                /* js */
                {
                    test: /\.(mjs|js|jsx)$/,
                    enforce: 'post',
                    exclude: [
                        /node_modules\/core-js\//m,
                        /node_modules\/regenerator-runtime\//m,
                        /node_modules\/@?babel/,
                    ],
                    use: {
                        loader: 'babel-loader',
                        options: configUtils.babel,
                    },
                },

                /* svelte */
                {
                    test: /\.(svelte|html)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: configUtils.babel,
                        },
                        {
                            loader: 'svelte-loader',
                            options: {
                                dev,
                                emitCss: !dev,
                                hydratable: true,
                                hotReload: true, // pending https://github.com/sveltejs/svelte/issues/2377
                                preprocess: preprocess({
                                    transformers: {
                                        scss: configUtils.sass,
                                        postcss: true,
                                    },
                                }),
                                externalDependencies: glob.sync([
                                    './config/*.scss',
                                    'static/**/*.scss',
                                ]),
                            },
                        },
                    ],
                },

                /* sass */
                sassLoader(),

                /* svg */
                svgLoader(),

                /* various media */
                mediaLoader(),

                /* fonts */
                fontLoader(),
            ],
        },
        mode,
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[hash]/[name].css',
                chunkFilename: '[hash]/[name].[id].css',
            }),
            // pending https://github.com/sveltejs/svelte/issues/2377
            dev && new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
        ].filter(Boolean),
        devtool: dev && 'inline-source-map',
    },

    server: {
        entry: config.server.entry(),
        output: config.server.output(),
        target: 'node',
        resolve: { alias, extensions, mainFields },
        externals: Object.keys(pkg.dependencies)
            .concat('encoding')
            .concat('node-sass-middleware')
            .concat('node-sass')
            .concat('postcss-middleware')
            .concat('autoprefixer'),
        module: {
            rules: [
                {
                    test: /\.(svelte|html)$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            css: false,
                            generate: 'ssr',
                            dev,
                            preprocess: preprocess({
                                transformers: {
                                    scss: configUtils.sass,
                                    postcss: false,
                                },
                            })
                        },
                    },
                },
            ],
        },
        mode: process.env.NODE_ENV,
        performance: {
            hints: false, // it doesn't matter if server.js is large
        },
    },

    serviceworker: {
        entry: config.serviceworker.entry(),
        output: config.serviceworker.output(),
        mode: process.env.NODE_ENV,
    },
};
