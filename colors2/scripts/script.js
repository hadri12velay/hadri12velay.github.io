$(document).ready(function(){
});

// $('.color').each(function() {
//   var background = $(this).attr('color');
//   $(this).css("background", background);
//   $(this).css("height", "0px");
//   $(this).css("border-top", "transparent");
//   $(this).css("border-bottom", "transparent");
// });

$('.color').each(function() {
  var background = $(this).attr('color');
  $(this).css("background", background);
});

// $(".palette").click(function() {
//     $(this).children('.color').each(function() {
//         $(this).css("height", "2rem");
//       });
// });

$(".palette").click(function() {
    $(this).children('.color').each(function() {
        $(this).toggleClass('activeColor');
      });
});

$("#newPalette").click(function() {
    alert('Not implemented yet. Come back later. Or not. Preferably not.');
});