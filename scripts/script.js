$('.details').click(function() {
    if($(this).hasClass('active')) {
        if($(this).hasClass('showClose')) {
            $(this).html('details');
        }
        $(this).toggleClass('active');
        $('#' + $(this).attr('id') + 'details').toggleClass('hidden')
        console.log($(this).attr('id') + 'details')
        console.log('closing details...')
        
    } else {
        if($(this).hasClass('showClose')) {
            $(this).html('close');
        }
        $(this).toggleClass('active');
        $('#' + $(this).attr('id') + 'details').toggleClass('hidden')
        console.log($(this).attr('id') + 'details')
        console.log('opening details...')


    }
    
});