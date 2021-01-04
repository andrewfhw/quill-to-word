import * as path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: Configuration = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'QuillToWord',
        libraryTarget: 'umd'
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    externals: {
        docx: 'docx'
    }
};

export default config;