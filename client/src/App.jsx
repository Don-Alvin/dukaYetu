import React from 'react'
import Layout from './components/layout/Layout'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
)

const App = () => {
  return (
    <div>
      <Layout />
    </div>
  )
}

export default App