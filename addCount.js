
const initial = {count :0}; 

function AddCount(state=initial, action){
	switch(action.type)	{
		case 'addCount':
			return {count :state.count+action.count};
		default:
			return state;
	}
}


module.exports =  AddCount;