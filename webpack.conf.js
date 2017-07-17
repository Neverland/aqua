/**
 * @file webpack.conf
 * @author ienix(guoaimin01@baidu.com)
 *
 * @since 2017/7/17
 */

var webpack = require('webpack');

module.exports = {
    entry: __dirname + "/dist/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "index.js"
    },
    loaders: [
        {
            test: /\.js?$/,
            exclude: /.*node_modules((?!my-npm-linked-module-name).)*$/,
            loaders: ['react-hot', 'babel'],
        },
    ]
};
