const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: [
    'babel-polyfill',
    './app/handler.ts'
  ],
  resolve: {
    extensions: ['.js', '.ts', '.pem']
  },
  externals: [
    nodeExternals()
  ],
  output: {
    libraryTarget: 'commonjs',
    path: __dirname + '/.webpack',
    filename: 'app/handler.js'
  },
  target: 'node',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], include: [__dirname] },
      { test: /\.ts$/, loaders: ['ts-loader'], include: [__dirname] },
      { test: /\.pem$/, loaders: ['raw-loader'], include: [__dirname] }
    ]
  }
}
