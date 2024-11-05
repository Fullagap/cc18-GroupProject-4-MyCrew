import React from 'react'
import Footer from './component/Footer'
import LeaveStatus from './component/LeaveStatus'

export default function LeaveStatusPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-3/4 gap-8 mx-auto my-4">
        <LeaveStatus />
      </div>
        <Footer />
    </div>
  )
}
