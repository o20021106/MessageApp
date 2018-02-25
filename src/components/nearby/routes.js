import Layout from '../layout';
import nearbyBabel from './nearbyBabel';

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
        path:'/nearby',
        component: nearbyBabel
      }
    ]
  }
]


export default routes;