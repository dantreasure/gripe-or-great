$(document).ready(function(){
	var myRootRef = new Firebase('https://plains-of-despair.firebaseio.com/');
myRootRef.set('Hello World!');
	// Function to hide all options
	function hideAll(){
		$('#gripe').hide('slow');
		$('#great').hide('slow');
		$('#stats').hide('slow');
	}


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