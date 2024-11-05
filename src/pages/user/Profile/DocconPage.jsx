import React from 'react'
import Footer from './component/Footer'
import Doccon from './component/Doccon'

export default function DocconPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-3/4 gap-8 mx-auto my-4">
        
        <Doccon />
      </div>
        <Footer />
    </div>
  )
}
