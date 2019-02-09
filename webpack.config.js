// 使用 node path.resolve 將動態相對路徑轉換成絕對路徑
// 避免不同作業系統路徑不一致
const path = require("path");

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
      path.resolve("src/images"),
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
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      // babel 編譯
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      /*
        圖片優化1 壓縮圖片 image-webpack-loader
        圖片優化2 url-loader
        1.) 將小圖檔轉譯為64base格式，減少http請求，降低server負擔
        2.) 圖片檔名加入hash更新快取
      */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 檔案大小超過8k的圖片不轉譯，只更新以下檔名，加入hash更新快取
              name: "[path][name].[ext]?[hash:8]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  }
};
