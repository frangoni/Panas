module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/../back/public',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    /* fallback: {
      http: require.resolve('stream-http'),
      events: require.resolve('events/'),
      url: require.resolve('url/'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      os: require.resolve('os-browserify/browser'),
      punycode: require.resolve('punycode/'),
      https: require.resolve('https-browserify'),
      querystring: require.resolve('querystring-es3'),
    }, */
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/env'],
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
};
