/**
 * @file rollup.config
 * @author ienix(enix@foxmail.com)
 *
 * @since 2017/7/17
 */

import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/index.js',
    format: 'umd',
    plugins: [
        babel({
            include: 'src/**'
        })
    ],
    moduleName: 'aqua',
    dest: 'dist/index.js'
};
