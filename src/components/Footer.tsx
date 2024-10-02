import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-cyan-800 text-white/80  p-4  w-full">
      <div className="container mx-auto text-sm text-center">
        <p>&copy; {currentYear} AstroApp. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
