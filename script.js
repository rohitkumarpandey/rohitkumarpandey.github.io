var intro = 'Hello, Im Rohit Im a full-stack developer.';
var flag = false;
var animateHobbiesFlag = false;

function isOnScreen(elem, deltaOffset = 5){
    if(elem.length == 0) return;

    var $window = jQuery(window);
    var viewport_top = $window.scrollTop();
    var  viewport_height = $window.height();
    var viewport_bottom =  viewport_top + viewport_height;
    var $elem = jQuery(elem);
    var top = $elem.offset().top + deltaOffset;
    var height = $elem.height();
    var bottom = top + height;
   

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
        }, i * 40);
    
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

function showHobbies(){
    var animationDuration = 800;
    $('#likes-container div ul li:nth-child(1) div').animate({left : '0' } , animationDuration,
    function(){
        $('#likes-container div ul li:nth-child(2) div').animate({left : '0' }, animationDuration,
        function(){
        $('#likes-container div ul li:nth-child(3) div').animate({left : '0' },animationDuration,
        function(){
        $('#likes-container div ul li:nth-child(4) div').animate({left : '0' },animationDuration);
    });
    } );
    });
    

}


window.addEventListener('load', function(){
    $('#headerOptionsBox').addClass('rightToLeftAnimation');
    $('#profileIcon span' ).css('background-color','whitesmoke');

    writeIntro('#introductionQuote', intro);
    if(isOnScreen($('#likes-container'))) showHobbies();

});

$(document).ready( function(){
        $(this).scrollTop(0);
        $('#profile button').addClass('leftToRightAnimation');
        $('#linkContainer').addClass('leftToRightAnimation');


        window.addEventListener('unload', function(){
        writeIntro('#introductionQuote', intro);
        $('#profile button').addClass('leftToRightAnimation');
        $('#linkContainer').addClass('leftToRightAnimation');
       
    });
    
  

   
    

   
    window.addEventListener('scroll', function(){

        isOnScreen('#profile') ? $('#profileIcon span').css({'background-color':'whitesmoke'}) : $('#profileIcon span').css('background-color','transparent');
      //  isOnScreen('#about') ? $('#aboutIcon span' ).css('background-color','whitesmoke') : $('#aboutIcon span').css('background-color','transparent');
      //  isOnScreen('#experience') ? $('#experienceIcon span' ).css('background-color','whitesmoke') : $('#experienceIcon span').css('background-color','transparent');
        
       
        

        
        if(isOnScreen($('#skillsContainer'), 420)){
            
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

           if(isOnScreen($('#likes-container'))) showHobbies();

        //    if(isOnScreen($('#likes-container div h2'), 420))
        //    {
        //       if(!animateHobbiesFlag){
        //           showHobbies();
        //           this.console.log(animateHobbiesFlag);
        //           animateHobbiesFlag = true;
        //       }else{
        //           if(animateHobbiesFlag){
        //               this.console.log(animateHobbiesFlag)
        //               animateHobbiesFlag = false;
        //               $('#likes-container div ul li div').animate({left : '-100vw' }, 400);
        //           }
        //       }
        //   }

           

       
        
    });
});