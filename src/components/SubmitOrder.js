import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function SubmitOrder() {

  return (
    <main className='info-box block col-2'>
        <div style={{color: '#008000'}}>Thank your for purchasing from us!</div>
        <Link to='/'>
          <button className='add-button' >Go back to buy more</button>
        </Link>
    </main>
  )
}
