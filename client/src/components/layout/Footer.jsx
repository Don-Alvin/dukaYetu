import React from 'react'

const Footer = () => {

  const date = new Date().getFullYear()

  return (
    <footer className='footer'>
        <p className="text-center text-white mt-1">
            Duka Yetu - {date} , All Rights Reserved
        </p>
    </footer>
  )
}

export default Footer