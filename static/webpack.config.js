const webpack = require('webpack');
const config = {
    entry:  __dirname + '/js/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },

    watch: true,

    // resolve: {
    //     extensions: ['.js', '.jsx', '.css']
    // },
    module: {
        // rules: [
        //     {
        //       test: /\.scss$/,
        //       use: [
        //           {
        //               loader: 'style-loader'
        //           },
        //           {
        //               loader: 'css-loader',
        //               options: {
        //                   modules: true
        //               }
        //           }
        //       ]
        //     }
        // ]
        rules: [
            {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']}
        ]
    }
};
module.exports = config;