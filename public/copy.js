 function copy() {


	var copyText = document.getElementById("createdurl");
	copyText.select();
	document.execCommand("copy");
	alert("Copied the text: " + copyText.value);
}
						// Updated 29-06-2018