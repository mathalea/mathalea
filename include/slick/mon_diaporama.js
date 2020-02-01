let premier_clic_sur_play = true;
let diaporama_deja_visualise = false;

$(document).ready(function(){
    $("#formulaire_choix_des_exercices").hide();
    $('#exercices').hide();
    $('#icones').hide();
    $('#corrections_et_parametres').hide()
    $('#parametres_generaux').hide()

    

    $('#pause').click(function() {
        clearInterval(intervalID)
    });

    $('#play').click(function() {
        if (premier_clic_sur_play) {
            chrono = duree
            $('#timer').html('&ndash; ' + chrono/1000 + ' s');
            $('#exercices').show();
            $('#parametres_generaux').hide();
            $("#formulaire_choix_de_la_duree").hide();
            $("h3").hide();
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
            });
            timer();
            $('#numero_question').html(`Question 1`);
            premier_clic_sur_play = false;

            let largeur = 0.5*$(document).width();

            $('.slick-slide').textfill({
                widthOnly : true,
                minFontPixels : 20,
                maxFontPixels : -1,
                explicitWidth : largeur,
                changeLineHeight : true,
            })

            
            $('.single-item').on('afterChange', function(event, slick, currentSlide) {
              // À la fin du diaporama
              if (slick.$slides.length == currentSlide+1) {
                clearInterval(intervalID);
                $('#timer').hide();
                $('#numero_question').html(' ');
                diaporama_deja_visualise = true;
              } else {
                  $('#numero_question').html(`Question ${currentSlide+1} `);
              }
            })


        } else {
            clearInterval(intervalID)
            timer();
            $('#timer').show();
        }
    });

    $('#prev').click(function() {
        chrono=duree;
        $('#timer').html('&ndash; ' + chrono/1000 + ' s')
        $('.single-item').slick('slickPrev');
    });

    $('#next').click(function() {
        chrono=duree;
        $('#timer').html('&ndash; ' + chrono/1000 + ' s')
        $('.single-item').slick('slickNext');  
    });

    

    function timer() {
        chrono=duree;
        $('#timer').html('&ndash; ' + chrono/1000 + ' s')
        intervalID = setInterval(change_timer, 1000);
    }

    function change_timer() {
        if (chrono > 1000) {
            chrono -=1000;    
        } else {
            $('.single-item').slick('slickNext');
            chrono = duree
        }
        $('#timer').html('&ndash; ' + chrono/1000 + ' s');
    }

});


// Modifications de mathalea_outils

function liste_de_question_to_contenu(argument) {
        argument.contenu = html_div(argument.liste_questions)
        argument.contenu_correction = html_enumerate(argument.liste_corrections)
}

function html_div(liste){
    let result =`<section class="slider single-item" id="diaporama">`
    for(let i in liste){
        result += '<div id="question_diap"><span>' + liste[i].replace(/\\dotfill/g,'...').replace(/\\\\/g,'<br>').replace(/\\not=/g,'≠').replace(/\\ldots/g,'....') + '</span></div>'   // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
    }
    result += '<div id="question_diap"><span>$\\text{Terminé !}$</span></div></section>'
    return result
}








