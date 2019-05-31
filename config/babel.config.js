module.exports = {
    cacheDirectory: true,
    configFile: false,
    babelrc: false,
    ignore: [/@?babel/g, /core-js/g],
    sourceType: 'unambiguous',
    auxiliaryCommentBefore: 'Babel»',
    presets: [
        [
            require('@babel/preset-env'),
            {
                loose: true,
                modules: false,
                useBuiltIns: 'usage',
                debug: false,
                corejs: 3,
            },
        ],
    ],
    plugins: [
        // [
        //     require('@babel/plugin-transform-runtime'),
        //     {
        //         helpers: true,
        //         corejs: false,
        //         loose: true,
        //         useESModules: true,
        //     },
        // ],
        [require('@babel/plugin-syntax-dynamic-import')],
        //[require(`babel-plugin-loop-optimizer`)],
    ],
};
