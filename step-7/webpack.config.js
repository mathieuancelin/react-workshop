var webpack = require('webpack');

module.exports = {
  output: {
    path: './public/js/',
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
      }
    }
  },
  entry: {
    app: ['./src/app.js']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  }
};
