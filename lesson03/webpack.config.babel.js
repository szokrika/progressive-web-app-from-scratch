import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: [
    './src/client',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.global\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            sourceMap: true
          } }
        ]
      },
      { test: /^((?!\.global))*\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            sourceMap: true,
            modules: true
          } }
        ]
      }
    ],
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};