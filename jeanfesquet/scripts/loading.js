// LOADING SCREEN

$(window).on('load', function() {
    $('.loader').fadeOut('slow', function() {
        $('body').css('overflow','visible');
        $('.gallery').css('overflow-y','scroll');
        $('.gallery').css('overflow-x','auto');
    }); 
});