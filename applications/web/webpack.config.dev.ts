// not sure why the webpack configs files show these ts import error (same style import work fine in the server code)
// but since these are just build file that we know work, ignoring them for the time being
// @ts-ignore
import path from 'path';
// @ts-ignore
import HtmlWebpackPlugin from 'html-webpack-plugin';
// @ts-ignore
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// @ts-ignore
import CircularDependencyPlugin from 'circular-dependency-plugin';

import * as webpackUtils from '../../webpackUtils';

// the mini css plugin does not type properly with Configuration so not od that here
const config = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  entry: path.join(__dirname, 'src', 'entry.tsx'),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: webpackUtils.RESOLVE_ALIAS,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts', 'tsx'],
    }),
    new MiniCssExtractPlugin(),
    new CircularDependencyPlugin({
      // exclude: /a\.js|node_modules/,
      // // include specific files based on a RegExp
      // include: /dir/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      // allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      // cwd: process.cwd(),
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    static: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 4000,
    open: false,
    hot: true,
    client: {
      overlay: {
        // typescript error in spec files might happen so showing the overlay in that case makes not sense
        errors: false,
        warnings: false,
      },
    },
    watchFiles: [path.join(__dirname, 'src', '**', '*')],
  },
};

export default config;
