import Test from './test';
import About from './about';
import Layout from './layout';

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
        path:'/message',
        component: Messages 
      },
      {
        path:'/recipient/:recipientId',
        component: ChatWindow
      }
    ]
  }
]


export default routes;