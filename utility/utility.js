/*var sendinblue = require('sendinblue-api');
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
*/

exports.hideOnClickOutside = function(selector, targetElement,callback) {
  const outsideClickListener = (event) => {
  	console.log(event.target);
  	console.log(selector);
  	console.log(typeof(event.target.closest));
    if (!event.target.closest(selector)) {
      if (!isHidden(targetElement)) {
      		callback();
          	removeClickListener();
      }
    }
  }

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }

  document.addEventListener('click', outsideClickListener)
  return outsideClickListener;
}


function isHidden(el) {
    return (el.offsetParent === null)
}