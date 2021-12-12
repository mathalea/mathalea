/* global $ */
import { context } from './context.js'
// import { loadSlick } from './loaders.js'

let premierClicSurPlay = true
let chrono
let intervalID = {}
let pause = false

export const initDiaporama = () => {
// export const initDiaporama = async () => {
  // await loadSlick() Le chargement de Slick ne semble pas créer la variable Slick
  $('#prev').hide()
  $('#next').hide()
  $('#icones').hide()
  $('#corrections_et_parametres').hide()
  const formChoixDeLaDuree = document.getElementById('choix_de_la_duree')
  if (context.duree) {
    formChoixDeLaDuree.value = context.duree
  } else {
    formChoixDeLaDuree.value = 10
    context.duree = 10
  }

  formChoixDeLaDuree.addEventListener('change', function (e) {
    // Changement du texte
    if (e.target.value === '') {
      context.duree = 10
    } else {
      context.duree = e.target.value
      chrono = context.duree
      const params = new URL(document.location).searchParams
      params.set('duree', context.duree)
      window.history.replaceState(null, null, '?' + params.toString())
    }
  })

  // Gestion du bouton de zoom
  $('#btn_zoom_plus').click(function () {
    $('.slick-slide').css('font-size', parseFloat($('.slick-slide').css('font-size')) * 1.2)
  })
  $('#btn_zoom_moins').click(function () {
    $('.slick-slide').css('font-size', parseFloat($('.slick-slide').css('font-size')) * 0.8)
  })
  $('#btn_zoom_plus_2d').click(function () {
    $('.mathalea2d').css('width', parseFloat($('.mathalea2d').css('width')) * 1.2)
    $('.mathalea2d').css('height', parseFloat($('.mathalea2d').css('height')) * 1.2)
  })
  $('#btn_zoom_moins_2d').click(function () {
    $('.mathalea2d').css('width', parseFloat($('.mathalea2d').css('width')) * 0.8)
    $('.mathalea2d').css('height', parseFloat($('.mathalea2d').css('height')) * 0.8)
  })

  let zoom = 1
  $('#btn_zoom_plus_correction').click(function () {
    zoom += 0.5
    $('#corrections').css('transform', `scale(${zoom})`)
    $('#corrections').css('transform-origin', '0 0px')
  })
  $('#btn_zoom_moins_correction').click(function () {
    if (zoom > 1) {
      zoom -= 0.5
    }
    $('#corrections').css('transform', `scale(${zoom})`)
    $('#corrections').css('transform-origin', '0 0px')
  })

  $('#formulaire_choix_des_exercices').hide()
  $('#exercices').hide()

  /* fonctions de gestion des boutons du diaporama */
  function pauseDiapo () {
    clearInterval(intervalID)
    pause = true
  }

  function playDiapo () {
    if (premierClicSurPlay) {
      $('#prev').show()
      $('#next').show()
      chrono = 10
      $('.mathalea2d').css('font-size', 12)
      $('.mathalea2d').css('width', parseFloat($('.mathalea2d').css('width')) * 2)
      $('.mathalea2d').css('height', parseFloat($('.mathalea2d').css('height')) * 2)
      $('#timer').html('&ndash; ' + chrono / 1000 + ' s')
      $('#exercices').show()
      $('#parametres_generaux').hide()
      $('#formulaire_choix_de_la_duree').hide()
      $('h3').hide()
      // $("#accordeon_parametres").hide();
      $('.single-item').slick({
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        fade: true,
        cssEase: 'linear'
      })
      timer()
      $('#numero_question').html('Question 1')
      premierClicSurPlay = false

      $('.single-item').on('afterChange', function (event, slick, currentSlide) {
        // À la fin du diaporama
        if (slick.$slides.length === currentSlide + 1) {
          clearInterval(intervalID)
          $('#timer').hide()
          $('#numero_question').html(' ')
        } else {
          $('#numero_question').html(`Question ${currentSlide + 1} `)
        }
      })
    } else {
      clearInterval(intervalID)
      timer()
      $('#timer').show()
    }
    pause = false
  }

  function slidePrecedente () {
    chrono = context.duree * 1000
    $('#timer').html('&ndash; ' + chrono / 1000 + ' s')
    $('.single-item').slick('slickPrev')
  }

  function slideSuivante () {
    chrono = context.duree * 1000
    $('#timer').html('&ndash; ' + chrono / 1000 + ' s')
    $('.single-item').slick('slickNext')
  }

  /* ======== */

  $('#pause').click(function () {
    pauseDiapo()
  })

  $('#play').click(function () {
    playDiapo()
  })

  $('#prev').click(function () {
    slidePrecedente()
  })

  $('#next').click(function () {
    slideSuivante()
  })

  window.addEventListener('keydown', function (e) { // gestion du calcul mental avec le clavier
    if (e.which === 32 && pause) { // touche espace pendant la pause
      document.getElementById('play').focus()
      playDiapo()
    } else if (e.which === 32 && !pause) { // touche espace pendant le diaporama
      document.getElementById('pause').focus()
      pauseDiapo()
    }
    if (e.which === 37) { // fleche gauche
      slidePrecedente()
    }
    if (e.which === 39) { // fleche droite
      slideSuivante()
    }
  })

  function timer () {
    chrono = context.duree * 1000
    $('#timer').html('&ndash; ' + chrono / 1000 + ' s')
    intervalID = setInterval(changeTimer, 1000)
  }

  function changeTimer () {
    if (chrono > 1000) {
      chrono -= 1000
    } else {
      $('.single-item').slick('slickNext')
      chrono = context.duree * 1000
    }
    $('#timer').html('&ndash; ' + chrono / 1000 + ' s')
  }
}
