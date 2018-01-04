export default function socketMiddleware(socket) {
  return ({dispatch, getState}) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, type} = action;

    if (type !== 'socket' || !promise) {
      return next(action);
    }
    
    promise(socket, next).then((response) => {
      	console.log('in result');
        return next(response);
      })
      .catch((error) => {
        return next({error, type: FAILURE });
      })
  };
}

   