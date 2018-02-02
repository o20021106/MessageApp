import Layout from './layout';
import ChatWindow from './chatWindow';
import Messages from './messages';

/*const routes = [
  { component: AppRoot,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/home',
        component: Home
      },
      { path: '/list',
        component: List
      }
    ]
  }
];
*/
//<Route exact path= '/message' component = {Messages} />
  //          <Route path= '/recipient/:recipientId' component = {ChatWindowTest}/>
/*
const routes = [
  {
    path:'/nearby/test',
    component: Test 
  },
  {
    path:'/nearby/about',
    component: About 
  }
]
*/
const routes = [
  {
    component:Layout,
    routes:[
      {
        path:'/message/messages',
        component: Messages 
      },
      {
        path:'/message/recipient/:recipientId',
        component: ChatWindow
      }
    ]
  }
]


export default routes;