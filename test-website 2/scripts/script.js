$('.button-details').click(function() {
    let parent = $(this).parent().next();
    let content = $(this).parent().next().children('p').eq(0);

    if (parent.hasClass('activedetails')) {
        $(this).html('details');
        content.css("max-height","0rem");
        setTimeout( function () {
            parent.toggleClass('hidden');
        }, 200);
        
    } else {
        $(this).html('close');
        parent.toggleClass('hidden')
        let height1 = content.prop('scrollHeight');
        content.css("max-height", height1+'px');
    }
    parent.toggleClass('activedetails');
});