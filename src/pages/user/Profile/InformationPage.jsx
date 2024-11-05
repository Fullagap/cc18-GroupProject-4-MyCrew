import React from 'react'
import Profile from './component/Profile'
import Detail from './component/Detail'
import Footer from './component/Footer'

export default function Information() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-3/4 gap-8 mx-4 my-4">
        <Profile />
        <Detail />
        
      </div>
        <Footer />
    </div>
  )
}
