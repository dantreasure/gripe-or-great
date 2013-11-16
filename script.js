/*
 * Track presence of charactesr in text area to enable submit button
 */

function trackChar(val, selector){
 	if (val.value.length !== 0){
 		$('#' + selector + '-submit').removeClass('disabled');
 	}
 	else{
 		$('#' + selector + '-submit').addClass('disabled');
 	}
 }

$(document).ready(function(){
	/*
	 * Function to hide all options
	 */
	function hideAll(){
		$('#gripe').hide('slow');
		$('#great').hide('slow');
		$('#stats').hide('slow');
	}

	/*
	 * Hide/ Show jQuery on the options
	 */
	function reveal(selector){
		$('#' + selector + '-btn').click(function(){
			if ($('#' + selector).is(":visible")){
				return;
			}
			else{
				hideAll();
				$('#' + selector).show('slow');
			}
		});
	}
	reveal('gripe');
	reveal('great');
});

/*
 * Firebase Logic
 */

var gripeRef = new Firebase('https://gripe-or-great.firebaseio.com/gripe');
var greatRef = new Firebase('https://gripe-or-great.firebaseio.com/great');


$('#gripe-submit').click(function(){
	var gripeText = $('#gripe-textarea').val();
	var submissionType = 'gripe';
	gripeRef.push({submissionType: submissionType, gripeText: gripeText});
	$('#gripe-textarea').val('');
});

$('#great-submit').click(function(){
 	var greatText = $('#great-textarea').val();
	greatRef.push({"title": "great", "text": greatText});
	$('#great-textarea').val('');
});

gripeRef.on('value', function(snapshot){
	var gripeCount = 0;
	snapshot.forEach(function() {
   		gripeCount++;
		});
		$('#numberOfGripes').html('Number of Gripes: ' + gripeCount);
});

gripeRef.on('child_added', function(snapshot){
	$('#listOfGripes').append('<h3>' + snapshot.val().gripeText + '</h3>')
});

greatRef.on('value', function(snapshot){
	var greatCount = 0;
	snapshot.forEach(function() {
   		greatCount++;
		});
		$('#numberOfGreats').html('Number of Greats: ' + greatCount);

});

greatRef.on('child_added', function(snapshot){
	$('#listOfGreats').append('<h3>' + snapshot.val().text + '</h3>')
});
