// 6. 각각 브라우저 코드와 서버 코드를 번들링하는 방식
// @ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/
const path = require('path')

const nodeExternals = require('webpack-node-externals')

/** @type WebpackConfig[] */
const configs = [
  {
    entry: {
      browser: './src/index.tsx', // 브라우저
    },
    output: {
      path: path.join(__dirname, '/dist'), // 여기서 결과물 만들어짐
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
      ],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  {
    entry: {
      server: './src/server.ts', // 서버
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          // html 불러오기
          test: /\.html$/,
          use: 'raw-loader',
        },
      ],
    },
    target: 'node',
    // @ts-ignore
    externals: [nodeExternals()],
  },
]

module.exports = configs

// entry를 선언해 시작점을 선언하고
// 필요한 파일과 그에 맞는 loader를 제공하고
// 마지막으로 번들링에서 제외할 내용을 선언한 뒤 output으로 내보낸다.
