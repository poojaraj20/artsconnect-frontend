import { useState } from 'react'


import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './users/pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import Preloader from './components/Preloader'
import DashBoard from './users/pages/DashBoard'
import ArtworkDetail from './users/pages/ArtworkDetail'
import Contact from './users/pages/Contact'
import Profile from './users/pages/Profile'
import About from './users/pages/About'
import Uploads from './users/pages/Uploads'
import Inboxs from './users/pages/Inbox'
import MyUploads from './users/pages/MyUploads'
import MyArtworkDetail from "./users/pages/MyArtworkDetail";
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentError from './users/pages/PaymentError'
import PageNotFound from './pages/PageNotFound'

import Admindashboard from './admin/pages/Admindashboard'
import Adminprofile from './admin/pages/Adminprofile'
import Admininbox from './admin/pages/Admininbox'
import { Inbox } from 'lucide-react'







function App() {
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 3000)
  }, [])

  return (
    <>


      <Routes>
        <Route path='/' element={isLoading ? <Home /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/about' element={<About />} />
        <Route path="/ArtworkDetail/:id" element={<ArtworkDetail />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/uploads' element={<Uploads />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/inbox' element = {<Inboxs />}/>
        <Route path="/myuploads" element={<MyUploads />} />
        <Route path="/myuploads/:id" element={<MyArtworkDetail />} />
        <Route path="/payment-success" element={<PaymentSuccess/> }/>
        <Route path="/payment-error" element={<PaymentError/> }/>
        <Route path='/admin-profile' element={<Adminprofile />} />
        <Route path='/admin-dashboard' element={<Admindashboard />} />
        <Route path='/admin-inbox' element = { <Admininbox />} />
        <Route path='*' element={<PageNotFound />} />


      </Routes>

    </>
  )
}

export default App
