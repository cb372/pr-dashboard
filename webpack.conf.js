var path = require('path');

module.exports = {
  entry: {
    app: ['./src/js/app.js']
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/app.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test:    /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=es2015&presets[]=react&plugins[]=transform-object-assign']
      },
      {
        test: /node_modules\/auth0-lock\/.*\.js$/,
        loaders: [
            'transform-loader/cacheable?brfs',
            'transform-loader/cacheable?packageify'
        ]
      }, 
      {
        test: /node_modules\/auth0-lock\/.*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify'
      }, 
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, '..', 'node_modules')
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, '../style')]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  }
};
