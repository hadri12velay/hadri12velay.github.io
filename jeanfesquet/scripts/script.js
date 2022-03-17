// $('#sideall').hover(function(){
//     $('#sidebar').css('width','30rem');
//     $('#sidebar-button').css('transform','rotate(180deg)');
// }, function(){
//     $('#sidebar').css('width','0vw');
//     $('#sidebar-button').css('transform','rotate(0deg)');
// });




// SCROLL ANIMATION HOVER doesnt work fucking bitch lasagna

// $('#scrollskiText').hover(function(){
    
//     console.log("bitch lasagana");
// }, function(){
    
// });















// SIDEBAR FUNCTIONALITY

$(document).ready(function(){
    if(window.matchMedia("(max-width: 768px)").matches){
        // The viewport is less than 768 pixels wide
        $('#sideall').click(function(){
            $('#sidebar').toggleClass('open');
            $('#sidebar-button').css('transform','rotate(180deg)');
        }, function(){
            $('#sidebar').toggleClass('open');
            $('#sidebar-button').css('transform','rotate(0deg)');
        });
    } else{
        // The viewport is at least 768 pixels wide
        $('#sideall').hover(function(){
            $('#sidebar').toggleClass('open');
            $('#sidebar-button').css('transform','rotate(180deg)');
        }, function(){
            $('#sidebar').toggleClass('open');
            $('#sidebar-button').css('transform','rotate(0deg)');
        });
    }
});

// HOVER COLORS

// menu items
$('.lolipop').hover(function(){
    $(this).css('color','var(--special)');
}, function(){
    if($(this).hasClass('active')) {
        $(this).css('color','var(--special)');
    } else {
        $(this).css('color','var(--secondary)');
    }
});
// social media items
$('.lolipop1').hover(function(){
    $('.lolipop1').css('color','var(--secondary)');
}, function(){
    $('.lolipop1').css('color','var(--special)');
});
$('.lolipop2').hover(function(){
    $('.lolipop2').css('color','var(--secondary)');
}, function(){
    $('.lolipop2').css('color','var(--special)');
});
$('.lolipop3').hover(function(){
    $('.lolipop3').css('color','var(--secondary)');
}, function(){
    $('.lolipop3').css('color','var(--special)');
});

// RESIZE WIDTH PAGE GALLERY
var gallerywidth = $(window).width() - $('.page-nav').outerWidth() ;
$('.page-main2').css('width', gallerywidth);
$(window).on('resize', function() {
    gallerywidth = $(window).width() - $('.page-nav').outerWidth() ;
    $('.page-main2').css('width', gallerywidth);
});


// THEME CHANGING BUTTON
$('.change-theme').click(function() {
    if ($('html').hasClass('light')) {
        $('.theme-circle').addClass('change-dark').removeClass('change-light');
        $('html').addClass('dark').removeClass('light');
    } else {
        $('.theme-circle').addClass('change-light').removeClass('change-dark');
        $('html').addClass('light').removeClass('dark');
    }
});




// PREVIEWER 

var numberOfImages = $('.gallery a').length;
var position = 0;

$('.gallery a').click(function() {
    position = $(this).index();
    var thisImage = $(this).children('img').attr('src');
    console.log(thisImage);
    $('.previewer-img img').attr('src', thisImage);
    $('.previewer').toggleClass('hidden');
    console.log($('.previewer-img img').attr('src'));
});
// previous button
$('.prev').click(function() {
    //Check if the position is out of bounds
    position = position - 1;        
    if (position == -1) {
        position = numberOfImages - 1
    }
    var thisImage = $('.gallery a').eq(position).children('img').attr('src');
    $('.previewer-img img').attr('src', thisImage);
});
// next button
$('.next').click(function() {
    //Check if the position is out of bounds
    position = position + 1;
    if (position == numberOfImages) {
        position = 0
    }
    var thisImage = $('.gallery a').eq(position).children('img').attr('src');
    $('.previewer-img img').attr('src', thisImage);
});
// back button
$('.back').click(function() {
    // hide previewer
    $('.previewer').addClass('hidden');
});
// open in new tab button
$('.zoom').click(function() {
    // hide previewer
    var thisImage = $('.gallery a').eq(position).children('img').attr('src')
    window.open(thisImage, '_blank');
});





