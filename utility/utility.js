var sendinblue = require('sendinblue-api');
exports.sendVer = function(token){	
	var sendinblue = require('sendinblue-api');
	console.log()
	var parameters = { "apiKey": "sZtE1P0VGJr7H8Sc", "timeout": 5000 };
	var sendinObj = new sendinblue(parameters);

	var input =	{ 'to': { 'o20021106@gmail.com': 'to whom!' },
		'from': ['r04325008@ntu.edu.tw', 'from email!'],
		'subject': 'Test mail form sendinblue',
		'html': 'This is the <h1>HTML</h1>'+toString(token)
	};

	sendinObj.send_email(input, function(err, response){
	    if(err){
	        console.log(err);
	    } else {
	        console.log(response);
	    }
	});
}
