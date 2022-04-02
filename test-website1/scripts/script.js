$.fn.myFunction = function(x){
    console.log(x.hasClass('details'));
}

$('.details').click(function() {
    let ID = $(this).attr('id');

    if($(this).hasClass('active')) {
        if($(this).hasClass('showClose')) {
            $(this).html('details;');
        }
        $(this).toggleClass('active');
        $('#' + ID + 'details').toggleClass('hidden');
        console.log(ID + 'details');
        console.log('closing details...');
        $.fn.myFunction($(this));
        
    } else {
        if($(this).hasClass('showClose')) {
            $(this).html('close;');
        }
        $(this).toggleClass('active');
        $('#' + ID + 'details').toggleClass('hidden');
        console.log(ID + 'details');
        console.log('opening details...');
        $.fn.myFunction($(this));
    }
    
});
