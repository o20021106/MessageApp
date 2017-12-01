import Promise from 'promise';

import io from 'socket.io-client';


export default class socketAPI {
  socket;

  connect() {
    console.log({'query': 'token=' + localStorage.getItem("token")});
    this.socket = io({query: 'token='+localStorage.getItem("token").slice(7)}).connect();
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_error', (error) => reject(error));
    });
  } 

  disconnect() {
    return new Promise((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    });
  }


 
  emit(event, data) {
    return new Promise((resolve, reject) => {
      console.log('inside client emit');
      if (!this.socket) return reject('No socket connection.');

      return this.socket.emit(event, data, (response) => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
        	console.log('in emit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          console.error(response.error);
          return reject(response.error);
        }
        console.log(response);
        return resolve(response);
      });
    }); 
  }

  on(event, fun) {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      this.socket.on(event, fun);
      resolve();
    });
  }
}