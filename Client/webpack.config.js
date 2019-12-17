module.exports = {
    devtool: 'inline-source-map',
    entry: "./src/index.tsx",
    mode: "development",
    watch: true,
    output: {
        filename: "./wwwroot/app.js",
        publicPath: "/",
        path: __dirname + "/../Server/VideoList"
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /node-modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node-modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    devServer : {
        historyApiFallback: true
    }
}
