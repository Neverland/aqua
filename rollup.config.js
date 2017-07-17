/**
 * @file rollup.config
 * @author ienix(enix@foxmail.com)
 *
 * @since 2017/7/17
 */

import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-minify'

export default {
    entry: 'src/index.js',
    format: 'umd',
    plugins: [
        babel({
            include: 'src/**'
        }),
        minify({umd: {
            dest: 'dist/index.min.js',
            sourceMapUrl: 'dist/index.js.map'
        }})
    ],
    moduleName: 'aqua',
    dest: 'dist/index.js'
};
