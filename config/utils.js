const path = require('path');
const sassImporter = require('./sass-importer');
const babelConfig = require('./babel.config');

const sassConfig = {
    outputStyle: 'expanded',
    errLogToConsole: true,
    includePaths: [
        path.resolve('../src'),
        path.resolve('../static'),
        path.resolve(process.cwd()),
    ],
    importer: sassImporter,
};

// function processSass(input) {
// const sass = require('node-sass');
// const postcss = require('postcss');
//     const content = input.content;
//     const attributes = input.attributes;
//     const filename = input.filename;

//     let cssResult = content;

//     if (attributes.type !== 'text/css' && attributes.lang !== 'css') {
//         try {
//             //console.log('importing');
//             sassConfig.data = content;
//             sassConfig.outFile = filename;
//             sassConfig.includePaths = [path.dirname(filename)];
//             sassConfig.importer = sassImporter;
//             cssResult = sass.renderSync(sassConfig).css.toString('utf-8');
//         } catch (e) {
//             return e;
//         }
//     }

//     return new Promise((fulfil, reject) => {
//         return postcss(require('../postcss.config.js'))
//             .process(cssResult, { from: filename })
//             .then((result) => {
//                 return fulfil({
//                     code: result.css,
//                     map: result.map,
//                 });
//             })
//             .catch((err) => reject(err));
//     });
// }

module.exports = {
    sassConfig,
    babel: babelConfig,
    sass: sassConfig,
    postcss: require('../postcss.config.js'),
};
