/* global mathalea $ */
let premierClicSurPlay = true
let chrono
let intervalID = {}

$(document).ready(function () {
  $('#prev').hide()
  $('#next').hide()
  $('#icones').hide()
  $('#corrections_et_parametres').hide()
  const formChoixDeLaDuree = document.getElementById('choix_de_la_duree')
  if (mathalea.duree) {
    formChoixDeLaDuree.value = mathalea.duree
  } else {
    formChoixDeLaDuree.value = 10
    mathalea.duree = 10
  }

  formChoixDeLaDuree.addEventListener('change', function (e) {
    // Changement du texte
    if (e.target.value === '') {
      mathalea.duree = 10
    } else {
      mathalea.duree = e.target.value
      chrono = mathalea.duree
      const params = new URL(document.location).searchParams
      params.set('duree', mathalea.duree)
      window.history.pushState(null, null, '?' + params.toString())
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


  $('#pause').click(function () {
    clearInterval(intervalID)
  })

  $('#play').click(function () {
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
  })

  $('#prev').click(function () {
    chrono = mathalea.duree * 1000
    $('#timer').html('&ndash; ' + chrono / 1000 + ' s')
    $('.single-item').slick('slickPrev')
  })

  $('#next').click(function () {
    chrono = mathalea.duree * 1000
    $('#timer').html('&ndash; ' + chrono / 1000 + ' s')
    $('.single-item').slick('slickNext')
  })

  function timer () {
    chrono = mathalea.duree * 1000
    $('#timer').html('&ndash; ' + chrono / 1000 + ' s')
    intervalID = setInterval(changeTimer, 1000)
  }

  function changeTimer () {
    if (chrono > 1000) {
      chrono -= 1000
    } else {
      $('.single-item').slick('slickNext')
      chrono = mathalea.duree * 1000
    }
    $('#timer').html('&ndash; ' + chrono / 1000 + ' s')
  }
})
