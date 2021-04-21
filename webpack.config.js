const path = require('path')

// ce plugin sert à générer les fichiers html à partir de modèles, en y injectant des variables
// c'est utile pour :
// - insérer automatiquement les tags pour charger les js/css compilés
//   => permet de contourner les pbs de cache des navigateurs (dans le html on charge un js/css dont le nom change
//      à chaque compilation, si le navigateur a en cache un vieux fichier html il va charger les anciens js, mais
//      s'il recharge le html il aura forcément les nouveaux, même si les anciens sont en cache)
// - avoir un html qui dépend du contexte de compilation (dev ou prod par ex)
const HtmlWebpackPlugin = require('html-webpack-plugin')

// ce module sert à extraire les css (rencontré dans du js avec du `import 'path/to/file.css'`) dans des fichiers
// séparés créé à cette occasion (sinon ce serait dans le code js)
// cf https://webpack.js.org/plugins/mini-css-extract-plugin/
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  // les js à compiler, cf https://webpack.js.org/configuration/entry-context/#entry
  entry: {
    mathalea: './mathalea.js'
  },
  output: {
    // on vide build avant chaque compilation
    clean: true,
    // le dossier dans lequel mettre les js|css|html compilés
    path: path.resolve(__dirname, 'build'),
    // on ajoute le hash dans le nom du fichier => plus besoin de demander aux utilisateur de vider leur cache tout le temps
    // cf https://webpack.js.org/configuration/output/#outputfilename
    filename: '[name].[contenthash].js'
  },
  // ça c'est la config pour devServer, lancé au `pnpm start`
  devServer: {
    open: true,
    host: 'localhost',
    // on active le hot module replacement (HMR)
    hot: true
  },
  // Cf https://webpack.js.org/configuration/plugins/
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    // https://webpack.js.org/plugins/html-webpack-plugin/
    // https://github.com/jantimon/html-webpack-plugin#options
    new HtmlWebpackPlugin({
      template: 'mathalea.html',
      filename: 'mathalea.html'
    }),
    new HtmlWebpackPlugin({
      template: 'exercice.html',
      filename: 'exercice.html'
    }),
    new HtmlWebpackPlugin({
      template: 'mathalealatex.html',
      filename: 'mathalealatex.html'
    }),
    new HtmlWebpackPlugin({
      template: 'exo.html',
      filename: 'exo.html'
    }),
    new HtmlWebpackPlugin({
      template: 'cm.html',
      filename: 'cm.html'
    })
  ],
  // La liste des fichiers à traiter
  module: {
    // chaque élément de ce tableau est un objet précisant une regexp pour savoir s'il faut appliquer la règle au fichier
    // et un loader qui doit traiter le fichier, cf https://webpack.js.org/loaders/
    // https://webpack.js.org/configuration/module/#modulerules
    rules: [
      // le js doit passer par babel
	   {
        test: /\.json$/,
        loader: 'json-loader'
      },
	  {
        test: /\\.(js|jsx)$/,
        // mais pas le js venant des node_modules
        exclude: /node_modules\//,
        // sauf pour des dossiers sources (instrumentpoche/src par ex)
        include: /node_modules\/[^/]+\/(src|sources?)/,
        loader: 'babel-loader'
      },
      // le css par css loader
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      // le scss doit passer par sass
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      // et le statique
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: 'asset'
      }
    ]
  }
}
