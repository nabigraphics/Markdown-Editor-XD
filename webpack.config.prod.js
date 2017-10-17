const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path');
module.exports = {
    entry:{
        bundle:['babel-polyfill','./src/app.js','./src/scss/style.scss'],
        notipoix3:['./src/scss/react-notipoix3.scss']
    },
    output:{
        path:path.resolve(__dirname + '/dist'),
        filename:'[name].js',
        publicPath:'/'
    },
    devServer: {
        hot:true,
        inline: true,
        port: 25252,
        host:'0.0.0.0',
        contentBase: __dirname + '/dist/',
        historyApiFallback: true,
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['env','react']
                    }
                }
            },
            {
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            }
        ]
    },
    plugins:[
        new webpack.optimize.ModuleConcatenationPlugin(),
        new LodashModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
        })
    ],  
    resolve:{
        modules:['node_modules'],
        extensions:['.js','.scss']
    }
}