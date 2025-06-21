import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EditBook from './components/EditFilm/EditBook.tsx'
import AddFilm from './components/AddFilm/AddFilm.tsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/:id',
          element: <EditBook/> 
        },
        {
          path: '/add',
          element: <AddFilm/>
        }
      ]
    }
  ]

)

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />



  ,
)
