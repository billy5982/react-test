const path = require("path");
const HtmlwebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const port = process.env.PORT || 3000;
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/docs"),
  },
  mode: "production",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "/docs"),
    },
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: true,
        },
        // use: ["html-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
          // plugins: ["@babel/plugin-proposal-class-properties"],
        },
        // exclude: "/node_modules",
        // use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|png)$/i,
        // use: [
        //   {
        use: ["file-loader"],
        //     options: {
        //       name: "[name].[ext]",
        //     },
        //   },
        // ],
        // loader: "file-loader",
        // options: {
        //   name: "assets/[contenthash].[ext]",
        // },
      },
    ],
  },
  plugins: [
    new HtmlwebPackPlugin({
      template: "public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "common.css",
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  devServer: {
    host: "localhost",
    port: port,
    open: true,
  },
};

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = {
//   mode: "development",
//   entry: "./src/index.js",
//   output: {
//     path: path.resolve(__dirname, "docs"),
//     filename: "bundle.js",
//   },
//   module: {
//     rules: [
//       {
//         test: /\js|jsx?/,
//         loader: "babel-loader",
//         options: {
//           presets: [
//             "@babel/preset-env",
//             ["@babel/preset-react", { runtime: "automatic" }],
//           ],
//         },
//       },
//       {
//         test: /.html$/,
//         loader: "html-loader",
//         options: {
//           minimize: true,
//         },
//       },
//       {
//         test: /.css$/,
//         use: ["style-loader", "css-loader"],
//         exclude: /node_modules/,
//       },
//     ],
//   },

//   devServer: {
//     host: "localhost",
//     port: 3000,
//     open: true,
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html", // public/index.html 파일을 읽는다.
//       filename: "index.html", // output으로 출력할 파일은 index.html 이다.
//     }),
//     new MiniCssExtractPlugin({
//       filename: "style.css",
//     }),
//   ],
// };
