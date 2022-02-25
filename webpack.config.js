const fs = require('fs')
const path = require('path')

// ce plugin sert à générer les fichiers html à partir de modèles, en y injectant des variables
// c'est utile pour :
// - insérer automatiquement les tags pour charger les js/css compilés
//   => permet de contourner les pbs de cache des navigateurs (dans le html on charge un js/css dont le nom change
//      à chaque compilation, si le navigateur a en cache un vieux fichier html il va charger les anciens js, mais
//      s'il recharge le html il aura forcément les nouveaux, même si les anciens sont en cache)
// - avoir un html qui dépend du contexte de compilation (dev ou prod par ex)
const HtmlWebpackPlugin = require('html-webpack-plugin')

// lui n'est à priori plus nécessaire avec webpack5 (il est là d'office),
// sauf si on veut lui préciser des options particulières, ce qui est notre cas.
const TerserPlugin = require('terser-webpack-plugin')

// ce module sert à extraire les css (rencontré dans du js avec du `import 'path/to/file.css'`) dans des fichiers
// séparés créé à cette occasion (sinon ce serait dans le code js)
// cf https://webpack.js.org/plugins/mini-css-extract-plugin/
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// cf https://webpack.js.org/plugins/copy-webpack-plugin/#root
const CopyPlugin = require('copy-webpack-plugin')

// webstorm (ou tout autre IDE Jetbrains) exécute ce fichier mais n'a pas de process.argv, on veut pas qu'il plante pour autant
const env = process.env || {}
const argv = process.argv || []
const isServeMode = argv.some(arg => /serve/.test(arg))
const mode = (isServeMode || env.NODE_ENV === 'development' || /--mode=development/.test(argv)) ? 'development' : 'production'
const isProdMode = mode === 'production'

/*
// On ajoute ça pour filtrer / logguer ce qui passe par babel
const babelOptions = require('./package').babel
const jsDir = path.resolve(__dirname, 'src', 'js')
const reJsDir = new RegExp(`^${jsDir}`)
function toBabelize (file) {
  // return false // on peut décommenter cette ligne pour désactiver babel, mais ça change rien au pb de ERR_WORKER_OUT_OF_MEMORY
  // on élimine déjà ce qui est clairement pas pour babel
  if (!/\.js$/.test(file)) return false
  let needBabel = false
  if (reJsDir.test(file)) needBabel = true
  if (/instrumenpoche\/src\//.test(file)) needBabel = true
  // console.log(`${file} to babel : ${needBabel}`)
  return needBabel
}
// il faut dans ce cas indiquer plus bas la règle bour babel :
      {
        test: toBabelize,
        loader: 'babel-loader'
        options: babelOptions,
      },
// mais on peut aussi voir la liste des fichiers traités par babel en mettant dans sa conf, dans package.json
      [
        "@babel/preset-env",
        {
          "debug": true,
          …
*/

/*
Pb ERR_WORKER_OUT_OF_MEMORY au build:prod
Dans ce cas, il faut relancer le build en augmentant la ram filée à node avec par ex
  node --max-old-space-size=8192 node_modules/webpack/bin/webpack.js
 */

/*
À propos de la conf babel dans package.json
On ne vise que les navigateurs pas trop vieux qui comprennent les modules es6, ça permet d'avoir de meilleures perfs
(les navigateurs récupèrent directement du code es6|7|8 qu'ils savent interprêter nativement plutôt que du code transpilé en es5)

cf https://philipwalton.com/articles/deploying-es2015-code-in-production-today/ pour faire 2 compilations
(dont une pour les vieux navigateurs)

On utilise traditionnellement le preset @babel/preset-env avec
  "babel": {
    "plugins": [
      "@babel/syntax-dynamic-import"
    ],
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": {
            "version": "3.8",
            "proposals": false
          },
          "targets": {
            "esmodules": true
          }
        }
      ]
    ],
    "sourceType": "unambiguous"
  },

Mais il y a maintenant un preset @babel/preset-modules
Attention, avec lui il faut donner qq précisions à Terser (qui minifie) pour qu'il ne casse pas les optimisations liées à cet usage "module only"
Cf https://github.com/babel/preset-modules
*/
const config = {
  mode,
  // les js à compiler, cf https://webpack.js.org/configuration/entry-context/#entry
  entry: {

    mathalea: ['./src/js/firstLoaded.js', './src/js/mathalea.js'],
    mathalea2d: ['./src/js/firstLoaded.js', './src/js/modules/mathalea2d-gui.js'],
    mathalea2iep: ['./src/js/firstLoaded.js', './src/js/modules/mathalea2iep-gui.js'],
    alacarte: ['./src/js/firstLoaded.js', './src/js/alacarte.js']
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
    // openPage: 'mathalea_amc.html',
    host: 'localhost',
    port: 8090, 
    // on active le hot module replacement (HMR)
    hot: true,
    headers: {
      /*
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      */
    }
  },
  // cf https://webpack.js.org/configuration/devtool/
  // eval-cheap-module-source-map est le truc recommandé dans la doc…
  devtool: (mode === 'production') ? 'source-map' : 'eval-cheap-module-source-map',
  // Cf https://webpack.js.org/configuration/plugins/
  plugins: [
    new CopyPlugin({
      // minimized: true sert à éviter de filer le fichier à terser pour minification
      // Cf https://webpack.js.org/plugins/copy-webpack-plugin/#info
      patterns: [
        { from: 'src/js/modules', to: 'modules', info: { minimized: true } },
        { from: 'src/assets', to: 'assets', info: { minimized: true } },
        { from: 'src/templates', to: 'templates', info: { minimized: true } },
        { from: 'src/json', to: 'json', info: { minimized: true } },
        { from: 'src/php', to: './', info: { minimized: true } },
        { from: 'src/assets/favicon.ico', to: './', info: { minimized: true } },
        { from: 'src/.htaccess', to: './', info: { minimized: true } },
        { from: 'node_modules/mathlive/dist/fonts', to: 'js/fonts', info: { minimized: true } },
        { from: 'node_modules/mathlive/dist/sounds', to: 'js/sounds', info: { minimized: true } },
        { from: 'src/html/exercice.html', to: './', info: { minimized: true } },
        { from: 'src/html/exo.html', to: './', info: { minimized: true } }
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
      template: 'src/html/2dsvg.html',
      filename: '2dsvg.html',
      chunks: ['mathalea2d']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/2d.html',
      filename: '2d.html',
      chunks: ['mathalea2d']
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
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        // on ne veut passer par babel que notre code (et pas tout le code qu'on importe de node_modules)
        // la règle exclude: /node_modules\// marche pas forcément, à cause des symlinks (et pnpm en met partout, c'est aussi ça qui le rend efficace)
        // on procède plutôt en limitant à ce qui est chez nous
        test: /\.js$/,
        include: path.resolve(__dirname, 'src', 'js'),
        // pas la peine d'exclure assets/externalJs car il est pas dans l'include
        loader: 'babel-loader'
      },
      {
        // la règle précédente étant restrictive (pour limiter le nb de js qui passent par babel), faut ajouter les qq modules dont on importe des sources
        // vu que l'on ne cible que des navigateurs récents c'est probablement inutile, mais on sait pas trop…
        test: /instrumenpoche\/src\/.+\.js$/,
        loader: 'babel-loader'
      },
      // le css par css loader
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      // le scss doit passer par sass
      // pour le moment on en a pas, faudra ajouter en devDependencies sass & sass-loader si on veut s'en servir
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      // },
      // et le statique
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: 'asset'
      }
    ]
  }
}

// on regarde s'il faut ajouter bugsnag
if (!isServeMode) {
  const privateDir = path.resolve(__dirname, '_private')
  const privateConfigFile = path.resolve(privateDir, 'config.js')
  if (fs.existsSync(privateDir) && fs.statSync(privateDir).isDirectory() && fs.existsSync(privateConfigFile)) {
    const privateConfig = require('esm')(module)('./_private/config.js')
    if (privateConfig && typeof privateConfig.bugsnagApiKey === 'string' && privateConfig.bugsnagApiKey) {
      console.log(`${privateConfigFile} existe et exporte bugsnagApiKey, on ajoute bugsnag à chaque entry`)
      // on génère un _private/bugsnag.js avec les constantes dont il a besoin
      const { version } = require('./package.json')
      const busgnagSrcFile = path.resolve(__dirname, 'src', 'js', 'bugsnag.js')
      const busgnagDstFile = path.resolve(privateDir, 'bugsnag.js')
      const bugsnagContent = fs.readFileSync(busgnagSrcFile, { encoding: 'utf8' })
        .replace(/^const apiKey *= ''/m, `const apiKey = '${privateConfig.bugsnagApiKey}'`)
        .replace(/^const appVersion *= ''/m, `const appVersion = '${version}'`)
        .replace(/^const releaseStage *= ''/m, `const releaseStage = '${config.mode}'`)
      fs.writeFileSync(busgnagDstFile, bugsnagContent)
      // faut inclure bugsnag.js en premier dans chaque entry
      Object.keys(config.entry).forEach(entryName => {
        // faut passer en array si c'est pas le cas
        if (typeof config.entry[entryName] === 'string') config.entry[entryName] = [config.entry[entryName]]
        // et on ajoute bugsnag au début
        config.entry[entryName].unshift('./_private/bugsnag.js')
      })
    }
  }
}

// options pour Terser
if (isProdMode) {
  config.optimization = {
    minimizer: [
      // cf https://github.com/babel/preset-modules
      new TerserPlugin({
        terserOptions: {
          ecma: 2017,
          safari10: true
        }
      })
    ]
  }
}

console.log('webpack en mode', mode)

module.exports = config
