var path = require('path');
var paths = require('./paths');
var getClientEnvironment = require('./env');
var webpack = require('webpack');

//plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('interpolate-html-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

var homepagePath = require(paths.appPackageJson).homepage;
var homepagePathname = homepagePath ? url.parse(homepagePath).pathname : '/';

function ensureSlash(path, needsSlash) {
  var hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return path + '/';
  } else {
    return path;
  }
}

var publicPath = ensureSlash(homepagePathname, true);
var publicUrl = ensureSlash(homepagePathname, false);

var env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.

module.exports = {
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  bail: true,
  mode: 'development',
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'eval',
  resolve: {
    modules: [
      'node_modules',
      'src',
      paths.appNodeModules,
      `src/${process.env.IMPORT_DIR || 'sk'}`
    ].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    //This allows you to set a fallback for where Webpack should look for modules.
    // We read `NODE_PATH` environment variable in `paths.js` and pass paths here.
    // We use `fallback` instead of `root` because we want `node_modules` to "win"
    // if there any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    // fallback: paths.nodePaths,
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      'react/addons': 'react-addons-test-utils',
      'react/lib/ReactContext': 'react-addons-test-utils',
      'react/lib/ExecutionEnvironment': 'react-addons-test-utils'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,

        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              sourceType: 'unambiguous',
              cacheDirectory: true,
              presets: [
                // Latest stable ECMAScript features
                require.resolve('@babel/preset-env', { modules: false }),
                require.resolve('@babel/preset-react')
              ],
              plugins: [
                [
                  require.resolve('@babel/plugin-transform-runtime'),
                  {
                    absoluteRuntime: false,
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                    useESModules: true
                  }
                ],
                [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
                [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
                [require.resolve('@babel/plugin-transform-modules-commonjs')],
                [require.resolve('@babel/plugin-transform-computed-properties')],
                [require.resolve('react-hot-loader/babel')]
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/';
              }
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['/styles/']
            }
          }
        ]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/bundle.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.DefinePlugin(env),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ]
};
