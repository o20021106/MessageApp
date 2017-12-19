import socektMiddleware from './socketMiddleware';

export default function configureStore(socketClient){
	const middelware = socketMiddleware(socketClient)
}