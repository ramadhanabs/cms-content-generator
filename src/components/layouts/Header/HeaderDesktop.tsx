import React from 'react'
import Button from '@/components/elements/Button'

const HeaderDesktop = () => {
  return (
    <div className='fixed top-0 w-full z-10'>
      <nav className="flex align-middle justify-between p-5 shadow-smooth bg-white">
        <img src="/images/eraspace.svg" alt="logo-eraspace" className="w-[200px]" />
        <Button>Download</Button>
      </nav>
    </div>
  )
}

export default HeaderDesktop