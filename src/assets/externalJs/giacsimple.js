function $id (id) { return document.getElementById(id) }

var Module = {
  // TOTAL_MEMORY:134217728,
  ready: false,
  worker: false,
  htmlcheck: true,
  htmlbuffer: '',
  preRun: [],
  postRun: [],
  lastrefresh: 0,
  print_target: 0,
  print: function (text) {
    const element = Module.print_target; if (element == 0) return
    // console.log('Module.print',text);
    if (text.length == 1 && text.charCodeAt(0) == 12) {
      element.innerHTML = ''
      return
    }
    if (text.length >= 1 && text.charCodeAt(0) == 2) {
      console.log('STX')
      Module.htmlcheck = false
      htmlbuffer = ''
      return
    }
    if (text.length >= 1 && text.charCodeAt(0) == 3) {
      console.log('ETX')
      Module.htmlcheck = true
      // element.style.display = 'block';
      element.innerHTML += htmlbuffer
      htmlbuffer = ''
      // element.scrollTop = 99999;
      return
    }
    if (Module.htmlcheck) {
      // These replacements are necessary if you render to raw HTML
      text = '' + text
      console.log('print', text)
      text = text.replace(/&/g, '&amp;')
      text = text.replace(/</g, '&lt;')
      text = text.replace(/>/g, '&gt;')
      text = text.replace(/\n/g, '<br>')
      text += '<br>'
      // var tmp = $id('consolediv');
      // if (tmp.style.display != 'block') {
      // tmp.style.display = 'block';
      // UI.set_config_width();
      // }
      // element.style.display = 'block';
      element.innerHTML += '<em>' + text + '</em>' // element.value += text + "\n";
      // element.scrollTop = 99999; // focus on bottom
    } else htmlbuffer += text
    // element.scrollIntoView();
  },
  printErr: function (text) {
    // console.log(text);
  },
  // canvas: document.getElementById('canvas'),
  // setStatus: function (text) {
  //   if (Module.setStatus.interval) clearInterval(Module.setStatus.interval);
  //   var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
  //   var statusElement = document.getElementById('status');
  //   var progressElement = document.getElementById('progress');
  //   if (m) {
  //     text = m[1];
  //     progressElement.value = parseInt(m[2]) * 100;
  //     progressElement.max = parseInt(m[4]) * 100;
  //     progressElement.hidden = false;
  //   } else {
  //     progressElement.value = null;
  //     progressElement.max = null;
  //     progressElement.hidden = true;
  //   }
  //   statusElement.innerHTML = text;
  // },
  totalDependencies: 0,
  monitorRunDependencies: function (left) {
    this.totalDependencies = Math.max(this.totalDependencies, left)
    // Module.setStatus(left ? 'Preparation... (' + (this.totalDependencies - left) + '/' + this.totalDependencies + ')' : 'Telechargements termines.');
  },
  loadgiac: function () {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    const detectmob = function () {
      if (navigator.userAgent.match(/Android/i) ||
	  navigator.userAgent.match(/webOS/i) ||
	  navigator.userAgent.match(/iPhone/i) ||
	  navigator.userAgent.match(/iPad/i) ||
	  navigator.userAgent.match(/iPod/i) ||
	  navigator.userAgent.match(/BlackBerry/i) ||
	  navigator.userAgent.match(/Windows Phone/i)
	 ) return true
      else { return false }
    }
    let supported = (function () {
      try {
        if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
	  const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00))
	  if (module instanceof WebAssembly.Module) { return new WebAssembly.Instance(module) instanceof WebAssembly.Instance }
        }
      } catch (e) {}
      return false
    })()
    if (window.chrome) {
      // UI.usemathjax=true;
      if (detectmob() || window.location.href.substr(0, 4) == 'file') { supported = false }
    }
    const webAssemblyAvailable = supported
    /*
      if (Boolean(window.chrome)){
      if (!detectmob()) webAssemblyAvailable = !!window.WebAssembly && window.location.href.substr(0,4)!='file';
      }
      else {
      var ua = window.navigator.userAgent;
      var old_ie = ua.indexOf('MSIE ');
      var new_ie = ua.indexOf('Trident/');
      if (!UI.detectmob() && old_ie<=-1 && new_ie<=-1)
      webAssemblyAvailable =!!window.WebAssembly;
      } */
    // alert(webAssemblyAvailable?'true':'false');
    // console.log('wasm ', supported, webAssemblyAvailable);
    if (webAssemblyAvailable) { script.src = '/assets/externalJs/giacwasm.js' } else { script.src = '/assets/externalJs/giac.js' }
    document.getElementsByTagName('head')[0].appendChild(script)
    const ua = window.navigator.userAgent
    const old_ie = ua.indexOf('MSIE ')
    const new_ie = ua.indexOf('Trident/')
    if ((old_ie > -1) || (new_ie > -1) || Boolean(window.chrome)) {
      UI.usemathjax = true;
      (function () {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        // script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML";
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
        script.id = 'MathJax-script'; console.log(script.src)
        document.getElementsByTagName('head')[0].appendChild(script)
      })()
    }
  }
}
// Module.setStatus('T&eacute;l&eacute;chargement et pr&eacute;paration (peut prendre 1 ou 2 minutes la premi&egrave;re fois)');
Module.onRuntimeInitialized = function () {
  // console.log('UI is ready');
  Module.ready = true
  Module.print_target = document.getElementById('output')
  // document.getElementById('input').select();
  // document.getElementById('input').focus();
}

var UI = {
  disable3d: 0, // -1==3d not supported
  tableaucm: 0, // 1 if codemirror focused
  debug: 0,
  Datestart: Date.now(),
  ready: false,
  colorinit: false,
  usemathjax: false,
  prettyprint: true,
  histcount: 0,
  selection: '',
  langue: -1,
  calc: 1, // 1 KhiCAS, 2 Numworks, 3 TI Nspire CX
  xwaspy_shift: 33, // must be >32 for space encoding, and <=35 for a..z encoding
  gr2d_ncanvas: 0,
  initconfigstring: '',
  python_mode: 0,
  python_indent: 4,
  warnpy: true, // set to false if you do not want Python compat warning
  canvas_w: 350,
  canvas_h: 200,
  canvas_lastx: 0,
  canvas_lasty: 0,
  canvas_pushed: false,
  touch_handler: function (event) {
    const touches = event.changedTouches
    const first = touches[0]
    const s2 = first.target.id
    const is_3d = s2.length > 5 && s2.substr(0, 4) == 'gl3d'
    let n3d = ''
    if (is_3d) { n3d = s2.substr(5, s2.length - 5) }
    event.preventDefault()
    if (event.type == 'touchstart') {
      UI.canvas_pushed = true
      UI.canvas_lastx = first.clientX; UI.canvas_lasty = first.clientY
    }
    if (event.type == 'touchmove') {
      UI.canvas_mousemove(first, n3d)
    }
    if (event.type == 'touchend') {
      UI.canvas_pushed = false
    }
  },
  giac_renderer: function (text) {
    // console.log('giac_renderer_1',text);
    const gr = Module.cwrap('_ZN4giac13giac_rendererEPKc', 'number', ['string'])
    gr(text)
    // console.log('giac_renderer_2',text);
    const keyboardListeningElement = Module.keyboardListeningElement || document
    keyboardListeningElement.removeEventListener('keydown', SDL.receiveEvent)
    keyboardListeningElement.removeEventListener('keyup', SDL.receiveEvent)
    keyboardListeningElement.removeEventListener('keypress', SDL.receiveEvent)
  },
  canvas_mousemove: function (event, no) {
    if (UI.canvas_pushed) {
      // Module.print(event.clientX);
      if (UI.canvas_lastx != event.clientX) {
        if (event.clientX > UI.canvas_lastx) { UI.giac_renderer('r' + no) } else { UI.giac_renderer('l' + no) }
        UI.canvas_lastx = event.clientX
      }
      if (UI.canvas_lasty != event.clientY) {
        if (event.clientY > UI.canvas_lasty) { UI.giac_renderer('d' + no) } else { UI.giac_renderer('u' + no) }
        UI.canvas_lasty = event.clientY
      }
    }
  },
  python_mode_str: function () {
    if (UI.micropy == -1) return '>>'
    const i = UI.python_mode
    if (i == 0) return '>'
    if (i == 1) return '^>'
    if (i == 2) return '**>'
    if (i & 4) return '>>>'
    return '?'
  },
  render_canvas: function (field) {
    // return; // does not work,
    const n = field.id
    // console.log('render_canvas',n);
    if (n && n.length > 5 && n.substr(0, 5) == 'gr2d_') {
      // console.log(field.nextSibling.value);
      UI.turtle_draw(n, field.nextSibling.value)
    }
    if (n && n.length > 5 && n.substr(0, 5) == 'gl3d_') { // FIXME
      // Module.print(n);
      const n3d = n.substr(5, n.length - 5)
      // console.log('render_canvas',n3d);
      UI.giac_renderer(n3d)
      // return;
    }
    let f = field.firstChild
    for (; f; f = f.nextSibling) {
      UI.render_canvas(f)
    }
  },
  eval_input: function (output, input) {
    const divadd = document.createElement('div')
    output.appendChild(divadd)
    const divprint = document.createElement('div'); Module.print_target = divprint
    divadd.innerHTML += '<tt>' + UI.python_mode_str() + ' ' + input.value + '</tt><br>'
    let s2 = UI.eval(input.value)
    const is_3d = s2.length > 5 && s2.substr(0, 4) == 'gl3d'
    let gr3ds = ''
    if (is_3d) {
      const n3d = s2.substr(5, s2.length - 5)
      gr3ds = 'gl3d_' + n3d
      console.log(gr3ds)
      s2 = '<div> <canvas id="gl3d_' + n3d + '" onmousedown="UI.canvas_pushed=true;UI.canvas_lastx=event.clientX; UI.canvas_lasty=event.clientY;" onmouseup="UI.canvas_pushed=false;" onmousemove="UI.canvas_mousemove(event,' + n3d + ')" width=' + 400 + ' height=' + 250 + '></canvas></div>'
      console.log('create3d', s2)
      $id('canvas').style.display = 'none'
    } else {
      if (UI.micropy == 0) { s2 = UI.eval_cmdline1cb(s2, input.value) }
    }
    const is_svg = s2.length > 5 && (s2.substr(0, 4) == '<svg' || s2.substr(0, 5) == 'gr2d(')
    if (is_svg) { s2 = '<div>' + s2 + '</div>' }
    // if (s2.length>9 && s2.substr(0,9)=='<div><svg'){ s2='<div><svg style="margin-top:24px"'+s2.substr(9,s2.length-9); }
    let gr2ds = ''
    const is_2d = s2.length > 11 && s2.substr(0, 10) == '<div>gr2d('
    if (is_2d) {
      for (;++UI.gr2d_ncanvas;) {
        gr2ds = 'gr2d_' + UI.gr2d_ncanvas
        if ($id(gr2ds) == null) { break }
      }
      s2 = "<div> <canvas id='" + gr2ds + "' width=" + UI.canvas_w + ' height=' + UI.canvas_h + "> </canvas><textarea style='display:none'>" + s2.substr(5, s2.length - 11) + '</textarea></div>'
      UI.gr2d_ncanvas++
    }
    divadd.innerHTML += '<em>' + divprint.innerHTML + '</em>'
    if (!is_3d && !is_2d && !is_svg && s2 != '') { divadd.innerHTML += '&nbsp;&nbsp;' }
    divadd.innerHTML += s2 + '<br>'
    if (is_3d) {
      const el = $id(gr3ds)
      el.addEventListener('touchstart', UI.touch_handler, false)
      el.addEventListener('touchend', UI.touch_handler, false)
      el.addEventListener('touchmove', UI.touch_handler, false)
    }
    // console.log(output);
    if (UI.usemathjax) {
      eval('MathJax.typeset();')
      // console.log(divText.id);
      // MathJax.Hub.Process(divText.id);
    }
    Module.print_target = 0
    UI.render_canvas(output)
    input.scrollIntoView(true)
    input.select()
  },
  eval_cmdline1cb: function (out, value) {
    let s; let graphe = false
    // console.log('eval_cmdline1cb',out);
    if (out.length > 5 && (out.substr(1, 4) == '<svg' || out.substr(0, 5) == 'gl3d ' || out.substr(0, 5) == 'gr2d(')) {
      // console.log(s);
      s = out
      out = 'Done_graphic'
      graphe = true
    } else {
      if (out.length > 1 && out[out.length - 1] == ';') { out = out.substr(0, out.length - 1) }
      if (out[0] == '"' || UI.micropy) { s = 'text ' + out } else {
        if (UI.prettyprint) {
          if (UI.usemathjax) { s = 'latex(quote(' + out + '))' } else { s = 'mathml(quote(' + out + '),1)' } // Module.print(s);
          if (UI.debug) { console.log('eval_cmdline1cb ', out, s) }
          if (out.length > 10 && out.substr(0, 10) == 'GIAC_ERROR') { s = '"' + out.substr(11, out.length - 11) + '"' } else s = UI.caseval_noautosimp(s)
        } else s = out
      }
    }
    if (s[0] == '"' && s.length >= 2) s = s.substr(1, s.length - 2)
    if (graphe) s = '<div>' + s + '</div>'
    else {
      if (UI.usemathjax) s = '\\[' + s + '\\]'
    }
    return s// UI.eval_cmdline1end(value, out, s);
  },
  caseval_noautosimp: function (text) {
    if (!Module.ready) return ' Clic_on_Exec '
    // console.log(text);
    const docaseval = Module.cwrap('caseval', 'string', ['string'])
    let value = text// UI.handle_shortcuts(text);
    value = value.replace(/%22/g, '\"')
    let s, err
    try {
      s = docaseval(value)
    } catch (err) {
      console.log(err)
    }
    return s
  },
  caseval: function (text) {
    if (!Module.ready) return ' CAS is not ready '
    const docaseval = Module.cwrap('caseval', 'string', ['string'])
    let value = UI.handle_shortcuts(text)
    value = value.replace(/%22/g, '\"')
    // value = UI.add_autosimplify(value);
    let s, err
    // console.log('caseval',value);
    try {
      s = docaseval(value)
    } catch (err) {
      console.log(err)
    }
    // console.log(s);
    return s
  },
  eval: function (text) {
    ++UI.histcount
    if (UI.micropy == -1) { return eval(text) }
    if (UI.micropy == 1) { return UI.mp_eval(text) }
    return UI.caseval(text)
  },
  handle_shortcuts: function (text) {
    if (text == '.') return 'avance(0)'
    if (text == ',') return 'show()'
    if (text == ';') return 'show_pixels()'
    if (text == 'python' || text == 'python ') {
      UI.micropy = 1; UI.python_mode = 4
      // UI.set_settings();
      // var form = $id('config');
      // form.python_xor.checked = true;
      // form.python_mode.checked = true;
      console.log('now eval with micropython')
      return 'python_compat(4)'
    }
    if (text == 'javascript' || text == 'javascript ') {
      UI.micropy = -1; UI.python_mode = 0
      console.log('now eval with javascript')
      return 'python_compat(0)'
    }
    return text
  },
  // emscripten micropython interface
  mp_init: function (taille) {
    const init = Module.cwrap('mp_js_init', 'null', ['number'])
    UI.micropy_initialized = 1
    return init(taille)
  },
  mp_str: function (s) {
    const ev = Module.cwrap('mp_js_do_str', 'number', ['string'])
    return ev(s)
  },
  micropy: 0,
  micropy_initialized: 0,
  micropy_heap: 4194304,
  python_output: '',
  clean_for_html: function (text) {
    text = text.replace(/&/g, '&amp;')
    text = text.replace(/</g, '&lt;')
    text = text.replace(/>/g, '&gt;')
    text = text.replace(/\n/g, '<br>')
    return text
  },
  add_python_output: function (s) {
    UI.python_output += s
    // console.log(s);//console.log(UI.python_output);
  },
  set_config_width: function () {
  },
  sleep: function (miliseconds) {
    const currentTime = new Date().getTime()
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
  },
  mp_eval: function (text) {
    if (text == 'xcas' || text == 'xcas ') {
      UI.micropy = 0; UI.python_mode = 0
      // var form = $id('config');
      // form.python_xor.checked = false;
      // form.python_mode.checked = true;
      // UI.set_settings();
      return UI.caseval('python_compat(1)')
    }
    if (text == '.') { // show turtle
      var s = UI.caseval('avance(0)')
      // console.log(s);
      return s
    }
    if (text == ',') { // show (matplotl)
      Module.print('>>> show()')
      var s = UI.caseval('show()')
      return s
    }
    if (text == ';') {
      var s = UI.caseval('show_pixels()')
      return s
    }
    if (!UI.micropy_initialized) {
      UI.mp_init(UI.micropy_heap)
      console.log('mp_init done')
      try {
        UI.mp_eval('1')
      } catch (err) { console.log('mp_init eval(1)', err) }
    }
    UI.python_output = ''
    /*
    var pos=text.search('=');
    if (pos<0){
      pos=text.search('print');
      if (pos<0)
	text='print('+text+')';
    }
    */
    console.log('mp_eval', text)
    // Module.print('>>> '+text);
    UI.mp_str(text)
    console.log('mp_evaled', UI.python_output)
    if (UI.python_output == '') {
      return '"Done"'
    }
    if (UI.python_output.substr(UI.python_output.length - 1, 1) == '\n') { UI.python_output = UI.python_output.substr(0, UI.python_output.length - 1) }
    if (UI.python_output.length > 4 && UI.python_output.substr(0, 5) == '"<svg') { return UI.caseval('show()') }
    return '' // UI.python_output; // '"'+UI.python_output+'"';
  },
  handle_shortcuts: function (text) {
    if (text == '.') return 'avance(0)'
    if (text == ',') return 'show()'
    if (text == ';') return 'show_pixels()'
    if (text == 'python' || text == 'python ') {
      UI.micropy = 1; UI.python_mode = 4
      // UI.set_settings();
      // var form = $id('config');
      // form.python_xor.checked = true;
      // form.python_mode.checked = true;
      console.log('now eval with micropython')
      return 'python_compat(4)'
    }
    if (text == 'javascript' || text == 'javascript ') {
      UI.micropy = -1; UI.python_mode = 0
      console.log('now eval with javascript')
      return 'python_compat(0)'
    }
    return text
  },
  changefontsize: function (field, size) {
    field.getWrapperElement().style['font-size'] = size + 'px'
    field.refresh()
  },
  // logo turtle and pixel library display
  color_list: ['black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'silver',
    'gray',
    'maroon',
    'purple',
    'fuchsia',
    'lime',
    'olive',
    'navy',
    'teal',
    'aqua',
    'antiquewhite',
    'aquamarine',
    'azure',
    'beige',
    'bisque',
    'blanchedalmond',
    'blueviolet',
    'brown',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'chocolate',
    'coral',
    'cornflowerblue',
    'cornsilk',
    'crimson',
    'cyan',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgray',
    'darkgreen',
    'darkgrey',
    'darkkhaki',
    'darkmagenta',
    'darkolivegreen',
    'darkorange',
    'darkorchid',
    'darkred',
    'darksalmon',
    'darkseagreen',
    'darkslateblue',
    'darkslategray',
    'darkslategrey',
    'darkturquoise',
    'darkviolet',
    'deeppink',
    'deepskyblue',
    'dimgray',
    'dimgrey',
    'dodgerblue',
    'firebrick',
    'floralwhite',
    'forestgreen',
    'gainsboro',
    'ghostwhite',
    'gold',
    'goldenrod',
    'greenyellow',
    'grey',
    'honeydew',
    'hotpink',
    'indianred',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lavenderblush',
    'lawngreen',
    'lemonchiffon',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightgrey',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightslategrey',
    'lightsteelblue',
    'lightyellow',
    'limegreen',
    'linen',
    'mediumaquamarine',
    'mediumblue',
    'mediumorchid',
    'mediumpurple',
    'mediumseagreen',
    'mediumslateblue',
    'mediumspringgreen',
    'mediumturquoise',
    'mediumvioletred',
    'midnightblue',
    'mintcream',
    'mistyrose',
    'moccasin',
    'navajowhite',
    'oldlace',
    'olivedrab',
    'orangered',
    'orchid',
    'palegoldenrod',
    'palegreen',
    'paleturquoise',
    'palevioletred',
    'papayawhip',
    'peachpuff',
    'peru',
    'pink',
    'plum',
    'powderblue',
    'rosybrown',
    'royalblue',
    'saddlebrown',
    'salmon',
    'sandybrown',
    'seagreen',
    'seashell',
    'sienna',
    'skyblue',
    'slateblue',
    'slategray',
    'slategrey',
    'snow',
    'springgreen',
    'steelblue',
    'tan',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'wheat',
    'whitesmoke',
    'yellowgreen'],
  arc_en_ciel: function (k) {
    let r, g, b
    k += 21
    k %= 126
    if (k < 0) { k += 126 }
    if (k < 21) {
      r = 251
      g = 0
      b = 12 * k
    }
    if (k >= 21 && k < 42) {
      r = 251 - (12 * (k - 21))
      g = 0
      b = 251
    }
    if (k >= 42 && k < 63) {
      r = 0
      g = (k - 42) * 12
      b = 251
    }
    if (k >= 63 && k < 84) {
      r = 0
      g = 251
      b = 251 - (k - 63) * 12
    }
    if (k >= 84 && k < 105) {
      r = (k - 84) * 12
      g = 251
      b = 0
    }
    if (k >= 105 && k < 126) {
      r = 251
      g = 251 - (k - 105) * 12
      b = 0
    }
    return 'rgb(' + r + ',' + g + ',' + b + ')'
  },
  turtle_color: function (c) {
    if (c >= 0x100) {
      if (c < 0x17e) { return UI.arc_en_ciel(c) }
      // console.log('rgb('+Math.floor(c/(256*256))+','+(Math.floor(c/256) % 256)+','+(c%256)+')');
      const r = 8 * ((c >> 11) & 0x1f)
      const g = 4 * ((c >> 5) & 0x3f)
      const b = 8 * (c & 0x1f)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
      // return 'rgb(' + Math.floor(c / (256 * 256)) + ',' + (Math.floor(c / 256) % 256) + ',' + (c % 256) + ')';
    }
    return UI.color_list[c]
  },
  pixon_draw: function (id, s) {
    const v = eval(s)
    if (!Array.isArray(v)) return
    // console.log(v[0], v.length);
    const canvas = $id(id)
    const l = v.length; var w = 0; var h = 0
    if (l < 2) return
    const scale = v[0]
    for (var k = 1; k < l; k++) {
      var cur = v[k]
      var x = cur[0]; var y = cur[1]
      if (cur.length == 3 && typeof cur[2] !== 'number') {
        x += 100
        y += 16
      }
      if (cur.length == 4) {
        const tmp = cur[3]
        if (typeof tmp === 'number') {
          if (tmp > 0) y += tmp; else x -= tmp
        } else {
	  x += 100
	  y += 16
        }
      }
      // console.log(cur,x,y);
      if (x > w) w = x
      if (y > h) h = y
    }
    w = (w + 1) * scale
    h = (h + 1) * scale
    canvas.width = w
    canvas.height = h
    // console.log(h,w);
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d')
      for (var k = 1; k < l; k++) {
        var cur = v[k]; var cl
        // console.log(cur);
        if (!Array.isArray(cur) || (cl = cur.length) < 2) continue
        // cur[0]=x, cur[1]=y, cur[2]=color, cur[3]=w if +, h if -
        var x = cur[0] * scale
        var y = cur[1] * scale
        if (cl > 2 && typeof cur[2] === 'string') {
	  console.log(cur[2])
	  ctx.font = '16px serif'
	  ctx.fillStyle = 'black'
	  ctx.fillText(cur[2], x, y + 16, 100)
	  continue
        }
        ctx.fillStyle = (cl > 2) ? UI.turtle_color(cur[2]) : 'black'
        if (cl < 4) {
          ctx.fillRect(x, y, scale, scale)
          continue
        }
        if (typeof cur[3] === 'string') {
	  ctx.font = '16px serif'
	  ctx.fillText(cur[3], x, y + 16, 100)
	  continue
        }
        var h = cur[3] * scale; var w = scale
        if (h < 0) {
          w = -h
          h = scale
        }
        ctx.fillRect(x, y, w, h)
      }
    }
  },
  turtle_dx: 0, // shift frame
  turtle_dy: 0,
  turtle_z: 1, // zoom factor
  turtle_maillage: 1,
  turtle_draw: function (id, s) {
    if (s.length < 7) return
    s = s.substr(5, s.length - 6)
    // console.log(s);
    if (s.length > 7 && s.substr(s, 6) == 'pixon(') {
      UI.pixon_draw(id, s.substr(6, s.length - 7))
      return
    }
    if (s.length < 6 || s.substr(s, 5) != 'logo(') { return }
    s = s.substr(5, s.length - 6)
    // console.log(s);
    const v = eval(s)
    if (!Array.isArray(v)) return
    // console.log(v[0]);
    const canvas = $id(id)
    const w = canvas.width; const h = canvas.height
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d')
      const turtlezoom = UI.turtle_z; const turtlex = UI.turtle_dx; const turtley = UI.turtle_dy
      // background
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, w, h)
      // maillage
      if (UI.turtle_maillage & 3) {
        ctx.fillStyle = 'black'
        const xdecal = Math.floor(turtlex / 10.0) * 10
        const ydecal = Math.floor(turtley / 10.0) * 10
        if ((UI.turtle_maillage & 0x3) == 1) {
          for (var i = xdecal; i < w + xdecal; i += 10) {
            for (var j = ydecal; j < h + ydecal; j += 10) {
              const X = Math.floor((i - turtlex) * turtlezoom + 0.5)
              const Y = Math.floor((j - turtley) * turtlezoom + 0.5)
              // console.log(X,Y);
              ctx.fillRect(X, h - Y, 1, 1)
            }
          }
        } else {
          const dj = Math.sqrt(3.0) * 10; let i0 = xdecal
          for (var j = ydecal; j < h + ydecal; j += dj) {
            const J = Math.floor(h - (j - turtley) * turtlezoom)
            for (var i = i0; i < w + xdecal; i += 10) {
              ctx.fillRect(Math.floor((i - turtlex) * turtlezoom + 0.5), J, 1, 1)
            }
            i0 += dj
            while (i0 >= 10) { i0 -= 10 }
          }
        }
      }
      const l = v.length; var i
      // montre la position et le cap (v[l-1])
      let prec = v[l - 1]
      ctx.font = '16px serif'
      ctx.fillStyle = 'yellow'
      ctx.fillRect(w - 40, 0, 40, 50)
      ctx.fillStyle = 'black'
      ctx.fillText('x:' + prec[0], w - 40, 15)
      ctx.fillText('y:' + prec[1], w - 40, 31)
      ctx.fillText('t:' + prec[2], w - 40, 49)
      // v[i]=[x(0),y(1),cap(2),status(3),r(4),chaine(5)],
      // couleur=status >> 11
      // longueur_tortue= (status>>3)&0xff
      // direct=status&4 (vrai si angle dans le sens trigo)
      // visible=status&2
      // crayon baisse=status&1
      // si r>0 arc/disque rayon=r & 0x1ff, theta1=(r >> 9) & 0x1ff, theta2=(r >> 18) & 0x1ff
      //        rempli=(r>>27)&0x1
      // si r<0 ligne polygonale extremite v[i] origine v[i+r] (r<0)
      for (k = 1; k < l; k++) {
        prec = v[k - 1]
        var cur = v[k]
        const preccouleur = prec[3] >> 11 // -> FIXME colors
        var curcouleur = prec[3] >> 11 // -> FIXME colors
        if (cur[5].length) {
          ctx.font = cur[4] + 'px serif'
          ctx.strokeStyle = ctx.fillStyle = UI.turtle_color(curcouleur)
          ctx.fillText(cur[5], turtlezoom * (cur[0] - turtlex), h - turtlezoom * (cur[1] - turtley))
          continue
        }
        const radius = cur[4]; const precradius = prec[4]
        const x1 = Math.floor(turtlezoom * (prec[0] - turtlex) + 0.5)
        const y1 = Math.floor(turtlezoom * (prec[1] - turtley) + 0.5)
        const x2 = Math.floor(turtlezoom * (cur[0] - turtlex) + 0.5)
        const y2 = Math.floor(turtlezoom * (cur[1] - turtley) + 0.5)
        if (radius > 0) {
          const r = radius & 0x1ff; var theta1; var theta2; var rempli; var x; var y; var R; var angle
          theta1 = prec[2] + ((radius >> 9) & 0x1ff)
          theta2 = prec[2] + ((radius >> 18) & 0x1ff)
          rempli = (radius >> 27) & 1
	  const seg = (radius >> 28) & 1
          R = Math.floor(turtlezoom * r + 0.5)
          angle1 = Math.PI / 180 * (theta1 - 90)
          angle2 = Math.PI / 180 * (theta2 - 90)
          x = Math.floor(turtlezoom * (cur[0] - turtlex - r * Math.cos(angle2)) + 0.5)
          y = Math.floor(turtlezoom * (cur[1] - turtley - r * Math.sin(angle2)) + 0.5)
          ctx.beginPath()
	  if (seg) { ctx.moveTo(x2, h - y2) } else {
            ctx.moveTo(x, h - y)
            ctx.lineTo(x2, h - y2)
	  }
	  // console.log(x,y,x1,y1,angle1,angle2);
          ctx.arc(x, h - y, R, -angle2, -angle1)
          ctx.closePath()
          ctx.strokeStyle = ctx.fillStyle = UI.turtle_color(curcouleur)
          if (rempli) { ctx.fill() } else { ctx.stroke() }
          continue
        }
        if (prec[3] & 1) {
          ctx.strokeStyle = ctx.fillStyle = UI.turtle_color(preccouleur)
          ctx.beginPath()
          ctx.moveTo(x1, h - y1)
          ctx.lineTo(x2, h - y2)
          ctx.closePath()
          ctx.stroke()
        }
        if (radius < -1 && k + radius >= 0) {
          ctx.strokeStyle = ctx.fillStyle = UI.turtle_color(curcouleur)
          ctx.beginPath()
          const x0 = Math.floor(turtlezoom * (cur[0] - turtlex) + 0.5); const y0 = Math.floor(turtlezoom * (cur[1] - turtley) + 0.5)
          // console.log('begin',x0,y0);
          ctx.moveTo(x0, h - y0)
          for (var i = -1; i >= radius; i--) {
            prec = v[k + i]
            var x = Math.floor(turtlezoom * (prec[0] - turtlex) + 0.5)
            var y = Math.floor(turtlezoom * (prec[1] - turtley) + 0.5)
            // console.log(i,x,y);
            ctx.lineTo(x, h - y)
          }
          // console.log('end',x0,y0);
          // ctx.lineTo(x0,h-y0);
          ctx.closePath()
          ctx.fill() // automatically close path
        }
      }
      var cur = v[l - 1]
      if (cur[3] & 2) {
        // dessin de la tortue
        var x = Math.floor(turtlezoom * (cur[0] - turtlex) + 0.5)
        var y = Math.floor(turtlezoom * (cur[1] - turtley) + 0.5)
        const cost = Math.cos(cur[2] * Math.PI / 180)
        const sint = Math.sin(cur[2] * Math.PI / 180)
        const turtle_length = (cur[3] >> 3) & 0xff
        const Dx = Math.floor(turtlezoom * turtle_length * cost / 2 + 0.5)
        const Dy = Math.floor(turtlezoom * turtle_length * sint / 2 + 0.5)
        // console.log('tortue',cur,w,h,turtlezoom,x,y,Dx,Dy);
        ctx.strokeStyle = ctx.fillStyle = UI.turtle_color(curcouleur)
        ctx.beginPath()
        ctx.moveTo(x + Dy, h - (y - Dx))
        ctx.lineTo(x - Dy, h - (y + Dx))
        ctx.closePath()
        ctx.stroke()
        if (!(cur[3] & 1)) { ctx.strokeStyle = ctx.fillStyle = UI.turtle_color(curcouleur + 1) }
        ctx.beginPath()
        ctx.moveTo(x + Dy, h - (y - Dx))
        ctx.lineTo(x + 3 * Dx, h - (y + 3 * Dy))
        ctx.closePath()
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x - Dy, h - (y + Dx))
        ctx.lineTo(x + 3 * Dx, h - (y + 3 * Dy))
        ctx.closePath()
        ctx.stroke()
      }
    }
  }
}

Module.loadgiac()
