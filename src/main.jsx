import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Protected from './components/Protected.jsx'
import Login from './components/Login.jsx'

import {Home,AddPost,AllPosts,EditPost,Signup,Post} from './pages/allpages.js'

import { Provider } from 'react-redux'
import store from './store/store.js'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path:"/signup",
        element:(
          <Protected authentication={false}>
            <Signup/>
          </Protected>
        )
      },
      {
        path:"/all-posts",
        element:(
          <Protected authentication={true}>
            <AllPosts/>
          </Protected>
        )
      },
      {
        path:"/add-posts",
        element:(
          <Protected authentication={true}>
            <AddPost/>
          </Protected>
        )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <Protected authentication={false}>
            <EditPost/>
          </Protected>
        )
      },
      {
        path:"/post/:slug",
        element:(
          <Post/>
        )
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
