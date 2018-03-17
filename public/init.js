pp=document.getElementById('p');
var a = [];
function find(  k )
{
   $("p").css("padding", "0px");

	if( k == "" )
		return true;
  
  if( a[k] == undefined )
  {
  	$("#key").css("border", "2px solid #28a800");
  	$("#key").css("border-left", "none");
  	$("#keyy").css("border", "2px solid #28a800");
  	$("#keyy").css("border-right", "none");
  	
  	pp.innerHTML = "";
  	return false;
  }

	$("#key").css("border", "2px solid #dc3545");
	$("#key").css("border-left", "none");
	$("#keyy").css("border", "2px solid #dc3545");
	$("#keyy").css("border-right", "none");
	$("p").css("padding", "7px");
	$("p").css("background-color", "#dc3545");
	pp.innerHTML = "Not Available";
	  return true;
}
$('document').ready(function(){
	$("input").keyup(function(){
	var k = $('#key').val();
	if( k == "" )
	{
		pp.innerHTML = "";
	}
	else
	find(k);
    });
$('#f1').submit(function(e)
{
	e.preventDefault();
	var u = $('#url').val();
	var k = $('#key').val();
	if( k == "" )
	{
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < 5; i++)
			k += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	var aa = "https://lillyme.herokuapp.com/";
	aa += k;
	document.getElementById("created").style.display = "block";
  	document.getElementById('createdurl').value= aa;
	a[k] = u;
	$.ajax({
		type:"POST",
		url:"/short",
		data: { url  : u, key: k }
	})
	
})
	
})

// bodyy.setAttribute('bgcolor','#333333');