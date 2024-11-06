import React from 'react'
import ProfilePage from './Profile/ProfilePage'

export default function profile({info,chart,req,dcc}) {
  console.log("profile",info,chart,req,dcc)
  return (
    <ProfilePage info={info} chart={chart} req={req} dcc={dcc}/>
  )
}
