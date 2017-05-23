// 使用node内置模块path获取输出目录绝对路径
const path = require('path');

// webpack一些插件的入口
const webpack = require('webpack');

// 获取约定好的node环境变量以根据当前环境（生产或测试）启动不同的编译方式
const PROD = JSON.parse(process.env.PROD_ENV || 0);

// 获取工作目录绝对路径
const PATH = process.cwd();

// 获取工作目录名称
const PROJECTNAME = process.platform.indexOf('win') != -1 ? PATH.split('\\').pop() : PATH.split('/').pop();

module.exports = {
    entry : './main.js',
    
    output : {
        path : path.resolve( __dirname, "dist" ),

        filename : 'bundle.js',

        publicPath : PROD ? '/' + PROJECTNAME + '/dist/' : '/dist/',
    },

    module : {
        rules : [
            {
                test : /\.less$/,
                loader : 'style-loader?insertAt=top!css-loader!less-loader'
            },
            {
                test : /\.css$/,
                loader : 'style-loader!css-loader'
            }
        ],
    },

    plugins : PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            minimize : true,
        }),
    ] : [],
}
