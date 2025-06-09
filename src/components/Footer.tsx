import StumblLogo from '@/constants/icons/StumblLogo'
import { Instagram } from 'lucide-react';
import React from 'react'

const Footer = () => {
  return (
    <div className='px-[130px] flex justify-between py-[30px] items-center  bg-[#F94C57]'>

        <div className='flex '>
                <StumblLogo color='#ffff'/>
                <ul className='flex ml-2 flex-row gap-2 items-center'>
                    <li>What's New</li>
                    <li>Discover</li>
                    <li>Pricing</li>
                    <li>Help</li>
                </ul>
        </div>

        <p className='text-[12px] font-medium mt-[40px]'>Host your events with Stumbll ↗</p>

        <div className='flex gap-2'>
             <Instagram height={16} width={16}/>
             <Instagram height={16} width={16}/>
             <Instagram height={16} width={16}/>
             <Instagram height={16} width={16}/>
             <Instagram height={16} width={16}/>
        </div>

    </div>
  )
}

export default Footer