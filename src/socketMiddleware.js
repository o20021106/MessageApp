/*export default function socketMiddleware(socket){
	return ({dispatch, getSate}) => next => action =>{
		if (typeof action === 'function'){
			return action(dispatch, getState);
		}

		if(action !== 'socket' || !promise){
			return next(action);
		}

		return promise(socket)
			.then((result)=>{
				return next({result, type :'success'});
			})
			.catch((err)=>{
				return next({type:'failure', error:err});
			})


	};
}
*/
export default function socketMiddleware(socket) {
  // Socket param is the client. We'll show how to set this up later.
  return ({dispatch, getState}) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    /*
     * Socket middleware usage.
     * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
     * type: always 'socket'
     * types: [REQUEST, SUCCESS, FAILURE]
     */
    const { promise, type} = action;

    if (type !== 'socket' || !promise) {
      // Move on! Not a socket request or a badly formed one.
      return next(action);
    }
    console.log('in socket promise combo~')
    console.log(typeof(promise));
    
    promise(socket).then((result) => {
      	console.log('in result');
        return next({result, type: SUCCESS });
      })
      .catch((error) => {
        return next({error, type: FAILURE });
      })
  };
}

  