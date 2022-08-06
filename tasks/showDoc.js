// affiche la doc dans un navigateur
// cf https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js
const path = require('path')
const webpack = require('webpack')
const Server = require('webpack-dev-server/lib/Server')
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8081
const ip = process.env.IP || '127.0.0.1'

const webpackConfig = {
  mode: 'development',
  entry: {}, // rien à compiler ici
  output: {},
  devServer: {
    contentBase: path.resolve('.', 'documentation'),
    open: true,
    openPage: 'index.html',
    host,
    disableHostCheck: true, // au cas où host ne serait pas dans les dns
    port
  }
}

const compiler = webpack(webpackConfig)
const server = new Server(compiler, webpackConfig.devServer)
server.listen(port, ip, (error) => {
  if (error) return console.error(error)
  console.log(`Server started on http://${host}:${port}/`)
})
