const initial = {
	count:0};


export default function(state = initial, action){
	switch (action.type){

		case 'plus':
			const count = state.count+1
			return {...state,count:count}
			break;
		default:
			return state;
	}
}