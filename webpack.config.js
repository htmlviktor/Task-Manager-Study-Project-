const path = require(`path`);

module.exports = {
  mode: `development`, // режим сборки
  entry: `./src/main.js`, // точка входа
  output: { // настройка выходного файла
    filename: `bungle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`), //  где искать сборку
    publicPath: `http://localhost:8080/`, // вебадрес строки
    compress: true,
    watchContentBase: true
  }
};
