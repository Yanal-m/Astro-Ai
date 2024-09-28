import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-cyan-700 text-white  p-4  w-full">
      <div className="container mx-auto text-center">
        <p className='py-2'> &copy; {currentYear} AstroApp. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
