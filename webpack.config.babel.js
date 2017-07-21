import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default function () {
  const isProd = process.argv.indexOf('-p') !== -1;
  const config = {
    context: path.resolve(__dirname, './src'),
    entry: {
      app: './index.js',
    },
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devServer: {
      contentBase: path.resolve(__dirname, './src'),
      historyApiFallback: true,
      stats: {
        hash: false,
        version: false,
        modules: false,
      },
      port: 8080,
      disableHostCheck: true,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'eslint-loader',
          ],
        }, {
          test: /\.(tag)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'riotjs-loader',
              options: {
                type: 'none',
              },
            },
          ],
        }, {
          test: /\.styl$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [autoprefixer],
                },
              },
              'stylus-loader',
            ],
          }),
        }, {
          test: /\.(html)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1,
              name: '[name].[ext]',
            },
          }],
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'bundle.css',
        allChunks: true,
      }),
      new webpack.ProvidePlugin({
        riot: 'riot',
      }),
      new CopyWebpackPlugin([
        { from: path.resolve(__dirname, './public') },
      ]),
    ],
    resolve: {
      extensions: ['.js', 'styl'],
      modules: ['node_modules'],
    },
  };

  if (isProd) {
    config.plugins.push(
      new CleanWebpackPlugin(['dist/*'], {
        root: __dirname,
        verbose: true,
        dry: false,
      }),
    );
  } else {
    config.devtool = 'eval';
  }

  return config;
}
