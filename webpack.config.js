const path = require('path');

module.exports = {
  entry: './src/snap_estimate_entrypoint.js',
  output: {
    filename: 'api.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'SnapAPI',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
