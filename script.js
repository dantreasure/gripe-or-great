	/*
	 * Track presence of charactesr in text area to enable submit button
	 */
	 function trackGripeChar(val){
	 	if (val.value.length !== 0){
	 		$('#gripe-submit').removeClass('disabled');
	 	}
	 	if(val.value.length == 0){
	 		$('#gripe-submit').addClass('disabled');
	 	}
	 }

	 function trackGreatChar(val){
	 	if (val.value.length !== 0){
	 		$('#great-submit').removeClass('disabled');
	 	}
	 	if(val.value.length == 0){
	 		$('#great-submit').addClass('disabled');
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
	$('#gripe-btn').click(function(){
		if ($('#gripe').is(":visible")){
			return;
		}
		else{
			hideAll();
			$('#gripe').show('slow');
		}
	});	
	$('#great-btn').click(function(){
		if ($('#great').is(":visible")){
			return;
		}
		else{
			hideAll();
			$('#great').show('slow');
		}
	});	
	$('#stats-btn').click(function(){
		if ($('#stats').is(":visible")){
			return;
		}
		else{
			hideAll();
			$('#stats').show('slow');
		}
	});
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
