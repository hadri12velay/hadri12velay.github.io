$(document).ready(function(){
});

// Get palette data and construct
class data {
	// create a method for deleting palettes
	// create a method for editing palettes
	// create a method for saving palettes to storage
	constructor(name, colors) {
		this.name = name;
		this.colors = colors;
		this.newName = '';
		this.newColors = []; 
		this.build();
		if(localStorage.getItem("palettes") != null) {
			this.saves = JSON.parse(localStorage.getItem("palettes"));
		} else {
			this.saves = [[],[]];
		};
		activateFirst();
	}
	build = function() {
		//$('.main').html('');
		for (let i=0; i<this.name.length; i++) {
			var stringToAppend = '<div class="palette"><div class="paletteName"><p>'+ this.name[i] + '</p></div>';
			for (let j=0; j < this.colors[i].length; j++) {
				stringToAppend += '<div class="color" color="'+ this.colors[i][j] + '"></div>';
			};
			stringToAppend +='<div class="paletteBottom"></div><hr class="smallhr"></div>';
			$('.main').append(stringToAppend);
		};
		this.addEvents();
	}
	save = function() {
		this.saves[0].push(this.newName);
		this.saves[1].push(this.newColors);
		this.savesJSON = JSON.stringify(this.saves);
		localStorage.setItem('palettes', this.savesJSON)
		this.newName = '';
		this.newColors = []; 

	}
	add = function(input, type='form') {
		$('#example').css('display', 'none')
		if (type==='form') {
			this.newName = input.get('name');
			console.log(this.newName);
			for (var i=0; i<input.getAll('colors').length; i++) {
				this.newColors.push(input.getAll('colors')[i]);
			};
		} else if (type==='normal') {
			this.newName = input[0];
			console.log(this.newName);
			for (var i=0; i<input[1].length; i++) {
				this.newColors.push(input[1][i]);
			};
		}
		var stringToAdd = '<div class="palette"><div class="paletteName"><p>'+ this.newName + '</p></div>';

		for (let j=0; j < this.newColors.length; j++) {
			stringToAdd += '<div class="color" color="'+ this.newColors[j] + '"></div>';
		};
		stringToAdd +='<div class="paletteBottom"></div><hr class="smallhr"></div>';
		$('.main').append(stringToAdd);

		this.name.push(this.newName);
		this.colors.push(this.newColors);
		this.save();
		this.addEvents();
	}
	addEvents = function() {
		// reset EventListeners
		$(".paletteName").off('click');
		$(".paletteBottom").off('click');
		$(".color").off('click');
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
		// function to copy hex color when clicking on color
		$(".color").click(function() {
			var copyText = $(this).children().html();
			if (copyText != 'copied') {
				navigator.clipboard.writeText(copyText);
				$(this).children().css("font-size", "2rem");
				$(this).children().css("font-style", "normal");
				$(this).children().html('copied');
				setTimeout(() => {
					$(this).children().css("font-style", "normal");
					$(this).children().css("font-size", "3rem");
					$(this).children().html(copyText);
					// console.log("Delayed for 1 second.");
				}, "800")
				//add something to know it's been copied to clipboard
			}
		});
	}
}

// Data
var names = [];
var palettes = [];
// Example data
var defaultNames = ['brand', 'pastel', 'smile pop'];
var defaultPalettes = [
	['#001B2E','#203644','#D26E33','#754541'],
	['#B0F2B4','#BAF2E9','#BAD7F2','#F2BAC9', '#F2E2BA'],
	['#464D77','#36827F','#F9DB6D']
];

if (localStorage.getItem("palettes") != null) {
	var importData = JSON.parse(localStorage.getItem("palettes"));
	for(var i=0; i<importData[0].length; i++) {
		names.push(importData[0][i]);
		palettes.push(importData[1][i]);
	}
} else {
	$('#example').css('display', 'flex')
}

var palette = new data(names, palettes);

// add defaults
$('.createDefaults').click(function() {
	for(var i=0; i<defaultNames.length; i++) {
		palette.add([defaultNames[i], defaultPalettes[i]], type='normal')
	}
});

// Opens first palette for A E S T E T I K
function activateFirst() {
	$('.palette:nth-child(1)').children('.color').each(function() {
	$(this).toggleClass('activeColor');
	})
	$('.palette:nth-child(2)').children('.color').each(function() {
	$(this).toggleClass('activeColor');
	})
}

//Palette generation
$(".newPalette").click(function() {
	//alert('Not implemented yet. Come back later.');
	$('.createPalette').css('display', 'inline');
	$('#createPalette')[0].scrollIntoView({
		behavior: "smooth", // or "auto" or "instant"
		block: "center", // or "end"
		inline: 'center'
	});
});


// get palette from form
$(".createPalette").submit(function(e) {
	e.preventDefault();
	if(validateForm()) {
		$('.createPalette').css('display', 'none');
		const formData = new FormData(e.target);
		palette.add(formData);
		resetPalette(addedColors);
	}
});
function validateForm() {
	let x = $('#name').val();
	if (x == "") {
		alert("Name must be filled out.");
		return false;
	} else if (palette.name.includes(x)) {
		alert("Name must be different.");
		return false;
	} else if (isAlphaNumeric(x) == false) {
		alert("Name must only contain alphanumerics.");
		return false;
	} else {
		return true;
	}
}
function isAlphaNumeric(str) {
	var code, i, len;
	for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (!(code > 47 && code < 58) && // numeric (0-9)
		    !(code == 32) && // SPACE
		    !(code == 44) && // ','
		    !(code == 45) && // '-'
		    !(code == 46) && // '.'
		    !(code == 33) && // '!'
		    !(code == 63) && // '?'
		    !(code == 58) && // '-'
		    !(code == 95) && // '_'
			!(code > 64 && code < 91) && // upper alpha (A-Z)
			!(code > 96 && code < 123)) { // lower alpha (a-z)
			return false;
		}
	}
	return true;
};
// cancel button
$(".cancelNew").click(function() {
    //history.go(0);
	$('.createPalette').css('display', 'none');
	$('.createPalette')[0].reset();
	resetPalette(addedColors);
});
// function to reset form
function resetPalette(a) {
	for(var i=3; i<a+1; i++) {
		// console.log(i);
		$("[id='color" + i + "']").remove();
		$("[for='color" + i + "']").remove();
		$("[class='color" + i + "']").remove();
	} 
	addedColors = 2;
}


// add color when creating palette
var addedColors = 2;
$(".addColor").click(function() {
	if (addedColors < 8) {
		addedColors++;
		var randomColor = Math.floor(Math.random()*16777215).toString(16);
		var colordivs = "<label for='color" + addedColors + "'><p>color " + addedColors + ":</p></label><input type='color' id='color" + addedColors + "' name='colors' value='#" + randomColor + "'><br class='color" + addedColors + "'>";
		$( colordivs ).insertBefore( "#endColorList" );
	} // ADD popup that says "can't add more"
})

// clear saved
$(".clearSaved").click(function() {
	// if (confirm("Are you sure you want to delete all saved palettes?")) {
	// 	localStorage.removeItem("palettes");
	// 	//localStorage.removeItem("theme");
	// 	alert('Local storage wiped');
	// 	history.go(0);
	// }
	$(".popup").children(".popupWindow").html('<h3>are you sure you want to delete your saved palettes?</h3><br><button class="clearYes"><h3>confirm</h3></button><button class="clearNo"><h3>cancel</h3></button>');
	$(".popup").css("display", "flex");
	$(".clearYes").click(function() {
		localStorage.removeItem("palettes");
		//alert('Local storage wiped');
		history.go(0);
	})
	$(".clearNo").click(function() {
		$(".popup").css("display", "none");
	})

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

console.log(palette.name);