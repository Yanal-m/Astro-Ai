import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white/80 z-10   p-4  w-full">
      <div className="container mx-auto text-sm text-center">
        <p>&copy; {currentYear} AstroApp. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
