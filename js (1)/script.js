/* Author: Ari Rose
*/

//hide clear buttons
$('.clearSelection').hide();
$(window).load(function(){
	
	$('#dogSet').css('visibility','visible');
	$('#criteria').css('visibility','visible');
	$('#loaderIcon').hide();
		
	$('#dogSet').isotope({
	filter: '.dog:lt(162)',
    itemSelector : '.dog',
	layoutMode : 'cellsByRow',
  	cellsByRow : {
	    columnWidth :160,
	    rowHeight : 160
	}
  });
});

$(document).ready(function(){
	
	// //nice noisy backgrounds
	// $('body').noisy({
	//     'intensity' : 0.08, 
	//     'size' : '300', 
	//     'opacity' : 0.031, 
	//     'fallback' : '', 
	//     'monochrome' : true
	// }).css('background-color', '#232422');
	// 
	// $('#container').noisy({
	//     'intensity' : 0.298, 
	//     'size' : '300', 
	//     'opacity' : 0.061, 
	//     'fallback' : '', 
	//     'monochrome' : true
	// }).css({'border' : '9px solid #D0232D', 'background-color':'#E4E4E3'});


// ====================================================
// = CSS automated background positioning from sprite =
// ====================================================

//divided up sprites because iphone has max sprite size of 2megapixels
var sprite1ItemCount = 128;
var sprite2ItemCount = 33;
var xCounter = 0;
var yCounter = 0;

for (var i=0; i<sprite1ItemCount; i++) //fill up first sprite: 128 items
{	
	$('.dogImage').eq(i).addClass('sprite1').css('background-position', "-" + xCounter + "px -" + yCounter + "px");
		
	xCounter += 120;
	if (xCounter == 960) {
		yCounter += 120
		xCounter = 0;
	} //go to next row
}


xCounter = 0; //reset counters for sprite 2
yCounter = 0;
for (var j=0; j<sprite2ItemCount; j++) //fill up second sprite: 33 items
{
	
	i = j + sprite1ItemCount; //selects correct dog box based on where it previously left off (sprite1ItemCount)
	$('.dogImage').eq(i).addClass('sprite2').css('background-position', "-" + xCounter + "px -" + yCounter + "px");
	xCounter += 120;
	if (xCounter == 960) {
		yCounter += 120
		xCounter = 0;
	} //go to next row
	
}


var selector = "";
var nextOptionStartsAt = -1;
var optionFamilyIndex = -1;
var existingOption = "";


$('input').attr('checked', false).button('refresh');


$('#dogSet').imagesLoaded(function(){

	
 });
 


$('#filters a').click(function(){
	var selector = $(this).attr('data-filter');
	$('#dogSet').isotope({ filter: selector,
	    itemSelector : '.dog',
		layoutMode : 'cellsByRow',
	  	cellsByRow : {
		    columnWidth :160,
		    rowHeight : 160
		}
	 });
	return false;
});


$('.dog').hover(function(){$(this).addClass("dogHover");}, function(){$(this).removeClass("dogHover");});


$( "#sizePicker" ).buttonset();
$( "#trainingPicker" ).buttonset();
$( "#iqPicker" ).buttonset();
$( "#shedPicker" ).buttonset();
$( "#watchPicker" ).buttonset();
$( "#guardPicker" ).buttonset();
$( "#popularPicker" ).buttonset();

// ======================================
// = SELECTION ENGINE FOR BREED OPTIONS =
// ======================================

$("input").change(function(){
	$(this).parent().prev().children('.clearSelection').fadeIn('slow');
	optionFamilyIndex = selector.search($(this).attr('name')); //e.g. size
	if(optionFamilyIndex!=-1){ //if there is a family option in selection string, remove it
		nextOptionStartsAt =selector.indexOf(".", optionFamilyIndex);
		if (nextOptionStartsAt == -1){
			existingOption = selector.substring(optionFamilyIndex - 1); //captures item
		}
		else {
			existingOption = selector.substring(optionFamilyIndex - 1, nextOptionStartsAt); //captures item
		}
		selector = selector.replace(existingOption, "");
		
	}
	
	if(selector.search($(this).attr('id')) == -1){//if exact option doesn't exist, needs to be created
		selector += '.' + $(this).attr('id');
	}

	
	$('#dogSet').isotope({
		filter: selector,
	    itemSelector : '.dog',
		layoutMode : 'cellsByRow',
	  	cellsByRow : {
		    columnWidth :160,
		    rowHeight : 160
		}
	});		
});

$('.clearSelection').live('click', function(){
	var radios = $(this).parent().next().children().attr('checked', false).button('refresh'); //set buttons to off
	optionFamilyIndex = selector.search($(radios).attr('name'));
	if(optionFamilyIndex!=-1){ //there is a family option in selection string
		nextOptionStartsAt =selector.indexOf(".", optionFamilyIndex);
		if (nextOptionStartsAt == -1){
			existingOption = selector.substring(optionFamilyIndex - 1); //captures item
		}
		else {
			existingOption = selector.substring(optionFamilyIndex - 1, nextOptionStartsAt); //captures item
		}
		selector = selector.replace(existingOption, "");
		
	}
	$(this).fadeOut('slow');
	$('#dogSet').isotope({
		filter: selector,
	    itemSelector : '.dog',
		layoutMode : 'cellsByRow',
	  	cellsByRow : {
		    columnWidth :160,
		    rowHeight : 180
		}
	});		
});


	
});





