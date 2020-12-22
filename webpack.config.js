const path = require("path")

module.exports = {
  entry: './src/ts/index.ts',
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['tsx', '.ts', '.js']
  },
  output: {
    filename: "app.js",
    path: path.join(__dirname, 'dist'),
  },
}