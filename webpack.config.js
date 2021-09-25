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
    ],
  },
  //增加一個給devserver的設定
  devServer: {
    //contentBase: "./build", // 本來打包完的檔案位置
    port: 8080, //指定開啟port為3000
    historyApiFallback: true,
  },
};
