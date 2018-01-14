const path = require('path');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const generateConfig = function (isProd) {
  const config = {
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'bundle.[hash].js',
      publicPath: '/',
    },
    devServer: {
      contentBase: path.resolve(__dirname, './dist'),
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
          test: /\.ts?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                compilerOptions: {
                  module: isProd ? 'commonjs' : 'es6'
                }
              },
            },
            'tslint-loader',
          ],

        }, {
          test: /\.(tag)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'riot-tag-loader',
              options: {},
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
                  sourceMap: true,
                },
              },
              'stylus-loader',
            ],
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'bundle.[hash].css',
        allChunks: true,
      }),
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: false,
      })
    ],
    resolve: {
      extensions: ['.js', '.ts', 'styl'],
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

    delete config.devtool;
  }

  return config;
}

module.exports = generateConfig(process.argv.indexOf('-p') !== -1);
