var flag=0;
$('document').ready(function()
{
	$("input").keyup(function()
	{
		var key = $('#key').val();	
		if( key == '' )
		{
			setback();
		}
		else
			keyNotAvailable(key);
	});


	$("#form").submit(function(e)
	{
		e.preventDefault();
		var key = validKey();	
		var url = $('#url').val();
		validUrl();
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
				},
				error: function(data)
				{-
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
}
function validKey()
{
	var k = $('#key').val();
	if( k == "" )
	{
		k 	= "xyz";		//generate random key
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
function setback()
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
				$("#domain").css("border-right", "none");
				$("#key").css("border", "2px solid #dc3545");
				$("#key").css("border-left", "none");
				flag = 1;
				return true;
			}
			else if(data=="false")
			{
				$("#domain").css("border", "2px solid #28a800");
				$("#domain").css("border-right", "none");
				$("#key").css("border", "2px solid #28a800");
				$("#key").css("border-left", "none");
				flag = 0;
			}
			else
				console.log('dikkat');
		},
		error: function(data)
		{
			console.log('Custom URL Check Request Failed! ');				
		}
	});
}
						// Updated 07-06-2018