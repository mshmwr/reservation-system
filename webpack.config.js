//引用path模組
const path = require("path");
module.exports = {
  //這個webpack打包的對象，這裡面加上剛剛建立的index.js
  devtool: "inline-source-map",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "bundle.js", // 要打包成什麼
    path: path.resolve("./build"), // 要打包在哪裡
  },
  module: {
    rules: [
      //第一個loader編譯JSX
      {
        test: /.js$/,
        exclude: /node_modules/, //不編譯的檔案
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: { version: 3, proposals: true },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "url-loader",
        options: {
          name: "[name].[ext]", // 配置 name 屬性 (第二步)
          limit: 8900, // 用以限制須轉為 base64 的文件大小 (單位：byte)
          fallback: require.resolve("file-loader"), // 超過大小則調用 file-loader
          outputPath: "img",
        },
      },
    ],
  },
  //增加一個給devserver的設定
  devServer: {
    port: 8080, //指定開啟port為8080
    historyApiFallback: true,
  },
};
