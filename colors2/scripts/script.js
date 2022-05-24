$(document).ready(function(){
});




// Get palette data and construct
class data {
	constructor(name, colors) {
		for (let i=0; i<name.length; i++) {
			var stringToAppend = '<div class="palette"><div class="paletteName"><p>'+ name[i] + '</p></div>';
			for (let j=0; j < colors[i].length; j++) {
			stringToAppend += '<div class="color" color="'+ colors[i][j] + '"></div>';
			};
			stringToAppend +='<div class="paletteBottom"></div><hr class="smallhr"></div>';
			$('.main').append(stringToAppend);
		};
	}
}

// Example data
const palette = new data(
	['brand', 'pastel', 'smile pop'],
	[
		['#001B2E','#203644','#D26E33','#754541'],
		['#B0F2B4','#BAF2E9','#BAD7F2','#F2BAC9', '#F2E2BA'],
		['#464D77','#36827F','#F9DB6D']
	]
)






// Opens first palette foe A E S T E T I K
$('.palette:first').children('.color').each(function() {
		$(this).toggleClass('activeColor');
})


// set each color background to their attr 'color' value
$('.color').each(function() {
  	var background = $(this).attr('color');
  	$(this).css("background", background);
  	$(this).html('<p>' + background + '</p>');
  	var color = invertColor(background);
  	$(this).css("color", color);
  
});

// Show palette colors when clicking box
$(".paletteName").click(function() {
    $(this).parent().children('.color').each(function() {
        $(this).toggleClass('activeColor');
      });
});
$(".paletteBottom").click(function() {
    $(this).parent().children('.color').each(function() {
        $(this).toggleClass('activeColor');
      });
});

// Palette generation
$("#newPalette").click(function() {
    alert('Not implemented yet. Come back later. Or not. Preferably not.');
});

// Invert colors for text in colors
function invertColor(hex, bw=true) {
  	if (hex.indexOf('#') === 0) {
		hex = hex.slice(1);
  	}
  	// convert 3-digit hex to 6-digits.
  	if (hex.length === 3) {
      	hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  	}
  	if (hex.length !== 6) {
      	throw new Error('Invalid HEX color.');
  	}
  	var r = parseInt(hex.slice(0, 2), 16),
      	g = parseInt(hex.slice(2, 4), 16),
      	b = parseInt(hex.slice(4, 6), 16);
  	if (bw) {
      	// https://stackoverflow.com/a/3943023/112731
      	return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          	? '#000000'
          	: '#FFFFFF';
  	}
  	// invert color components
  	r = (255 - r).toString(16);
  	g = (255 - g).toString(16);
  	b = (255 - b).toString(16);
  	// pad each with zeros and return
  	return "#" + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
  	len = len || 2;
  	var zeros = new Array(len).join('0');
  	return (zeros + str).slice(-len);
}

// function to copy hex color when clicking on color
$(".color").click(function() {
	var copyText = $(this).children().html();
  	if (copyText != 'copied :)') {
		navigator.clipboard.writeText(copyText);
		$(this).children().css("font-size", "2rem");
		$(this).children().css("font-style", "italic");
		$(this).children().html('copied :)');
		setTimeout(() => {
			$(this).children().css("font-style", "normal");
			$(this).children().css("font-size", "3rem");
			$(this).children().html(copyText);
			// console.log("Delayed for 1 second.");
		}, "800")
		//add something to know it's been copied to clipboard
	}
});


// set theme and get from local cache
if (localStorage.getItem("theme") === null ) {
	$('html').addClass('light');
	localStorage.setItem("theme", "light")
} else {
	$('html').addClass(localStorage.getItem("theme"));
};
// change theme :)
$(".theme").click(function() {
    $('html').toggleClass('light');
    $('html').toggleClass('dark');
	if (localStorage.getItem("theme") === "dark" ) {
		localStorage.setItem("theme", "light")
	} else {
		localStorage.setItem("theme", "dark")
	};
});

