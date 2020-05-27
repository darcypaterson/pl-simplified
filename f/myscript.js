var request;
if (window.XMLHttpRequest) {
	request=new XMLHttpRequest();
} else {
	request=new ActiveXObject("Microsoft.XMLHTTP");
}

request.open('GET', 'f/data.json');
request.onreadystatechange = function() {
	if ((request.status === 200) &&
		(request.readyState === 4)) {

			info = JSON.parse(request.responseText);

			var output='';
			// for (var i = 0; i <= info.company.length-1; i++) {
			// 	for (key in info.company[i]) {
			// 		if (info.company[i].hasOwnProperty(key)) {
			// 			output += '<li>' + 
			// 			'<a href = "' + info.company[i][key] +
			// 			'">' + key + '</a>';
			// 			'</li>';
			//     }   
			// 	}
			// }

			for (var i = 0; i <= info.company.length-1; i++) {

				for (key in info.company[i]) {

					

				}

				output += info.company[i].Symbol + '<br>';
				
			}

			
			
			var update = document.getElementById('result');
			// update.innerHTML = output;
			
			
	} //ready
} //event
request.send();