var flag=0;
$('document').ready(function()
{
	$("input").keyup(function()
	{
		var key = $('#key').val();	
		if( key == '' )
			setback();
		else
			keyNotAvailable(key);
	});


	$("#form").submit(function(e)
	{
		e.preventDefault();
		var key = validKey();	
		var url = validUrl();									//add this============
		if( flag == 0 )
			$.ajax({
				type:"POST",
				url:"/create",
				data: { url  : url, key: key },
				success: function(data)
				{
					document.getElementById("created").style.display = "block";
					a = "shortit.xyz/";
					a += key;
					document.getElementById('createdurl').value= a;
					flag = 1;
					console.log("ok");
					console.log(url + "  "+ key);
				},
				error: function(data)
				{
					alert('Sorry, we are currently unable to process your request.');				
				}
			})
		else
			alert('Please enter a valid URL. If the problem presists, report it to utsav@codeshala.org');

	});
});
function validUrl()
{
	var url = $('#url').val();
	if( url == "" )
		flag = 1;
	return url;
}
function validKey()
{
	var k = $('#key').val();
	if( k == "" )
	{
		var keyLength = 5;
		var text;
		do
		{
			text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for (var i = 0; i < keyLength; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			keyNotAvailable(text);
			keyLength++;
			if( keyLength == 7 )
				break;
		} 
		while( flag == 1 );



		k 	= text;		//generate random key
		flag = 0;
	}
	else
	{
		if ( keyNotAvailable(k) )
		{
			alert('This custom URL is already in use. Please enter another one.');
			flag = 1;
		}
		else
			flag = 0;
	}
	return k;
}
function setback()										// clearing available not available marker
{
	$("#domain").css("border", "none");
	$("#key").css("border", "none");
}
function keyNotAvailable(k)
{
	$.ajax(
	{
		type:"POST",
		url:"/keyAlreadyInUse",
		data: { key: k },
		success: function(data)
		{
			if(data=="true")
			{
				$("#domain").css("border", "2px solid #dc3545");
				$("#key").css("border", "2px solid #dc3545");
				flag = 1;
				return true;
			}
			else if(data=="false")
			{
				$("#domain").css("border", "2px solid #28a800");
				$("#key").css("border", "2px solid #28a800");
				flag = 0;
			}
			else
				console.log('Custom URL Check Request Failed! (1)');
			
			$("#domain").css("border-right", "none");
			$("#key").css("border-left", "none");
		},
		error: function(data)
		{
			console.log('Custom URL Check Request Failed! (2)');				
		}
	});
}
						// Updated 28-06-2018