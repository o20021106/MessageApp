
exports.getTimeConversationList = function(timeStamp){
	const dayMap= {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thr',5:'Fri',6:'Sat'}
	const monthMap = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'}
	var now = new Date();
	var createdTime = new Date(timeStamp);
	var displayTime ='';

	if (1000*60*60*24 >= (now-createdTime) && createdTime.getDay() === createdTime.getDay()){
		var minute = ('00'+createdTime.getMinutes()).slice(-2); 
		displayTime = createdTime.getHours()+':'+minute;
		displayTime = createdTime.getHours >= 12 ? displayTime+'pm' : displayTime+'am';
	}
	else if(1000*60*60*24*7 >= (now-createdTime) && createdTime.getDay() === createdTime.getDay()){
		displayTime = dayMap[createdTime.getDay()];
	}
	else if( createdTime.getFullYear() == now.getFullYear()){
		displayTime = monthMap[createdTime.getMonth()]+' '+createdTime.getDate();
	}
	else{
		displayTime = createdTime.getFullYear()+' '+monthMap[createdTime.getMonth()]+' '+createdTime.getDate();
	}

	return displayTime
}

exports.getMessageTime = function(timeStamp){
	const dayMap= {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thr',5:'Fri',6:'Sat'}
	const monthMap = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'}
	var now = new Date();
	var createdTime = new Date(timeStamp);
	var minute = ('00'+createdTime.getMinutes()).slice(-2); 
	var displayTime = createdTime.getHours()+':'+minute;
	displayTime = createdTime.getHours >= 12 ? displayTime+'pm' : displayTime+'am';

	var day = dayMap[createdTime.getDay()];
	var date = createdTime.getDate();
	var month = monthMap[createdTime.getMonth()];
	var year = now.getFullYear() > createdTime.getFullYear() ? createdTime.getFullYear()+' ' : ''
	
	return {time: displayTime, date : year+month+' '+date}
}

exports.getAge = function(birthDate){
	const dayMap= {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thr',5:'Fri',6:'Sat'}
	const monthMap = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'}
	var now = new Date();
	var BD = new Date(birthDate);
	var age = now.getFullYear()-BD.getFullYear();
	if(now.getMonth() > BD.getMonth()){
		return age;
	}
	else if(now.getMonth() < BD.getMonth()){
		return age-1;
	}
	else if(now.getMonth() === BD.getMonth()){
		if(now.getDate() >= BD.getDate()){
			return age
		}
		else{
			return age -1
		}
	}


}