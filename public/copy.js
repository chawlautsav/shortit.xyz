function copy() {
	/* Get the text field */
	alert('here');
	var copyText = document.getElementById("createdurl");
  
	/* Select the text field */
	copyText.select();
  
	/* Copy the text inside the text field */
	document.execCommand("copy");
  
	/* Alert the copied text */
	alert("Copied the text: " + copyText.value);
  }

						// Updated 28-06-2018