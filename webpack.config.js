const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    // contenthash--> HERRAMIENTA DE WEBPACK PARA AGREGAR HASHES CADA
    //                QUE SE HAGA BUILD
    filename: "[name].[contenthash].js",
    // GUARDAR LA IMG COPIADA
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@images": path.resolve(__dirname, "src/assets/images"),
    },
  },
  module: {
    // REGLAS
    // DEFINIR TIPOS DE ARCHIVOS Y SUS LOADERS
    rules: [
      // BABEL
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // CSS --> SASS
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // CARGAR IMG
      {
        test: /\.png/,
        type: "asset/resource",
      },
      // CONFIGURACION FUENTES LOCALES
      // {
      //   test: /\.(woff|woff2)$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       limit: 10000,
      //       mimetype: "application/font-woff",
      //       name: "[name].[ext]",
      //       outputPath: "./assets/fonts/",
      //       publicPath: "../assets/fonts",
      //       esModule: false,
      //     },
      //   },
      // },
    ],
  },
  // PERSONALIZACION DE LAS REGLAS CON SUS PLUGINS
  plugins: [
    // INYECCION DEL JS EN HTML
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    // COPIAR IMG DE src A dist
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // terser--> PARA JS
      new TerserPlugin(),
    ],
  },
};
