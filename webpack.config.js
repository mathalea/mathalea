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

// cf https://webpack.js.org/plugins/copy-webpack-plugin/#root
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  // les js à compiler, cf https://webpack.js.org/configuration/entry-context/#entry
  entry: {
    mathalea: './src/js/mathalea.js',
    mathalea_amc: './src/js/mathalea_amc.js',
    mathalea2d: './src/js/modules/mathalea2d-gui.js',
    mathaleaDiaporama: ['./src/js/modules/mathalea_diaporama.js', './src/js/mathalea.js'],
    mathalea2iep: './src/js/modules/mathalea2iep-gui.js',
    alacarte: './src/js/alacarte.js'
  },
  output: {
    // on vide build avant chaque compilation
    clean: true,
    // le dossier dans lequel mettre les js|css|html compilés
    path: path.resolve(__dirname, 'build'),
    // on ajoute le hash dans le nom du fichier => plus besoin de demander aux utilisateur de vider leur cache tout le temps
    // cf https://webpack.js.org/configuration/output/#outputfilename
    filename: 'js/[name].[contenthash].js',
    // sans ça tous les assets chargés à partir des css se retrouvent à la racine
    assetModuleFilename: 'assets/[hash][ext][query]',
    // ça c'était pour voir si on pouvait régler le pb des urls des css qui doivent être relatives au css
    // et sont actuellement toujours relatives au js (entry)
    // c'est vieux : https://github.com/webpack-contrib/mini-css-extract-plugin/issues/367
    // et toujours d'actualité en avril 2021 https://github.com/webpack-contrib/mini-css-extract-plugin/issues/691
    //  => on récupère un hash qui permet pas de savoir d'où vient
    // le fichier concerné, chargé par un css dont il faut corriger le path ou pas
    // cf https://github.com/webpack-contrib/mini-css-extract-plugin/pull/373
    // publicPath: function () { console.log('publicPath args', arguments); return ''; }

    // ce truc semble régler nos pbs ce chemin relatif au css ou au js, tout le monde absolu par rapport à la racine
    // attention, ça marchera pas si le contenu de build se retrouve mis sur http://domaine.tld/pathQcq/
    // (il faudrait alors indiquer pathQcq ici, ce qui casserait l'usage en local)
    publicPath: '/'
  },
  // ça c'est la config pour devServer, lancé au `pnpm start`
  devServer: {
    open: true,
    openPage: 'mathalea.html',
    host: 'localhost',
    // on active le hot module replacement (HMR)
    hot: true
  },
  // Cf https://webpack.js.org/configuration/plugins/
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/php', to: './' },
        { from: 'src/assets/favicon.ico', to: './' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    // https://webpack.js.org/plugins/html-webpack-plugin/
    // https://github.com/jantimon/html-webpack-plugin#options
    new HtmlWebpackPlugin({
      template: 'src/html/mathalea.html',
      filename: 'mathalea.html',
      chunks: ['mathalea']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/exercice.html',
      filename: 'exercice.html',
      chunks: ['mathalea']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/mathalealatex.html',
      filename: 'mathalealatex.html',
      chunks: ['mathalea']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/exo.html',
      filename: 'exo.html',
      chunks: ['mathalea']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/cm.html',
      filename: 'cm.html',
      chunks: ['mathaleaDiaporama']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/mathalea2d.html',
      filename: 'mathalea2d.html',
      chunks: ['mathalea2d']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/mathalea2dsvg.html',
      filename: 'mathalea2dsvg.html',
      chunks: ['mathalea2d']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/2d.html',
      filename: '2d.html',
      chunks: ['mathalea2d']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/mathalea_amc.html',
      filename: 'mathalea_amc.html',
      chunks: ['mathalea_amc']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/mathalea2iep.html',
      filename: 'mathalea2iep.html',
      chunks: ['mathalea2iep']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/iep.html',
      filename: 'iep.html',
      chunks: ['mathalea2iep']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/alacarte.html',
      filename: 'alacarte.html',
      chunks: ['alacarte']
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
