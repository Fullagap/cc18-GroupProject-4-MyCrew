import React from 'react'
import Footer from './component/Footer'
import LeaveChart from './component/LeaveChart'

export default function LeaveChartPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-3/4 gap-8 mx-auto my-4">
        
        <LeaveChart />
      </div>
        <Footer />
    </div>
  )
}
