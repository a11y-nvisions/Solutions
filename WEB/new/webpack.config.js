const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'main'),
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "main.js",
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname,'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      use: ['babel-loader'],
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  
  devtool:'eval-cheap-source-map'
};