// 使用 node path.resolve 將動態相對路徑轉換成絕對路徑
// 避免不同作業系統路徑不一致
const path = require("path");

// 獨立拆分css檔案插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("css/[name].css");

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, "./src"),
  entry: {
    index: "index.js",
    about: "about.js"
  },
  output: {
    // 預設output資料夾 ./dist ,也可自訂path修改如下
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name].js"
  },
  // 簡化引入路徑設定
  resolve: {
    modules: [
      path.resolve("src"),
      path.resolve("src/js"),
      path.resolve("src/sass"),
      path.resolve("node_modules")
    ],
    extensions: [".js"] // 引入時副檔名.js可省略不寫
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  },
  module: {
    rules: [
      // html loader
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      },
      // css loader
      {
        test: /\.css$/,
        use: extractCSS.extract(["css-loader", "postcss-loader"])
      },
      // sass、scss loader - 將css寫入js版本
      // {
      //   test: /\.(sass|scss)$/,
      //   use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      // },
      // sass、scss loader - 將css拆出獨立檔案版本
      {
        test: /\.(sass|scss)$/,
        use: extractCSS.extract(["css-loader", "postcss-loader", "sass-loader"])
      },
      // babel 編譯
      {
        test: /\.js$/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [extractCSS]
};
