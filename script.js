var intro = 'Hello, Im Rohit Im a full-stack developer';
var flag = false;

function isOnScreen(elem){
    if(elem.length == 0) return;

    var $window = jQuery(window);
    var viewport_top = $window.scrollTop();
    var  viewport_height = $window.height();
    var viewport_bottom =  viewport_top + viewport_height;
    var $elem = jQuery(elem);
    var top = $elem.offset().top ;
    var height = $elem.height();
    var bottom = top + height + 10;

    return( bottom > viewport_top && top < viewport_bottom);

}

function writeIntro(elem, intro){
    if(elem.length == 0 || intro.length == 0) return;
    var $elem = jQuery(elem);
    
    for(let i=0; i < intro.length; i++){
       

    (function(i){

        window.setTimeout(function(){
          $elem.append(intro.charAt(i));
          if(i==15) $elem.append('<br>');
        }, i * 100);
    
      }(i));
    }
    

}


function skillLevel(){
    var maxLevelWidth = 80;
    $('.skillLevel').each(function(){
        if($(this).html() == 'angular'){
            $(this).animate({width :maxLevelWidth * 70/100+'%'} ,1000);
        }else if($(this).html() == 'spring'){
            $(this).animate({width:maxLevelWidth * 60/100+'%'} ,600);
        }else if($(this).html() == 'html'){
            $(this).animate({width:maxLevelWidth * 71/100+'%'} ,200);
        }else if($(this).html() == 'css'){
            $(this).animate({width:maxLevelWidth * 72/100+'%'} ,700);
        }else if($(this).html() == 'bootstrap'){
            $(this).animate({width:maxLevelWidth * 68/100+'%'} ,500);
        }else if($(this).html() == 'javascript'){
            $(this).animate({width:maxLevelWidth * 45/100+'%'} ,300);
        }else if($(this).html() == 'java'){
            $(this).animate({width:maxLevelWidth * 77/100+'%'} ,350);
        }else if($(this).html() == 'python'){
            $(this).animate({width:maxLevelWidth * 68/100+'%'} ,800);
        }else if($(this).html() == 'android'){
            $(this).animate({width:maxLevelWidth * 30/100+'%'} ,800);
        }else if($(this).html() == 'mysql'){
            $(this).animate({width:maxLevelWidth * 40/100+'%'} ,1100);
        }else if($(this).html() == 'c'){
            $(this).animate({width:maxLevelWidth * 35/100+'%'} ,1400);
        }
    });

}


window.addEventListener('load', function(){
    $('#headerOptionsBox').addClass('rightToLeftAnimation');
    $('#profileIcon span' ).css('background-color','whitesmoke');

    writeIntro('#introductionQuote', intro);

});

$(document).ready( function(){
        $(this).scrollTop(0);
        $('#profileIcon span' ).css('background-color','whitesmoke');
    window.addEventListener('unload', function(){
        $(this).addClass('rightToLeftAnimation');
        writeIntro('#introductionQuote', intro);
        $('#profileIcon span' ).css('background-color','whitesmoke');
       
    });
    
  

   
    

   
    window.addEventListener('scroll', function(){

        isOnScreen('#profile') ? $('#profileIcon span').css({'background-color':'whitesmoke'}) : $('#profileIcon span').css('background-color','transparent');
        isOnScreen('#about') ? $('#aboutIcon span' ).css('background-color','whitesmoke') : $('#aboutIcon span').css('background-color','transparent');
      //  isOnScreen('#experience') ? $('#experienceIcon span' ).css('background-color','whitesmoke') : $('#experienceIcon span').css('background-color','transparent');
        
        isOnScreen($('.aboutQuote')) ? $('.aboutQuote').addClass('fromBlurToVisible') : $('.aboutQuote').removeClass('fromBlurToVisible');
        

        
        if(isOnScreen($('#skillsContainer'))){
            
           if(!flag){
              skillLevel();
              flag = true;            } 
           }else{
               if(flag){
                        flag = false;
                        $('.skillLevel').each(function(){
                            
                            $(this).stop().animate({width : '-10%'}, 500);
                        });

            
        }
           }
        
    });
});