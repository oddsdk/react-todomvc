const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'),
        // https://stackoverflow.com/a/73027407
        hashFunction: 'xxhash64'
    },
    mode: 'production',
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        hot: true
    },
    optimization: {
        minimize: false,
    },
    performance: {
        hints: false
    }
};