const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:{
        bundle:['./src/app.js','./src/scss/style.scss']
    },
    output:{
        path:'/dist',
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
                test:/\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test:/\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],  
    resolve:{
        modules:['node_modules'],
        extensions:['.js','.scss']
    }
}