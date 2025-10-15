import React from 'react'
import Header from '../components/Header'
import Posts from '../components/Posts'
import Notifications from '../components/Notifications'
import DMs from '../components/DMs'

export default function HomePage() {
  return (
    <div>
      <Header />
      <div style={{display:'flex', gap:12}}>
        <div style={{flex:1}}>
          <Posts />
        </div>
        <div style={{width:380}}>
          <Notifications />
          <DMs />
        </div>
      </div>
    </div>
  )
}