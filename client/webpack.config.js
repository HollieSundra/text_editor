const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    //Entry point of files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    //Output of bundles
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    //Plugins generating html to inject into bundles
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'My Text Editor'
      }),
      //Creates manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'My Text Editor',
        short_name: 'JATE',
        description: "Have the ability to create notes with or without the internet!",
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            size: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
        theme_color: '#225ca3',
        background_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        display: 'standalone',
        crossorgin: 'use-credentials',
      }),
      //Injecting our service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/prest-env"],
              plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime"]
            }
          }  
        }
      ],
    },
  };
};
