const postcssPresetEnv = require('postcss-preset-env');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
    plugins: [
        postcssPresetEnv,
        require('autoprefixer')({ grid: true }),

        // Minify for production
        !dev &&
            require('cssnano')({
                preset: [
                    'default',
                    {
                        mergeLonghand: false,
                        cssDeclarationSorter: false,
                    },
                ],
            }),
    ].filter(Boolean),
};
